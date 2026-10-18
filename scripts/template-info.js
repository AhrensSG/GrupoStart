import "./load-env.js"

/**
 * Muestra detalles de las plantillas (incluye motivo de rechazo y componentes)
 * y el estado de la cuenta / número.
 *
 * Uso:  node scripts/template-info.js [nombre]
 */

const token = process.env.WHATSAPP_CLOUD_TOKEN || ""
const wabaId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || process.env.WHATSAPP_WABA_ID || "1331263012003802"
const phoneId = process.env.WHATSAPP_CLOUD_PHONE_ID || ""

if (!token) {
  console.error("Falta WHATSAPP_CLOUD_TOKEN")
  process.exit(1)
}

const filtro = (process.argv[2] || "").toLowerCase()

async function get(url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data }
}

async function main() {
  console.log("=== WABA ===")
  const waba = await get(`https://graph.facebook.com/v22.0/${wabaId}?fields=id,name,account_review_status,message_template_namespace,currency,timezone_id`)
  console.log(JSON.stringify(waba.data, null, 2))
  console.log("")

  console.log("=== NÚMERO ===")
  if (phoneId) {
    const num = await get(`https://graph.facebook.com/v22.0/${phoneId}?fields=id,display_phone_number,verified_name,quality_rating,status,account_mode,code_verification_status`)
    console.log(JSON.stringify(num.data, null, 2))
  } else {
    console.log("(sin WHATSAPP_CLOUD_PHONE_ID)")
  }
  console.log("")

  console.log("=== PLANTILLAS (detalle) ===")
  const url = `https://graph.facebook.com/v22.0/${wabaId}/message_templates?limit=200&fields=name,status,language,category,rejected_reason,components`
  const res = await get(url)
  if (!res.ok) {
    console.log("ERROR ❌ HTTP", res.status)
    console.log(JSON.stringify(res.data, null, 2))
    return
  }
  for (const t of res.data.data || []) {
    if (filtro && !String(t.name).toLowerCase().includes(filtro)) continue
    console.log(`\n--- ${t.name} | ${t.language} | ${t.status} | ${t.category} ---`)
    if (t.rejected_reason) console.log("Motivo rechazo:", t.rejected_reason)
    const body = (t.components || []).find((c) => c.type === "BODY")
    if (body) console.log("Body:", body.text)
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
