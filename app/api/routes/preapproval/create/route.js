import { preApproval } from "@/payment/mp";

export async function POST(req) {
    try {
        const body = await req.json()
        const { uid, email } = body
        const host = req.headers.get("host") || ""
        const isLocal = host.includes("localhost") || host.includes("127.0.0.1")
        const backUrl = `https://${isLocal ? "grupo-start.vercel.app" : host}/payment/success`

        const preapprovalBody = {
            reason: "Sistema de Seguimiento de Leads - GrupoStart",
            external_reference: uid || "plan-seguimiento-leads",
            back_url: backUrl,
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
        console.error("PreApproval error:", error)
        return Response.json({ error: error.message || "Error desconocido" }, { status: 500 })
    }
}
