import { NextResponse } from "next/server"
import { getUserProfile, checkUserSubscribed, getAllContacts } from "@/lib/tools/db"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")
    const email = searchParams.get("email")

    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }

    const [profile, subscribed, contacts] = await Promise.all([
      getUserProfile(uid).catch(() => null),
      checkUserSubscribed(uid, email),
      getAllContacts(uid).catch(() => []),
    ])

    return NextResponse.json({
      profile: profile || { hora_ingreso: "09:00", hora_salida: "18:00", horario_ranges: "" },
      subscribed,
      contacts: subscribed ? contacts : [],
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al iniciar" }, { status: 500 })
  }
}
