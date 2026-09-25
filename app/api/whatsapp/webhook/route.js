import { NextResponse } from "next/server"
import {
  saveWaIncomingMessage,
  updateWaMessageStatus,
  saveWaOutgoingMessage,
  getWaMessages,
  getWaAiPaused,
  getWaAiState,
  saveWaAiState,
} from "@/lib/tools/db"
import { sendTextViaWhatsApp, sendButtonMessage, sendListMessage, sendMeetingNotification, sendHandoffNotification } from "@/lib/tools/whatsapp-cloud"
import { sendVideoMessage } from "@/lib/tools/whatsapp-media"
import { generateReply } from "@/lib/ai/assistant"
import { getFlowUi, getNextStage, normalizeProfileUpdates, normalizeStage } from "@/lib/ai/flow"
import { AI_CONFIG } from "@/lib/ai/config"
import {
  CIERRE_SI,
  DESPEDIDA,
  ETAPAS_TERMINALES,
  MENSAJE_DERIVACION,
  NUMEROS_DERIVACION,
  PRESENTACION_GRUPO_START,
  PREGUNTA_COMENZAMOS,
  VIDEO_PATH,
  matchPreguntaMotorVentas,
} from "@/lib/ai/motor-ventas"

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "grupostart_webhook_2026"

// Teléfonos que ya tienen una respuesta IA en curso (evita respuestas superpuestas).
const inFlight = new Set()

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 })
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 })
}

function describeMessage(msg) {
  const type = msg?.type || "text"
  const mediaUrl = ""
  switch (type) {
    case "text":
      return { type, body: msg.text?.body || "", mediaUrl }
    case "image":
      return { type, body: msg.image?.caption || "[📷 Imagen]", mediaUrl }
    case "video":
      return { type, body: msg.video?.caption || "[🎬 Video]", mediaUrl }
    case "audio":
      return { type, body: msg.audio?.caption || "[🎤 Audio]", mediaUrl }
    case "voice":
      return { type, body: "[🎤 Nota de voz]", mediaUrl }
    case "document":
      return { type, body: msg.document?.filename || "[📄 Documento]", mediaUrl }
    case "sticker":
      return { type, body: "[✨ Sticker]", mediaUrl }
    case "location":
      return { type, body: "[📍 Ubicación]", mediaUrl }
    case "contacts":
      return { type, body: "[👤 Contacto]", mediaUrl }
    case "button":
      return { type, body: msg.button?.text || "[🔘 Botón]", mediaUrl }
    case "interactive": {
      const reply = msg.interactive?.button_reply || msg.interactive?.list_reply
      return { type, body: reply?.title || "[🔘 Opción]", mediaUrl }
    }
    default:
      return { type, body: `[${type}]`, mediaUrl }
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const entries = body?.entry || []
    let saved = 0

    for (const entry of entries) {
      for (const change of entry.changes || []) {
        const value = change.value || {}

        for (const msg of value.messages || []) {
          const { type, body: text, mediaUrl } = describeMessage(msg)
          const name = value.contacts?.[0]?.profile?.name || ""
          const result = await saveWaIncomingMessage({
            from: msg.from,
            name,
            body: text,
            type,
            mediaUrl,
            waMessageId: msg.id,
          })
          if (result) saved++

          if (result?.isNew && AI_CONFIG.enabled && (type === "text" || type === "interactive")) {
            const digits = result.phone
            const isAdminNumber = AI_CONFIG.adminPhone && digits === AI_CONFIG.adminPhone
            if (!isAdminNumber) {
              // Fire-and-forget: respondemos por atrás sin bloquear el webhook.
              void handleAiReply({ phone: digits, name })
            }
          }
        }

        for (const status of value.statuses || []) {
          if (status?.id && status?.status) {
            await updateWaMessageStatus(status.id, status.status)
          }
        }
      }
    }

    return NextResponse.json({ success: true, saved })
  } catch (err) {
    console.error("[WhatsApp Webhook] Error:", err)
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }
}

function humanDelay() {
  const ms = AI_CONFIG.delayMinMs + Math.random() * (AI_CONFIG.delayMaxMs - AI_CONFIG.delayMinMs)
  return new Promise((r) => setTimeout(r, ms))
}

async function botSay(phone, body) {
  if (!body) return false
  const id = await sendTextViaWhatsApp(phone, body)
  if (!id) return false
  await saveWaOutgoingMessage({ to: phone, body, waMessageId: String(id), status: "sent", source: "ai", isBot: true })
  return true
}

async function saveStage(phone, state, patch) {
  await saveWaAiState(phone, { ...state, ...patch, updatedAt: new Date().toISOString() })
}

async function sendComenzamos(phone) {
  const ui = getFlowUi("comenzamos")
  const id = await sendButtonMessage(phone, PREGUNTA_COMENZAMOS, ui.options)
  if (!id) return false
  await saveWaOutgoingMessage({ to: phone, body: PREGUNTA_COMENZAMOS, waMessageId: String(id), status: "sent", source: "ai", isBot: true })
  return true
}

// El video es un extra: si falla (no está en el servidor, supera 16 MB, la API
// rechaza) el flujo sigue igual con el texto de la presentación.
async function botSendVideo(phone) {
  if (!VIDEO_PATH) return false
  try {
    const id = await sendVideoMessage(phone, { filePath: VIDEO_PATH })
    if (!id) return false
    await saveWaOutgoingMessage({ to: phone, body: "[🎬 Video de presentación]", waMessageId: String(id), status: "sent", source: "ai", isBot: true })
    return true
  } catch (err) {
    console.error("[WhatsApp AI] No se pudo enviar el video:", err)
    return false
  }
}

async function notificarDerivacion(phone, consulta) {
  if (!NUMEROS_DERIVACION.length) return
  for (const destino of NUMEROS_DERIVACION) {
    try {
      const ok = await sendHandoffNotification(destino, { numero: phone, consulta })
      if (!ok) console.error("[WhatsApp AI] No se pudo notificar la derivación a", destino)
    } catch (err) {
      console.error("[WhatsApp AI] Error al notificar la derivación a", destino, err)
    }
  }
}

async function handleAiReply({ phone, name }) {
  if (inFlight.has(phone)) return
  inFlight.add(phone)
  try {
    const pausedUntil = await getWaAiPaused(phone)
    if (pausedUntil && new Date(pausedUntil).getTime() > Date.now()) return

    let history = await getWaMessages(phone, 500)
    let state = await getWaAiState(phone)
    const ultimo = () => [...history].reverse().find((m) => m?.direction === "in")?.body || ""
    // Una conversación cerrada se reinicia: el cliente puede volver a preguntar.
    const stage = ETAPAS_TERMINALES.includes(state.stage) ? "motor_ventas" : normalizeStage(state.stage)

    // Cliente parado en "¿Comenzamos?": se resuelve sin llamar a la IA.
    if (stage === "comenzamos") {
      const next = getNextStage("comenzamos", ultimo())
      await humanDelay()
      if (next === "despedida") {
        await botSay(phone, DESPEDIDA)
        await saveStage(phone, state, { stage: "despedida" })
        return
      }
      if (next === "fin") {
        await botSay(phone, CIERRE_SI)
        await saveStage(phone, state, { stage: "fin" })
        return
      }
      // No entendió: se vuelve a preguntar.
      await sendComenzamos(phone)
      return
    }

    // Es una de las 4 preguntas predefinidas: primero la presentación, sin esperar.
    const esPreguntaPredefinida = matchPreguntaMotorVentas(ultimo()) >= 0
    if (esPreguntaPredefinida) {
      await botSay(phone, PRESENTACION_GRUPO_START)
      await botSendVideo(phone)
      history = await getWaMessages(phone, 500)
    }

    // Cualquier otra consulta pasa por la IA.
    await humanDelay()
    const { reply, stageUpdate, profileUpdates, action, mode, outcome, ui } = await generateReply({
      history,
      customerName: name,
      state: { ...state, stage: "motor_ventas" },
    })

    if (mode === "motor_ventas") {
      if (action?.type === "derivacion") {
        await botSay(phone, MENSAJE_DERIVACION)
        await saveStage(phone, state, { stage: "derivado", profile: { ...normalizeProfileUpdates(state.profile), ...profileUpdates } })
        await notificarDerivacion(phone, ultimo())
        return
      }
      if (reply) await botSay(phone, reply)
      await sendComenzamos(phone)
      await saveStage(phone, state, { stage: stageUpdate || "comenzamos", profile: { ...normalizeProfileUpdates(state.profile), ...profileUpdates } })
      return
    }

    if (!reply) return

    const waMessageId = ui?.type === "buttons"
      ? await sendButtonMessage(phone, reply, ui.options)
      : ui?.type === "list"
        ? await sendListMessage(phone, reply, ui.buttonText, ui.options)
        : await sendTextViaWhatsApp(phone, reply)
    if (!waMessageId) return

    await saveWaOutgoingMessage({
      to: phone,
      body: reply,
      waMessageId: String(waMessageId),
      status: "sent",
      source: "ai",
      isBot: true,
    })

    const nextState = {
      ...state,
      stage: stageUpdate || state.stage || "motor_ventas",
      profile: { ...normalizeProfileUpdates(state.profile), ...profileUpdates },
      outcome: outcome || state.outcome || null,
      updatedAt: new Date().toISOString(),
    }
    if (action?.type === "meeting_request") {
      nextState.proposedMeeting = { when: action.when, mode: action.mode }
      nextState.outcome = "reunion_propuesta"
    }
    if (action?.type === "handoff") nextState.handoff = { reason: action.reason, at: new Date().toISOString() }
    await saveWaAiState(phone, nextState)

    if (action?.type === "meeting_request" && AI_CONFIG.adminPhone) {
      const ok = await sendMeetingNotification(AI_CONFIG.adminPhone, {
        name: nextState.profile?.nombre || name,
        when: action.when,
        mode: action.mode,
        summary: nextState.profile?.objetivo || nextState.profile?.objetivo_marketing || nextState.profile?.negocio || "",
        kind: state.proposedMeeting ? "modificada" : "nueva",
      })
      if (!ok) {
        console.error("[WhatsApp AI] No se pudo notificar al admin sobre la reunión")
      }
    }
    if (action?.type === "handoff" && AI_CONFIG.adminPhone) {
      await sendMeetingNotification(AI_CONFIG.adminPhone, { name: nextState.profile?.nombre || name, when: `Derivar a humano: ${action.reason}`, mode: "-", summary: nextState.profile?.negocio || "" })
    }
  } catch (err) {
    console.error("[WhatsApp AI] Error al responder:", err)
  } finally {
    inFlight.delete(phone)
  }
}
