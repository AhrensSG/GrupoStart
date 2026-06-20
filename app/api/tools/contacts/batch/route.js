import { NextResponse } from "next/server"
import { createContact } from "@/lib/tools/db"

export async function POST(req) {
  try {
    const body = await req.json()
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Se esperaba un array de contactos" }, { status: 400 })
    }

    const results = []
    for (const contact of body) {
      const { nombre, celular, email, red_social, nombre_usuario, contactos } = contact
      if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
        results.push({ error: "El nombre es requerido", contact })
        continue
      }
      const id = await createContact({
        nombre: nombre.trim(),
        celular: celular || "",
        email: email || "",
        red_social: red_social || "",
        nombre_usuario: nombre_usuario || "",
        contactos: Array.isArray(contactos) ? contactos : [],
      })
      results.push({ id })
    }

    return NextResponse.json({ imported: results.filter((r) => r.id).length, total: body.length }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al importar contactos" }, { status: 500 })
  }
}
