import { Company, Order, OrderProducts, User } from "@/db/models/models";
import { sendMail } from "../send_mail/sendMail";
import { requireUser, unauthorizedResponse } from "@/lib/auth/server";

export async function PUT(req) {
    try {
        const authUser = await requireUser(req);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { displayName, email } = await req.json();
        const uid = authUser.uid;
        const verifiedEmail = authUser.email || email;

        const user = await User.findOne({
            where: { id: uid },
            include: [
                { model: Order, include: [{ model: OrderProducts }] },
                { model: Company },
            ],
        });

        if (!user) {
            const newUser = await User.create({
                id: uid,
                name: displayName || authUser.name || "",
                surname: "",
                email: verifiedEmail || email || "",
            });

            const updatedUser = await User.findOne({
                where: { id: newUser.id },
                include: [{ model: Order }],
            });

            if (updatedUser?.email) {
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
                }).catch((err) => console.error("Error sending welcome email:", err));
            }

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
        const authUser = await requireUser(req);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { name, surname, email, phone } = await req.json();
        const uid = authUser.uid;

        if (!name) {
            return Response.json("Missing Data / Name is required", {
                status: 400,
            });
        }

        const existingUser = await User.findOne({ where: { id: uid } });

        if (existingUser) {
            await existingUser.update({
                name,
                surname: surname || "",
                phone: phone || "",
                email: email || authUser.email || existingUser.email,
            });
        } else {
            await User.create({
                id: uid,
                name,
                surname: surname || "",
                email: email || authUser.email || "",
                phone: phone || "",
            });
        }

        const updatedUser = await User.findOne({
            where: { id: uid },
            include: [
                { model: Order, include: [{ model: OrderProducts }] },
                { model: Company },
            ],
        });
        return Response.json(updatedUser);
    } catch (error) {
        console.log(error);

        return Response.json(error.message, { status: 500 });
    }
}
