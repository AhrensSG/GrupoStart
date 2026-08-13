import { Order, User, OrderProducts } from "@/db/models/models";
import { requireUser, unauthorizedResponse } from "@/lib/auth/server";

export async function POST(req) {
    try {
        const authUser = await requireUser(req);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { orderId, products } = await req.json();

        if (!orderId || !products || !Array.isArray(products) || products.length === 0) {
            return Response.json("Order ID and a non-empty array of products are required", { status: 400 });
        }

        const order = await Order.findByPk(orderId);
        if (!order) {
            return Response.json(`Order with ID ${orderId} does not exist`, {
                status: 404,
            });
        }

        if (order.UserId !== authUser.uid) {
            return Response.json("No autorizado", { status: 403 });
        }

        for (const productInfo of products) {
            const { id } = productInfo;
            if (!id) {
                return Response.json("Each product object must have a productId", {
                    status: 400,
                });
            }

            await OrderProducts.create({
                status: "Pending",
                name: productInfo.name,
                price: productInfo.price,
                items: Array.isArray(productInfo.items) ? productInfo.items.length : productInfo.items,
                OrderId: orderId,
                data: Array.isArray(productInfo.items) ? productInfo.items : productInfo.description
            });
        }

        const updatedOrder = await Order.findOne({
            where: { id: orderId },
            include: [{ model: User }, { model: OrderProducts }],
        });

        return Response.json(updatedOrder);
    } catch (error) {
        return Response.json(error.message, { status: 500 });
    }
}
