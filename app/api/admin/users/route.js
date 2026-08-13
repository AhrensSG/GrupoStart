import { User } from "@/db/models/models"
import { requireAdmin, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req) {
  try {
    const admin = await requireAdmin(req)
    if (!admin) {
      return unauthorizedResponse()
    }

    const users = await User.findAll({
      attributes: ["id", "name", "surname", "email", "phone", "role", "createdAt"],
      order: [["createdAt", "DESC"]],
    })
    return Response.json(users)
  } catch (error) {
    console.error(error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const admin = await requireAdmin(req)
    if (!admin) {
      return unauthorizedResponse()
    }
    const { id, role } = await req.json()
    if (!id || !["user", "admin"].includes(role)) {
      return Response.json({ error: "Datos inválidos" }, { status: 400 })
    }

    const user = await User.findByPk(id)
    if (!user) {
      return Response.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    user.role = role
    await user.save()
    return Response.json({ success: true, user })
  } catch (error) {
    console.error(error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
