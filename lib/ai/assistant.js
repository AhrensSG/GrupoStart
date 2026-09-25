import { AI_CONFIG } from "./config.js"
import { getFlowQuestion, getFlowUi, getNextStage, normalizeProfileUpdates, normalizeStage } from "./flow.js"
import { buildSystemPrompt } from "./system-prompt.js"
import { buildMotorVentasPrompt } from "./motor-ventas-prompt.js"

const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

const VALID_OUTCOMES = new Set(["reunion_propuesta", "interesado", "solucion_alternativa", "lead_contenido", "descartado"])

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
  try { return JSON.parse(text.slice(start, end + 1)) } catch { return null }
}

function sanitizeAction(action) {
  if (!action || typeof action !== "object") return null
  if (action.type === "meeting_request" && String(action.when || "").trim()) {
    return { type: "meeting_request", when: String(action.when).trim(), mode: String(action.mode || "videollamada").toLowerCase().includes("presen") ? "presencial" : "videollamada" }
  }
  if (action.type === "handoff" && String(action.reason || "").trim()) return { type: "handoff", reason: String(action.reason).trim() }
  if (action.type === "derivacion" && String(action.reason || "").trim()) return { type: "derivacion", reason: String(action.reason).trim().slice(0, 300) }
  return null
}

function completeReply(reply, stage, outcome) {
  let text = String(reply || "").trim()
  const question = getFlowQuestion(stage)
  if (question && stage !== "cierre" && stage !== "reunion_confirmada" && stage !== "no_fit" && !text.includes(question)) {
    text = `${text}\n\n${question}`
  }
  return text
}

export async function generateReply({ history = [], customerName = "", state = {}, now } = {}) {
  if (!AI_CONFIG.apiKey) {
    throw new Error("OPENAI_API_KEY no está configurada")
  }

  const stage = normalizeStage(state.stage === "inicio" ? "motor_ventas" : state.stage)
  const isMotorVentas = stage === "motor_ventas"
  const normalizedState = { ...state, stage, profile: normalizeProfileUpdates(state.profile), history }
  const latestUserMessage = [...history].reverse().find((m) => m?.direction === "in")?.body || ""

  if (!isMotorVentas) {
    const existingMeeting = normalizedState.proposedMeeting?.when
    if (existingMeeting && /^(hola|buenas|buen dia|buen día|buenas tardes|buenas noches|si|sí)$/i.test(latestUserMessage.trim())) {
      const mode = normalizedState.proposedMeeting.mode === "presencial" ? "presencial" : "videollamada"
      return { reply: `Tenemos registrada tu reunión para ${existingMeeting} (${mode}). Si querés, puedo ayudarte a consultar la información o cambiar el horario.`, stageUpdate: "reunion_existente", profileUpdates: {}, action: null, outcome: "reunion_propuesta", ui: getFlowUi("reunion_existente") }
    }
  }

  const systemContent = isMotorVentas
    ? buildMotorVentasPrompt({ customerName, now })
    : buildSystemPrompt({ customerName, now, state: normalizedState })

  const messages = [
    { role: "system", content: systemContent },
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
  if (!parsed || typeof parsed.reply !== "string") {
    if (isMotorVentas) {
      const action = sanitizeAction(parsed?.action)
      const derivacion = action?.type === "derivacion" ? action : null
      return { mode: "motor_ventas", reply: derivacion ? "" : raw, stageUpdate: derivacion ? "derivado" : "comenzamos", profileUpdates: {}, action: derivacion, outcome: null, ui: null }
    }
    return { reply: raw, stageUpdate: null, profileUpdates: {}, action: null, outcome: null, ui: null }
  }

  if (isMotorVentas) {
    const requested = sanitizeAction(parsed.action)
    const derivacion = requested?.type === "derivacion" ? requested : null
    const stageUpdate = derivacion ? "derivado" : "comenzamos"
    return {
      mode: "motor_ventas",
      reply: String(parsed.reply).trim(),
      stageUpdate,
      profileUpdates: normalizeProfileUpdates(parsed.profile_updates),
      action: derivacion,
      outcome: null,
      ui: getFlowUi(stageUpdate),
    }
  }

  const deterministicStage = getNextStage(normalizedState.stage, latestUserMessage)
  const stageUpdate = deterministicStage || normalizedState.stage
  const requestedAction = sanitizeAction(parsed.action)
  const action = requestedAction && (
    (requestedAction.type === "meeting_request" && (deterministicStage === "reunion_confirmada" || normalizedState.stage === "reunion_confirmada")) ||
    (requestedAction.type === "handoff" && normalizedState.stage === "areas")
  ) ? requestedAction : null
  const outcome = VALID_OUTCOMES.has(parsed.outcome) ? parsed.outcome : null
  const profileUpdates = normalizeProfileUpdates(parsed.profile_updates)
  const ui = getFlowUi(stageUpdate)
  return { reply: completeReply(parsed.reply, stageUpdate, outcome), stageUpdate, profileUpdates, action, outcome, ui }
}
