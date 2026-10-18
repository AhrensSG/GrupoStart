import "./load-env.js"

/**
 * Diagnóstico de notificaciones a asesores.
 * Prueba el envío real de la plantilla de derivación a cada número configurado
 * en BOT_ASESOR_PHONES y muestra la respuesta cruda de Meta (incluye el error).
 *
 * Uso:  node scripts/test-notify.js
 */

const token = process.env.WHATSAPP_CLOUD_TOKEN || ""
const phoneId = process.env.WHATSAPP_CLOUD_PHONE_ID || ""
const templateName = process.env.WHATSAPP_TEMPLATE_DERIVACION || "gs_derivacion_ia"
const language = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "es"

function normalizePhone(phone) {
  let cleaned = String(phone).replace(/[\s\-\+\(\)]/g, "").replace(/^0+/, "")
  if (cleaned.startsWith("549")) return "+" + cleaned
  if (cleaned.startsWith("54") && cleaned.length >= 12) return "+" + cleaned
  if (/^9[1-4]\d{9}$/.test(cleaned)) return "+54" + cleaned
  if (cleaned.length >= 11) return "+" + cleaned
  if (!cleaned.startsWith("54")) cleaned = "54" + cleaned
  if (cleaned.startsWith("54") && !cleaned.startsWith("549")) cleaned = "549" + cleaned.slice(2)
  return "+" + cleaned
}

const numeros = (process.env.BOT_ASESOR_PHONES || process.env.WHATSAPP_ADMIN_PHONE || "")
  .split(",")
  .map((n) => n.replace(/\D/g, ""))
  .filter(Boolean)

console.log("=== Configuración ===")
console.log("BOT_ASESOR_PHONES :", process.env.BOT_ASESOR_PHONES || "(vacío)")
console.log("WHATSAPP_ADMIN    :", process.env.WHATSAPP_ADMIN_PHONE || "(vacío)")
console.log("Números detectados:", numeros.length, numeros)
console.log("Token presente    :", Boolean(token))
console.log("Phone ID presente :", Boolean(phoneId), phoneId)
console.log("Plantilla         :", templateName, `(idioma: ${language})`)
console.log("")

if (!token || !phoneId) {
  console.error("Faltan WHATSAPP_CLOUD_TOKEN o WHATSAPP_CLOUD_PHONE_ID. No se puede enviar.")
  process.exit(1)
}
if (!numeros.length) {
  console.error("No hay números en BOT_ASESOR_PHONES ni WHATSAPP_ADMIN_PHONE. No hay a quién notificar.")
  process.exit(1)
}

async function probar(numero) {
  const to = normalizePhone(numero)
  const body = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: language },
      components: [
        { type: "body", parameters: [{ type: "text", text: "5490000000000" }, { type: "text", text: "consulta de prueba" }] },
      ],
    },
  }

  console.log(`--- Enviando a ${numero} -> ${to} ---`)
  try {
    const res = await fetch(`https://graph.facebook.com/v22.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      console.log("OK ✅", data.messages?.[0]?.id || JSON.stringify(data))
    } else {
      console.log("ERROR ❌ HTTP", res.status)
      console.log(JSON.stringify(data, null, 2))
    }
  } catch (err) {
    console.log("ERROR ❌", err.message)
  }
  console.log("")
}

for (const numero of numeros) {
  await probar(numero)
}
