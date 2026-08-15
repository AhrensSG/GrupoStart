export const AI_CONFIG = {
  enabled: process.env.WHATSAPP_AI_ENABLED === "true",
  apiKey: process.env.OPENAI_API_KEY || "",
  model: process.env.AI_MODEL || "gpt-4o-mini",
  maxTokens: Number(process.env.AI_MAX_TOKENS || 350),
  temperature: Number(process.env.AI_TEMPERATURE || 0.7),
  delayMinMs: Number(process.env.AI_DELAY_MIN_MS || 2000),
  delayMaxMs: Number(process.env.AI_DELAY_MAX_MS || 5000),
  historyLimit: Number(process.env.AI_HISTORY_LIMIT || 20),
  pauseMinutes: Number(process.env.AI_PAUSE_MINUTES || 60),
  adminPhone: String(process.env.WHATSAPP_ADMIN_PHONE || "").replace(/\D/g, ""),
  meetingMarker: "<<MEETING>>",
}
