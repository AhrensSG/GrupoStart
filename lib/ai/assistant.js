import { AI_CONFIG } from "./config.js"
import { buildSystemPrompt } from "./system-prompt.js"

const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

function toChatMessages(history) {
  return (history || [])
    .filter((m) => m && typeof m.body === "string" && m.body.trim())
    .map((m) => ({
      role: m.direction === "in" ? "user" : "assistant",
      content: m.body.slice(0, 2000),
    }))
}

function parseMeeting(content) {
  const lines = content.split("\n")
  const idx = lines.findIndex((l) => l.startsWith(AI_CONFIG.meetingMarker))
  if (idx === -1) return null
  const payload = lines[idx].slice(AI_CONFIG.meetingMarker.length).trim()
  const [name, phone, when, mode, summary] = payload.split("|").map((s) => (s || "").trim())
  return { name, phone, when, mode, summary }
}

export async function generateReply({ history = [], customerName = "", now } = {}) {
  if (!AI_CONFIG.apiKey) {
    throw new Error("OPENAI_API_KEY no está configurada")
  }

  const messages = [
    { role: "system", content: buildSystemPrompt({ customerName, now }) },
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
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(`OpenAI respondió ${res.status}: ${detail.slice(0, 500)}`)
  }

  const data = await res.json()
  const raw = (data.choices?.[0]?.message?.content || "").trim()

  let reply = raw
  let meeting = null
  const markerIdx = raw.split("\n").findIndex((l) => l.startsWith(AI_CONFIG.meetingMarker))
  if (markerIdx !== -1) {
    meeting = parseMeeting(raw)
    reply = raw.split("\n").filter((_, i) => i !== markerIdx).join("\n").trim()
  }

  return { reply, meeting }
}
