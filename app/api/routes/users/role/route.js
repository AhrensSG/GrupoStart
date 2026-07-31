import { User } from "@/db/models/models";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    if (!uid) {
      return Response.json({ error: "uid requerido" }, { status: 400 });
    }
    const user = await User.findByPk(uid, { attributes: ["role"] });
    return Response.json({ role: user?.role || "user" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
