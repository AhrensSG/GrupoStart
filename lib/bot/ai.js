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

  const system = [
    "Sos asistente comercial de Grupo Start.",
    "Objetivo: responder brevemente preguntas fuera del flujo de botones.",
    "Reglas:",
    "- Responde en espanol neutro, tono humano y claro.",
    "- No inventes precios, plazos ni datos que no conozcas.",
    "- Si falta informacion, deci que un asesor humano lo confirma.",
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
    return text ? String(text).trim() : null
  } catch (err) {
    console.error("[Bot IA] Fallo consultando OpenAI:", err?.message || err)
    return null
  }
}
