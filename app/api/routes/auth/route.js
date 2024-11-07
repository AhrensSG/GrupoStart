import { Order, User } from "@/db/models/models";

export async function PUT(req) {
  try {
    const { displayName, email, uid } = await req.json();

    if (!uid || !displayName || !email) {
      return Response.json("UID / DISPLAYNAME / EMAIL ARE required", {
        status: 400,
      });
    }

    const user = await User.findOne({
      where: { id: uid },
      include: [{ model: Order }],
      order: [[Order, "createdAt", "DESC"]],
    });

    if (!user) {
      const newUser = await User.create({
        id: uid,
        name: displayName,
        surname: "",
        email: email,
      });

      const updatedUser = await User.findOne({
        where: { id: newUser.id },
        include: [{ model: Order }],
        order: [[Order, "createdAt", "DESC"]],
      });

      return Response.json(updatedUser);
    }

    return Response.json(user);
  } catch (error) {
    console.log(error)
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
