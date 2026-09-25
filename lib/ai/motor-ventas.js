// Flujo de entrada del bot: "Motor de Ventas".
// El cliente escribe una de las PREGUNTAS_MOTOR_VENTAS o cualquier otra cosa.

export const PREGUNTAS_MOTOR_VENTAS = [
  "Hola quiero más información del programa “Motor de Ventas”",
  "Hola, en cuanto tiempo instalan el programa ¿motor de ventas?",
  "Hola, quiero contratar el \"Motor de ventas\"",
  "Hola, qué costo tiene el sistema \"Motor de Ventas\"",
]

export const PRESENTACION_GRUPO_START = `Hola 👋🏻

Mucho gusto, somos Grupo Start 🚀

Más de 10 años de experiencia y  +100 clientes satisfechos en Argentina y Europa nos respaldan.

Para que nos conozcas te cuento un poco sobre nosotros:

🏁 Somos una agencia de marketing completa

📲 Integramos todos los procesos importantes en un solo lugar

🧩 Contenidos, publicidad en meta ads, Chat Bot, e-commerce

🔍 Primero te conocemos, luego proponemos 👉🏻 Vení a visitarnos📍Hipólito Yrigoyen 342, ciudad de Formosa 👉🏻 o agendemos una reunión por videollamada 👨🏻‍💻`

export const PREGUNTA_COMENZAMOS = "¿Comenzamos?"

// Video de presentación que se manda después del texto. Tiene que estar en el
// servidor y pesar menos de 16 MB (límite de WhatsApp para video).
export const VIDEO_PATH = process.env.WHATSAPP_VIDEO_PATH || ""

export const DESPEDIDA =
  "Comprendo, si necesitas algo mas no dudes en decírmelo, mientras voy a avisar a un representante humano para que pronto se ponga en contacto contigo"

export const CIERRE_SI =
  "¡Genial, gracias por tu interés! 🚀 Un asesor del equipo se va a poner en contacto contigo muy pronto para contarte los detalles."

export const MENSAJE_DERIVACION = `Hola, mucho gustoooo 🙋🏼‍♀️ Soy Sofi IA, agente de Grupo Start.

Voy a derivar tu consulta con un representante humano, muy pronto te responderán, muchas gracias por tu interés 😊`

// Números internos que avisan cuando la IA no encuentra la respuesta.
export const NUMEROS_DERIVACION = String(process.env.WHATSAPP_DERIVACION_PHONES || "3704-619402,3704-302928,3704-410609")
  .split(",")
  .map((n) => n.replace(/\D/g, ""))
  .filter(Boolean)

export const ETAPAS_TERMINALES = ["despedida", "derivado", "fin"]

// Minúsculas, sin acentos y sin puntuación, para comparar writings libre.
export function normalizeTexto(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9ñ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const PREGUNTAS_NORMALIZADAS = PREGUNTAS_MOTOR_VENTAS.map(normalizeTexto)

/** Devuelve el índice de la pregunta predefinida que coincide, o -1. */
export function matchPreguntaMotorVentas(mensaje) {
  const texto = normalizeTexto(mensaje)
  if (!texto) return -1
  return PREGUNTAS_NORMALIZADAS.indexOf(texto)
}
