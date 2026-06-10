import { preApproval } from "@/payment/mp";

export async function POST(req) {
    try {
        const body = await req.json()
        const { uid, email } = body
        const origin = req.headers.get("origin") || req.headers.get("x-forwarded-host") || "https://grupo-start.vercel.app"
        const baseUrl = origin.startsWith("http") ? origin : `https://${origin}`

        const response = await preApproval.create({
            body: {
                reason: "Sistema de Seguimiento de Leads - GrupoStart",
                external_reference: uid || "plan-seguimiento-leads",
                back_url: `${baseUrl}/payment/success`,
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: 2500,
                    currency_id: "ARS",
                },
                payer_email: email || undefined,
            },
        });
        return Response.json(response);
    } catch (error) {
        console.error("PreApproval error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
