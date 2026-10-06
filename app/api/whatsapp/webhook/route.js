import { NextResponse } from "next/server"
import { saveWaIncomingMessage, updateWaMessageStatus } from "@/lib/tools/db"
import { handleBotMessage } from "@/lib/bot/engine"

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "grupostart_webhook_2026"

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
  switch (type) {
    case "text":
      return { type, body: msg.text?.body || "", optionId: "" }
    case "image":
      return { type, body: msg.image?.caption || "[📷 Imagen]", optionId: "" }
    case "video":
      return { type, body: msg.video?.caption || "[🎬 Video]", optionId: "" }
    case "audio":
      return { type, body: msg.audio?.caption || "[🎤 Audio]", optionId: "" }
    case "voice":
      return { type, body: "[🎤 Nota de voz]", optionId: "" }
    case "document":
      return { type, body: msg.document?.filename || "[📄 Documento]", optionId: "" }
    case "sticker":
      return { type, body: "[✨ Sticker]", optionId: "" }
    case "location":
      return { type, body: "[📍 Ubicación]", optionId: "" }
    case "contacts":
      return { type, body: "[👤 Contacto]", optionId: "" }
    case "button":
      return { type, body: msg.button?.text || "[🔘 Botón]", optionId: msg.button?.payload || "" }
    case "interactive": {
      // El id del botón lo genera el bot (option_key), así que el match es exacto.
      const reply = msg.interactive?.button_reply || msg.interactive?.list_reply
      return { type, body: reply?.title || "[🔘 Opción]", optionId: reply?.id || "" }
    }
    default:
      return { type, body: `[${type}]`, optionId: "" }
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    let saved = 0

    for (const entry of body?.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value || {}

        for (const msg of value.messages || []) {
          const { type, body: text, optionId } = describeMessage(msg)
          const name = value.contacts?.[0]?.profile?.name || ""
          const result = await saveWaIncomingMessage({
            from: msg.from,
            name,
            body: text,
            type,
            waMessageId: msg.id,
          })
          // isNew filtra los reintentos de Meta: el mismo mensaje no se procesa dos veces.
          if (result?.isNew) {
            saved++
            try {
              await handleBotMessage({ phone: result.phone, name, text, type, optionId })
            } catch (err) {
              console.error("[WhatsApp Webhook] Error en el bot:", err)
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
