import { NextResponse } from "next/server"
import { preApproval } from "@/payment/mp"
import { setUserSubscribed } from "@/lib/tools/db"

export async function POST(req) {
  try {
    const searchParams = req.nextUrl.searchParams
    const topic = searchParams.get("topic")
    const queryId = searchParams.get("id")

    let body = null
    try {
      body = await req.json()
    } catch {
      body = null
    }

    const notificationType = body?.type || topic
    const notificationId = body?.data?.id || queryId

    if (!notificationId) {
      return NextResponse.json({ message: "No id provided" }, { status: 400 })
    }

    if (notificationType === "preapproval" || notificationType === "subscription" || body?.action?.startsWith("preapproval.")) {
      try {
        const mpPreapproval = await preApproval.get({ id: notificationId })
        if (!mpPreapproval) {
          return NextResponse.json({ message: "Preapproval not found in MP" }, { status: 404 })
        }

        const uid = mpPreapproval.external_reference
        const email = mpPreapproval.payer_email || ""
        const status = mpPreapproval.status

        if (status === "approved" || status === "authorized" || status === "pending") {
          if (uid) {
            await setUserSubscribed(uid, email, notificationId)
            console.log(`Subscription activated via webhook for uid=${uid}, preapproval_id=${notificationId}`)
          }
        }
      } catch (mpErr) {
        console.error("Error fetching preapproval from MP:", mpErr)
      }
    }

    return NextResponse.json({ message: "OK" }, { status: 200 })
  } catch (error) {
    console.error("Preapproval webhook error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
