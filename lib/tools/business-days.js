export function parseFecha(dateStr) {
  if (!dateStr) return null
  const parts = dateStr.split("/")
  if (parts.length !== 3) return null
  const d = parseInt(parts[0], 10)
  const m = parseInt(parts[1], 10) - 1
  const y = parseInt(parts[2], 10)
  if (isNaN(d) || isNaN(m) || isNaN(y)) return null
  return new Date(y, m, d)
}

export function formatFecha(date) {
  const d = String(date.getDate()).padStart(2, "0")
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

export function addBusinessDays(date, days) {
  const result = new Date(date)
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    if (result.getDay() !== 0 && result.getDay() !== 6) added++
  }
  return result
}

export function subBusinessDays(date, days) {
  const result = new Date(date)
  let subtracted = 0
  while (subtracted < days) {
    result.setDate(result.getDate() - 1)
    if (result.getDay() !== 0 && result.getDay() !== 6) subtracted++
  }
  return result
}

export function getNextBusinessDay(date) {
  const result = new Date(date)
  result.setDate(result.getDate() + 1)
  while (result.getDay() === 0 || result.getDay() === 6) result.setDate(result.getDate() + 1)
  return result
}

export function addHours(date, hours) {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

export function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function parseTime(timeStr) {
  if (!timeStr) return null
  const parts = timeStr.split(":")
  if (parts.length !== 2) return null
  const h = parseInt(parts[0], 10)
  const m = parseInt(parts[1], 10)
  if (isNaN(h) || isNaN(m)) return null
  return { hours: h, minutes: m }
}

export function getDefaultReminderTime(horaIngreso) {
  if (horaIngreso) {
    const t = parseTime(horaIngreso)
    if (t) {
      const totalMinutes = t.hours * 60 + t.minutes + 30
      const h = Math.min(Math.floor(totalMinutes / 60), 23)
      return `${String(h).padStart(2, "0")}:${String(totalMinutes % 60).padStart(2, "0")}`
    }
  }
  return "10:00"
}

export function getBusinessDaysFromNow(days) {
  const d = addBusinessDays(new Date(), days)
  return formatFecha(d)
}

export function getArgentinaNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date())
  const get = (type) => parts.find((p) => p.type === type)?.value || "0"
  const pad = (n) => String(n).padStart(2, "0")
  const day = parseInt(get("day"), 10)
  const month = parseInt(get("month"), 10)
  const year = parseInt(get("year"), 10)
  return {
    fecha: `${pad(day)}/${pad(month)}/${year}`,
    hora: parseInt(get("hour"), 10),
    minuto: parseInt(get("minute"), 10),
    date: new Date(year, month - 1, day, parseInt(get("hour"), 10), parseInt(get("minute"), 10), parseInt(get("second"), 10)),
  }
}

export function addDaysToFecha(fechaStr, days) {
  const d = parseFecha(fechaStr)
  if (!d) return ""
  d.setDate(d.getDate() + days)
  return formatFecha(d)
}
