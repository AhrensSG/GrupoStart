import sendGrid from "@sendgrid/mail";
import { NextResponse } from "next/server";

// Configurar SendGrid con tu clave API
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail(data) {
    const { to, subject, text, html } = data;
    console.log(data);

    try {
        // Validar que los campos requeridos estén presentes
        if (!to || !subject || !text) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        // Enviar el correo
        await sendGrid.send({
            to,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject,
            text,
        });

        // Respuesta de éxito
        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        // Capturar errores y devolver información
        console.error(error);
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
