import { NextResponse } from "next/server"
import { getWaConversations } from "@/lib/tools/db"
import { requireAdmin, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req) {
  try {
    if (!(await requireAdmin(req))) {
      return unauthorizedResponse()
    }
    const conversations = await getWaConversations()
    return NextResponse.json(conversations)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener conversaciones" }, { status: 500 })
  }
}
