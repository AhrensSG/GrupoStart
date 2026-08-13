import { NextResponse } from "next/server"
import { getDeletedContacts, restoreContact, permanentlyDeleteContact, clearTrash } from "@/lib/tools/db"
import { requireUser, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const contacts = await getDeletedContacts(uid)
    return NextResponse.json(contacts)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener papelera" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const body = await req.json()
    if (body.action === "restore" && body.id) {
      await restoreContact(Number(body.id), uid)
      return NextResponse.json({ success: true })
    }
    if (body.action === "permanent-delete" && body.id) {
      await permanentlyDeleteContact(Number(body.id), uid)
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Acción no válida" }, { status: 400 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al procesar solicitud" }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    await clearTrash(uid)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al vaciar papelera" }, { status: 500 })
  }
}
