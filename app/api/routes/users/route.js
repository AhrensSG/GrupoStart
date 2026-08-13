import { Order, User } from "@/db/models/models";
import { requireUser, unauthorizedResponse } from "@/lib/auth/server";

export async function PUT(req) {
    try {
        const authUser = await requireUser(req);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const data = await req.json();
        const id = authUser.uid;

        const existingUser = await User.findByPk(id);
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
