import { NextResponse } from "next/server"
import { getAllContacts, createContact } from "@/lib/tools/db"
import { requireUser, unauthorizedResponse } from "@/lib/auth/server"

export async function GET(req) {
  try {
    const authUser = await requireUser(req)
    if (!authUser) {
      return unauthorizedResponse()
    }
    const uid = authUser.uid
    const contacts = await getAllContacts(uid)
    return NextResponse.json(contacts)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener contactos" }, { status: 500 })
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
    const { nombre, celular, email, red_social, nombre_usuario, contactos } = body

    if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
      return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 })
    }

    const id = await createContact({
      nombre: nombre.trim(),
      celular: celular || "",
      email: email || "",
      red_social: red_social || "",
      nombre_usuario: nombre_usuario || "",
      contactos: Array.isArray(contactos) ? contactos : [],
    }, uid)

    return NextResponse.json({ id }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al crear contacto" }, { status: 500 })
  }
}
