import { NextResponse } from "next/server"
import { getWaMessages, markWaConversationRead } from "@/lib/tools/db"
import { requireAdmin, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req, { params }) {
  try {
    if (!(await requireAdmin(req))) {
      return unauthorizedResponse()
    }
    const { searchParams } = new URL(req.url)
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
