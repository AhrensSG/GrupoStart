import { NextResponse } from "next/server"
import { verifyIdToken, unauthorizedResponse } from "@/lib/auth/server"

const MAX_AGE = 60 * 60 * 24 // 24h; el ID token se renueva en el cliente y refresca la cookie

export async function POST(req) {
  try {
    const header = req.headers.get("authorization")
    const token = header && header.startsWith("Bearer ") ? header.slice(7).trim() : null
    if (!token) {
      return unauthorizedResponse()
    }
    let payload
    try {
      payload = await verifyIdToken(token)
    } catch {
      return unauthorizedResponse()
    }

    const res = NextResponse.json({ success: true })
    res.cookies.set("gs_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: MAX_AGE,
    })
    return res
  } catch (error) {
    console.error("Error al crear sesión:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.set("gs_session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
  return res
}
