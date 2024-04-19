import { Order, User } from "@/db/models/models";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return Response.json("User ID is required", { status: 400 });
    }

    const user = await User.findOne({
      where: { id },
      include: [{ model: Order }],
      order: [[Order, "createdAt", "DESC"]],
    });

    if (!user) {
      return Response.json(`User with ID ${id} not found`, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { user, _tokenResponse } = await req.json();
    const id = user.uid;
    const name = _tokenResponse.firstName;
    const surname = _tokenResponse.lastName;
    const email = user.email;

    if (!id || !name || !surname || !email) {
      return Response.json("Missing Data / All fields are required", {
        status: 400,
      });
    }

    const existingUser = await User.findOne({
      where: { id },
      include: [{ model: Order }],
    });
    if (existingUser) {
      return Response.json(existingUser);
    }

    const newUser = await User.create({
      id,
      name,
      surname,
      email,
    });

    const updatedUser = await User.findOne({
      where: { id: newUser.id },
      include: [{ model: Order }],
    });

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
