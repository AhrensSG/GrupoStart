import { NextResponse } from "next/server"
import { getUserProfile, checkUserSubscribed, getAllContacts } from "@/lib/tools/db"
import { requireUser, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const email = authUser.email || ""

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
