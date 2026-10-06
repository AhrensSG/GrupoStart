import { addBusinessDays, getArgentinaNow } from "@/lib/tools/business-days"

/**
 * Horarios libres de Calendarly para agendar una reunión.
 *
 * Va contra la API de Calendarly: se piden los slots disponibles del tipo de evento
 * y se ofrecen los primeros N a partir de cierta cantidad de días hábiles. El
 * margen es por nodo, así que un camino puede exigir 5 días hábiles y otro 3.
 * Sin token o sin uri de evento configurados, `getAvailableSlots` devuelve null y
 * el nodo de agenda avisa al asesor en vez de dejar al cliente esperando.
 *
 * Configuración que hace falta (una vez integrada la API):
 *   CALENDLY_TOKEN           token personal de la API de Calendarly
 *   CALENDLY_EVENT_URI       uri del tipo de evento (ej: https://api.calendly.com/event_types/ABC123)
 */

const CALENDLY_API = "https://api.calendly.com"

// Se leen en cada llamada y no al importar el módulo: el motor carga esto al
// arrancar y la config puede estar lista después.
const token = () => process.env.CALENDLY_TOKEN || ""
const eventUri = () => process.env.CALENDLY_EVENT_URI || ""

export function isCalendarConfigured() {
  return Boolean(token() && eventUri())
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

/**
 * Primer día en el que se puede ofrecer un horario: hoy + N días hábiles.
 * `addBusinessDays` saltea sábados y domingos; no contempla feriados.
 */
export function earliestBookableDate(businessDaysAhead = 5) {
  return toIsoDate(addBusinessDays(getArgentinaNow().date, businessDaysAhead))
}

/** Rango que se consulta a Calendarly: desde el primer día agendable hasta N días después. */
function availabilityRange(businessDaysAhead, horizonDays = 30) {
  const start = earliestBookableDate(businessDaysAhead)
  // Calendly valida que el rango no supere 31 dias calendario. Si usamos dias
  // habiles para el final, con fines de semana se puede pasar de ese limite y
  // responde 400 ("date range can be no greater than 31 days").
  const endDate = new Date(`${start}T12:00:00`)
  endDate.setDate(endDate.getDate() + Math.min(Math.max(horizonDays, 1), 30))
  const end = toIsoDate(endDate)
  return { start, end }
}

/**
 * Horarios disponibles, ya filtrados por el margen de días hábiles.
 * Devuelve [{ key, start, label }] o null si la integración todavía no está hecha.
 */
export async function getAvailableSlots({ businessDaysAhead = 5, count = 3, durationMinutes = 30 } = {}) {
  if (!isCalendarConfigured()) return null

  const { start, end } = availabilityRange(businessDaysAhead)
  const url = `${CALENDLY_API}/event_type_available_times?` +
    `event_type=${encodeURIComponent(eventUri())}` +
    `&start_time=${encodeURIComponent(`${start}T00:00:00.000Z`)}` +
    `&end_time=${encodeURIComponent(`${end}T23:59:59.999Z`)}`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" },
  })
  if (!res.ok) {
    console.error("[Agenda] Calendarly respondió", res.status, await res.text().catch(() => ""))
    return null
  }

  const data = await res.json().catch(() => ({}))
  const collection = data.collection || []

  return collection.slice(0, count).map((slot) => {
    const startDate = new Date(slot.start_time)
    return {
      // El key va dentro del botón de WhatsApp, que solo admite letras, números,
      // guion y guion bajo. El ISO crudo tiene dos puntos y punto decimal, así que
      // se compacta; sigue siendo único porque el horario completo se guarda aparte.
      key: slot.start_time.replace(/\D/g, "").slice(0, 20),
      start: slot.start_time,
      label: formatSlotLabel(startDate),
    }
  })
}

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

// Calendarly devuelve los horarios en UTC, pero el cliente ve hora de Argentina.
// Si el server no corre en ese huso, leer la fecha con getHours() mostraría un
// horario corrido, así que se formatea siempre con el huso explícito.
const TZ = "America/Argentina/Buenos_Aires"

const partes = (date) => {
  const p = new Intl.DateTimeFormat("es-AR", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .formatToParts(date)
    .reduce((acc, parte) => ({ ...acc, [parte.type]: parte.value }), {})
  // La medianoche puede venir como "24" en algunos runtimes.
  const hh = p.hour === "24" ? "00" : p.hour
  return {
    dia: Number(p.day),
    mes: Number(p.month),
    anio: Number(p.year),
    hh,
    hora: `${hh}:${p.minute}`,
  }
}

// Con mayúscula inicial: se ve mejor en el botón de WhatsApp.
const DIAS_CORTOS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const INGLES_CORTOS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const diaDeSemana = (date) =>
  INGLES_CORTOS.indexOf(new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(date))

/** "Mar 03/11 15:00" — cabe en los 20 caracteres de un botón de WhatsApp. */
function formatSlotLabel(date) {
  const { dia, mes, hora } = partes(date)
  return `${DIAS_CORTOS[diaDeSemana(date)]} ${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")} ${hora}`
}

export function describeSlot(startIso) {
  if (!startIso) return ""
  const date = new Date(startIso)
  const { dia, mes, anio, hora } = partes(date)
  return `${DIAS[diaDeSemana(date)]} ${dia} de ${MESES[mes - 1]} de ${anio} a las ${hora}`
}

/** Partes sueltas de un horario, para interpolar en el texto de confirmación. */
export function slotParts(startIso) {
  if (!startIso) return { fecha: "", hora: "", texto: "" }
  const date = new Date(startIso)
  const { dia, mes, anio, hora } = partes(date)
  return {
    fecha: `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${anio}`,
    hora,
    texto: describeSlot(startIso),
  }
}

/** "muy buen día" / "muy buena tarde" / "muy buena noche", según la hora del horario. */
export function greetingFor(startIso) {
  if (!startIso) return "muy buen día"
  const hour = Number(partes(new Date(startIso)).hh) % 24
  if (hour < 12) return "muy buen día"
  if (hour < 19) return "muy buena tarde"
  return "muy buena noche"
}
