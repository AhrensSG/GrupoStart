import { NextResponse } from "next/server"
import { getContactsPendingReminder, getUserProfile } from "@/lib/tools/db"
import { sendWhatsAppReminder } from "@/lib/tools/whatsapp"
import { formatFecha, getDefaultReminderTime, parseTime } from "@/lib/tools/business-days"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid") || ""
    const today = formatFecha(new Date())
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }
    const profile = await getUserProfile(uid)
    const pending = await getContactsPendingReminder(uid)

    const reminders = pending.map((c) => {
      const lastRound = [...c.contactos].reverse().find((r) => r.clasificacion === "Pendiente" && r.proxima_fecha === today)
      const roundIndex = lastRound ? c.contactos.indexOf(lastRound) : -1
      const horaRecordatorio = lastRound?.hora_proximo_contacto
        ? lastRound.hora_proximo_contacto
        : getDefaultReminderTime(profile?.hora_ingreso)

      return {
        id: c.id,
        nombre: c.nombre,
        celular: c.celular,
        roundIndex,
        proxima_fecha: lastRound?.proxima_fecha || today,
        horaRecordatorio,
      }
    }).filter((r) => r.roundIndex >= 0)

    return NextResponse.json({ today, reminders, profile })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al obtener recordatorios" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid") || ""
    if (!uid) {
      return NextResponse.json({ error: "uid es requerido" }, { status: 400 })
    }
    const profile = await getUserProfile(uid)
    if (!profile?.whatsapp_api_url || !profile?.whatsapp_api_token) {
      return NextResponse.json({ error: "WhatsApp API no configurada" }, { status: 400 })
    }

    const today = formatFecha(new Date())
    const now = new Date()
    const currentHour = now.getHours()
    const currentMin = now.getMinutes()

    const pending = await getContactsPendingReminder(uid)
    let sent = 0
    const errors = []

    const defaultTime = getDefaultReminderTime(profile.hora_ingreso)

    for (const c of pending) {
      const lastRound = [...c.contactos].reverse().find(
        (r) => r.clasificacion === "Pendiente" && r.proxima_fecha === today
      )
      if (!lastRound) continue

      const reminderTime = lastRound.hora_proximo_contacto || defaultTime
      const parsed = parseTime(reminderTime)

      if (parsed && (parsed.hours < currentHour || (parsed.hours === currentHour && parsed.minutes <= currentMin))) {
        const ok = await sendWhatsAppReminder(
          c.celular,
          c.nombre,
          profile.whatsapp_api_url,
          profile.whatsapp_api_token
        )
        if (ok) sent++
        else errors.push(c.nombre)
      }
    }

    return NextResponse.json({ sent, errors: errors.length > 0 ? errors : undefined })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al procesar recordatorios" }, { status: 500 })
  }
}
