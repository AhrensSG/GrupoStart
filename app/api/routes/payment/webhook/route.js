import { Order, OrderProducts, User } from "@/db/models/models";
import { payment } from "@/payment/mp";
import { Op } from "sequelize";

export async function POST(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = await searchParams.get("type");
    const id = await searchParams.get("data.id");
    if (type) {
      const data = await payment.get({ id });

      const user = await User.findByPk(data.metadata.payer.id);
      const order = await Order.findOne({
        where: {
          [Op.and]: {
            UserId: user.id,
            id: data.metadata.order,
          },
        },
      });

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
    }

    return Response.json("success", { status: 200 });
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
