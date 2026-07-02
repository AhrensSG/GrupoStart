import { NextResponse } from "next/server"
import { cancelSubscriptionByUid, getUserSubscriptions } from "@/lib/tools/db"
import { preApproval } from "@/payment/mp"

export async function POST(req) {
  try {
    const { uid } = await req.json()
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }

    const subs = await getUserSubscriptions(uid)
    const active = subs.find(s => s.status === "active")

    if (active && active.preapproval_id) {
      try {
        await preApproval.cancel({ id: active.preapproval_id })
      } catch (mpErr) {
        console.error("Error cancelando en MP:", mpErr)
      }
    }

    await cancelSubscriptionByUid(uid)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al cancelar suscripción" }, { status: 500 })
  }
}
