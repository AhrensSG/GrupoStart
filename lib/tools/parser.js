import * as XLSX from "xlsx"

const KNOWN_CLASIFICACIONES = new Set([
  "Pendiente", "Interesado", "Potencial cliente", "Comprador",
  "No interesado", "No hubo respuesta",
])

function serialToDate(serial) {
  if (!serial || serial < 1) return ""
  const date = new Date(Math.round((serial - 25569) * 86400 * 1000))
  if (isNaN(date.getTime())) return ""
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function clean(v) {
  if (v === undefined || v === null) return ""
  if (typeof v === "number") {
    if (v > 40000 && v < 60000) return serialToDate(v)
    return String(v)
  }
  const s = String(v).trim()
  return s === "30/12/1899" ? "" : s
}

export function parseSheet(data) {
  const workbook = XLSX.read(data, { type: "array", raw: true })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 })
  const dataRows = rows.filter((r) => {
    const name = clean(r[1])
    return name.length > 1 && !name.includes("Nombre")
  })
  const contacts = []
  for (const row of dataRows) {
    const nombre = clean(row[1])
    if (!nombre) continue
    const colE = clean(row[4])
    const useNewFormat = colE !== "" && !KNOWN_CLASIFICACIONES.has(colE)
    let redSocial = ""
    let nombreUsuario = ""
    let roundBase = 4
    if (useNewFormat) {
      redSocial = colE
      nombreUsuario = clean(row[5])
      roundBase = 6
    }
    const contactos = []
    for (let i = 0; i < 5; i++) {
      const base = roundBase + i * 4
      contactos.push({
        clasificacion: clean(row[base]),
        fecha: clean(row[base + 1]),
        estado: clean(row[base + 2]),
        hora_proximo_contacto: clean(row[base + 3]),
      })
    }
    contacts.push({
      nombre,
      celular: clean(row[2]),
      email: clean(row[3]),
      red_social: redSocial,
      nombre_usuario: nombreUsuario,
      contactos,
    })
  }
  return contacts
}
