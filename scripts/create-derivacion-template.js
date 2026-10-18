import "./load-env.js"

/**
 * Crea la plantilla de derivación a asesores en el WABA configurado.
 * Nombre por defecto: gs_derivacion_ia (idioma es), con 2 variables:
 *   {{1}} = número del cliente
 *   {{2}} = consulta / resumen
 *
 * Uso:  node scripts/create-derivacion-template.js
 */

const token = process.env.WHATSAPP_CLOUD_TOKEN || ""
const wabaId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || process.env.WHATSAPP_WABA_ID || "1331263012003802"
const nombre = process.env.WHATSAPP_TEMPLATE_DERIVACION || "gs_derivacion_ia_v3"
const idioma = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "es"

if (!token) {
  console.error("Falta WHATSAPP_CLOUD_TOKEN")
  process.exit(1)
}

const body = {
  name: nombre,
  language: idioma,
  category: "UTILITY",
  components: [
    {
      type: "BODY",
      text:
        "Actualización del asistente Sofi IA: el cliente {{1}} hizo una consulta que no " +
        "pude resolver. La consulta fue: {{2}}. Necesita que un asesor humano lo contacte " +
        "a la brevedad.",
      example: {
        body_text: [["5493704302928", "Quiero informacion del plan de marketing"]],
      },
    },
  ],
}

async function main() {
  console.log("Creando plantilla:", nombre, `(${idioma}) en WABA ${wabaId}`)
  const res = await fetch(`https://graph.facebook.com/v22.0/${wabaId}/message_templates`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (res.ok) {
    console.log("OK ✅", JSON.stringify(data, null, 2))
  } else {
    console.log("ERROR ❌ HTTP", res.status)
    console.log(JSON.stringify(data, null, 2))
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
