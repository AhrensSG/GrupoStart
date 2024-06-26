const { Order, User, OrderProducts } = require("@/db/models/models");

export async function POST(req) {
  try {
    const { orderId, products } = await req.json();

    if (
      !orderId ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return Response.json(
        "Order ID and a non-empty array of products are required",
        { status: 400 }
      );
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return Response.json(`Order with ID ${orderId} does not exist`, {
        status: 404,
      });
    }

    for (const productInfo of products) {
      const { id } = productInfo;
      if (!id) {
        return Response.json("Each product object must have a productId", {
          status: 400,
        });
      }

      const product = await OrderProducts.create({
        status: "Pending",
        name: productInfo.name,
        price: productInfo.price,
        items: productInfo.items,
      });

      await order.addOrderProducts(product);
    }

    const updatedOrder = await Order.findOne({
      where: { id: orderId },
      include: [{ model: User }],
    });

    return Response.json(updatedOrder);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
