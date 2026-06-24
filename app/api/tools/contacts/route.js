import { NextResponse } from "next/server"
import { getAllContacts, createContact } from "@/lib/tools/db"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")
    if (!uid) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }
    const contacts = await getAllContacts(uid)
    return NextResponse.json(contacts)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener contactos" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { uid, nombre, celular, email, red_social, nombre_usuario, contactos } = body

    if (!uid) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }
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
