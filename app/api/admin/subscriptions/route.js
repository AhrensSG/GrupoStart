import { getAllSubscriptions, setUserSubscribed, cancelSubscriptionByUid } from "@/lib/tools/db"
import { requireAdmin, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req) {
  try {
    const admin = await requireAdmin(req)
    if (!admin) {
      return unauthorizedResponse()
    }
    const subscriptions = await getAllSubscriptions()
    return Response.json({ subscriptions })
  } catch (error) {
    console.error(error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const admin = await requireAdmin(req)
    if (!admin) {
      return unauthorizedResponse()
    }
    const { uid, email, action } = await req.json()
    if (!uid) {
      return Response.json({ error: "uid es requerido" }, { status: 400 })
    }

    if (action === "activate") {
      await setUserSubscribed(uid, email || "", "manual")
      return Response.json({ success: true, message: "Suscripción activada" })
    }

    if (action === "deactivate") {
      const sub = await cancelSubscriptionByUid(uid)
      if (!sub) {
        return Response.json({ error: "No hay suscripción activa para este usuario" }, { status: 400 })
      }
      return Response.json({ success: true, message: "Suscripción desactivada" })
    }

    return Response.json({ error: "Acción inválida" }, { status: 400 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
