import { NextResponse } from "next/server"
import { checkUserSubscribed, setUserSubscribed } from "@/lib/tools/db"
import { preApproval } from "@/payment/mp"
import { requireUser, unauthorizedResponse } from "@/lib/auth/server"

export async function POST(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const { preapproval_id } = await req.json()
    if (!preapproval_id) {
      return NextResponse.json({ error: "preapproval_id es requerido" }, { status: 400 })
    }

    const alreadySubscribed = await checkUserSubscribed(uid, "")
    if (alreadySubscribed) {
      return NextResponse.json({ success: true, message: "Ya estás suscripto" })
    }

    try {
      const mpPreapproval = await preApproval.get({ id: preapproval_id })
      if (mpPreapproval?.external_reference !== uid) {
        return NextResponse.json({ success: false, message: "La suscripción no corresponde a tu cuenta." })
      }
      const status = mpPreapproval?.status
      if (status === "authorized" || status === "approved") {
        await setUserSubscribed(uid, mpPreapproval.payer_email || "", preapproval_id)
        return NextResponse.json({ success: true, message: "Suscripción activada después de verificar en MP" })
      }
      return NextResponse.json({ success: false, message: `La preaprobación en MP está en estado: ${status}` })
    } catch (mpErr) {
      console.error("Error verificando preapproval en MP:", mpErr)
      return NextResponse.json({ success: false, message: "No se pudo verificar el pago en Mercado Pago. Intentalo más tarde." })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al verificar suscripción" }, { status: 500 })
  }
}
