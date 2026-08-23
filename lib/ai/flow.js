const FLOWS = {
  consentimiento: {
    type: "buttons",
    options: [
      { id: "comenzar", title: "Sí, comenzar" },
      { id: "no_gracias", title: "No, gracias" },
    ],
  },
  equipo: {
    type: "buttons",
    options: [
      { id: "solo", title: "Soy solo yo" },
      { id: "dos", title: "2 personas" },
      { id: "cinco_o_mas", title: "5 personas o más" },
    ],
  },
  areas: {
    type: "buttons",
    options: [
      { id: "si", title: "Sí" },
      { id: "no", title: "No" },
    ],
  },
  facturacion: {
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
    type: "buttons",
    options: [
      { id: "si_alternativa", title: "Sí, conocerla" },
      { id: "no_alternativa", title: "No, gracias" },
    ],
  },
  objetivo_marketing: {
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
    type: "list",
    buttonText: "Elegir inversión",
    options: [
      { id: "menos_100000", title: "Menos de $100.000 ARS" },
      { id: "200000_300000", title: "$200.000 - $300.000 ARS" },
      { id: "mas_300000", title: "Más de $300.000 ARS" },
    ],
  },
  prioridad: {
    type: "buttons",
    options: [
      { id: "escalar", title: "Busco escalar" },
      { id: "poco_presupuesto", title: "Vender más, poco presupuesto" },
    ],
  },
  intencion: {
    type: "list",
    buttonText: "Elegir intención",
    options: [
      { id: "informacion", title: "Solo información, aún no listo" },
      { id: "ligeramente_listo", title: "Estoy ligeramente listo" },
      { id: "listo_precisiones", title: "Listo, quiero precisiones" },
    ],
  },
  no_fit: {
    type: "buttons",
    options: [
      { id: "si_consejos", title: "Sí" },
      { id: "no_consejos", title: "No" },
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

  if (stage === "consentimiento") return /^(si|dale|ok|claro|comenzar|adelante)/.test(text) ? "equipo" : /^(no|ahora no)/.test(text) ? "cierre" : null
  if (stage === "equipo") return /solo|\b2\b|dos|personas|vendedor|equipo|\b[3-9]\b|\b[1-9][0-9]+\b/.test(text) ? "areas" : null
  if (stage === "areas") return /^(si|no|tengo|cuento|personas|nadie)/.test(text) ? "facturacion" : null
  if (stage === "facturacion") {
    if (!/usd|dolar|dolares|\$|mil|1000|5000|10000|factur/.test(text)) return null
    return text.includes("menos") || (text.includes("1000") && !text.includes("entre") && !text.includes("mas")) ? "alternativa_confirmacion" : "motor_valor"
  }
  if (stage === "alternativa_confirmacion") return /^(si|dale|quiero|conocer)/.test(text) ? "objetivo_marketing" : /^(no|ahora no)/.test(text) ? "no_fit" : null
  if (stage === "objetivo_marketing") return /factur|seguidor|interac|marca|crecer|vender/.test(text) ? "inversion_publicitaria" : null
  if (stage === "inversion_publicitaria") return /menos|100000|200000|300000|invers|pesos|presupuesto/.test(text) ? (text.includes("menos") ? "no_fit" : "intencion") : null
  if (stage === "motor_valor") return null
  if (stage === "prioridad") return "intencion"
  if (stage === "intencion") return /informacion|ligeramente|listo|precisiones|contrat/.test(text) ? "agenda_dia" : null
  if (stage === "agenda_dia") return /lunes|martes|miercoles|jueves|viernes|sabado|domingo|manana|mañana|\b\d{1,2}\b|hora/.test(text) ? "agenda_email" : null
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
