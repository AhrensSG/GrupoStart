import { NextResponse } from "next/server"
import { getContact, deleteContact, updateContactWithRounds } from "@/lib/tools/db"

export async function GET(_req, { params }) {
  try {
    const { id } = await params
    const contact = await getContact(Number(id))
    if (!contact) {
      return NextResponse.json({ error: "Contacto no encontrado" }, { status: 404 })
    }
    return NextResponse.json(contact)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener contacto" }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const body = await req.json()
    const contactId = Number(id)

    if (body.nombre !== undefined && (!body.nombre || !body.nombre.trim())) {
      return NextResponse.json({ error: "El nombre no puede estar vacío" }, { status: 400 })
    }

    await updateContactWithRounds(contactId, {
      nombre: body.nombre?.trim(),
      celular: body.celular,
      email: body.email,
      red_social: body.red_social,
      nombre_usuario: body.nombre_usuario,
      pinned: body.pinned,
    }, body.contactos)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al actualizar contacto" }, { status: 500 })
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params
    await deleteContact(Number(id))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al eliminar contacto" }, { status: 500 })
  }
}
