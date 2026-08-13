import { NextResponse } from "next/server"
import { checkContactExists } from "@/lib/tools/db"
import { requireUser, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const { searchParams } = new URL(req.url)
    const celular = searchParams.get("celular") || ""
    const email = searchParams.get("email") || ""
    const exists = await checkContactExists(uid, celular, email)
    return NextResponse.json({ exists })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al verificar contacto" }, { status: 500 })
  }
}
