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
        const data = await req.json();

        if (!data.id) {
            return Response.json("User ID is required", { status: 400 });
        }

        const existingUser = await User.findByPk(data.id);
        if (!existingUser) {
            return Response.json(`User with ID ${id} does not exist`, {
                status: 404,
            });
        }

        if (data.phone) existingUser.phone = data.phone;
        if (data.name) existingUser.name = data.name;
        if (data.surname) existingUser.surname = data.surname;
        if (data.email) existingUser.email = data.email;
        if (data.birthday) existingUser.birthday = data.birthday;
        if (data.country) existingUser.country = data.country;
        await existingUser.save();

        const updatedUser = await User.findOne({
            where: { id: existingUser.id },
            include: [{ model: Order }],
        });

        return Response.json(updatedUser);
    } catch (error) {
        console.log(error);

        return Response.json(error.message, { status: 500 });
    }
}
