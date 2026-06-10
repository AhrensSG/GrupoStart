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
      const m = t.minutes + 30
      const h = t.hours + Math.floor(m / 60)
      return `${String(h).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`
    }
  }
  return "10:00"
}

export function getBusinessDaysFromNow(days) {
  const d = addBusinessDays(new Date(), days)
  return formatFecha(d)
}
