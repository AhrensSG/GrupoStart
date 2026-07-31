import { User } from "@/db/models/models"
import { getAllSubscriptions, setUserSubscribed, cancelSubscriptionByUid } from "@/lib/tools/db"

async function checkAdmin(requesterId) {
  if (!requesterId) return false
  const user = await User.findByPk(requesterId)
  return user?.role === "admin"
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const requesterId = searchParams.get("admin_uid")
    if (!(await checkAdmin(requesterId))) {
      return Response.json({ error: "No autorizado" }, { status: 403 })
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
    const { admin_uid, uid, email, action } = await req.json()
    if (!(await checkAdmin(admin_uid))) {
      return Response.json({ error: "No autorizado" }, { status: 403 })
    }
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
