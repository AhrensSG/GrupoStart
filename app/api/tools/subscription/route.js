import { NextResponse } from "next/server"
import { checkUserSubscribed, setUserSubscribed, getUserSubscriptions, getUserPhone, getUserName } from "@/lib/tools/db"
import { sendWelcomeMessage } from "@/lib/tools/whatsapp-cloud"
import { sendMail } from "@/app/api/routes/send_mail/sendMail"
import { preApproval } from "@/payment/mp"
import { requireUser, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const email = authUser.email || ""
    const { searchParams } = new URL(req.url)
    const list = searchParams.get("list")
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
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const email = authUser.email || ""
    const body = await req.json()
    const { preapproval_id } = body
    if (!preapproval_id) {
      return NextResponse.json({ error: "preapproval_id es requerido" }, { status: 400 })
    }

    const alreadySubscribed = await checkUserSubscribed(uid, "")
    if (alreadySubscribed) {
      return NextResponse.json({ success: true, message: "Ya estás suscripto" })
    }

    let mpPreapproval
    try {
      mpPreapproval = await preApproval.get({ id: preapproval_id })
    } catch (mpErr) {
      console.error("Error verificando preapproval en MP:", mpErr)
      return NextResponse.json({ success: false, message: "No se pudo verificar el pago en Mercado Pago. Intentalo más tarde." })
    }
    if (!mpPreapproval || mpPreapproval.external_reference !== uid) {
      return NextResponse.json({ success: false, message: "La suscripción no corresponde a tu cuenta." })
    }
    const mpStatus = mpPreapproval?.status
    if (mpStatus !== "authorized" && mpStatus !== "approved") {
      return NextResponse.json({ success: false, message: `La suscripción en Mercado Pago no está activa (estado: ${mpStatus || "desconocido"})` })
    }

    const subscriptionEmail = mpPreapproval.payer_email || email
    await setUserSubscribed(uid, subscriptionEmail, preapproval_id)

    if (subscriptionEmail) {
      try {
        await sendMail({
          to: subscriptionEmail,
          subject: "¡Suscripción activada — GrupoStart Tools!",
          text: `¡Tu suscripción a GrupoStart Tools está activa!

Ya podés gestionar tus contactos, hacer seguimiento profesional, ver estadísticas y recibir notificaciones por WhatsApp.

Accedé ahora: https://grupostart.com.ar/tools

Detalles del plan:
- Plan mensual: $2.500 ARS por mes
- Débito automático cada mes
- Cancelá cuando quieras desde MercadoPago

GrupoStart · Formosa, Argentina
grupostart.ok@gmail.com`,
          html: `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8f9fc">
            <div style="background:linear-gradient(135deg,#0051FF,#0039cc);padding:40px 20px;text-align:center">
              <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700">Grupo<span style="color:#FB8A00">Start</span></h1>
              <p style="color:#c4d4ff;margin:8px 0 0;font-size:14px">Sistema de Seguimiento de Leads</p>
            </div>
            <div style="padding:30px 20px">
              <h2 style="color:#0051FF;margin:0 0 12px;font-size:20px">¡Suscripción activada!</h2>
              <p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 20px">Tu suscripción al <strong>Sistema de Seguimiento de Leads</strong> está lista. Ya podés empezar a gestionar tus contactos y hacer seguimiento profesional.</p>
              <div style="background:#fff;border:1px solid #e8ecf4;border-radius:12px;padding:24px;margin:20px 0">
                <p style="color:#0051FF;font-weight:700;margin:0 0 12px;font-size:15px">¿Qué podés hacer en Tools?</p>
                <table style="width:100%;border-collapse:collapse">
                  <tr><td style="padding:8px 0;color:#444;font-size:14px">📋 <strong>Gestionar contactos</strong> — Agregá leads, clasificalos y hacé seguimiento</td></tr>
                  <tr><td style="padding:8px 0;color:#444;font-size:14px">📊 <strong>Estadísticas</strong> — Mirá métricas de rendimiento y pipeline</td></tr>
                  <tr><td style="padding:8px 0;color:#444;font-size:14px">📝 <strong>Copys</strong> — Plantillas de mensajes listas para copiar y pegar</td></tr>
                  <tr><td style="padding:8px 0;color:#444;font-size:14px">🔔 <strong>Notificaciones WhatsApp</strong> — Recordatorios automáticos de seguimientos</td></tr>
                </table>
              </div>
              <div style="text-align:center;margin:28px 0">
                <a href="https://grupostart.com.ar/tools" style="display:inline-block;background:#FB8A00;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 12px rgba(251,138,0,0.35)">Ir a Tools</a>
              </div>
              <div style="border-top:1px solid #e8ecf4;padding-top:20px;margin-top:20px">
                <p style="color:#666;font-size:13px;margin:0 0 8px"><strong>Detalles del plan:</strong></p>
                <p style="color:#888;font-size:12px;margin:0 0 4px">• Plan mensual · <strong>$2.500 ARS</strong> por mes</p>
                <p style="color:#888;font-size:12px;margin:0 0 4px">• Débito automático el mismo día de cada mes</p>
                <p style="color:#888;font-size:12px;margin:0 0 4px">• Cancelá cuando quieras desde MercadoPago</p>
              </div>
            </div>
            <div style="background:#0f172a;padding:20px;text-align:center">
              <p style="color:#64748b;font-size:11px;margin:0 0 4px">GrupoStart · Hipólito Yrigoyen 342 · Formosa, Argentina</p>
              <p style="color:#64748b;font-size:11px;margin:0">Si tenés dudas, respondé este mail o escribinos a grupostart.ok@gmail.com</p>
            </div>
          </div>`,
        })
      } catch (err) {
        console.error("Error sending subscription email:", err)
      }
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
