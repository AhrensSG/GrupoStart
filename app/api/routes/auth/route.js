import { Company, Order, User } from "@/db/models/models";
import { sendMail } from "../send_mail/sendMail";
import crypto from "crypto";

export async function PUT(req) {
    try {
        const { displayName, email, uid } = await req.json();

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

            if (displayName) {
                await sendMail({
                    to: updatedUser.email,
                    subject: "¡Bienvenido a Grupo Start!",
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
                            <h2 style="color: #333;">¡Bienvenido a Grupo Start!</h2>
                            <p style="font-size: 16px; color: #555;">
                                Hola <strong>${updatedUser.name}</strong>,
                            </p>
                            <p style="font-size: 16px; color: #555;">
                                ¡Gracias por registrarte! Estamos emocionados de que formes parte de nuestra comunidad.
                                En <strong>Grupo Start</strong> nos especializamos en impulsar el crecimiento de emprendedores
                                y empresarios de todos los niveles.
                            </p>
                            <p style="font-size: 16px; color: #555;">
                                Pronto recibirás más información y recursos para ayudarte a alcanzar tus objetivos.
                                ¡Estamos aquí para apoyarte en cada paso del camino!
                            </p>
                            <a href="https://grupostart.com.ar/user" 
                                style="display: inline-block; padding: 12px 24px; margin-top: 20px; font-size: 16px;
                                    background-color: #ff6600; color: white; text-decoration: none; border-radius: 5px;">
                                Ir a mi perfil
                            </a>
                        </div>
                    `,
                });
            }

            return Response.json(updatedUser);
        }

        return Response.json(user);
    } catch (error) {
        console.log(error);
        return Response.json(error.message, { status: 500 });
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req) {
    try {
        const { id, name, surname, email, password, phone } = await req.json();

        if (!id || !name || !surname || !email) {
            return Response.json("Missing Data / All fields are required", {
                status: 400,
            });
        }

        const passwordEncrypted = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");
        await delay(3000);
        const existingUser = await User.findOne({
            where: { id },
            // include: [{ model: Order }],
        });

        if (existingUser) {
            await existingUser.update({
                name,
                surname,
                phone,
                password: passwordEncrypted,
            });
        } else {
            await User.create({
                id,
                name,
                surname,
                email,
                phone,
                password: passwordEncrypted,
            });
        }

        const updatedUser = await User.findOne({
            where: { id },
            // include: [{ model: Order }],
        });

        await sendMail({
            to: updatedUser.email,
            subject: "¡Bienvenido a Grupo Start!",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
                    <h2 style="color: #333;">¡Bienvenido a Grupo Start!</h2>
                    <p style="font-size: 16px; color: #555;">
                        Hola <strong>${updatedUser.name}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        ¡Gracias por registrarte! Estamos emocionados de que formes parte de nuestra comunidad.
                        En <strong>Grupo Start</strong> nos especializamos en impulsar el crecimiento de emprendedores
                        y empresarios de todos los niveles.
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        Pronto recibirás más información y recursos para ayudarte a alcanzar tus objetivos.
                        ¡Estamos aquí para apoyarte en cada paso del camino!
                    </p>
                    <a href="https://grupostart.com.ar/user" 
                        style="display: inline-block; padding: 12px 24px; margin-top: 20px; font-size: 16px;
                            background-color: #ff6600; color: white; text-decoration: none; border-radius: 5px;">
                        Ir a mi perfil
                    </a>
                </div>
            `,
        });
        return Response.json(updatedUser);
    } catch (error) {
        console.log(error);

        return Response.json(error.message, { status: 500 });
    }
}
