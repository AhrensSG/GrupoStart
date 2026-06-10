export async function sendWhatsAppReminder(phone, contactName, apiUrl, apiToken) {
  if (!apiUrl || !apiToken) {
    console.warn("WhatsApp API not configured. Skipping reminder for", contactName)
    return false
  }
  const message = `Recordatorio: Tienes un contacto pendiente con ${contactName}. Por favor, realiza el seguimiento.`
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ to: phone, message }),
    })
    if (!res.ok) {
      console.error("WhatsApp API error:", await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error("WhatsApp send error:", err)
    return false
  }
}
