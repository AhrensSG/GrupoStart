import { NextResponse } from "next/server"
import { getWaConversations } from "@/lib/tools/db"
import { isAdmin } from "@/lib/tools/admin"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    if (!(await isAdmin(searchParams.get("admin_uid")))) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }
    const conversations = await getWaConversations()
    return NextResponse.json(conversations)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener conversaciones" }, { status: 500 })
  }
}
