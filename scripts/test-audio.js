import "./load-env.js"
import { readFile } from "node:fs/promises"
import path from "node:path"

// Uso:
//   node scripts/test-audio.js <archivo> <telefono> [voice|file]
// "voice" (default) convierte a OGG/Opus y lo manda como nota de voz.
// "file" lo manda tal cual, como audio común.
// Muestra la respuesta cruda de Meta (sirve para ver el error exacto).

const [filePath, phone, rawMode] = process.argv.slice(2)
const mode = rawMode === "file" ? "file" : "voice"

if (!filePath || !phone) {
  console.error("Uso: node scripts/test-audio.js <archivo> <telefono> [voice|file]")
  process.exit(1)
}

function normalizePhone(value) {
  let cleaned = String(value).replace(/[\s\-\+\(\)]/g, "").replace(/^0+/, "")
  if (cleaned.startsWith("549")) return "+" + cleaned
  if (cleaned.startsWith("54") && cleaned.length >= 12) return "+" + cleaned
  if (/^9[1-4]\d{9}$/.test(cleaned)) return "+54" + cleaned
  if (cleaned.length >= 11) return "+" + cleaned
  if (!cleaned.startsWith("54")) cleaned = "54" + cleaned
  if (cleaned.startsWith("54") && !cleaned.startsWith("549")) cleaned = "549" + cleaned.slice(2)
  return "+" + cleaned
}

function guessMime(name) {
  const ext = String(name || "").toLowerCase().split(".").pop()
  const map = {
    ogg: "audio/ogg",
    mp3: "audio/mpeg",
    m4a: "audio/mp4",
    aac: "audio/aac",
    amr: "audio/amr",
    opus: "audio/ogg",
    wav: "audio/wav",
    webm: "audio/webm",
  }
  return map[ext] || "application/octet-stream"
}

const token = process.env.WHATSAPP_CLOUD_TOKEN || ""
const phoneId = process.env.WHATSAPP_CLOUD_PHONE_ID || ""

console.log("=== Configuración ===")
console.log("token:", token ? "OK" : "FALTA")
console.log("phone_id:", phoneId || "FALTA")
console.log("modo:", mode)
console.log("")

if (!token || !phoneId) {
  console.error("Faltan WHATSAPP_CLOUD_TOKEN o WHATSAPP_CLOUD_PHONE_ID.")
  process.exit(1)
}

let buffer = await readFile(filePath)
let filename = path.basename(filePath)
let mimeType = guessMime(filename)

if (mode === "voice") {
  const { convertToOggOpus } = await import("../lib/tools/audio-convert.js")
  try {
    buffer = await convertToOggOpus(buffer)
    mimeType = "audio/ogg"
    filename = "test.ogg"
    console.log("convertido a ogg/opus:", buffer.length, "bytes")
  } catch (err) {
    console.error("ERROR convirtiendo audio:", err.message)
    process.exit(1)
  }
}

console.log("subiendo:", filename, "| mime:", mimeType, "| bytes:", buffer.length)
const form = new FormData()
form.append("messaging_product", "whatsapp")
form.append("file", new Blob([buffer], { type: mimeType }), filename)

const upRes = await fetch(`https://graph.facebook.com/v22.0/${phoneId}/media`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: form,
})
const upData = await upRes.json().catch(() => ({}))
console.log("UPLOAD", upRes.status, JSON.stringify(upData))
if (!upRes.ok || !upData?.id) process.exit(1)

const to = normalizePhone(phone)
const sendBody = {
  messaging_product: "whatsapp",
  to,
  type: "audio",
  audio: { id: upData.id, ...(mode === "voice" ? { voice: true } : {}) },
}
console.log("enviando a:", to)
const sendRes = await fetch(`https://graph.facebook.com/v22.0/${phoneId}/messages`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(sendBody),
})
const sendData = await sendRes.json().catch(() => ({}))
console.log("SEND", sendRes.status, JSON.stringify(sendData))
