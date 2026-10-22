import { NextResponse } from "next/server"
import {
  uploadWhatsAppMedia,
  sendMediaViaWhatsApp,
  mediaKindForMime,
} from "@/lib/tools/whatsapp-cloud"
import { convertToOggOpus } from "@/lib/tools/audio-convert"
import { saveWaMedia, saveWaOutgoingMessage } from "@/lib/tools/db"
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

export async function POST(req) {
  try {
    if (!(await requireAdmin(req))) {
      return unauthorizedResponse()
    }

    const form = await req.formData()
    const to = form.get("to")
    const file = form.get("file")
    const voice = String(form.get("voice") || "") === "true"
    const caption = String(form.get("caption") || "").trim()

    if (!to || !file || typeof file === "string") {
      return NextResponse.json({ error: "El destinatario y el archivo son requeridos" }, { status: 400 })
    }
    if (caption.length > 1024) {
      return NextResponse.json({ error: "El texto no puede superar los 1024 caracteres." }, { status: 400 })
    }

    let kind = voice ? "audio" : mediaKindForMime(file.type, file.name)
    let mimeType = file.type || ""
    let filename = file.name || "archivo"
    let buffer = Buffer.from(await file.arrayBuffer())

    // Las notas de voz de WhatsApp tienen que ir en OGG/Opus. Chrome graba webm,
    // así que lo convertimos en el servidor.
    if (kind === "audio") {
      const baseMime = String(file.type || "").split(";")[0].trim().toLowerCase()
      // Las notas de voz solo aceptan OGG/Opus; los audios comunes aceptan
      // ogg/mpeg/mp4/aac/amr. Si no cumple, convertimos con ffmpeg.
      const needsConvert = !ACCEPTED_AUDIO_MIMES.has(baseMime) || (voice && baseMime !== "audio/ogg")
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
