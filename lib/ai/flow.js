const FLOWS = {
  consentimiento: {
    question: "¿Comenzamos?",
    type: "buttons",
    options: [
      { id: "comenzar", title: "Sí, comenzar" },
      { id: "no_gracias", title: "No, gracias" },
    ],
  },
  equipo: {
    question: "¿Cuántas personas forman parte de tu equipo comercial?",
    type: "buttons",
    options: [
      { id: "solo", title: "Soy solo yo" },
      { id: "dos", title: "2 personas" },
      { id: "cinco_o_mas", title: "5 personas o más" },
    ],
  },
  areas: {
    question: "¿Tenés personas que se ocupen de otras áreas clave de tu empresa y vos estás encargado de la parte comercial?",
    type: "buttons",
    options: [
      { id: "si", title: "Sí" },
      { id: "no", title: "No" },
    ],
  },
  facturacion: {
    question: "¿Actualmente aproximadamente cuánto factura tu empresa al mes?",
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
    question: "¿Te gustaría que te ofrezca una solución alternativa?",
    type: "buttons",
    options: [
      { id: "si_alternativa", title: "Sí, conocerla" },
      { id: "no_alternativa", title: "No, gracias" },
    ],
  },
  objetivo_marketing: {
    question: "¿Cuál de estos objetivos asociados al marketing de redes sociales te interesa más?",
    type: "list",
    buttonText: "Elegir objetivo",
    options: [
      { id: "facturacion", title: "Aumentar facturación" },
      { id: "seguidores", title: "Crecer en seguidores" },
      { id: "interaccion", title: "Mejorar interacción" },
      { id: "marca_personal", title: "Marca personal" },
    ],
  },
  inversion_publicitaria: {
    question: "¿Cuánto estarías dispuesto a invertir inicialmente en publicidad?",
    type: "list",
    buttonText: "Elegir inversión",
    options: [
      { id: "menos_100000", title: "Menos de $100.000 ARS" },
      { id: "200000_300000", title: "$200.000 - $300.000 ARS" },
      { id: "mas_300000", title: "Más de $300.000 ARS" },
    ],
  },
  prioridad: {
    question: "¿Cuál de estas frases representa mejor tu situación actual?",
    type: "buttons",
    options: [
      { id: "escalar", title: "Busco escalar" },
      { id: "poco_presupuesto", title: "Vender más, poco presupuesto" },
    ],
  },
  intencion: {
    question: "¿En qué punto estás actualmente respecto a contratar?",
    type: "list",
    buttonText: "Elegir intención",
    options: [
      { id: "informacion", title: "Solo información, aún no listo" },
      { id: "ligeramente_listo", title: "Estoy ligeramente listo" },
      { id: "listo_precisiones", title: "Listo, quiero precisiones" },
    ],
  },
  no_fit: {
    question: "¿Querés recibir consejos gratuitos de marketing?",
    type: "buttons",
    options: [
      { id: "si_consejos", title: "Sí" },
      { id: "no_consejos", title: "No" },
    ],
  },
  conversacion_abierta: { type: "text" },
  contenido_email: { type: "text" },
  reunion_existente: {
    type: "buttons",
    options: [
      { id: "consultar_reunion", title: "Consultar reunión" },
      { id: "cambiar_horario", title: "Cambiar horario" },
      { id: "no_gracias", title: "No, gracias" },
    ],
  },
}

const aliases = {
  equipo: "equipo_comercial",
  otras_areas: "tiene_personas_otras_areas",
  facturacion: "facturacion_mensual",
  objetivo: "objetivo_marketing",
  presupuesto_anuncios: "inversion_publicitaria",
  intencion: "nivel_intencion_compra",
}

const stageAliases = {
  alternativa_objetivo: "objetivo_marketing",
  alternativa_presupuesto: "inversion_publicitaria",
  posicionamiento: "prioridad",
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

  if (stage === "consentimiento") return /^(si|dale|ok|claro|comenzar|adelante)/.test(text) ? "equipo" : /^(no|ahora no)/.test(text) ? "conversacion_abierta" : null
  if (stage === "equipo") {
    if (/solo|yo hago todo/.test(text)) return "areas"
    if (/\b2\b|dos|\b[3-9]\b|\b[1-9][0-9]+\b|personas|vendedor|equipo/.test(text)) return "facturacion"
    return null
  }
  if (stage === "areas") return /^(si|no|tengo|cuento|personas|nadie)/.test(text) ? "facturacion" : null
  if (stage === "facturacion") {
    if (!/usd|dolar|dolares|\$|mil|1000|5000|10000|factur/.test(text)) return null
    if (text.includes("menos")) return "alternativa_confirmacion"
    const compact = text.replace(/[.\s]/g, "")
    if (compact.includes("1000") && compact.includes("5000")) return "prioridad"
    return "motor_valor"
  }
  if (stage === "alternativa_confirmacion") return /^(si|dale|quiero|conocer)/.test(text) ? "objetivo_marketing" : /^(no|ahora no)/.test(text) ? "conversacion_abierta" : null
  if (stage === "objetivo_marketing") return /factur|seguidor|interac|marca|crecer|vender/.test(text) ? "inversion_publicitaria" : null
  if (stage === "inversion_publicitaria") return /menos|100000|200000|300000|invers|pesos|presupuesto/.test(text) ? (text.includes("menos") ? "no_fit" : "intencion") : null
  if (stage === "motor_valor") return null
  if (stage === "prioridad") {
    if (/escalar|guerrero|siguiente nivel/.test(text)) return "agenda_dia"
    if (/vender|poco presupuesto|esfuerzo economico|esfuerzos economicos/.test(text)) return "objetivo_marketing"
    return null
  }
  if (stage === "intencion") return /informacion|ligeramente|listo|precisiones|contrat/.test(text) ? "agenda_dia" : null
  if (stage === "agenda_dia") return /lunes|martes|miercoles|jueves|viernes|sabado|domingo|manana|mañana|\b\d{1,2}\b|hora/.test(text) ? "agenda_email" : null
  if (stage === "no_fit") return /^(si|sí|dale|quiero)/.test(text) ? "contenido_email" : /^(no|ahora no)/.test(text) ? "cierre" : null
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
