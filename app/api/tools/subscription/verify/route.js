import { NextResponse } from "next/server"
import { checkUserSubscribed, setUserSubscribed } from "@/lib/tools/db"
import { preApproval } from "@/payment/mp"

export async function POST(req) {
  try {
    const { uid, preapproval_id } = await req.json()
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }

    const alreadySubscribed = await checkUserSubscribed(uid, "")
    if (alreadySubscribed) {
      return NextResponse.json({ success: true, message: "Ya estás suscripto" })
    }

    if (preapproval_id) {
      try {
        const mpPreapproval = await preApproval.get({ id: preapproval_id })
        const status = mpPreapproval?.status
        if (status === "approved" || status === "authorized" || status === "pending") {
          await setUserSubscribed(uid, mpPreapproval.payer_email || "", preapproval_id)
          return NextResponse.json({ success: true, message: "Suscripción activada después de verificar en MP" })
        }
        return NextResponse.json({ success: false, message: `La preaprobación en MP está en estado: ${status}` })
      } catch (mpErr) {
        console.error("Error verificando preapproval en MP:", mpErr)
        return NextResponse.json({ success: false, message: "No se pudo verificar el pago en Mercado Pago. Intentalo más tarde." })
      }
    }

    return NextResponse.json({ success: false, message: "No hay una suscripción pendiente para verificar." })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al verificar suscripción" }, { status: 500 })
  }
}
