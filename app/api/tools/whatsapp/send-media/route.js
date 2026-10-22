import { NextResponse } from "next/server"
import {
  uploadWhatsAppMedia,
  sendMediaViaWhatsApp,
  mediaKindForMime,
} from "@/lib/tools/whatsapp-cloud"
import { convertToOggOpus } from "@/lib/tools/audio-convert"
import { saveWaMedia, saveWaOutgoingMessage, getLastInboundAt } from "@/lib/tools/db"
import { requireAdmin, unauthorizedResponse } from "@/lib/auth/server"

// Límites de la API de WhatsApp Cloud.
const MAX_BYTES = {
  image: 5 * 1024 * 1024,
  video: 16 * 1024 * 1024,
  audio: 16 * 1024 * 1024,
  document: 100 * 1024 * 1024,
}

const PLACEHOLDER = {
  image: "[📷 Imagen]",
  video: "[🎬 Video]",
  audio: "[🎤 Audio]",
  document: "[📄 Documento]",
}

const ACCEPTED_AUDIO_MIMES = new Set(["audio/ogg", "audio/mpeg", "audio/mp4", "audio/aac", "audio/amr"])
const ALLOWED_KINDS = new Set(["image", "video", "audio", "document"])

export async function POST(req) {
  try {
    if (!(await requireAdmin(req))) {
      return unauthorizedResponse()
    }

    const form = await req.formData()
    const to = form.get("to")
    const file = form.get("file")
    const voice = String(form.get("voice") || "") === "true"
    const requestedKind = String(form.get("kind") || "").trim().toLowerCase()
    const caption = String(form.get("caption") || "").trim()

    if (!to || !file || typeof file === "string") {
      return NextResponse.json({ error: "El destinatario y el archivo son requeridos" }, { status: 400 })
    }
    if (caption.length > 1024) {
      return NextResponse.json({ error: "El texto no puede superar los 1024 caracteres." }, { status: 400 })
    }

    const lastInbound = await getLastInboundAt(to)
    if (!lastInbound || Date.now() - new Date(lastInbound).getTime() >= 24 * 60 * 60 * 1000) {
      return NextResponse.json(
        { error: "La ventana de 24 h está cerrada. El cliente debe escribir primero para poder enviar archivos." },
        { status: 400 }
      )
    }

    // Permite forzar "document" (p. ej. videos de más de 16 MB).
    let kind = voice
      ? "audio"
      : ALLOWED_KINDS.has(requestedKind)
        ? requestedKind
        : mediaKindForMime(file.type, file.name)
    // Meta rechaza MIME con parámetros (p. ej. "audio/ogg; codecs=opus").
    let mimeType = String(file.type || "").split(";")[0].trim().toLowerCase()
    let filename = file.name || "archivo"
    let buffer = Buffer.from(await file.arrayBuffer())

    // Las notas de voz de WhatsApp tienen que ser OGG/Opus reales. Aunque el
    // navegador entregue "audio/ogg", el contenedor puede no ser compatible, así
    // que toda nota de voz se reconvierte con ffmpeg para garantizar el formato.
    if (kind === "audio") {
      const needsConvert = voice || !ACCEPTED_AUDIO_MIMES.has(mimeType)
      if (needsConvert) {
        try {
          buffer = await convertToOggOpus(buffer)
          mimeType = "audio/ogg"
          filename = `${filename.replace(/\.[^.]+$/, "") || "audio"}.ogg`
        } catch (err) {
          console.error("[WhatsApp media] Error convirtiendo audio:", err.message)
          return NextResponse.json(
            { error: "No se pudo convertir el audio a un formato válido. Verificá que ffmpeg esté instalado en el servidor." },
            { status: 500 }
          )
        }
      }
    }

    if (buffer.length > (MAX_BYTES[kind] || MAX_BYTES.document)) {
      return NextResponse.json(
        { error: `El archivo supera el máximo permitido para ${kind} (${Math.round((MAX_BYTES[kind] || MAX_BYTES.document) / (1024 * 1024))} MB).` },
        { status: 400 }
      )
    }

    const metaMediaId = await uploadWhatsAppMedia(buffer, mimeType, filename)
    if (!metaMediaId) {
      return NextResponse.json({ error: "No se pudo subir el archivo a WhatsApp." }, { status: 502 })
    }

    const sentId = await sendMediaViaWhatsApp(to, {
      kind,
      mediaId: metaMediaId,
      caption,
      filename,
      voice: voice && kind === "audio",
    })
    if (!sentId) {
      return NextResponse.json(
        { error: "No se pudo enviar. Solo podés responder libremente dentro de las 24 hs desde el último mensaje del cliente. Fuera de esa ventana, la API solo acepta plantillas." },
        { status: 400 }
      )
    }

    const storedId = await saveWaMedia({ mimeType, filename, buffer })
    await saveWaOutgoingMessage({
      to,
      body: caption || PLACEHOLDER[kind] || "[adjunto]",
      waMessageId: typeof sentId === "string" ? sentId : "",
      type: kind,
      waMediaId: storedId,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al enviar el archivo" }, { status: 500 })
  }
}
