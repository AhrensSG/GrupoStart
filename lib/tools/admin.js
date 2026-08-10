import { User } from "@/db/models/models"

export async function isAdmin(requesterId) {
  if (!requesterId) return false
  try {
    const user = await User.findByPk(requesterId)
    return user?.role === "admin"
  } catch {
    return false
  }
}
