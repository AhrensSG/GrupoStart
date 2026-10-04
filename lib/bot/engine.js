import {
  getBotEntryStep,
  getBotOptions,
  getBotStep,
  getWaBotState,
  saveWaBotState,
  saveWaOutgoingMessage,
  withWaConversationLock,
} from "@/lib/tools/db"
import {
  sendButtonMessage,
  sendHandoffNotification,
  sendListMessage,
  sendTemplateByName,
  sendTextViaWhatsApp,
} from "@/lib/tools/whatsapp-cloud"
import { describeSlot, getAvailableSlots, greetingFor, slotParts } from "@/lib/bot/calendly"
import { normalizeText, renderTemplate } from "@/lib/bot/text"

export const BOT_CONFIG = {
  enabled: process.env.BOT_ENABLED !== "false",
  adminPhone: (process.env.WHATSAPP_ADMIN_PHONE || "").replace(/\D/g, ""),
  // Después de tantos mensajes sin entender al cliente se vuelve al menú.
  missLimit: Number(process.env.BOT_MISS_LIMIT || 2),
  // Espera antes de contestar, para que el chat no se vea instantáneo.
  delayMs: Number(process.env.BOT_DELAY_MS || 700),
  // Pausa entre el nodo y el mensaje apilado que va con él.
  stackDelayMs: Number(process.env.BOT_STACK_DELAY_MS || 900),
}

// Palabras que devuelven al menú inicial, por si el cliente escribe en vez de tocar.
const RESET_WORDS = new Set(["menu", "inicio", "hola", "holis", "empezar", "ayuda", "opciones"])

const ANSWERABLE_TYPES = new Set(["text", "interactive", "button"])

function delay(ms) {
  if (!ms) return Promise.resolve()
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function findOption(options, text, optionId) {
  if (optionId) {
    const byId = options.find((option) => option.option_key === optionId)
    if (byId) return byId
  }
  const normalized = normalizeText(text)
  if (!normalized) return null
  return (
    options.find((option) => normalizeText(option.title) === normalized) ||
    options.find((option) => normalizeText(option.option_key) === normalized) ||
    null
  )
}

/** Claves internas del estado que no le sirven a un asesor. */
const NO_RESUMEN = new Set(["agenda_slots", "misses", "attempts", "origen"])

/**
 * Arma el resumen de la conversación que se le manda a los administradores.
 * Se manda todo lo que el cliente fue contestando, más el horario elegido si agendó.
 */
function resumenConversacion(state) {
  if (!state || typeof state !== "object") return ""
  return Object.entries(state)
    .filter(([key, value]) => !NO_RESUMEN.has(key) && value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n")
}

function notificaAsesor(phone, state) {
  const numeros = (process.env.BOT_ASESOR_PHONES || process.env.WHATSAPP_ADMIN_PHONE || "")
    .split(",")
    .map((n) => n.replace(/\D/g, ""))
    .filter(Boolean)
  if (!numeros.length) return
  const consulta = resumenConversacion(state) || "sin datos"
  for (const numero of numeros) {
    sendHandoffNotification(numero, { numero: phone, consulta })
      .then((ok) => {
        if (!ok) console.error("[Bot] No se pudo avisarle al asesor", numero)
      })
      .catch((err) => console.error("[Bot] Error al avisarle al asesor", numero, err))
  }
}

/**
 * El primer mensaje de la conversación tiene que coincidir con uno de los
 * trigger_texts del nodo de entrada. Si el flujo no define ninguno, se acepta
 * cualquier mensaje (comportamiento del menú genérico).
 */
function matchesTrigger(entry, text) {
  const triggers = entry?.trigger_texts || []
  if (!triggers.length) return true
  return triggers.some((t) => normalizeText(t) === normalizeText(text))
}

/**
 * Manda el nodo al cliente y lo deja en el historial. Devuelve false si
 * WhatsApp rechazó el mensaje, para no avanzar el flujo a ciegas.
 */
async function renderStep(phone, step, state) {
  const body = renderTemplate(step.body, state)
  const options = await getBotOptions(step.step_key)

  // Los nodos de agenda piden los horarios a Calendarly al momento de llegar: los
  // disponibles cambian todo el tiempo, así que no pueden estar en bot_options.
  if (step.kind === "agenda") {
    const slots = await getAvailableSlots({
      businessDaysAhead: step.calendar_min_business_days ?? 5,
      count: step.calendar_slot_count ?? 3,
    })
    if (!slots || !slots.length) {
      // Sin integración o sin horarios: el asesor coordina a mano.
      const fallback = step.agenda_empty_step_key || null
      if (fallback) {
        const target = await getBotStep(fallback)
        if (target?.notify_handoff) notificaAsesor(phone, state)
        return renderStep(phone, target, state)
      }
      console.error("[Bot] Nodo agenda", step.step_key, "sin horarios ni nodo de respaldo")
      return false
    }
    // Se guardan en el estado para poder resolver el botón que elija el cliente.
    // Se muta el objeto que recibió goTo, no una copia: si fuera una copia, el
    // saveWaBotState de goTo volvería a guardar el estado viejo y se perderían
    // los horarios ofrecidos.
    Object.assign(state, { agenda_slots: slots })
    const agendado = await sendButtonMessage(
      phone,
      body,
      slots.map((slot) => ({ id: slot.key, title: slot.label }))
    )
    if (!agendado) return false
    await saveWaOutgoingMessage({ to: phone, body, waMessageId: typeof agendado === "string" ? agendado : "" })
    await saveWaBotState(phone, { stepKey: step.step_key, state })
    return true
  }

  const payload = options.map((option) => ({
    id: option.option_key,
    title: option.title,
    description: option.description,
  }))

  let messageId
  if (step.kind === "template") {
    messageId = await sendTemplateByName(phone, step.template_name || process.env.WHATSAPP_TEMPLATE_VIDEO || "video")
  } else if (step.kind === "buttons" && payload.length) {
    messageId = await sendButtonMessage(phone, body, payload)
  } else if (step.kind === "list" && payload.length) {
    messageId = await sendListMessage(phone, body, step.button_text || "Ver opciones", payload)
  } else {
    messageId = await sendTextViaWhatsApp(phone, body)
  }

  if (!messageId) {
    console.error("[Bot] No se pudo enviar el paso", step.step_key, "a", phone)
    return false
  }

  await saveWaOutgoingMessage({
    to: phone,
    body,
    waMessageId: typeof messageId === "string" ? messageId : "",
  })
  return true
}

/**
 * Avanza al nodo pedido. Si no existe, cae al menú en vez de dejar la
 * conversación trabada.
 */
async function goTo(phone, stepKey, state, preloaded = null) {
  const step = stepKey ? preloaded || (await getBotStep(stepKey)) : null
  if (stepKey && !step) {
    console.error("[Bot] El paso", stepKey, "no existe en bot_steps, vuelvo al menú")
    return goTo(phone, null, state)
  }
  if (step?.notify_handoff) notificaAsesor(phone, state)
  if (!step) {
    await saveWaBotState(phone, { stepKey: null, state })
    return true
  }

  const sent = await renderStep(phone, step, state)
  if (!sent) return false

  // Nodos apilados: el segundo mensaje sale sin esperar respuesta del cliente, pero
  // el estado sigue en el nodo principal para que ambos sets de botones sirvan.
  if (step.also_send_step_key) {
    await delay(BOT_CONFIG.stackDelayMs)
    const sibling = await getBotStep(step.also_send_step_key)
    if (sibling) await renderStep(phone, sibling, state)
    else console.error("[Bot] El paso apilado", step.also_send_step_key, "no existe")
  }

  await saveWaBotState(phone, { stepKey, state })

  if (step.auto_advance && step.next_step_key) {
    // Pausa antes de encadenar el siguiente: hace que los mensajes se lean como
    // una conversación y no como un bloque seguido.
    await delay(BOT_CONFIG.stackDelayMs)
    await goTo(phone, step.next_step_key, state)
  }
  return true
}

/**
 * Punto de entrada del bot. Recibe todo mensaje nuevo de WhatsApp y lo lleva al
 * nodo que corresponde según el estado guardado de esa conversación.
 */
export async function handleBotMessage({ phone, name, text, type, optionId }) {
  if (!BOT_CONFIG.enabled) return
  if (!phone || !ANSWERABLE_TYPES.has(type)) return
  if (BOT_CONFIG.adminPhone && phone === BOT_CONFIG.adminPhone) return

  return withWaConversationLock(phone, async () => {
    const entry = await getBotEntryStep()
    if (!entry) {
      console.error("[Bot] No hay ningún nodo con is_entry = TRUE en bot_steps")
      return
    }

    const { stepKey, state } = await getWaBotState(phone)
    const current = (await getBotStep(stepKey)) || entry
    // El primer mensaje de una conversación nueva solo muestra el menú: no hay
    // pregunta anterior que responder.
    const isFirstMessage = !stepKey && current.step_key === entry.step_key && current.kind !== "input"

    if (isFirstMessage) {
      // Flujo cerrado: si el mensaje no es uno de los disparadores, el bot no contesta.
      if (!matchesTrigger(entry, text)) {
        console.log("[Bot] Mensaje inicial fuera de los disparadores, no respondo a", phone)
        return
      }
      await delay(BOT_CONFIG.delayMs)
      await goTo(phone, entry.step_key, { contacto: name || "", origen: text })
      return
    }

    if (RESET_WORDS.has(normalizeText(text)) && current.step_key !== entry.step_key) {
      await delay(BOT_CONFIG.delayMs)
      await goTo(phone, entry.step_key, {})
      return
    }

    // Nodo de texto libre: lo que escribió es la respuesta.
    if (current.kind === "input") {
      const key = current.collect_key || current.step_key
      const value = String(text || "").trim()
      const pattern = current.validation ? new RegExp(current.validation) : null
      const valid = value ? (!pattern || pattern.test(value)) : false

      if (!valid) {
        const attempts = Number(state.attempts || 0) + 1
        if (attempts >= Number(current.max_attempts || 3)) {
          await delay(BOT_CONFIG.delayMs)
          await goTo(phone, current.on_fail_step_key || null, { ...state, attempts: 0 })
          return
        }
        await delay(BOT_CONFIG.delayMs)
        const retry = await getBotStep(current.step_key)
        // Se repregunta el mismo nodo con el mensaje de error.
        if (retry) await sendTextViaWhatsApp(phone, renderTemplate(current.invalid_body, state))
        await saveWaBotState(phone, { stepKey: current.step_key, state: { ...state, attempts } })
        return
      }

      const nextState = { ...state, misses: 0, attempts: 0, [key]: value }
      await delay(BOT_CONFIG.delayMs)
      await goTo(phone, current.next_step_key, nextState)
      return
    }

    // Nodo de agenda: el botón es uno de los horarios que se ofrecieron al llegar,
    // así que se resuelve contra lo guardado en el estado.
    if (current.kind === "agenda") {
      const slots = state.agenda_slots || []
      const elegido = slots.find((s) => s.key === optionId) || slots.find((s) => normalizeText(s.label) === normalizeText(text))
      if (!elegido) {
        const misses = Number(state.misses || 0) + 1
        await delay(BOT_CONFIG.delayMs)
        const target = misses >= BOT_CONFIG.missLimit ? entry.step_key : current.step_key
        await goTo(phone, target, { ...state, misses: misses >= BOT_CONFIG.missLimit ? 0 : misses })
        return
      }
      // Se guardan la fecha, la hora y el saludo además del horario completo: la
      // confirmación al cliente los interpola y el resumen al asesor los muestra.
      const nextState = {
        ...state,
        misses: 0,
        horario: elegido.start,
        horario_texto: describeSlot(elegido.start),
        ...slotParts(elegido.start),
        saludo: greetingFor(elegido.start),
      }
      await delay(BOT_CONFIG.delayMs)
      await goTo(phone, current.agenda_booked_step_key || null, nextState)
      return
    }

    const options = await getBotOptions(current.step_key)
    let option = findOption(options, text, optionId)
    // El nodo puede tener un mensaje apilado con más opciones: si tocó una de esas,
    // el destino y la variable salen del hermano, pero el estado sigue acá.
    let optionCollectKey = current.collect_key
    if (!option && current.also_send_step_key) {
      const sibling = await getBotOptions(current.also_send_step_key)
      const siblingOption = findOption(sibling, text, optionId)
      if (siblingOption) {
        const siblingStep = await getBotStep(current.also_send_step_key)
        option = siblingOption
        optionCollectKey = siblingStep?.collect_key || null
      }
    }

    // No entendimos: repreguntamos una vez y después volvemos al menú.
    if (!option) {
      const misses = Number(state.misses || 0) + 1
      await delay(BOT_CONFIG.delayMs)
      const target = misses >= BOT_CONFIG.missLimit ? entry.step_key : current.step_key
      await goTo(phone, target, { ...state, misses: misses >= BOT_CONFIG.missLimit ? 0 : misses })
      return
    }

    const nextState = { ...state, misses: 0 }
    if (optionCollectKey) nextState[optionCollectKey] = option.title
    const target = await getBotStep(option.next_step_key)
    if (target?.collect_key) nextState[target.collect_key] = option.title

    await delay(BOT_CONFIG.delayMs)
    await goTo(phone, option.next_step_key, nextState, target)
  })
}