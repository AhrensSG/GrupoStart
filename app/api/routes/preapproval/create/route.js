import { preApproval } from "@/payment/mp";

const PREAPPROVAL_WEBHOOK_URL = process.env.SERVER_ENDPOINT_PREAPPROVAL_NOTIFICATION_URL

export async function POST(req) {
    try {
        const body = await req.json()
        const { uid, email } = body
        if (!uid) {
            return Response.json({ error: "uid es requerido para crear la suscripción" }, { status: 400 })
        }
        const host = req.headers.get("host") || ""
        const protocol = req.headers.get("x-forwarded-proto") || "https"
        const isLocal = host.includes("localhost") || host.includes("127.0.0.1")
        const publicHost = isLocal ? "grupo-start.vercel.app" : host
        const backUrl = `${protocol}://${publicHost}/payment/success`
        const notificationUrl = PREAPPROVAL_WEBHOOK_URL || `${protocol}://${publicHost}/api/routes/preapproval/webhook`

        const preapprovalBody = {
            reason: "Seguimiento Leads - GrupoStart",
            external_reference: uid,
            back_url: backUrl,
            notification_url: notificationUrl,
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: 2500,
                currency_id: "ARS",
            },
        }
        if (email) preapprovalBody.payer_email = email

        const response = await preApproval.create({ body: preapprovalBody })
        return Response.json(response)
    } catch (error) {
        console.error("PreApproval error:", JSON.stringify(error, null, 2))
        const errorMsg = error?.message || error?.error || JSON.stringify(error) || "Error desconocido"
        return Response.json({ error: errorMsg }, { status: 500 })
    }
}
