import { NextResponse } from "next/server"
import { getUserProfile, updateUserProfile } from "@/lib/tools/db"

export async function GET() {
  try {
    const profile = await getUserProfile()
    return NextResponse.json(profile || { hora_ingreso: "09:00", hora_salida: "18:00" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener perfil" }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const body = await req.json()
    await updateUserProfile({
      hora_ingreso: body.hora_ingreso,
      hora_salida: body.hora_salida,
      whatsapp_api_url: body.whatsapp_api_url,
      whatsapp_api_token: body.whatsapp_api_token,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 })
  }
}
