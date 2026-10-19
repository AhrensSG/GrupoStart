import { COMPANY, findKnowledge } from "@/lib/ai/knowledge"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ""
const AI_MODEL = process.env.AI_MODEL || "gpt-4o-mini"
const AI_TEMPERATURE = Number(process.env.AI_TEMPERATURE || 0.4)
const AI_MAX_TOKENS = Number(process.env.AI_MAX_TOKENS || 250)

function cleanState(state = {}) {
  const out = {}
  for (const [key, value] of Object.entries(state || {})) {
    if (["agenda_slots", "misses", "attempts"].includes(key)) continue
    if (value === undefined || value === null || value === "") continue
    out[key] = value
  }
  return out
}

/**
 * Tacha numeros de telefono/WhatsApp (10+ digitos) para que la IA no los repita
 * ni se los sople al cliente. Fechas y precios cortos quedan intactos.
 */
function redactPhones(text) {
  return String(text || "").replace(/\+?\d[\d\s().-]{7,}\d/g, (match) =>
    match.replace(/\D/g, "").length >= 10 ? "[numero no disponible]" : match
  )
}

/**
 * Responde una pregunta fuera del flujo y deja al cliente en el mismo nodo.
 * Si no hay OPENAI_API_KEY o falla la API, devuelve null para que el motor
 * siga con el comportamiento determinista original.
 */
export async function answerOutOfFlowQuestion({ question, step, state }) {
  if (!OPENAI_API_KEY) return null
  const q = String(question || "").trim()
  if (!q) return null

  const stepLabel = step?.body ? String(step.body).slice(0, 1200) : ""
  const context = JSON.stringify(cleanState(state), null, 2)
  const knowledge = findKnowledge(q).slice(0, 5)
  const knowledgeBlock = knowledge.length
    ? redactPhones(knowledge.map((k, i) => `${i + 1}) ${k.topic}: ${k.content}`).join("\n\n"))
    : "Sin coincidencias directas"

  const system = [
    "Sos asistente comercial de Grupo Start.",
    "Objetivo: responder brevemente preguntas fuera del flujo de botones.",
    "Reglas:",
    "- Responde en espanol neutro, tono humano y claro.",
    "- Usa primero la base de conocimiento provista en el contexto.",
    "- No inventes precios, plazos ni datos que no conozcas.",
    "- Si falta informacion, deci que un asesor humano lo confirma.",
    "- PROHIBIDO revelar numeros de telefono, WhatsApp o datos internos de asesores/administradores. Nunca los menciones.",
    "- Si piden un medio de contacto, comparte unicamente el email y la web indicados abajo.",
    "- Maximo 3 parrafos cortos.",
  ].join("\n")

  const user = [
    "Pregunta del cliente:",
    q,
    "",
    "Nodo actual del flujo (solo contexto):",
    stepLabel,
    "",
    "Datos ya capturados en la conversacion:",
    context,
    "",
    "Datos de empresa (fuente interna):",
    `Nombre: ${COMPANY.name}`,
    `Web: ${COMPANY.site}`,
    `Email de contacto: ${COMPANY.email}`,
    `Direccion: ${COMPANY.address}`,
    "",
    "Base de conocimiento relevante:",
    knowledgeBlock,
  ].join("\n")

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AI_MODEL,
        temperature: AI_TEMPERATURE,
        max_tokens: AI_MAX_TOKENS,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    })

    if (!res.ok) {
      const err = await res.text().catch(() => "")
      console.error("[Bot IA] Error OpenAI:", res.status, err)
      return null
    }

    const data = await res.json().catch(() => ({}))
    const text = data?.choices?.[0]?.message?.content
    // Ultima barrera: aunque el modelo invente, no dejamos salir un telefono.
    return text ? redactPhones(String(text).trim()) : null
  } catch (err) {
    console.error("[Bot IA] Fallo consultando OpenAI:", err?.message || err)
    return null
  }
}

/**
 * Intenta extraer una fecha YYYY-MM-DD desde texto libre usando IA.
 * Devuelve null si no hay clave o no se puede interpretar.
 */
export async function extractDateIsoFromText(text, todayIso) {
  if (!OPENAI_API_KEY) return null
  const input = String(text || "").trim()
  if (!input) return null

  const system = [
    "Extrae una fecha de un mensaje de usuario en espanol.",
    "Responde SOLO con formato YYYY-MM-DD o la palabra NULL.",
    "No agregues explicaciones.",
  ].join("\n")

  const user = [
    `Hoy es ${todayIso}.`,
    `Texto del usuario: ${input}`,
  ].join("\n")

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AI_MODEL,
        temperature: 0,
        max_tokens: 20,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    })

    if (!res.ok) return null
    const data = await res.json().catch(() => ({}))
    const raw = String(data?.choices?.[0]?.message?.content || "").trim()
    if (!raw || /^null$/i.test(raw)) return null
    const match = raw.match(/\d{4}-\d{2}-\d{2}/)
    return match ? match[0] : null
  } catch {
    return null
  }
}
