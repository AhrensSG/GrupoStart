import { NextResponse } from "next/server"
import { cancelSubscriptionByUid, getUserSubscriptions } from "@/lib/tools/db"
import { preApproval } from "@/payment/mp"
import { requireUser, unauthorizedResponse } from "@/lib/auth/server"

export async function POST(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid

    const subs = await getUserSubscriptions(uid)
    const active = subs.find(s => s.status === "active")

    if (active && active.preapproval_id) {
      try {
        await preApproval.update({
          id: active.preapproval_id,
          body: { status: "cancelled" },
        })
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
