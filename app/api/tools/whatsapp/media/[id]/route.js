import { NextResponse } from "next/server"
import { getWaMedia } from "@/lib/tools/db"
import { requireAdmin, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req, { params }) {
  try {
    if (!(await requireAdmin(req))) {
      return unauthorizedResponse()
    }
    const { id } = await params
    const mediaId = Number(id)
    if (!Number.isInteger(mediaId) || mediaId <= 0) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 })
    }
    const media = await getWaMedia(mediaId)
    if (!media || !media.data) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 })
    }
    const buffer = Buffer.isBuffer(media.data) ? media.data : Buffer.from(media.data)
    const filename = String(media.filename || "archivo").replace(/"/g, "")
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": media.mime_type || "application/octet-stream",
        "Content-Length": String(buffer.length),
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, max-age=3600",
      },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener el archivo" }, { status: 500 })
  }
}
