import { NextResponse } from "next/server"
import { formatFecha } from "@/lib/tools/business-days"
import {
  getAllActiveSubscribedUsers,
  getUserPhone,
  getUpcomingContactsForUser,
  getDueNowContactsForUser,
  getOverdueContactsForUser,
  markNotificationSent,
  getUserProfile,
} from "@/lib/tools/db"
import {
  sendUpcomingReminder,
  sendDueNowReminder,
  sendOverdueReminder,
} from "@/lib/tools/whatsapp-cloud"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const preview = searchParams.get("preview") === "true"
    return await processNotifications(preview)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al enviar notificaciones" }, { status: 500 })
  }
}

export async function POST() {
  try {
    return await processNotifications(false)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al enviar notificaciones" }, { status: 500 })
  }
}

async function processNotifications(preview) {
  const today = formatFecha(new Date())
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = formatFecha(tomorrow)

  const users = await getAllActiveSubscribedUsers()
  const fullSummary = []

  for (const u of users) {
    const phone = await getUserPhone(u.uid)
    if (!phone) continue

    const upcoming = await getUpcomingContactsForUser(u.uid, tomorrowStr)
    const dueNow = await getDueNowContactsForUser(u.uid, today)
    const overdue = await getOverdueContactsForUser(u.uid, today)

    const userSummary = {
      uid: u.uid,
      phone,
      upcoming: upcoming.map((c) => ({ name: c.nombre, roundIndex: c.round_index, id: c.id })),
      dueNow: dueNow.map((c) => ({ name: c.nombre, roundIndex: c.round_index, id: c.id })),
      overdue: overdue.map((c) => ({ name: c.nombre, roundIndex: c.round_index, id: c.id })),
    }

    if (preview) {
      fullSummary.push(userSummary)
      continue
    }

    if (upcoming.length > 0) {
      const names = upcoming.map((c) => c.nombre)
      const ok = await sendUpcomingReminder(phone, names)
      if (ok) {
        for (const c of upcoming) {
          await markNotificationSent(c.id, c.round_index, "upcoming", today)
        }
      }
    }

    if (dueNow.length > 0) {
      const profile = await getUserProfile(u.uid)
      const defaultTime = (() => {
        if (profile?.hora_ingreso) {
          const [h, m] = (profile.hora_ingreso || "09:00").split(":").map(Number)
          const mins = h * 60 + m + 30
          return { h: Math.min(Math.floor(mins / 60), 23), m: mins % 60 }
        }
        return { h: 10, m: 0 }
      })()
      const now = new Date()
      const currentMin = now.getHours() * 60 + now.getMinutes()
      const shouldSend = dueNow.some((c) => {
        const t = c.hora_proximo_contacto ? c.hora_proximo_contacto.split(":").map(Number) : [defaultTime.h, defaultTime.m]
        return currentMin >= t[0] * 60 + t[1]
      })

      if (shouldSend) {
        const names = dueNow.map((c) => c.nombre)
        const ok = await sendDueNowReminder(phone, names)
        if (ok) {
          for (const c of dueNow) {
            await markNotificationSent(c.id, c.round_index, "due_now", today)
          }
        }
      }
    }

    if (overdue.length > 0) {
      const names = overdue.map((c) => c.nombre)
      const ok = await sendOverdueReminder(phone, names)
      if (ok) {
        for (const c of overdue) {
          await markNotificationSent(c.id, c.round_index, "overdue", today)
        }
      }
    }
  }

  if (preview) {
    return NextResponse.json({ today, preview: fullSummary })
  }
  return NextResponse.json({ today, ok: true })
}
