import "./load-env.js"

/**
 * Diagnóstico: ¿la plantilla de derivación acepta la "consulta" con saltos de línea
 * como la que arma el resumen de una agenda?
 *
 * Se manda la misma plantilla dos veces al primer asesor:
 *   1) consulta en una sola línea  (como un handoff corto)
 *   2) consulta multilínea         (como el resumen real de la agenda)
 * y se imprime la respuesta cruda de Meta para comparar.
 *
 * Uso:  node scripts/test-notify-consulta.js
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

// Resumen real de una agenda: muchas claves unidas con \n (igual que resumenConversacion).
const agendaConsulta = [
  "contacto: Carla",
  "email: carla@mail.com",
  "facturacion: medio_300k",
  "disposicion: caliente",
  "horario: 2026-10-29T11:30:00.000000Z",
  "horario_texto: jueves 29 de octubre de 2026 a las 11:30",
  "fecha: 29/10/2026",
  "hora: 11:30",
  "saludo: muy buen día",
  "calendly_reservado: true",
].join("\n")

// Handoff corto: una sola línea.
const handoffConsulta = "contacto: Juan, email: juan@mail.com, facturacion: alto"

console.log("=== Configuración ===")
console.log("Plantilla :", templateName, `(idioma: ${language})`)
console.log("Números   :", numeros.length, numeros)
console.log("")

if (!token || !phoneId) {
  console.error("Faltan WHATSAPP_CLOUD_TOKEN o WHATSAPP_CLOUD_PHONE_ID.")
  process.exit(1)
}
if (!numeros.length) {
  console.error("No hay números en BOT_ASESOR_PHONES ni WHATSAPP_ADMIN_PHONE.")
  process.exit(1)
}

const to = normalizePhone(numeros[0])

async function probar(label, consulta) {
  const body = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: language },
      components: [
        { type: "body", parameters: [{ type: "text", text: "5490000000000" }, { type: "text", text: consulta }] },
      ],
    },
  }
  console.log(`--- ${label} (${consulta.length} chars, ${consulta.split("\n").length} línea/s) ---`)
  try {
    const res = await fetch(`https://graph.facebook.com/v22.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) console.log("OK ✅", data.messages?.[0]?.id || JSON.stringify(data))
    else {
      console.log("ERROR ❌ HTTP", res.status)
      console.log(JSON.stringify(data, null, 2))
    }
  } catch (err) {
    console.log("ERROR ❌", err.message)
  }
  console.log("")
}

await probar("HANDOFF (1 línea)", handoffConsulta)
await probar("AGENDA (multilínea)", agendaConsulta)
