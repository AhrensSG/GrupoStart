import { addBusinessDays, formatFecha } from "@/lib/tools/business-days"

const FLOWS = {
  inicio: { type: "text", question: "Hola, ¿en qué puedo ayudarte?" },
  consentimiento: {
    question: "¿Comenzamos?",
    type: "buttons",
    options: [
      { id: "si", title: "Sí" },
      { id: "no", title: "NO" },
    ],
  },
  equipo: {
    question: "Actualmente ¿cuántas personas forman parte de tu equipo comercial? 🤔",
    type: "buttons",
    options: [
      { id: "solo", title: "Soy solo yo" },
      { id: "dos", title: "2 personas" },
      { id: "cinco_mas", title: "5 personas o más" },
    ],
  },
  areas: {
    question:
      "¿Tenés personas que se ocupen de otras áreas \"clave de tu empresa\" y vos estás encargado de la parte comercial? 🤔",
    type: "buttons",
    options: [
      { id: "si_varios", title: "Sí, somos varios" },
      { id: "no_solo", title: "NO, soy solo yo" },
    ],
  },
  email: {
    type: "text",
    question: "Excelente 😊 para comenzar, ¿podrías escribir tu correo en el chat?",
  },
  figura_legal: {
    question: "Ahora permíteme preguntarte, ¿cuál es la figura legal de tu empresa? 🤔",
    type: "list",
    buttonText: "Ver opciones",
    options: [
      { id: "monotributista", title: "Monotributista" },
      { id: "responsable_inscripto", title: "Responsable inscripto" },
      { id: "srl", title: "Sociedad por SRL" },
      { id: "sa", title: "Sociedad Anónima (SA)" },
      { id: "sas", title: "S.A.S" },
      { id: "sin_inscripcion", title: "Negocio sin inscripción" },
      { id: "otras", title: "Otras sociedades" },
    ],
  },
  facturacion: {
    question: "Muy bien 🚀 ¿Cuánto aproximado factura tu empresa al mes? 🤔",
    type: "list",
    buttonText: "Ver facturación",
    options: [
      { id: "menos_1000", title: "Menos de USD 1.000" },
      { id: "1000_5000", title: "Entre USD 1.000 y 5.000" },
      { id: "5000_10000", title: "Entre USD 5.000 y 10.000" },
      { id: "mas_10000", title: "Más de USD 10.000" },
    ],
  },
  alternativa_confirmacion: {
    question: "¿Te gustaría que te ofrezca una solución alternativa? 🤔",
    type: "buttons",
    options: [
      { id: "si", title: "Sí" },
      { id: "no", title: "No" },
    ],
  },
  prioridad: {
    question: "Ayúdame a entender un poco más sobre tus prioridades hoy. Elegí la frase con la que más te identifiques:",
    type: "list",
    buttonText: "Elegir prioridad",
    options: [
      { id: "escalar", title: "Busco escalar mi negocio" },
      { id: "poco_presupuesto", title: "Vender más sin grandes esfuerzos" },
    ],
  },
  objetivo_marketing: {
    question:
      "Muy bien, puedo armarte un plan de marketing que te impulse contemplando tu facturación actual para que pronto podamos instalar \"Motor de Ventas\" en tu proyecto 🚀 ¿Cuál de estos objetivos del marketing en redes sociales te interesa más en este momento? 🤔",
    type: "list",
    buttonText: "Elegir objetivo",
    options: [
      { id: "facturacion", title: "Aumentar la facturación" },
      { id: "seguidores", title: "Crecer en seguidores" },
      { id: "interaccion", title: "Mejorar la interacción" },
      { id: "marca_personal", title: "Desarrollar mi marca personal" },
    ],
  },
  inversion_publicitaria: {
    question: "¿Con cuál de estos montos de inversión inicial te sentís más cómodo? 🤔",
    type: "list",
    buttonText: "Elegir inversión",
    options: [
      { id: "menos_100000", title: "Menos de $100.000" },
      { id: "200000_300000", title: "Entre $200.000 y $300.000" },
      { id: "mas_300000", title: "Algo más de $300.000" },
    ],
  },
  intencion: {
    question: "Por último, ¿podrías elegir una de estas opciones? 🤔",
    type: "list",
    buttonText: "Elegir intención",
    options: [
      { id: "solo_info", title: "Solo quiero información" },
      { id: "ligeramente", title: "Estoy ligeramente listo" },
      { id: "listo", title: "Listo, quiero precisiones" },
    ],
  },
  agenda_dia: {
    type: "text",
    question: "¿Qué día y horario te quedarían cómodos para la reunión?",
  },
  reunion_confirmada: { type: "text", question: "" },
  reunion_existente: {
    type: "buttons",
    options: [
      { id: "consultar_reunion", title: "Consultar reunión" },
      { id: "cambiar_horario", title: "Cambiar horario" },
      { id: "no_gracias", title: "No, gracias" },
    ],
  },
  no_fit: { type: "text", question: "" },
  conversacion_abierta: { type: "text", question: "¿Qué te gustaría lograr o mejorar en tu negocio?" },
  motor_valor: { type: "text", question: "" },
  cierre: { type: "text", question: "" },
}

const aliases = {
  equipo: "equipo_comercial",
  areas: "tiene_personas_otras_areas",
  facturacion: "facturacion_mensual",
  figura_legal: "figura_legal",
  objetivo: "objetivo_marketing",
  inversion: "inversion_publicitaria",
  presupuesto_anuncios: "inversion_publicitaria",
  intencion: "nivel_intencion_compra",
  email: "email",
}

const stageAliases = {
  alternativa_objetivo: "objetivo_marketing",
  alternativa_presupuesto: "inversion_publicitaria",
  posicionamiento: "prioridad",
  agenda: "agenda_dia",
  contenido_email: "email",
  agenda_email: "email",
}

export function getFlowUi(stage) {
  const ui = FLOWS[stage]
  if (!ui) return null
  return JSON.parse(JSON.stringify(ui))
}

export function getFlowQuestion(stage) {
  return FLOWS[stage]?.question || ""
}

function normalized(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

export function getNextStage(stage, message) {
  const text = normalized(message)
  if (!text) return null

  if (stage === "consentimiento") return /^(si|sí|dale|ok|claro|comenzar|adelante)/.test(text) ? "equipo" : /^(no)/.test(text) ? "cierre" : null
  if (stage === "equipo") {
    if (/solo yo|solo$|yo hago todo/.test(text)) return "areas"
    if (/2 personas|^dos$|dos personas/.test(text)) return "email"
    if (/5 personas|cinco|mas$|más$|equipo/.test(text)) return "figura_legal"
    return null
  }
  if (stage === "areas") {
    const exact = /no,? soy solo yo|no soy solo|solo yo/.test(text)
    if (exact) return "no_fit"
    if (/somos varios|^sí$|^si$|tenemos varias personas/.test(text)) return null
    return "figura_legal"
  }
  if (stage === "email") return isValidEmail(message) ? "figura_legal" : null
  if (stage === "figura_legal") return /monotribut|responsable|srl|s\.r\.l|anonima|s\.?a\.?$|sas|inscripcion|otras sociedades|sociedad/.test(text) ? "facturacion" : null
  if (stage === "facturacion") {
    if (/menos de usd|menos de u\$?s|\b1\.?000\b/.test(text) && !/5\.?000/.test(text)) return "alternativa_confirmacion"
    if (/1\.?000.*5\.?000|entre usd|1000\s*5000/.test(text)) return "prioridad"
    if (/5\.?000|10\.?000|mas de usd|más de usd/.test(text)) return "intencion"
    return null
  }
  if (stage === "alternativa_confirmacion") return /^(si|sí|dale|quiero|conocer)/.test(text) ? "objetivo_marketing" : /^(no)/.test(text) ? "cierre" : null
  if (stage === "prioridad") {
    if (/escalar|siguiente nivel|guerrero/.test(text)) return "agenda_dia"
    if (/vender|poco presupuesto|esfuerzo/.test(text)) return "objetivo_marketing"
    return null
  }
  if (stage === "objetivo_marketing") return /factur|seguidor|interac|marca|crecer|vender/.test(text) ? "inversion_publicitaria" : null
  if (stage === "inversion_publicitaria") return /100000|100\.000|200000|200\.000|300000|300\.000|invers|pesos|presupuesto/.test(text) ? "intencion" : null
  if (stage === "intencion") return /informacion|ligeramente|listo|precisiones|contrat/.test(text) ? "agenda_dia" : null
  if (stage === "agenda_dia") return /lunes|martes|miercoles|jueves|viernes|sabado|domingo|manana|mañana|\b\d{1,2}\b|hora/.test(text) ? "reunion_confirmada" : null
  return null
}

export function normalizeProfileUpdates(updates) {
  if (!updates || typeof updates !== "object" || Array.isArray(updates)) return {}
  const result = {}
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === null || String(value).trim() === "") continue
    const normalizedKey = aliases[key] || key
    result[normalizedKey] = String(value).slice(0, 300)
  }
  return result
}

export function normalizeStage(stage) {
  return stageAliases[stage] || stage || "inicio"
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim())
}

export function suggestMeetingDates(minBusinessDays) {
  const base = new Date()
  const count = Math.max(1, Number(minBusinessDays) || 1)
  const dates = []
  for (let i = 0; i < 3; i++) {
    dates.push(addBusinessDays(base, count + i * count))
  }
  return dates.map((d) => formatFecha(d))
}