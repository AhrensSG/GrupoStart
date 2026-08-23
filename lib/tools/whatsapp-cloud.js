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
  // Ya viene en formato internacional argentino (549... o 54...): lo dejamos así.
  if (cleaned.startsWith("549")) return "+" + cleaned
  if (cleaned.startsWith("54") && cleaned.length >= 12) return "+" + cleaned
  // Celular argentino local sin código de país (9 + área + número, 11 dígitos).
  if (/^9[1-4]\d{9}$/.test(cleaned)) return "+54" + cleaned
  // Número internacional (11+ dígitos con su código de país): NO forzar Argentina.
  if (cleaned.length >= 11) return "+" + cleaned
  // Número local argentino corto (fijo/celular sin 9 ni código de país).
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

export async function sendButtonMessage(phone, body, buttons) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.warn("[WhatsApp Cloud] Token o Phone ID no configurados, saltando botones a", phone)
    return false
  }
  const safeButtons = (buttons || []).slice(0, 3).map((b, i) => ({
    type: "reply",
    reply: {
      id: String(b.id || `btn_${i}`).slice(0, 200),
      title: String(b.title || "Opción").slice(0, 20),
    },
  }))
  if (safeButtons.length === 0) return sendTextViaWhatsApp(phone, body)
  try {
    const res = await fetch(`https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: normalizePhone(phone),
        type: "interactive",
        interactive: {
          type: "button",
          body: { text: body.slice(0, 1024) },
          action: { buttons: safeButtons },
        },
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error("[WhatsApp Cloud] Botones error:", err.error?.message || res.statusText)
      return false
    }
    const data = await res.json().catch(() => ({}))
    return data.messages?.[0]?.id || true
  } catch (err) {
    console.error("[WhatsApp Cloud] Botones send error:", err.message)
    return false
  }
}

export async function sendListMessage(phone, body, buttonText, options) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.warn("[WhatsApp Cloud] Token o Phone ID no configurados, saltando lista a", phone)
    return false
  }
  const rows = (options || []).slice(0, 10).map((o, i) => ({
    id: String(o.id || `row_${i}`).slice(0, 200),
    title: String(o.title || "Opción").slice(0, 24),
    description: o.description ? String(o.description).slice(0, 72) : undefined,
  }))
  if (rows.length === 0) return sendTextViaWhatsApp(phone, body)
  try {
    const res = await fetch(`https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: normalizePhone(phone),
        type: "interactive",
        interactive: {
          type: "list",
          body: { text: body.slice(0, 1024) },
          action: {
            button: String(buttonText || "Ver opciones").slice(0, 20),
            sections: [{ title: "Opciones", rows }],
          },
        },
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error("[WhatsApp Cloud] Lista error:", err.error?.message || res.statusText)
      return false
    }
    const data = await res.json().catch(() => ({}))
    return data.messages?.[0]?.id || true
  } catch (err) {
    console.error("[WhatsApp Cloud] Lista send error:", err.message)
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

export async function sendMeetingNotification(phone, { name, when, mode, summary, kind } = {}) {
  const isNew = kind !== "modificada"
  const title = isNew ? "📅 *Nueva reunión pactada por WhatsApp*" : "♻️ *Reunión modificada*"
  const msg = [
    title,
    `👤 Cliente: ${name || "—"}`,
    `🗓️ Cuándo: ${when || "—"}`,
    `🎥 Modalidad: ${mode || "—"}`,
    `💼 Necesidad: ${summary || "—"}`,
  ].join("\n")
  const whenParam = isNew ? when || "—" : `${when || "—"} (cambio de horario)`
  return sendWithTemplate(phone, TEMPLATE_NAMES.meeting, [name || "—", whenParam, mode || "—", summary || "—"], msg)
}
