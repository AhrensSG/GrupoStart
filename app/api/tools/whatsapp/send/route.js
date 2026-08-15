import { NextResponse } from "next/server"
import { sendTextViaWhatsApp } from "@/lib/tools/whatsapp-cloud"
import { saveWaOutgoingMessage } from "@/lib/tools/db"
import { requireAdmin, unauthorizedResponse } from "@/lib/auth/server"

export async function POST(req) {
  try {
    if (!(await requireAdmin(req))) {
      return unauthorizedResponse()
    }
    const { to, body } = await req.json()
    if (!to || !body || typeof body !== "string" || !body.trim()) {
      return NextResponse.json({ error: "El destinatario y el mensaje son requeridos" }, { status: 400 })
    }
    if (body.length > 4096) {
      return NextResponse.json({ error: "El mensaje no puede superar los 4096 caracteres" }, { status: 400 })
    }

    const waMessageId = await sendTextViaWhatsApp(to, body.trim())
    if (!waMessageId) {
      return NextResponse.json(
        { error: "No se pudo enviar. Solo podés responder libremente dentro de las 24 hs desde el último mensaje del cliente. Fuera de esa ventana, la API solo acepta plantillas." },
        { status: 400 }
      )
    }

    await saveWaOutgoingMessage({
      to,
      body: body.trim(),
      waMessageId: typeof waMessageId === "string" ? waMessageId : "",
      source: "manual",
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al enviar mensaje" }, { status: 500 })
  }
}
