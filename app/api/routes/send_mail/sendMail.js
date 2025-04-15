import sendGrid from "@sendgrid/mail";
import { NextResponse } from "next/server";

// Configurar SendGrid con tu clave API
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail(data) {
  const { to, subject, text, html, cc } = data; // Añadimos `attachments` al destructuring
  if (!to || !subject) {
    console.error("Missing data (to / subject): ", data);
    return;
  }

  let mailOptions = {
    from: {
      name: "Grupo Start",
      email: process.env.SENDGRID_FROM_EMAIL
    },
    to: to,
    subject: subject,
  };

  if (text) {
    mailOptions.text = text;
  }
  if (html) {
    mailOptions.html = html;
  }
  if (cc) {
    mailOptions.cc = cc;
  }

  try {
    await sendGrid.send(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
