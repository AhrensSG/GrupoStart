import { Order, User } from "@/db/models/models";
import { Op } from "sequelize";

// export async function GET(req) {
//   try {
//     const { name } = req.nextUrl.searchParams;

//     let whereClause = {};
//     if (name) {
//       whereClause = {
//         [Op.or]: [
//           { name: { [Op.substring]: name } },
//           { surname: { [Op.substring]: name } },
//           { email: { [Op.substring]: name } },
//         ],
//       };
//     }

//     const users = await User.findAll({
//       where: whereClause,
//       order: [["createdAt", "DESC"]],
//     });

//     return users.length
//       ? Response.json(users)
//       : Response.json("Users Not Found");
//   } catch (error) {
//     return Response.json(error.message, { status: 500 });
//   }
// }

export async function PUT(req) {
  try {
    const { id, phone } = await req.json();

    if (!id) {
      return Response.json("User ID is required", { status: 400 });
    }

    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return Response.json(`User with ID ${id} does not exist`, {
        status: 404,
      });
    }

    if (phone) existingUser.phone = phone;

    await existingUser.save();

    const updatedUser = await User.findOne({
      where: { id },
      include: [{ model: Order }],
    });

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
