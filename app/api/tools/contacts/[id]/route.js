import { NextResponse } from "next/server"
import { getContact, updateContact, updateContactRound, deleteContact } from "@/lib/tools/db"

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

    await updateContact(contactId, {
      nombre: body.nombre?.trim(),
      celular: body.celular,
      email: body.email,
      red_social: body.red_social,
      nombre_usuario: body.nombre_usuario,
    })

    if (body.contactos && Array.isArray(body.contactos)) {
      for (let i = 0; i < body.contactos.length; i++) {
        const r = body.contactos[i]
        if (r.clasificacion !== undefined || r.fecha !== undefined || r.estado !== undefined || r.hora_proximo_contacto !== undefined || r.proxima_fecha !== undefined) {
          await updateContactRound(contactId, i, {
            clasificacion: r.clasificacion,
            fecha: r.fecha,
            estado: r.estado,
            hora_proximo_contacto: r.hora_proximo_contacto,
            proxima_fecha: r.proxima_fecha,
          })
        }
      }
    }

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
