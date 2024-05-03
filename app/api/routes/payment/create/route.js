import { preference } from "@/payment/mp";

const SERVER_URL_PAYMENT_NOTIFICATION =
  process.env.SERVER_ENDPOINT_PAYMENT_NOTIFICATION_URL;

export async function POST(req) {
  try {
    const { items, payer, orderId, deliveryCost } = await req.json();

    const response = await preference.create({
      body: {
        payment_methods: {
          excluded_payment_methods: [],
          excluded_payment_types: [],
          installments: 2,
        },
        items: items,
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
          success: "https://grupo-start.vercel.app/",
          pending: "https://grupo-start.vercel.app/",
          failure: "https://grupo-start.vercel.app/",
        },
        auto_return: "approved",
        external_reference: orderId,
        statement_descriptor: "GrupoStart",
        notification_url: `${SERVER_URL_PAYMENT_NOTIFICATION}`,
        metadata: {
          order: orderId,
          payer: {
            id: payer.id,
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
          items: items,
        },
      },
    });
    console.log(response)
    return Response.json(response);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
