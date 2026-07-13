import { NextResponse } from "next/server"
import { checkUserSubscribed, setUserSubscribed, getUserSubscriptions, getUserPhone, getUserName, saveUserPhone } from "@/lib/tools/db"
import { sendWelcomeMessage } from "@/lib/tools/whatsapp-cloud"
import sendGrid from "@sendgrid/mail"

sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")
    const email = searchParams.get("email")
    const list = searchParams.get("list")
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }
    if (list === "true") {
      const subscriptions = await getUserSubscriptions(uid)
      return NextResponse.json({ subscriptions })
    }
    const subscribed = await checkUserSubscribed(uid, email)
    return NextResponse.json({ subscribed })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al verificar suscripción" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { uid, email, preapproval_id } = body
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }
    await setUserSubscribed(uid, email || "", preapproval_id)

    if (email) {
      try {
        await sendGrid.send({
          from: {
            name: "Grupo Start",
            email: process.env.SENDGRID_FROM_EMAIL,
          },
          to: email,
          subject: "¡Suscripción activada — GrupoStart Tools!",
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
            <h2 style="color:#0051FF">¡Gracias por suscribirte!</h2>
            <p>Tu suscripción al <strong>Sistema de Seguimiento de Leads</strong> de GrupoStart está activa.</p>
            <p>Ya podés empezar a gestionar tus contactos y hacer seguimiento profesional.</p>
            <div style="background:#f5f7ff;border-radius:12px;padding:20px;margin:20px 0">
              <p style="margin:0 0 8px"><strong>Accedé ahora:</strong></p>
              <a href="https://grupostart.com.ar/tools" style="display:inline-block;background:#0051FF;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Ir a Tools</a>
            </div>
            <p style="color:#666;font-size:13px">El pago de $2.500 ARS/mes se debitará automáticamente. Podés cancelar cuando quieras desde MercadoPago.</p>
          </div>`,
        })
      } catch (_) {}
    }

    const phone = await getUserPhone(uid)
    if (phone) {
      const name = await getUserName(uid) || "Usuario"
      await sendWelcomeMessage(phone, name)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al actualizar suscripción" }, { status: 500 })
  }
}
