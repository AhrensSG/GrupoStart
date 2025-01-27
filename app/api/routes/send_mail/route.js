import { sendMail } from "./sendMail";

export async function POST(req) {
    const data = await req.json();
    return sendMail(data);
}
