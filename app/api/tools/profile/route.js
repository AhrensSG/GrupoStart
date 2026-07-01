import { NextResponse } from "next/server"
import { getUserProfile, updateUserProfile } from "@/lib/tools/db"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }
    const profile = await getUserProfile(uid)
    return NextResponse.json(profile || { hora_ingreso: "09:00", hora_salida: "18:00", horario_ranges: "" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener perfil" }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const body = await req.json()
    const uid = body.uid
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }
    await updateUserProfile({
      hora_ingreso: body.hora_ingreso,
      hora_salida: body.hora_salida,
      horario_ranges: body.horario_ranges,
      telefono: body.telefono,
      whatsapp_api_url: body.whatsapp_api_url,
      whatsapp_api_token: body.whatsapp_api_token,
      company_name: body.company_name,
      company_logo: body.company_logo,
    }, uid)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 })
  }
}
