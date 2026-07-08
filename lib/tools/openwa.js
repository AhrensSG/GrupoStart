const OPENWA_API_URL = process.env.OPENWA_API_URL || "http://localhost:2785"
const OPENWA_API_KEY = process.env.OPENWA_API_KEY || ""
const OPENWA_SESSION_ID = process.env.OPENWA_SESSION_ID || "default"

function normalizePhone(phone) {
  let cleaned = phone.replace(/[\s\-\+\(\)]/g, "").replace(/^0+/, "")
  if (!cleaned.startsWith("54")) cleaned = "54" + cleaned
  if (cleaned.startsWith("54") && !cleaned.startsWith("549")) cleaned = "549" + cleaned.slice(2)
  return cleaned
}

async function sendTextViaOpenWA(phone, message) {
  if (!OPENWA_API_KEY) {
    console.warn("[OpenWA] API key not configured, skipping message to", phone)
    return false
  }
  const chatId = `${normalizePhone(phone)}@c.us`
  try {
    const res = await fetch(`${OPENWA_API_URL}/api/sessions/${OPENWA_SESSION_ID}/messages/send-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": OPENWA_API_KEY,
      },
      body: JSON.stringify({ chatId, text: message }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error("[OpenWA] Error sending message:", err.message || res.statusText)
      return false
    }
    return true
  } catch (err) {
    console.error("[OpenWA] Send error:", err.message)
    return false
  }
}

export async function sendWelcomeMessage(phone, userName) {
  const msg = [
    `¡Hola ${userName}! 👋`,
    "",
    "Te damos la bienvenida a *GrupoStart*. A partir de ahora recibirás notificaciones por WhatsApp para que no se te pase ningún seguimiento.",
    "",
    "📌 *Recordatorios que recibirás:*",
    "• Un día antes de cada fecha de contacto.",
    "• El mismo día cuando sea la hora de contactar.",
    "• Si se vence un plazo sin haber cambiado el estado.",
    "",
    "¡Éxitos con tus leads! 🚀",
  ].join("\n")
  return sendTextViaOpenWA(phone, msg)
}

export async function sendUpcomingReminder(phone, contactNames) {
  const count = contactNames.length
  const list = contactNames.map((n) => `• ${n}`).join("\n")
  const msg = [
    `📅 *Recordatorio de seguimiento próximos*`,
    "",
    `Tenés *${count} contacto${count > 1 ? "s" : ""}* que tenés que contactar mañana:`,
    "",
    list,
    "",
    "Prepará tu mensaje y no pierdas la oportunidad. 💪",
  ].join("\n")
  return sendTextViaOpenWA(phone, msg)
}

export async function sendDueNowReminder(phone, contactNames) {
  const count = contactNames.length
  const list = contactNames.map((n) => `• ${n}`).join("\n")
  const msg = [
    `⏰ *¡Es hora de hacer el seguimiento!*`,
    "",
    `Tenés *${count} contacto${count > 1 ? "s" : ""}* programado${count > 1 ? "s" : ""} para hoy:`,
    "",
    list,
    "",
    "No dejes pasar la fecha, ¡es ahora! 📲",
  ].join("\n")
  return sendTextViaOpenWA(phone, msg)
}

export async function sendOverdueReminder(phone, contactNames) {
  const count = contactNames.length
  const list = contactNames.map((n) => `• ${n} (vencido)`).join("\n")
  const msg = [
    `⚠️ *Alerta de plazo vencido*`,
    "",
    `*${count} contacto${count > 1 ? "s" : ""}* ya pasó la fecha de seguimiento pactada y no cambiaste su estado:`,
    "",
    list,
    "",
    "Actualizá la clasificación para evitar que se acumulen vencidos. 📋",
  ].join("\n")
  return sendTextViaOpenWA(phone, msg)
}