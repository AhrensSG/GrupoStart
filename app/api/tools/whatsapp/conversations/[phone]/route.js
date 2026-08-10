import { NextResponse } from "next/server"
import { getWaMessages, markWaConversationRead } from "@/lib/tools/db"
import { isAdmin } from "@/lib/tools/admin"

export async function GET(req, { params }) {
  try {
    const { searchParams } = new URL(req.url)
    if (!(await isAdmin(searchParams.get("admin_uid")))) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }
    const { phone } = await params
    const limit = Number(searchParams.get("limit") || 200)
    const [messages] = await Promise.all([
      getWaMessages(phone, limit),
      markWaConversationRead(phone),
    ])
    return NextResponse.json(messages)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener mensajes" }, { status: 500 })
  }
}
