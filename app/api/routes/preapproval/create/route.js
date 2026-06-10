import { preApproval } from "@/payment/mp";

export async function POST(req) {
    try {
        const body = await req.json()
        const { uid, email } = body

        const response = await preApproval.create({
            body: {
                reason: "Sistema de Seguimiento de Leads - GrupoStart",
                external_reference: uid || "plan-seguimiento-leads",
                back_url: "https://grupostart.com.ar/payment/success",
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
