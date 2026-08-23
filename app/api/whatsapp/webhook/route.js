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
import { sendTextViaWhatsApp, sendButtonMessage, sendListMessage, sendMeetingNotification } from "@/lib/tools/whatsapp-cloud"
import { generateReply } from "@/lib/ai/assistant"
import { AI_CONFIG } from "@/lib/ai/config"

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
      return { type, body: reply?.title || "[🔘 Opción]", mediaUrl, rawInteractive: reply }
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

async function handleAiReply({ phone, name }) {
  if (inFlight.has(phone)) return
  inFlight.add(phone)
  try {
    const pausedUntil = await getWaAiPaused(phone)
    if (pausedUntil && new Date(pausedUntil).getTime() > Date.now()) return

    // Simula el tiempo de respuesta de una persona.
    const ms = AI_CONFIG.delayMinMs + Math.random() * (AI_CONFIG.delayMaxMs - AI_CONFIG.delayMinMs)
    await new Promise((r) => setTimeout(r, ms))

    const [history, state] = await Promise.all([
      getWaMessages(phone, AI_CONFIG.historyLimit),
      getWaAiState(phone),
    ])
    const { reply, stageUpdate, profileUpdates, action, outcome, ui } = await generateReply({
      history,
      customerName: name,
      state,
    })

    if (!reply) return

    let waMessageId
    if (ui?.type === "buttons") {
      waMessageId = await sendButtonMessage(phone, reply, ui.options)
    } else if (ui?.type === "list") {
      waMessageId = await sendListMessage(phone, reply, ui.buttonText, ui.options)
    } else {
      waMessageId = await sendTextViaWhatsApp(phone, reply)
    }
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
      profile: { ...(state.profile || {}), ...profileUpdates },
      updatedAt: new Date().toISOString(),
    }
    if (stageUpdate) nextState.stage = stageUpdate
    if (outcome) nextState.outcome = outcome
    let meetingKind = null
    if (action?.type === "meeting_request") {
      const prev = state.proposedMeeting
      if (!prev) meetingKind = "nueva"
      else if (prev.when !== action.when || prev.mode !== action.mode) meetingKind = "modificada"
      nextState.proposedMeeting = { when: action.when, mode: action.mode }
      nextState.outcome = outcome || "reunion_propuesta"
    }
    if (action?.type === "handoff") {
      nextState.handoff = { reason: action.reason, at: new Date().toISOString() }
      nextState.outcome = outcome || "interesado"
    }
    await saveWaAiState(phone, nextState)

    if (meetingKind && AI_CONFIG.adminPhone) {
      const ok = await sendMeetingNotification(AI_CONFIG.adminPhone, {
        name: nextState.profile?.nombre || name,
        when: action.when,
        mode: action.mode,
        summary: nextState.profile?.objetivo || nextState.profile?.negocio || "",
        kind: meetingKind,
      })
      if (!ok) {
        console.error("[WhatsApp AI] No se pudo notificar al admin sobre la reunión")
      }
    }

    if (action?.type === "handoff" && AI_CONFIG.adminPhone) {
      const ok = await sendMeetingNotification(AI_CONFIG.adminPhone, {
        name: nextState.profile?.nombre || name,
        when: `Derivar a humano: ${action.reason}`,
        mode: "-",
        summary: nextState.profile?.negocio || "",
      })
      if (!ok) {
        console.error("[WhatsApp AI] No se pudo notificar al admin sobre el handoff")
      }
    }
  } catch (err) {
    console.error("[WhatsApp AI] Error al responder:", err)
  } finally {
    inFlight.delete(phone)
  }
}
