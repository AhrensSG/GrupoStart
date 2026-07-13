import { NextResponse } from "next/server"
import { getContactsPendingReminder, getUserProfile, getUserPhone } from "@/lib/tools/db"
import { formatFecha, getDefaultReminderTime, parseTime } from "@/lib/tools/business-days"
import { sendDueNowReminder } from "@/lib/tools/whatsapp-cloud"

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
    const userPhone = await getUserPhone(uid)
    if (!userPhone) {
      return NextResponse.json({ error: "Teléfono del usuario no configurado" }, { status: 400 })
    }

    const today = formatFecha(new Date())
    const now = new Date()
    const currentHour = now.getHours()
    const currentMin = now.getMinutes()

    const pending = await getContactsPendingReminder(uid)

    const defaultTime = getDefaultReminderTime(profile?.hora_ingreso)

    const dueContactNames = []
    for (const c of pending) {
      const lastRound = [...c.contactos].reverse().find(
        (r) => r.clasificacion === "Pendiente" && r.proxima_fecha === today
      )
      if (!lastRound) continue

      const reminderTime = lastRound.hora_proximo_contacto || defaultTime
      const parsed = parseTime(reminderTime)

      if (parsed && (parsed.hours < currentHour || (parsed.hours === currentHour && parsed.minutes <= currentMin))) {
        dueContactNames.push(c.nombre)
      }
    }

    if (dueContactNames.length === 0) {
      return NextResponse.json({ sent: 0, message: "No hay recordatorios pendientes en este momento" })
    }

    const ok = await sendDueNowReminder(userPhone, dueContactNames)
    return NextResponse.json({ sent: ok ? dueContactNames.length : 0, contacts: dueContactNames })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al procesar recordatorios" }, { status: 500 })
  }
}
