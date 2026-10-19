import { NextResponse } from "next/server"
import {
  uploadWhatsAppMedia,
  sendMediaViaWhatsApp,
  mediaKindForMime,
} from "@/lib/tools/whatsapp-cloud"
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

export async function POST(req) {
  try {
    if (!(await requireAdmin(req))) {
      return unauthorizedResponse()
    }

    const form = await req.formData()
    const to = form.get("to")
    const file = form.get("file")
    const caption = String(form.get("caption") || "").trim()

    if (!to || !file || typeof file === "string") {
      return NextResponse.json({ error: "El destinatario y el archivo son requeridos" }, { status: 400 })
    }

    const kind = mediaKindForMime(file.type, file.name)
    if (file.size > (MAX_BYTES[kind] || MAX_BYTES.document)) {
      return NextResponse.json(
        { error: `El archivo supera el máximo permitido para ${kind} (${Math.round((MAX_BYTES[kind] || MAX_BYTES.document) / (1024 * 1024))} MB).` },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name || "archivo"

    const metaMediaId = await uploadWhatsAppMedia(buffer, file.type, filename)
    if (!metaMediaId) {
      return NextResponse.json({ error: "No se pudo subir el archivo a WhatsApp." }, { status: 502 })
    }

    const sentId = await sendMediaViaWhatsApp(to, {
      kind,
      mediaId: metaMediaId,
      caption,
      filename,
    })
    if (!sentId) {
      return NextResponse.json(
        { error: "No se pudo enviar. Solo podés responder libremente dentro de las 24 hs desde el último mensaje del cliente. Fuera de esa ventana, la API solo acepta plantillas." },
        { status: 400 }
      )
    }

    const storedId = await saveWaMedia({ mimeType: file.type, filename, buffer })
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
