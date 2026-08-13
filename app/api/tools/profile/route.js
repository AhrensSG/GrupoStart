import { NextResponse } from "next/server"
import { getUserProfile, updateUserProfile } from "@/lib/tools/db"
import { requireUser, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const profile = await getUserProfile(uid)
    return NextResponse.json(profile || { hora_ingreso: "09:00", hora_salida: "18:00", horario_ranges: "" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener perfil" }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const body = await req.json()
    await updateUserProfile({
      hora_ingreso: body.hora_ingreso,
      hora_salida: body.hora_salida,
      horario_ranges: body.horario_ranges,
      whatsapp_api_url: body.whatsapp_api_url,
      whatsapp_api_token: body.whatsapp_api_token,
      company_name: body.company_name,
      company_logo: body.company_logo,
      user_phone: body.user_phone,
    }, uid)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 })
  }
}
