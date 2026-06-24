import { NextResponse } from "next/server"
import { parseSheet } from "@/lib/tools/parser"
import { replaceAllContacts } from "@/lib/tools/db"

export async function POST(req) {
  try {
    const body = await req.json()
    const { url, uid } = body

    if (!uid) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }

    const sheetUrl = url || "https://docs.google.com/spreadsheets/d/1GGX_VNpL7XIDDxqI0Cx1YE0eaVXrCXbxsncWqOpr-2A/export?format=csv&gid=1574587249"

    const res = await fetch(sheetUrl)
    if (!res.ok) {
      return NextResponse.json({ error: "No se pudo acceder al archivo de Google Sheets" }, { status: 502 })
    }

    const csvText = await res.text()
    const blob = new Blob([csvText], { type: "text/csv" })
    const buffer = await blob.arrayBuffer()
    const contacts = parseSheet(buffer)

    if (contacts.length === 0) {
      return NextResponse.json({ error: "No se encontraron contactos en el sheet" }, { status: 400 })
    }

    await replaceAllContacts(contacts, uid)

    return NextResponse.json({ imported: contacts.length })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al importar desde Google Sheets" }, { status: 500 })
  }
}
