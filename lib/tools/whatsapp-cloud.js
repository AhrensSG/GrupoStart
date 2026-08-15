const WHATSAPP_TOKEN = process.env.WHATSAPP_CLOUD_TOKEN || ""
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_CLOUD_PHONE_ID || ""
const TEMPLATE_LANGUAGE = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "es"
const MAX_LIST_CHARS = 800

const TEMPLATE_NAMES = {
  welcome: process.env.WHATSAPP_TEMPLATE_WELCOME || "",
  upcoming: process.env.WHATSAPP_TEMPLATE_UPCOMING || "",
  due: process.env.WHATSAPP_TEMPLATE_DUE || "",
  overdue: process.env.WHATSAPP_TEMPLATE_OVERDUE || "",
  meeting: process.env.WHATSAPP_TEMPLATE_MEETING || "",
}

function normalizePhone(phone) {
  let cleaned = phone.replace(/[\s\-\+\(\)]/g, "").replace(/^0+/, "")
  if (!cleaned.startsWith("54")) cleaned = "54" + cleaned
  if (cleaned.startsWith("54") && !cleaned.startsWith("549")) cleaned = "549" + cleaned.slice(2)
  return "+" + cleaned
}

function truncateList(names) {
  let list = names.join(", ")
  if (list.length > MAX_LIST_CHARS) {
    let trimmed = []
    let total = 0
    for (const n of names) {
      const line = `${n}, `
      if (total + line.length + 1 > MAX_LIST_CHARS) break
      trimmed.push(n)
      total += line.length
    }
    const remaining = names.length - trimmed.length
    list = trimmed.join(", ")
    if (remaining > 0) list += `… y ${remaining} más`
  }
  return list
}

export async function sendTextViaWhatsApp(phone, message) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.warn("[WhatsApp Cloud] Token o Phone ID no configurados, saltando mensaje a", phone)
    return false
  }
  try {
    const res = await fetch(`https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: normalizePhone(phone),
        text: { body: message },
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error("[WhatsApp Cloud] Error:", err.error?.message || res.statusText)
      return false
    }
    const data = await res.json().catch(() => ({}))
    return data.messages?.[0]?.id || true
  } catch (err) {
    console.error("[WhatsApp Cloud] Send error:", err.message)
    return false
  }
}

async function sendTemplateViaWhatsApp(phone, templateName, parameters) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.warn("[WhatsApp Cloud] Token o Phone ID no configurados, saltando plantilla a", phone)
    return false
  }
  if (!templateName) {
    console.warn("[WhatsApp Cloud] No hay plantilla configurada para enviar a", phone)
    return false
  }
  try {
    const body = {
      messaging_product: "whatsapp",
      to: normalizePhone(phone),
      type: "template",
      template: {
        name: templateName,
        language: { code: TEMPLATE_LANGUAGE },
      },
    }
    if (parameters.length > 0) {
      body.template.components = [
        { type: "body", parameters: parameters.map((p) => ({ type: "text", text: String(p) })) },
      ]
    }
    const res = await fetch(`https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error("[WhatsApp Cloud] Template error:", err.error?.message || res.statusText)
      return false
    }
    return true
  } catch (err) {
    console.error("[WhatsApp Cloud] Template send error:", err.message)
    return false
  }
}

async function sendWithTemplate(phone, templateName, parameters, fallbackText) {
  const ok = await sendTemplateViaWhatsApp(phone, templateName, parameters)
  if (ok) return true
  console.warn("[WhatsApp Cloud] Plantilla falló; reintentando como texto libre (solo funciona dentro de la ventana de 24 hs)")
  return sendTextViaWhatsApp(phone, fallbackText)
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
  return sendWithTemplate(phone, TEMPLATE_NAMES.welcome, [userName || "Usuario"], msg)
}

export async function sendUpcomingReminder(phone, contactNames) {
  const count = contactNames.length
  const list = truncateList(contactNames)
  const msg = [
    `📅 *Recordatorio de seguimiento próximos*`,
    "",
    `Tenés *${count} contacto${count > 1 ? "s" : ""}* que tenés que contactar mañana:`,
    "",
    list,
    "",
    "Prepará tu mensaje y no pierdas la oportunidad. 💪",
  ].join("\n")
  return sendWithTemplate(phone, TEMPLATE_NAMES.upcoming, [count, list], msg)
}

export async function sendDueNowReminder(phone, contactNames) {
  const count = contactNames.length
  const list = truncateList(contactNames)
  const msg = [
    `⏰ *¡Es hora de hacer el seguimiento!*`,
    "",
    `Tenés *${count} contacto${count > 1 ? "s" : ""}* programado${count > 1 ? "s" : ""} para hoy:`,
    "",
    list,
    "",
    "No dejes pasar la fecha, ¡es ahora! 📲",
  ].join("\n")
  return sendWithTemplate(phone, TEMPLATE_NAMES.due, [count, list], msg)
}

export async function sendOverdueReminder(phone, contactNames) {
  const count = contactNames.length
  const list = truncateList(contactNames.map((n) => `${n} (vencido)`))
  const msg = [
    `⚠️ *Alerta de plazo vencido*`,
    "",
    `*${count} contacto${count > 1 ? "s" : ""}* ya pasó la fecha de seguimiento pactada y no cambiaste su estado:`,
    "",
    list,
    "",
    "Actualizá la clasificación para evitar que se acumulen vencidos. 📋",
  ].join("\n")
  return sendWithTemplate(phone, TEMPLATE_NAMES.overdue, [count, list], msg)
}

export async function sendMeetingNotification(phone, { name, when, mode, summary } = {}) {
  const msg = [
    "📅 *Reunión pactada por WhatsApp*",
    `👤 Cliente: ${name || "—"}`,
    `🗓️ Cuándo: ${when || "—"}`,
    `🎥 Modalidad: ${mode || "—"}`,
    `💼 Necesidad: ${summary || "—"}`,
  ].join("\n")
  return sendWithTemplate(phone, TEMPLATE_NAMES.meeting, [name || "—", when || "—", mode || "—", summary || "—"], msg)
}
