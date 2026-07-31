import { User } from "@/db/models/models"

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
    const { admin_uid, id, role } = await req.json()
    if (!(await checkAdmin(admin_uid))) {
      return Response.json({ error: "No autorizado" }, { status: 403 })
    }
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
