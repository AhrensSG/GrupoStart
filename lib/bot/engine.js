import {
  getBotEntryStep,
  getBotOptions,
  getBotStep,
  getWaBotState,
  resetWaConversation,
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
import { answerOutOfFlowQuestion, extractDateIsoFromText } from "@/lib/bot/ai"
import { bookSlot, describeSlot, getAvailableSlots, getAvailableSlotsForDate, greetingNowArgentina, slotParts } from "@/lib/bot/calendly"
import { normalizeText, renderTemplate } from "@/lib/bot/text"
import { getArgentinaNow } from "@/lib/tools/business-days"

export const BOT_CONFIG = {
  enabled: process.env.BOT_ENABLED !== "false",
  aiFallbackEnabled: process.env.BOT_AI_FALLBACK_ENABLED === "true" || process.env.WHATSAPP_AI_ENABLED === "true",
  adminPhone: (process.env.WHATSAPP_ADMIN_PHONE || "").replace(/\D/g, ""),
  // Después de tantos mensajes sin entender al cliente se vuelve al menú.
  missLimit: Number(process.env.BOT_MISS_LIMIT || 2),
  // Espera antes de contestar, para que el chat no se vea instantáneo.
  delayMs: Number(process.env.BOT_DELAY_MS || 700),
  // Pausa entre el nodo y el mensaje apilado que va con él.
  stackDelayMs: Number(process.env.BOT_STACK_DELAY_MS || 900),
}

// Palabras que devuelven al menú inicial, por si el cliente escribe en vez de tocar.
const RESET_WORDS = new Set(["menu", "inicio", "hola", "holis", "empezar", "ayuda", "opciones", "tus nalgotas"])
const HARD_RESET_COMMAND = normalizeText("tus nalgotas")
const COMENZAMOS_STEP_KEY = process.env.BOT_COMENZAMOS_STEP_KEY || "n2"
const NO_HELP_STAGE = "no_help_stage"
const NO_HELP_ORIGIN = "no_help_origin"
const NO_HELP_AWAITING = "awaiting_yes_no"
const NO_HELP_ONCE = "no_help_once"
const AGENDA_CUSTOM_KEY = "agenda_custom_day"
const AGENDA_CUSTOM_LABEL = "Elegir otro día"
const AGENDA_CUSTOM_PENDING = "agenda_custom_pending"
const AGENDA_CUSTOM_TIME_PENDING = "agenda_custom_time_pending"
const AGENDA_CUSTOM_DATE = "agenda_custom_date"

const ANSWERABLE_TYPES = new Set(["text", "interactive", "button"])

function delay(ms) {
  if (!ms) return Promise.resolve()
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sendBotText(phone, body) {
  const messageId = await sendTextViaWhatsApp(phone, body)
  if (!messageId) return false
  await saveWaOutgoingMessage({
    to: phone,
    body,
    waMessageId: typeof messageId === "string" ? messageId : "",
  })
  return true
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
const NO_RESUMEN = new Set([
  "agenda_slots",
  "misses",
  "attempts",
  "origen",
  NO_HELP_STAGE,
  NO_HELP_ORIGIN,
  NO_HELP_ONCE,
  AGENDA_CUSTOM_PENDING,
  AGENDA_CUSTOM_TIME_PENDING,
  AGENDA_CUSTOM_DATE,
])

function isNoOption(option) {
  if (!option) return false
  const byKey = normalizeText(option.option_key) === "no"
  const title = normalizeText(option.title)
  const byTitle = title === "no"
  return byKey || byTitle
}

async function sendNoHelpPrompt(phone) {
  const body = "Comprendo, ¿hay algo más en lo que te pueda ayudar?"
  const messageId = await sendButtonMessage(phone, body, [
    { id: "si", title: "Si" },
    { id: "no", title: "No" },
  ])
  if (!messageId) return false
  await saveWaOutgoingMessage({
    to: phone,
    body,
    waMessageId: typeof messageId === "string" ? messageId : "",
  })
  return true
}

async function sendRestartBridge(phone) {
  const body =
    "Ahora, si te parece bien me gustaría realizarte solo unas pocas preguntas\nbien sencillas y luego puedo darte curso con un representante humano"
  return sendBotText(phone, body)
}

async function handleNoHelpStage({ phone, text, optionId, state, entry }) {
  const incoming = normalizeText(optionId || text)

  if (incoming === "si") {
    const nextState = { ...state }
    delete nextState[NO_HELP_STAGE]
    delete nextState[NO_HELP_ORIGIN]
    await delay(BOT_CONFIG.delayMs)
    await sendRestartBridge(phone)
    await delay(BOT_CONFIG.stackDelayMs)
    await goTo(phone, COMENZAMOS_STEP_KEY, nextState)
    return true
  }

  if (incoming === "no") {
    const finalText =
      "Comprendo, si necesitas algo más no dudes en decírmelo, mientras voy a avisar a un representante humano para que pronto se ponga en contacto contigo"
    await delay(BOT_CONFIG.delayMs)
    const sent = await sendBotText(phone, finalText)
    if (!sent) return true
    notificaAsesor(phone, state)
    const nextState = { ...state }
    delete nextState[NO_HELP_STAGE]
    delete nextState[NO_HELP_ORIGIN]
    await saveWaBotState(phone, { stepKey: null, state: nextState })
    return true
  }

  // Si escribe una pregunta en lugar de tocar Si/No, la IA responde y el bot retoma flujo.
  let answered = false
  if (BOT_CONFIG.aiFallbackEnabled && text) {
    const ai = await answerOutOfFlowQuestion({ question: text, step: entry, state })
    if (ai) {
      await delay(BOT_CONFIG.delayMs)
      answered = await sendBotText(phone, ai)
    }
  }

  const nextState = { ...state }
  delete nextState[NO_HELP_STAGE]
  delete nextState[NO_HELP_ORIGIN]

  if (answered) await delay(BOT_CONFIG.stackDelayMs)
  else await delay(BOT_CONFIG.delayMs)

  await sendRestartBridge(phone)
  await delay(BOT_CONFIG.stackDelayMs)
  await goTo(phone, COMENZAMOS_STEP_KEY, nextState)
  return true
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

function addDaysIso(dateIso, days) {
  const d = new Date(`${dateIso}T12:00:00`)
  d.setDate(d.getDate() + days)
  return toIsoDate(d)
}

function parseUserDateLocal(text) {
  const raw = String(text || "").trim()
  if (!raw) return null

  const n = normalizeText(raw)
  const now = getArgentinaNow().date
  if (n === "hoy") return toIsoDate(now)
  if (n === "manana") return addDaysIso(toIsoDate(now), 1)
  if (n.includes("pasado manana") || n.includes("pasado maniana")) return addDaysIso(toIsoDate(now), 2)

  const m = raw.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/) || raw.match(/(\d{1,2})-(\d{1,2})(?:-(\d{2,4}))?/) || null
  if (!m) return null
  const day = Number(m[1])
  const month = Number(m[2])
  let year = Number(m[3] || 0)
  if (!year) year = now.getFullYear()
  if (year < 100) year += 2000
  if (!day || !month || month < 1 || month > 12 || day < 1 || day > 31) return null
  const candidate = new Date(year, month - 1, day, 12, 0, 0)
  if (Number.isNaN(candidate.getTime())) return null
  if (candidate.getMonth() !== month - 1 || candidate.getDate() !== day) return null

  // Si vino sin año y ya pasó, asumimos el próximo año.
  if (!m[3]) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
    if (candidate < today) candidate.setFullYear(candidate.getFullYear() + 1)
  }
  return toIsoDate(candidate)
}

async function resolveUserRequestedDate(text) {
  const local = parseUserDateLocal(text)
  if (local) return local
  const nowIso = toIsoDate(getArgentinaNow().date)
  return await extractDateIsoFromText(text, nowIso)
}

function dedupeSlots(slots = []) {
  const map = new Map()
  for (const s of slots) {
    if (!s?.start) continue
    if (!map.has(s.start)) map.set(s.start, s)
  }
  return [...map.values()]
}

function parseUserTimeLocal(text) {
  const raw = String(text || "").trim().toLowerCase()
  if (!raw) return null

  const compact = raw.replace(/\s+/g, "")
  const m = compact.match(/^(\d{1,2})(?:(?:[:h\.])(\d{2}))?$/) || compact.match(/^(\d{1,2})(\d{2})$/)
  if (!m) return null

  const hh = Number(m[1])
  const mm = Number(m[2] || 0)
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null
  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`
}

async function buildAgendaChoices(step) {
  const baseDays = Number(step.calendar_min_business_days ?? 5)
  const first = await getAvailableSlots({ businessDaysAhead: baseDays, count: 1 })
  const second = await getAvailableSlots({ businessDaysAhead: baseDays + 1, count: 1 })

  let slots = dedupeSlots([...(first || []), ...(second || [])])
  if (slots.length < 2) {
    const fallback = await getAvailableSlots({ businessDaysAhead: baseDays, count: 5 })
    slots = dedupeSlots([...(slots || []), ...(fallback || [])]).slice(0, 2)
  }
  return slots
}

async function sendAgendaButtons(phone, body, slots) {
  const buttons = [
    ...slots.map((slot) => ({ id: slot.key, title: slot.label })),
    { id: AGENDA_CUSTOM_KEY, title: AGENDA_CUSTOM_LABEL },
  ]
  const agendado = await sendButtonMessage(phone, body, buttons)
  if (!agendado) return false
  await saveWaOutgoingMessage({ to: phone, body, waMessageId: typeof agendado === "string" ? agendado : "" })
  return true
}

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
  const incoming = normalizeText(text)
  if (!incoming) return false
  if (incoming.includes("motor de ventas")) return true
  return triggers.some((t) => {
    const trigger = normalizeText(t)
    return trigger === incoming || incoming.includes(trigger) || trigger.includes(incoming)
  })
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
    const slots = await buildAgendaChoices(step)
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
    Object.assign(state, {
      agenda_slots: slots,
      [AGENDA_CUSTOM_PENDING]: false,
      [AGENDA_CUSTOM_TIME_PENDING]: false,
      [AGENDA_CUSTOM_DATE]: "",
    })
    const sent = await sendAgendaButtons(phone, body, slots)
    if (!sent) return false
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
 * Si el cliente hace una pregunta fuera de las opciones del nodo actual, la IA
 * responde y luego el bot vuelve a mostrar el mismo paso para continuar el flujo.
 */
async function answerWithAiAndReturn({ phone, question, current, state }) {
  if (!BOT_CONFIG.aiFallbackEnabled) return false
  if (!question || typeof question !== "string") return false

  const ai = await answerOutOfFlowQuestion({ question, step: current, state })
  if (!ai) return false

  await delay(BOT_CONFIG.delayMs)
  const sent = await sendBotText(phone, ai)
  if (!sent) return false

  // Toda consulta fuera del flujo se avisa a los asesores: puede haber quedado
  // mal respondida por la IA y requiere seguimiento humano.
  notificaAsesor(phone, { ...state, pregunta_fuera_de_flujo: question })

  await delay(BOT_CONFIG.stackDelayMs)
  await goTo(phone, current.step_key, state, current)
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

    if (normalizeText(text) === HARD_RESET_COMMAND) {
      await resetWaConversation(phone)
      await delay(BOT_CONFIG.delayMs)
      await goTo(phone, entry.step_key, { contacto: name || "", origen: text })
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

    if (state?.[NO_HELP_STAGE] === NO_HELP_AWAITING) {
      await handleNoHelpStage({ phone, text, optionId, state, entry })
      return
    }

    // Nodo de texto libre: lo que escribió es la respuesta.
    if (current.kind === "input") {
      const key = current.collect_key || current.step_key
      const value = String(text || "").trim()
      const pattern = current.validation ? new RegExp(current.validation) : null
      const valid = value ? (!pattern || pattern.test(value)) : false

      if (!valid) {
        const handledByAi = await answerWithAiAndReturn({ phone, question: text, current, state })
        if (handledByAi) return

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
      if (state?.[AGENDA_CUSTOM_TIME_PENDING]) {
        const pickedTime = parseUserTimeLocal(text)
        const slots = state.agenda_slots || []
        const elegidoPorHora = pickedTime
          ? slots.find((s) => slotParts(s.start).hora === pickedTime)
          : null

        if (!elegidoPorHora) {
          const horas = slots.map((s) => slotParts(s.start).hora).filter(Boolean)
          await delay(BOT_CONFIG.delayMs)
          await sendBotText(
            phone,
            `No encontré ese horario para el día elegido. Los horarios disponibles son: ${horas.join(", ")}. Decime uno con formato HH:MM.`
          )
          await saveWaBotState(phone, { stepKey: current.step_key, state })
          return
        }

        const nextState = {
          ...state,
          [AGENDA_CUSTOM_PENDING]: false,
          [AGENDA_CUSTOM_TIME_PENDING]: false,
          misses: 0,
          horario: elegidoPorHora.start,
          horario_texto: describeSlot(elegidoPorHora.start),
          ...slotParts(elegidoPorHora.start),
          saludo: greetingNowArgentina(),
        }

        try {
          let nombre = state.nombre || state.contacto || state.name || name || ""
          const email = state.email || state.correo || state.mail || ""
          const telefono = phone || state.telefono || state.celular || ""
          if (!nombre || nombre.trim().length < 2) nombre = "Contacto"

          if (email) {
            const bookRes = await bookSlot({
              startIso: elegidoPorHora.start,
              name: nombre,
              email,
              phone: telefono,
            })
            if (bookRes.ok) {
              nextState.calendly_reservado = true
              nextState.calendly_event = bookRes.data?.resource?.event || bookRes.data?.resource?.uri || null
            } else {
              console.warn("[Agenda] No se pudo reservar automáticamente:", bookRes.error, bookRes.details || "")
              nextState.calendly_reservado = false
              nextState.calendly_error = bookRes.error
            }
          } else {
            nextState.calendly_reservado = false
            nextState.calendly_faltantes = true
          }
        } catch (err) {
          console.error("[Agenda] Excepción al reservar:", err)
          nextState.calendly_reservado = false
        }

        await delay(BOT_CONFIG.delayMs)
        await goTo(phone, current.agenda_booked_step_key || null, nextState)
        return
      }

      if (state?.[AGENDA_CUSTOM_PENDING]) {
        const dateIso = await resolveUserRequestedDate(text)
        if (!dateIso) {
          await delay(BOT_CONFIG.delayMs)
          await sendBotText(phone, "No pude identificar la fecha. ¿Podrías decirla con formato DD/MM o escribiendo, por ejemplo, mañana?")
          await saveWaBotState(phone, { stepKey: current.step_key, state })
          return
        }

        const customSlots = await getAvailableSlotsForDate(dateIso, { count: 8 })
        if (!customSlots || !customSlots.length) {
          const endState = { ...state, [AGENDA_CUSTOM_PENDING]: false, fecha_solicitada: dateIso }
          await delay(BOT_CONFIG.delayMs)
          const sent = await sendBotText(
            phone,
            "No veo disponibilidad para ese día. Un representante humano se comunicará contigo para coordinar ese horario."
          )
          if (sent) notificaAsesor(phone, endState)
          await saveWaBotState(phone, { stepKey: null, state: endState })
          return
        }

        const nextState = {
          ...state,
          [AGENDA_CUSTOM_PENDING]: true,
          [AGENDA_CUSTOM_TIME_PENDING]: true,
          [AGENDA_CUSTOM_DATE]: dateIso,
          misses: 0,
          agenda_slots: customSlots,
          fecha_solicitada: dateIso,
        }
        const horas = customSlots.map((s) => slotParts(s.start).hora).filter(Boolean)
        await delay(BOT_CONFIG.delayMs)
        const sent = await sendBotText(
          phone,
          `Perfecto, para ese día tengo disponibilidad a las: ${horas.join(", ")}. ¿Qué horario preferís? Escribilo en formato HH:MM.`
        )
        if (!sent) return
        await saveWaBotState(phone, { stepKey: current.step_key, state: nextState })
        return
      }

      const slots = state.agenda_slots || []
      const choseCustom = optionId === AGENDA_CUSTOM_KEY || normalizeText(text) === normalizeText(AGENDA_CUSTOM_LABEL)
      if (choseCustom) {
        const nextState = {
          ...state,
          [AGENDA_CUSTOM_PENDING]: true,
          [AGENDA_CUSTOM_TIME_PENDING]: false,
          [AGENDA_CUSTOM_DATE]: "",
          misses: 0,
        }
        await delay(BOT_CONFIG.delayMs)
        await sendBotText(phone, "¿Qué día te gustaría agendar? Podés escribirlo como DD/MM o, por ejemplo, mañana.")
        await saveWaBotState(phone, { stepKey: current.step_key, state: nextState })
        return
      }

      const elegido = slots.find((s) => s.key === optionId) || slots.find((s) => normalizeText(s.label) === normalizeText(text))
      if (!elegido) {
        const handledByAi = await answerWithAiAndReturn({ phone, question: text, current, state })
        if (handledByAi) return

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
        saludo: greetingNowArgentina(),
      }

      // Intentar reservar automáticamente en Calendly
      try {
        let nombre = state.nombre || state.contacto || state.name || name || ""
        const email = state.email || state.correo || state.mail || ""
        const telefono = phone || state.telefono || state.celular || ""
        if (!nombre || nombre.trim().length < 2) nombre = "Contacto"

        if (email) {
          const bookRes = await bookSlot({
            startIso: elegido.start,
            name: nombre,
            email,
            phone: telefono,
          })
          if (bookRes.ok) {
            nextState.calendly_reservado = true
            nextState.calendly_event = bookRes.data?.resource?.event || bookRes.data?.resource?.uri || null
          } else {
            console.warn("[Agenda] No se pudo reservar automáticamente:", bookRes.error, bookRes.details || "")
            nextState.calendly_reservado = false
            nextState.calendly_error = bookRes.error
          }
        } else {
          console.warn("[Agenda] Faltan nombre/email para reservar en Calendly", { tieneNombre: !!nombre, tieneEmail: !!email })
          nextState.calendly_reservado = false
          nextState.calendly_faltantes = true
        }
      } catch (err) {
        console.error("[Agenda] Excepción al reservar:", err)
        nextState.calendly_reservado = false
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
      const handledByAi = await answerWithAiAndReturn({ phone, question: text, current, state })
      if (handledByAi) return

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

    if (isNoOption(option)) {
      // Evitar loop: si ya mostramos "¿hay algo más...?" y vuelve a tocar No
      // en "¿Comenzamos?", dejamos seguir al cierre original del flujo.
      if (current.step_key === COMENZAMOS_STEP_KEY && state?.[NO_HELP_ONCE]) {
        delete nextState[NO_HELP_ONCE]
        await delay(BOT_CONFIG.delayMs)
        await goTo(phone, option.next_step_key, nextState, target)
        return
      }

      nextState[NO_HELP_STAGE] = NO_HELP_AWAITING
      nextState[NO_HELP_ORIGIN] = current.step_key
      nextState[NO_HELP_ONCE] = true
      await delay(BOT_CONFIG.delayMs)
      const prompted = await sendNoHelpPrompt(phone)
      if (!prompted) return
      await saveWaBotState(phone, { stepKey: current.step_key, state: nextState })
      return
    }

    await delay(BOT_CONFIG.delayMs)
    await goTo(phone, option.next_step_key, nextState, target)
  })
}
