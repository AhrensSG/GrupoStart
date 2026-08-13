import { NextResponse } from "next/server"

const PROTECTED_PATHS = ["/tools", "/admin", "/user"]

export function middleware(req) {
  const { pathname } = req.nextUrl

  if (pathname === "/login") {
    if (req.cookies.get("gs_session")?.value) {
      return NextResponse.redirect(new URL("/user", req.url))
    }
    return NextResponse.next()
  }

  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  )
  if (!isProtected) {
    return NextResponse.next()
  }

  if (!req.cookies.get("gs_session")?.value) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/tools/:path*", "/admin/:path*", "/user/:path*"],
}
