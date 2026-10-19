import { NextResponse } from "next/server"
import { requireAdmin, unauthorizedResponse } from "@/lib/auth/server"
import { startBotFlowForPhone } from "@/lib/bot/engine"

export async function POST(req) {
  try {
    if (!(await requireAdmin(req))) {
      return unauthorizedResponse()
    }

    const body = await req.json().catch(() => ({}))
    const phone = String(body?.phone || "").replace(/\D/g, "")
    const name = String(body?.name || "").trim()
    const fromStepKey = body?.fromStepKey ? String(body.fromStepKey) : undefined
    const reset = body?.reset !== false

    if (!phone) {
      return NextResponse.json({ error: "El número es requerido" }, { status: 400 })
    }

    const result = await startBotFlowForPhone({ phone, name, fromStepKey, reset })
    if (!result?.ok) {
      const reason = result?.reason || "UNKNOWN"
      if (reason === "INVALID_PHONE") {
        return NextResponse.json({ error: "Número inválido" }, { status: 400 })
      }
      if (reason === "BOT_DISABLED") {
        return NextResponse.json({ error: "El bot está desactivado" }, { status: 409 })
      }
      if (reason === "ADMIN_PHONE_BLOCKED") {
        return NextResponse.json({ error: "No se puede iniciar flujo sobre el número admin" }, { status: 400 })
      }
      if (reason === "ENTRY_NOT_FOUND") {
        return NextResponse.json({ error: "No hay nodo de entrada configurado" }, { status: 500 })
      }
      if (reason === "SEND_FAILED") {
        return NextResponse.json({ error: "No se pudo enviar el mensaje inicial" }, { status: 400 })
      }
      return NextResponse.json({ error: "No se pudo iniciar el flujo" }, { status: 500 })
    }

    return NextResponse.json({ success: true, phone: result.phone, stepKey: result.stepKey })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al iniciar flujo" }, { status: 500 })
  }
}
