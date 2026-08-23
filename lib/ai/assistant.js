import { AI_CONFIG } from "./config.js"
import { buildSystemPrompt } from "./system-prompt.js"

const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

const VALID_STAGES = new Set([
  "inicio",
  "consentimiento",
  "equipo",
  "areas",
  "facturacion",
  "alternativa_objetivo",
  "alternativa_presupuesto",
  "motor_valor",
  "intencion",
  "agenda_dia",
  "agenda_email",
  "cierre",
])

const VALID_OUTCOMES = new Set([
  "reunion_propuesta",
  "interesado",
  "solucion_alternativa",
  "lead_contenido",
  "descartado",
])

function toChatMessages(history) {
  return (history || [])
    .filter((m) => m && typeof m.body === "string" && m.body.trim())
    .map((m) => ({
      role: m.direction === "in" ? "user" : "assistant",
      content: m.body.slice(0, 2000),
    }))
}

function extractJson(text) {
  const start = text.indexOf("{")
  const end = text.lastIndexOf("}")
  if (start === -1 || end <= start) return null
  try {
    return JSON.parse(text.slice(start, end + 1))
  } catch {
    return null
  }
}

function sanitizeAction(action) {
  if (!action || typeof action !== "object") return null
  if (action.type === "meeting_request") {
    const when = String(action.when || "").trim()
    const mode = String(action.mode || "videollamada").trim()
    if (!when) return null
    return { type: "meeting_request", when, mode: mode.toLowerCase().includes("presen") ? "presencial" : "videollamada" }
  }
  if (action.type === "handoff") {
    const reason = String(action.reason || "").trim()
    return reason ? { type: "handoff", reason } : null
  }
  return null
}

function sanitizeUi(ui) {
  if (!ui || typeof ui !== "object") return null
  if (ui.type === "buttons") {
    const options = (ui.options || []).filter((o) => o && o.title).map((o) => ({ id: String(o.id || o.title).slice(0, 200), title: String(o.title).slice(0, 20) }))
    return options.length > 0 && options.length <= 3 ? { type: "buttons", options } : null
  }
  if (ui.type === "list") {
    const options = (ui.options || []).filter((o) => o && o.title).map((o) => ({
      id: String(o.id || o.title).slice(0, 200),
      title: String(o.title).slice(0, 24),
      description: o.description ? String(o.description).slice(0, 72) : undefined,
    }))
    return options.length > 0 && options.length <= 10 ? { type: "list", buttonText: String(ui.buttonText || "Ver opciones").slice(0, 20), options } : null
  }
  return null
}

export async function generateReply({ history = [], customerName = "", state = {}, now } = {}) {
  if (!AI_CONFIG.apiKey) {
    throw new Error("OPENAI_API_KEY no está configurada")
  }

  const messages = [
    { role: "system", content: buildSystemPrompt({ customerName, now, state }) },
    ...toChatMessages(history).slice(-AI_CONFIG.historyLimit),
  ]

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages,
      max_tokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature,
      response_format: { type: "json_object" },
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(`OpenAI respondió ${res.status}: ${detail.slice(0, 500)}`)
  }

  const data = await res.json()
  const raw = (data.choices?.[0]?.message?.content || "").trim()
  const parsed = extractJson(raw)

  if (!parsed || typeof parsed.reply !== "string" || !parsed.reply.trim()) {
    return { reply: raw, stageUpdate: null, profileUpdates: {}, action: null, outcome: null, ui: null }
  }

  const profileUpdates =
    parsed.profile_updates && typeof parsed.profile_updates === "object" && !Array.isArray(parsed.profile_updates)
      ? Object.fromEntries(
          Object.entries(parsed.profile_updates)
            .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
            .map(([k, v]) => [k, String(v).slice(0, 300)])
        )
      : {}

  return {
    reply: parsed.reply.trim(),
    stageUpdate: VALID_STAGES.has(parsed.stage) ? parsed.stage : null,
    profileUpdates,
    action: sanitizeAction(parsed.action),
    outcome: VALID_OUTCOMES.has(parsed.outcome) ? parsed.outcome : null,
    ui: sanitizeUi(parsed.ui),
  }
}
