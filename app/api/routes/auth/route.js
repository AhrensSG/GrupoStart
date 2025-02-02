import { Company, Order, User } from "@/db/models/models";
import { sendMail } from "../send_mail/sendMail";

export async function PUT(req) {
    try {
        const { displayName, email, uid } = await req.json();
        console.log(email, uid);

        if (!uid || !email) {
            return Response.json("UID / DISPLAYNAME / EMAIL ARE required", {
                status: 400,
            });
        }

        const user = await User.findOne({
            where: { id: uid },
            include: [{ model: Order }, { model: Company }],
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
            });
            await sendMail({
                to: newUser.email,
                subject: "Bienvenido a Grupo Star",
                text: `Bienvenido a Grupo Star, ${displayName}!`,
            });

            // await sendMail({
            //   to: "grupoStarmail"
            //   , subject: "Nuevo usuario registrado",
            //   text: `Nuevo usuario registrado: ${displayName}!`,
            // })

            return Response.json(updatedUser);
        }

        return Response.json(user);
    } catch (error) {
        console.log(error);
        return Response.json(error.message, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { id, name, surname, email, password } = await req.json();
        console.log(id, name, surname, email);

        if (!id || !name || !surname || !email) {
            return Response.json("Missing Data / All fields are required", {
                status: 400,
            });
        }

        const existingUser = await User.findOne({
            where: { id },
            // include: [{ model: Order }],
        });
        console.log(existingUser);

        if (existingUser) {
            return Response.json(existingUser);
        }
        const passwordEncrypted = crypto.createHash("sha256").update(password).digest("hex");
        const newUser = await User.create({
            id,
            name,
            surname,
            email,
            password: passwordEncrypted,
        });

        const updatedUser = await User.findOne({
            where: { id: newUser.id },
            // include: [{ model: Order }],
        });
        console.log(updatedUser);

        await sendMail({
            to: newUser.email,
            subject: "Bienvenido a Grupo Star",
            text: `Bienvenido a Grupo Star, ${newUser.name}!`,
        });

        // await sendMail({
        //   to: "grupoStarmail"
        //   , subject: "Nuevo usuario registrado",
        //   text: `Nuevo usuario registrado: ${displayName}!`,
        // })

        return Response.json(updatedUser);
    } catch (error) {
        console.log(error);

        return Response.json(error.message, { status: 500 });
    }
}
