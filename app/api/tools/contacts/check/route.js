import { NextResponse } from "next/server"
import { checkContactExists } from "@/lib/tools/db"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")
    const celular = searchParams.get("celular") || ""
    const email = searchParams.get("email") || ""
    if (!uid) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }
    const exists = await checkContactExists(uid, celular, email)
    return NextResponse.json({ exists })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al verificar contacto" }, { status: 500 })
  }
}
