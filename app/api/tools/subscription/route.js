import { NextResponse } from "next/server"
import { checkUserSubscribed, setUserSubscribed, getUserSubscriptions, getUserPhone, getUserName, saveUserPhone } from "@/lib/tools/db"
import { sendWelcomeMessage } from "@/lib/tools/whatsapp-cloud"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")
    const email = searchParams.get("email")
    const list = searchParams.get("list")
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }
    if (list === "true") {
      const subscriptions = await getUserSubscriptions(uid)
      return NextResponse.json({ subscriptions })
    }
    const subscribed = await checkUserSubscribed(uid, email)
    return NextResponse.json({ subscribed })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al verificar suscripción" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { uid, email, preapproval_id } = body
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }
    await setUserSubscribed(uid, email || "", preapproval_id)
    const phone = await getUserPhone(uid)
    if (!phone) {
      return NextResponse.json({ success: true, warning: "WhatsApp no configurado: falta número de teléfono" })
    }
    const name = await getUserName(uid) || "Usuario"
    await sendWelcomeMessage(phone, name)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al actualizar suscripción" }, { status: 500 })
  }
}
