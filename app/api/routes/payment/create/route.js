import { preference } from "@/payment/mp";

const SERVER_URL_PAYMENT_NOTIFICATION = process.env.SERVER_ENDPOINT_PAYMENT_NOTIFICATION_URL;

export async function POST(req) {
    try {
        const { items, payer, orderId, deliveryCost } = await req.json();
        const formattedItems = items.map((item) => {
            return {
                id: item.id,
                title: item.name || item.title || "Plan GrupoStart",
                quantity: 1,
                unit_price: item.unit_price,
                description: item.description || "Servicio de GrupoStart",
                category_id: "digital_service",
            };
        });
        const bodyItems = items.map((item) => {
            if (Array.isArray(item.quantity)) {
                return {
                    ...item,
                    quantity: item.quantity?.map((q) => ({
                        id: q.id,
                        price: q.price,
                        quantity: q.quantity,
                        budget: q.budget
                    }))
                };
            } else {
                return item
            }
        });
        const response = await preference.create({
            body: {
                payment_methods: {
                    excluded_payment_methods: [],
                    excluded_payment_types: [],
                    installments: 2,
                },
                items: formattedItems,
                shipments: {
                    cost: deliveryCost,
                    mode: "not_specified",
                },
                payer: {
                    email: payer.email,
                    name: payer.name,
                    surname: payer.surname,
                    phone: {
                        number: payer.phone,
                    },
                    address: {
                        zip_code: payer.postalCode,
                    },
                },
                back_urls: {
                    success: "https://grupostart.com.ar/user",
                    pending: "https://grupostart.com.ar/",
                    failure: "https://grupostart.com.ar/",
                },
                auto_return: "approved",
                external_reference: orderId,
                statement_descriptor: "GrupoStart",
                notification_url: `${SERVER_URL_PAYMENT_NOTIFICATION}`,
                metadata: {
                    order: orderId,
                    payer: {
                        id: payer.id,
                    },
                    items: bodyItems,
                },
            },
        });
        return Response.json(response);
    } catch (error) {
        return Response.json(error.message, { status: 500 });
    }
}
