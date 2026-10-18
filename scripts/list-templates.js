import "./load-env.js"

/**
 * Lista las plantillas de WhatsApp disponibles en el WABA configurado.
 * Sirve para saber el nombre/idioma/estado exactos de cada plantilla.
 *
 * Uso:  node scripts/list-templates.js [filtro]
 *   El filtro opcional busca en el nombre (ej: derivacion).
 */

const token = process.env.WHATSAPP_CLOUD_TOKEN || ""
const wabaId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || process.env.WHATSAPP_WABA_ID || "1331263012003802"

if (!token) {
  console.error("Falta WHATSAPP_CLOUD_TOKEN")
  process.exit(1)
}

const filtro = (process.argv[2] || "").toLowerCase()

async function main() {
  let url = `https://graph.facebook.com/v22.0/${wabaId}/message_templates?limit=200&fields=name,status,language,category`
  const templates = []

  // Meta pagina de a 10: hay que seguir paging.next para traerlas todas.
  while (url) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.log("ERROR ❌ HTTP", res.status)
      console.log(JSON.stringify(data, null, 2))
      return
    }
    for (const t of data.data || []) templates.push(t)
    url = data.paging?.next || null
  }

  console.log(`WABA ${wabaId} — ${templates.length} plantillas`)
  console.log("")

  const filtradas = filtro ? templates.filter((t) => String(t.name).toLowerCase().includes(filtro)) : templates
  if (!filtradas.length) {
    console.log(filtro ? `No hay plantillas que contengan "${filtro}"` : "No hay plantillas")
    return
  }

  for (const t of filtradas) {
    console.log(`${String(t.status).padEnd(10)} | ${String(t.language).padEnd(6)} | ${t.name}`)
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
