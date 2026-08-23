import { AI_CONFIG } from "./config.js"
import { getFlowUi, getNextStage, isValidEmail, normalizeProfileUpdates, normalizeStage } from "./flow.js"
import { buildSystemPrompt } from "./system-prompt.js"

const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

const VALID_STAGES = new Set([
  "inicio",
  "consentimiento",
  "equipo",
  "areas",
  "facturacion",
  "alternativa_confirmacion",
  "alternativa_objetivo",
  "alternativa_presupuesto",
  "motor_valor",
  "prioridad",
  "intencion",
  "agenda_dia",
  "agenda_email",
  "no_fit",
  "reunion_existente",
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
  const normalizedState = {
    ...state,
    stage: normalizeStage(state.stage),
    profile: normalizeProfileUpdates(state.profile),
  }
  const latestUserMessage = [...history].reverse().find((m) => m?.direction === "in")?.body || ""
  const hasExistingMeeting = Boolean(normalizedState.proposedMeeting?.when)
  if (hasExistingMeeting && /^(hola|buenas|buen dia|buen día|buenas tardes|buenas noches|si|sí|si, comenzar|sí, comenzar)$/i.test(latestUserMessage.trim())) {
    const when = normalizedState.proposedMeeting.when
    const mode = normalizedState.proposedMeeting.mode === "presencial" ? "presencial" : "videollamada"
    return {
      reply: `Hola${customerName ? ` ${customerName}` : ""}. Tenemos registrada tu reunión propuesta para ${when} (${mode}). Si querés, puedo ayudarte a consultar la información de Grupo Start o pedir un cambio de horario.`,
      stageUpdate: "reunion_existente",
      profileUpdates: {},
      action: null,
      outcome: "reunion_propuesta",
      ui: getFlowUi("reunion_existente"),
    }
  }
  if (!AI_CONFIG.apiKey) {
    throw new Error("OPENAI_API_KEY no está configurada")
  }

  const messages = [
    { role: "system", content: buildSystemPrompt({ customerName, now, state: normalizedState }) },
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

  const profileUpdates = normalizeProfileUpdates(parsed.profile_updates)
  const stateStage = normalizedState.stage
  const deterministicStage = getNextStage(stateStage, latestUserMessage)
  const parsedStage = normalizeStage(parsed.stage)
  const stageUpdate = deterministicStage || (VALID_STAGES.has(parsedStage) ? parsedStage : null)
  const mergedProfile = { ...normalizedState.profile, ...profileUpdates }
  const action = sanitizeAction(parsed.action)
  if (action?.type === "meeting_request" && !isValidEmail(mergedProfile.email)) {
    return {
      reply: parsed.reply.trim(),
      stageUpdate,
      profileUpdates,
      action: null,
      outcome: null,
      ui: getFlowUi(stageUpdate),
    }
  }

  return {
    reply: parsed.reply.trim(),
    stageUpdate,
    profileUpdates,
    action,
    outcome: VALID_OUTCOMES.has(parsed.outcome) ? parsed.outcome : null,
    ui: getFlowUi(stageUpdate) || sanitizeUi(parsed.ui),
  }
}
