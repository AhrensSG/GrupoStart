import { Order, OrderProducts, User } from "@/db/models/models";
import { payment } from "@/payment/mp";
import { Op } from "sequelize";
import { sendMail } from "../../send_mail/sendMail";

export async function POST(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const type = searchParams.get("type");
        const id = searchParams.get("data.id");

        if (id && type && type === "payment") {
            const data = await payment.get({ id });
            if (
                !data ||
                !data.metadata ||
                !data.metadata.payer ||
                !data.metadata.order ||
                !data.metadata.items
            ) {
                console.log("Invalid payment metadata");
                return Response.json(
                    { message: "Invalid payment metadata" },
                    { status: 400 }
                );
            }

            const user = await User.findByPk(data.metadata.payer.id);
            const order = await Order.findOne({
                where: {
                    [Op.and]: {
                        UserId: user.id,
                        id: data.metadata.order,
                    },
                },
            });

            if (!order) {
                return Response.json(
                    { message: "Order not found" },
                    { status: 404 }
                );
            }

            await order.update({
                orderId: data.id,
                status: "Paid",
                totalPrice: data.transaction_amount,
            });

            await OrderProducts.update(
                { status: "Paid" },
                {
                    where: {
                        [Op.and]: {
                            OrderId: order.id,
                        },
                    },
                }
            );

            // 🛒 **Generar tabla con los productos comprados**
            const itemsHTML = data.metadata.items
                .map((item) => {
                    if (Array.isArray(item.quantity)) {
                        const detailsHTML = item.quantity
                            .map(
                                (detail, index) => `
                    <tr>
                        ${
                            index === 0
                                ? `<td style="border: 1px solid #ddd; padding: 8px;" rowspan="${item.quantity.length}">${item.title}</td>`
                                : ""
                        }
                        <td style="border: 1px solid #ddd; padding: 8px;">${
                            detail.id
                        }</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${
                            detail.budget ? " " : detail.quantity
                        }</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${
                            detail.budget
                                ? `$${parseFloat(detail.budget).toFixed(2)}`
                                : detail.price
                                ? `$${parseFloat(detail.price).toFixed(2)}`
                                : " "
                        }</td>
                    </tr>`
                            )
                            .join("");

                        return detailsHTML;
                    } else {
                        return `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${
                        item.title
                    }</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${
                        item.description
                    }</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${
                        item.quantity
                    }</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">$${item.unit_price.toFixed(
                        2
                    )}</td>
                </tr>`;
                    }
                })
                .join("");

            const totalAmount = data.metadata.items.reduce((sum, item) => {
                return sum + item.unit_price;
            }, 0);

            await sendMail({
                to: user.email,
                subject: "Confirmación de pago en Grupo Start",
                html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
            <h2 style="color: #333;">🎉 ¡Pago recibido con éxito! 🎉</h2>
            <p style="font-size: 16px; color: #555;">
                Hola <strong>${user.name}</strong>,
            </p>
            <p style="font-size: 16px; color: #555;">
                Hemos recibido tu pago por el pedido <strong>#${
                    order.id
                }</strong> con un total de 
                <strong>$${data.transaction_amount.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}</strong>.
            </p>
            
            <h3 style="color: #333; margin-top: 20px;">🛒 Detalles de tu compra:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f4f4f4;">
                        <th style="border: 1px solid #ddd; padding: 8px;">Producto</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Detalle</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Precio / Presupuesto</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                    <tr style="background-color: #f4f4f4;">
                        <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Total:</strong></td>
                        <td style="border: 1px solid #ddd; padding: 8px;"><strong>$${totalAmount.toFixed(
                            2
                        )}</strong></td>
                    </tr>
                </tbody>
            </table>

            <p style="font-size: 14px; color: #777; margin-top: 20px;">
                Gracias por confiar en nosotros.
            </p>
            <p style="font-size: 14px; color: #777;">
                Atentamente,<br>El equipo de Grupo Start
            </p>
        </div>
    `,
            });
        }

        return Response.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
