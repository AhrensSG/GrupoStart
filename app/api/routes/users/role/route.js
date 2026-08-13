import { User } from "@/db/models/models";
import { requireUser, unauthorizedResponse } from "@/lib/auth/server";

export async function GET(req) {
  try {
    const authUser = await requireUser(req);
    if (!authUser) {
      return unauthorizedResponse();
    }
    const user = await User.findByPk(authUser.uid, { attributes: ["role"] });
    return Response.json({ role: user?.role || "user" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
