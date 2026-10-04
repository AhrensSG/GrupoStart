import "dotenv/config"
import { pool } from "../lib/tools/db.js"

/**
 * Prueba de humo del chat definitivo. Intercepta fetch para no pegarle a la API de
 * Meta: cada mensaje que el bot mandaría queda registrado acá y se muestra el
 * paso a paso. Corre contra la base de verdad, así que al final borra las
 * conversaciones de prueba.
 *
 * Cada escenario usa un número aparte, como si fueran clientes distintos.
 */

const ADMIN_PHONE = "5492222222222"
const TRIGGER = 'Hola quiero más información del programa "Motor de Ventas"'

const PHONES = {
  noCierra: "5491111111111",
  soloYo: "5491111111112",
  email: "5491111111113",
  alta: "5491111111116",
  baja: "5491111111114",
  apilado: "5491111111115",
  agenda: "5491111111117",
  agendaTibio: "5491111111118",
  alto: "5491111111119",
  factAlta: "5491111111120",
  factAltaTibio: "5491111111121",
  caliente: "5491111111122",
  guerrero: "5491111111123",
  vendeMas: "5491111111124",
  m2: "5491111111125",
}

// El motor y el transporte leen la config al importarse, así que se fija acá.
process.env.WHATSAPP_ADMIN_PHONE = ADMIN_PHONE
process.env.BOT_DELAY_MS = "0"
process.env.BOT_STACK_DELAY_MS = "0"
process.env.WHATSAPP_CLOUD_TOKEN = "token-de-prueba"
process.env.WHATSAPP_CLOUD_PHONE_ID = "phone-de-prueba"

const sent = []
const runId = Date.now().toString(36)

// Horarios que devuelve Calendarly cuando está configurado. Fechas fijas para que
// la confirmación sea predecible.
const SLOTS_CALENDLY = [
  "2026-11-03T14:00:00.000000Z",
  "2026-11-03T16:30:00.000000Z",
  "2026-11-05T15:00:00.000000Z",
]

globalThis.fetch = async (url, init = {}) => {
  const payload = JSON.parse(init.body || "{}")
  if (url.includes("event_type_available_times")) {
    if (!process.env.CALENDLY_TOKEN) return { ok: true, json: async () => ({ collection: [] }) }
    return {
      ok: true,
      json: async () => ({
        collection: SLOTS_CALENDLY.map((start_time) => ({
          start_time,
          scheduling_url: `https://calendly.com/d/${start_time}`,
        })),
      }),
    }
  }
  if (!url.includes("/messages")) return { ok: true, json: async () => ({}) }
  sent.push({
    to: payload.to,
    interactive: payload.interactive?.type,
    template: payload.template?.name,
    body: payload.text?.body || payload.interactive?.body?.text || "(cuerpo vacío)",
    // Las plantillas llevan los datos en components, no en un cuerpo de texto.
    templateParams: (payload.template?.components?.[0]?.parameters || []).map((p) => p.text),
    buttons:
      payload.interactive?.type === "button"
        ? payload.interactive.action.buttons.map((b) => b.reply.id)
        : payload.interactive?.type === "list"
          ? payload.interactive.action.sections[0].rows.map((r) => r.id)
          : [],
    titles:
      payload.interactive?.type === "list"
        ? payload.interactive.action.sections[0].rows.map((r) => `${r.title} | ${r.description || ""}`)
        : [],
    descriptions:
      payload.interactive?.type === "list"
        ? payload.interactive.action.sections[0].rows.map((r) => r.description || "")
        : [],
  })
  // El id simulado lleva un sufijo único por corrida: wa_messages.indexa
  // wa_message_id y una corrida anterior sin limpiar rompería el insert.
  const id = `wamid.TEST${runId}.${sent.length}`
  return { ok: true, json: async () => ({ messages: [{ id }] }) }
}

const { handleBotMessage } = await import("../lib/bot/engine.js")

let failures = 0

function check(ok, description) {
  console.log(`  ${ok ? "✓" : "✗"} ${description}`)
  if (!ok) failures++
}

async function say(label, message, phone) {
  const before = sent.length
  await handleBotMessage({ phone, name: "Tester", ...message })
  const out = sent.slice(before)
  console.log(`\n> ${label}`)
  for (const item of out) {
    // El aviso al asesor va a otro número: no forma parte de lo que ve el cliente.
    if (item.to !== `+${phone}`) continue
    const options = item.buttons?.length ? `  opciones=[${item.buttons.join(", ")}]` : ""
    const kind = item.interactive === "list" ? "lista" : item.interactive === "button" ? "botones" : item.template ? `plantilla:${item.template}` : "texto"
    console.log(`  [${kind}] ${item.body}${options}`)
  }
  return out.filter((item) => item.to === `+${phone}`)
}

// Al verificar nodos que avisan al asesor, el último mensaje al cliente es el cierre.
const last = (out) => out[out.length - 1]

const tap = (id) => ({ text: id, type: "interactive", optionId: id })

/** Camina desde el disparador hasta un nodo, para no repetir el preámbulo en cada test. */
async function advanceTo(label, phone, opciones) {
  await say(`${label}: disparador`, { text: TRIGGER, type: "text" }, phone)
  let ultima = await say(`${label}: disparador`, { text: TRIGGER, type: "text" }, phone)
  for (const paso of opciones) {
    const esTexto = paso.startsWith("texto:")
    ultima = await say(
      `${label}: ${paso}`,
      esTexto ? { text: paso.slice(6), type: "text" } : tap(paso),
      phone
    )
  }
  return ultima
}

// Una corrida previa que se cortó a mitad de camino puede dejar conversaciones
// con estado, y el bot arrancaría en un nodo en vez del disparador.
const NUMEROS = Object.values(PHONES)
await pool.query("DELETE FROM wa_messages WHERE conversation_phone = ANY($1)", [NUMEROS])
await pool.query("DELETE FROM wa_conversations WHERE phone = ANY($1)", [NUMEROS])

console.log("=== Disparadores ===\n")

let out = await say("primer mensaje que NO es un disparador", { text: "hola, cuánto sale?", type: "text" }, PHONES.noCierra)
check(out.length === 0, "el bot no responde si el primer mensaje no es un disparador")

out = await say("primer mensaje con un disparador válido", { text: TRIGGER, type: "text" }, PHONES.noCierra)
check(out.length === 3, "el disparador manda los 3 mensajes de entrada (texto, video, botones)")
check(out[0]?.body.startsWith("Hola 👋🏻"), "primer mensaje: presentación")
check(out[1]?.template === "video", "segundo mensaje: plantilla de video")
check(out[2]?.buttons.join(",") === "si,no", "tercer mensaje: botones Sí/No")

out = await say('toca "No"', tap("no"), PHONES.noCierra)
check(last(out)?.body.startsWith("Comprendo, si necesitas"), "el No cierra con el mensaje de derivación")
check(last(out)?.buttons.length === 0, "el No no ofrece más opciones")

console.log("\n=== Captura de email ===\n")

await advanceTo("email", PHONES.email, ["si"])
out = await say("responde algo que no es un email", { text: "no soy un mail", type: "text" }, PHONES.email)
check(last(out)?.body.startsWith("Parece que el correo"), "rechaza el email inválido y repregunta")
check(last(out)?.buttons.length === 0, "el reintento no ofrece botones")

out = await say("responde el email válido", { text: "juan@mail.com", type: "text" }, PHONES.email)
check(last(out)?.body.includes("equipo comercial"), "pasa a la pregunta de equipo comercial")
check(last(out)?.buttons.join(",") === "solo_yo,dos,cinco_mas", "3 opciones de equipo comercial")

console.log("\n=== Equipo comercial ===\n")

await advanceTo("soloYo", PHONES.soloYo, ["si", "texto:juan@mail.com", "solo_yo"])
out = await say('toca "NO, soy solo yo"', tap("no_solo_yo"), PHONES.soloYo)
check(last(out)?.body.startsWith("Comprendo, instalar un motor"), "el solo comercial cierra como descalificado")
check(last(out)?.buttons.length === 0, "no ofrece más opciones")

console.log("\n=== Figura legal y facturación ===\n")

out = await advanceTo("alta", PHONES.alta, ["si", "texto:juan@mail.com", "dos"])
check(last(out)?.buttons.join(",") === "monotributista,responsable_inscripto,srl", "3 figuras legales")

out = await say("toca SRL", tap("srl"), PHONES.alta)
check(last(out)?.body.includes("cuando factura tu empresa"), "pregunta la facturación mensual")

// La facturación media: 2 frases de prioridad. No entran como descripción de la
// lista (WhatsApp la corta a 72 caracteres y las frases miden 116 y 165), así que
// van numeradas en el cuerpo del 2º mensaje y los botones son "Opción 1"/"Opción 2".
out = await say('toca "Entre usd 1.000 a 5.000"', tap("1000_5000"), PHONES.alta)
check(out.length === 2, "la facturación media manda 2 mensajes: la pregunta y las frases")
check(
  out[0]?.body ===
    'Muy bien, estoy pensando que instalar "Motor de ventas" en tu negocio puede ser algo apresurado 🤔\n\n\n🗓️ Sin embargo ayúdame a entender un poco mas sobre tus prioridades hoy. \n\n\nElegí la frase con la que mas te identifiques:',
  "mensaje 1: la pregunta de prioridades"
)
check(out[1]?.interactive === "list", "mensaje 2: las frases van como lista")
check(
  out[1]?.body.includes("1️⃣ Estoy buscando escalar mi negocio") &&
    out[1]?.body.includes("2️⃣ Quiero vender mas"),
  "mensaje 2: las 2 frases completas van numeradas en el cuerpo"
)
check(out[1]?.buttons.join(",") === "opcion_1,opcion_2", "mensaje 2: los botones son Opción 1 y Opción 2")
check(
  out[1]?.titles.map((t) => t.split(" | ")[0]).join(",") === "Opción 1,Opción 2",
  "las etiquetas de la lista son Opción 1 y Opción 2"
)

// Tocar un botón del 2º mensaje avanza igual: el estado sigue en el nodo principal.
// "Opción 1" ya tiene destino propio (la agenda); sin la API de Calendarly todavía,
// cae en el respaldo que avisa al asesor.
out = await say('toca "Opción 1"', tap("opcion_1"), PHONES.alta)
check(last(out)?.body.includes("armando la agenda"), "una frase de prioridad sin API cae en el respaldo de la agenda")

console.log("\n=== Facturación baja: objetivos ===\n")

out = await advanceTo("baja", PHONES.baja, ["si", "texto:ana@mail.com", "dos", "monotributista"])
check(last(out)?.buttons.join(",") === "bajo_1000,1000_5000,mas_5000", "3 montos de facturación")

out = await say('toca "Menos de usd 1.000"', tap("bajo_1000"), PHONES.baja)
check(last(out)?.body.includes("solución alternativa"), "ofrece la solución alternativa")

out = await say('acepta la solución alternativa', tap("si"), PHONES.baja)
check(out.length === 2, "los objetivos salen en 2 mensajes apilados")
check(out[0]?.body.includes("objetivos asociado al marketing"), "mensaje 1: la pregunta de objetivos")
check(out[0]?.buttons.join(",") === "aumentar_facturacion,crecer_seguidores,mejorar_interaccion", "mensaje 1: 3 objetivos")
check(out[1]?.buttons.join(",") === "marca_personal", "mensaje 2: el objetivo que sobraba, solo")

console.log("\n=== Nodo de agenda (Calendarly) ===\n")

// El nodo de agenda: hoy la API de Calendarly no está conectada, así que este camino
// cae en el respaldo. Lo que se verifica acá es que el nodo existe, quedó configurado
// con los 5 días hábiles de margen y avisa al asesor en vez de dejar al cliente colgado.
const { rows: agendaRows } = await pool.query(
  "SELECT step_key, kind, calendar_min_business_days, calendar_slot_count, agenda_empty_step_key FROM bot_steps WHERE kind = 'agenda'"
)
check(agendaRows.some((r) => r.step_key === "n10_a_m2_agenda"), "el nodo de agenda del camino frío está cargado")
check(agendaRows.some((r) => r.step_key === "n10_a_m2_agenda_tibio"), "el nodo de agenda del camino tibio está cargado")
check(
  agendaRows.every((r) => Number(r.calendar_min_business_days) >= 1),
  "ningún nodo de agenda ofrece menos de 1 día hábil de margen"
)
// El margen va por nodo: frío 5, tibio 3, caliente 1.
const margen = (stepKey) =>
  agendaRows.find((r) => r.step_key === stepKey)?.calendar_min_business_days
check(margen("n10_a_m2_agenda") === 5, "el camino frío exige 5 días hábiles de margen")
check(margen("n10_a_m2_agenda_tibio") === 3, "el tibio de $200.000 exige 3 días hábiles de margen")
check(margen("n8_meeting_agenda") === 5, "el frío de facturación alta exige 5 días hábiles")
check(margen("n8_meeting_agenda_tibio") === 3, "el tibio de facturación alta exige 3 días hábiles")
check(margen("n8_meeting_agenda_caliente") === 1, "el caliente de facturación alta exige 1 día hábil")
check(margen("n8_prioridades_agenda") === 1, "la frase de escalar exige 1 día hábil")
check(margen("n10_a_m3_agenda") === 5, "la inversión de más de $300.000 exige 5 días hábiles en el camino frío")
check(margen("n10_a_m3_agenda_tibio") === 3, "el tibio de más de $300.000 exige 3 días hábiles")
check(margen("n10_a_m3_agenda_caliente") === 1, "el caliente de más de $300.000 exige 1 día hábil")
check(margen("n10_a_m2_agenda_caliente") === 1, "el caliente de $200.000 exige 1 día hábil")
check(
  agendaRows.every((r) => Number(r.calendar_slot_count) <= 3),
  "los nodos de agenda ofrecen 3 horarios o menos (límite de botones)"
)
check(
  agendaRows.every((r) => r.agenda_empty_step_key),
  "todo nodo de agenda tiene un respaldo si no hay horarios"
)

out = await advanceTo("agenda", PHONES.agenda, ["si", "texto:carla@mail.com", "dos", "monotributista", "bajo_1000", "si", "aumentar_facturacion", "medio_300k"])
out = await say('toca "Solo quiero información"', tap("frio"), PHONES.agenda)
check(last(out)?.body.includes("armando la agenda"), "sin la API de Calendarly cae en el respaldo y avisa al asesor")
check(last(out)?.buttons.length === 0, "el respaldo no ofrece botones")

// Con la API configurada, el nodo ofrece los horarios que devuelve Calendarly.
process.env.CALENDLY_TOKEN = "token-de-prueba"
process.env.CALENDLY_EVENT_URI = "https://api.calendly.com/event_types/EVTEST"

const { earliestBookableDate, getAvailableSlots, greetingFor } = await import("../lib/bot/calendly.js")

const pedido = {}
const fetchDelStub = globalThis.fetch
globalThis.fetch = (url, init) => {
  pedido.url = String(url)
  return fetchDelStub(url, init)
}

const slots = await getAvailableSlots({ businessDaysAhead: 5, count: 3 })
check(!!slots && slots.length === 3, "con la API configurada devuelve 3 horarios")
check(pedido.url?.includes(earliestBookableDate(5)), "la consulta a Calendarly arranca en el primer día agendable")
check(
  earliestBookableDate(5) > new Date().toISOString().slice(0, 10),
  "el primer día agendable es al menos 5 días hábiles adelante"
)
check(slots.every((s) => s.label.length <= 20), "las etiquetas de los botones entran en el límite de 20 caracteres")
// Calendarly devuelve UTC: 14:00Z son las 11:00 de Argentina. Si el server no
// corriera en ese huso, la etiqueta saldría corrida.
check(slots[0]?.label === "Mar 03/11 11:00", "la etiqueta del horario se muestra en hora de Argentina")
// El margen es por nodo, no global: 3 días hábiles tiene que caer antes que 5.
check(
  earliestBookableDate(3) < earliestBookableDate(5),
  "con 3 días hábiles se puede agendar antes que con 5"
)
globalThis.fetch = fetchDelStub

console.log("\n=== Reserva de reunión ===\n")

out = await say('toca "Solo quiero información" (con la API activa)', tap("frio"), PHONES.agenda)
check(last(out)?.body.includes("fechas disponibles"), "el nodo ofrece los horarios de Calendarly")
check(last(out)?.buttons.length === 3, "3 horarios para elegir")

const antesDeElegir = sent.length
out = await say("elige el primer horario", tap(last(out).buttons[0]), PHONES.agenda)

// Los dos mensajes, textuales. El primero es el aviso, el segundo la confirmación
// con la fecha y la hora ya sustituidas.
check(out.length === 2, "al elegir el horario salen exactamente 2 mensajes")
check(
  out[0]?.body === "🗓️Muy bien, voy a agendar la reunión, dame un minuto... ",
  "mensaje 1: el aviso de que va a agendar"
)
check(
  out[1]?.body ===
    `Reunión confirmada el 03/11/2026 a las 11:00 uno de nuestros representantes se conectará contigo. Que tengas ${greetingFor(SLOTS_CALENDLY[0])} 😊`,
  "mensaje 2: la confirmación con la fecha, la hora y el saludo del horario elegido"
)
check(!out[1]?.body.includes("{{"), "no quedan placeholders sin reemplazar en la confirmación")

// El saludo sale de greetingFor según la hora, no está escrito en el texto.
for (const [start, esperado] of [
  ["2026-11-03T14:00:00.000000Z", "muy buen día"],
  ["2026-11-03T19:30:00.000000Z", "muy buena tarde"],
  ["2026-11-03T23:00:00.000000Z", "muy buena noche"],
]) {
  check(greetingFor(start) === esperado, `saludo de las ${start.slice(11, 16)}Z: ${esperado}`)
}

// Y los administradores tienen que recibir el resumen con todo lo que respondió.
const avisos = sent.slice(antesDeElegir).filter((m) => m.to === `+${ADMIN_PHONE}`)
check(avisos.length >= 1, "los administradores reciben el aviso de la reunión")
const consultaAviso = (avisos[avisos.length - 1]?.templateParams || []).join(" ")
check(consultaAviso.includes("carla@mail.com"), "el aviso al administrador lleva el email")
check(consultaAviso.includes("horario_texto"), "el aviso al administrador lleva el horario elegido")
check(sent.filter((m) => m.to === `+${PHONES.agenda}`).at(-1)?.body === out[1]?.body, "no manda mensajes de más al cliente")

console.log("\n=== Facturación alta: más de usd 5000 ===\n")

out = await advanceTo("factAlta", PHONES.factAlta, ["si", "texto:rosa@mail.com", "dos", "monotributista"])
out = await say('toca "Más de usd 5000"', tap("mas_5000"), PHONES.factAlta)
check(
  last(out)?.body ===
    'Muy bien, el programa "Motor de ventas" sin lugar a dudas puede ayudarte a alcanzar el siguiente nivel. 📈\n\nLa pauta publicitaría intensiva será una maquina de traerte oportunidades de ventas \nLa implementación de un agente que "precalifique a tus leads" hará mas eficiente el proceso \nEl ecomerce te va a ayudar a tener el control \ny el marketing de redes va a posiciónar a tu marca.\n\n\nte voy a agendar una reunión con un representante, por ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔',
  "el texto de facturación alta es el esperado"
)
check(last(out)?.interactive === "list", "las 3 opciones de disposición van como lista")
check(last(out)?.titles.length === 3, "3 opciones de disposición")

// Las 3 opciones son las de siempre, con el texto largo completo.
check(
  last(out)?.titles[0] === "Solo información | Solo quiero información, aun no estoy listo para contratar",
  "opción 1 con su texto largo"
)
check(
  last(out)?.titles[1] === "Ligeramente listo | Estoy ligeramente listo para contratar",
  "opción 2 con su texto largo"
)
check(
  last(out)?.titles[2] === "Listo + precisiones | Estoy listo para contratar, solo quiero mas precisiones",
  "opción 3 con su texto largo"
)

// El "frío" de esta rama ofrece agenda, igual que en la rama de $200.000: es un
// nodo de agenda aparte, con los mismos 5 días hábiles de margen.
let consultaFactAlta = ""
globalThis.fetch = (url, init) => {
  if (String(url).includes("event_type_available_times")) consultaFactAlta = String(url)
  return fetchDelStub(url, init)
}
out = await say('toca "Solo información"', tap("frio"), PHONES.factAlta)
globalThis.fetch = fetchDelStub
check(
  last(out)?.body === "Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔",
  "el frío de facturación alta ofrece la agenda"
)
check(last(out)?.buttons.length === 3, "el frío de facturación alta ofrece 3 horarios")
check(consultaFactAlta.includes(earliestBookableDate(5)), "el frío de facturación alta pide 5 días hábiles de margen")

// Y al elegir horario cae en la misma confirmación que el resto de las agendas.
out = await say("elige un horario", tap(last(out).buttons[0]), PHONES.factAlta)
check(out.length === 2, "salen los 2 mensajes de confirmación")
check(out[0]?.body === "🗓️Muy bien, voy a agendar la reunión, dame un minuto... ", "mensaje 1: el aviso de que va a agendar")
check(
  out[1]?.body === `Reunión confirmada el 03/11/2026 a las 11:00 uno de nuestros representantes se conectará contigo. Que tengas ${greetingFor(SLOTS_CALENDLY[0])} 😊`,
  "mensaje 2: la confirmación con la fecha y la hora elegidas"
)

// El "tibio" de esta rama ofrece agenda con 3 días hábiles de margen, no 5.
// Número aparte: el recorrido del frío ya terminó en un nodo de cierre.
// El fetch se envuelve antes de tocar el botón, que es cuando se consulta Calendarly.
let consultaFactAltaTibio = ""
globalThis.fetch = (url, init) => {
  if (String(url).includes("event_type_available_times")) consultaFactAltaTibio = String(url)
  return fetchDelStub(url, init)
}

out = await advanceTo("factAltaTibio", PHONES.factAltaTibio, ["si", "texto:santi@mail.com", "cinco_mas", "srl", "mas_5000"])
out = await say('toca "Ligeramente listo"', tap("tibio"), PHONES.factAltaTibio)
check(
  last(out)?.body === "Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔",
  "el tibio de facturación alta ofrece la agenda"
)
check(last(out)?.buttons.length === 3, "el tibio de facturación alta ofrece 3 horarios")

check(consultaFactAltaTibio.includes(earliestBookableDate(3)), "el tibio de facturación alta pide 3 días hábiles de margen")
check(!consultaFactAltaTibio.includes(earliestBookableDate(5)), "el tibio no usa el margen de 5 días del frío")

out = await say("toca un horario", tap(last(out).buttons[1]), PHONES.factAltaTibio)
globalThis.fetch = fetchDelStub
check(out.length === 2, "el tibio sale con los 2 mensajes de confirmación")
check(out[0]?.body === "🗓️Muy bien, voy a agendar la reunión, dame un minuto... ", "mensaje 1: el aviso de que va a agendar")
check(
  out[1]?.body === `Reunión confirmada el 03/11/2026 a las 13:30 uno de nuestros representantes se conectará contigo. Que tengas muy buena tarde 😊`,
  "mensaje 2: la confirmación con la fecha y la hora elegidas"
)

// El "caliente" puede agendar al día hábil siguiente: 1 día de margen.
let consultaCaliente = ""
globalThis.fetch = (url, init) => {
  if (String(url).includes("event_type_available_times")) consultaCaliente = String(url)
  return fetchDelStub(url, init)
}

out = await advanceTo("caliente", PHONES.caliente, ["si", "texto:marcos@mail.com", "cinco_mas", "srl", "mas_5000"])
out = await say('toca "Listo + precisiones"', tap("caliente"), PHONES.caliente)
check(
  last(out)?.body === "Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔",
  "el caliente de facturación alta ofrece la agenda"
)
check(last(out)?.buttons.length === 3, "el caliente de facturación alta ofrece 3 horarios")
check(consultaCaliente.includes(earliestBookableDate(1)), "el caliente pide 1 día hábil de margen")

out = await say("toca un horario", tap(last(out).buttons[0]), PHONES.caliente)
globalThis.fetch = fetchDelStub
check(out.length === 2, "el caliente sale con los 2 mensajes de confirmación")
check(out[0]?.body === "🗓️Muy bien, voy a agendar la reunión, dame un minuto... ", "mensaje 1: el aviso de que va a agendar")
check(
  out[1]?.body === `Reunión confirmada el 03/11/2026 a las 11:00 uno de nuestros representantes se conectará contigo. Que tengas ${greetingFor(SLOTS_CALENDLY[0])} 😊`,
  "mensaje 2: la confirmación con la fecha y la hora elegidas"
)

console.log("\n=== Prioridad: Opción 1 (espíritu de Guerrero) ===\n")

// La frase 1 (escalar el negocio) abre su propia agenda, con el mensaje del
// "espíritu de Guerrero" y el margen más corto: 1 día hábil.
let consultaGuerrero = ""
globalThis.fetch = (url, init) => {
  if (String(url).includes("event_type_available_times")) consultaGuerrero = String(url)
  return fetchDelStub(url, init)
}

out = await advanceTo("guerrero", PHONES.guerrero, ["si", "texto:sol@mail.com", "dos", "monotributista", "1000_5000"])
out = await say("toca Opción 1", tap("opcion_1"), PHONES.guerrero)
globalThis.fetch = fetchDelStub

check(
  last(out)?.body ===
    "Tenes un espíritu de Guerrero 💪🏻\n\nveo viable que podamos trabajar juntos, te voy a agendar una reunión con un representante 🗓️ ¿cual de estas opciones te queda mejor para la reunión?",
  "la frase de escalar ofrece la agenda con el mensaje del Guerrero"
)
check(last(out)?.buttons.length === 3, "la agenda del Guerrero ofrece 3 horarios")
check(consultaGuerrero.includes(earliestBookableDate(1)), "la agenda del Guerrero pide 1 día hábil de margen")
check(!consultaGuerrero.includes(earliestBookableDate(3)), "no usa el margen de 3 días del tibio")

out = await say("elige un horario", tap(last(out).buttons[0]), PHONES.guerrero)
check(out[0]?.body === "🗓️Muy bien, voy a agendar la reunión, dame un minuto... ", "mensaje 1: el aviso de que va a agendar")
check(out[1]?.body.includes("Reunión confirmada el 03/11/2026 a las 11:00"), "mensaje 2: la confirmación")

console.log("\n=== Prioridad: Opción 2 (vender más) ===\n")

// La frase 2 (vender más sin grandes esfuerzos) ofrece los mismos 4 objetivos de
// marketing que la solución alternativa, pero en su propio nodo.
out = await advanceTo("vendeMas", PHONES.vendeMas, ["si", "texto:noa@mail.com", "dos", "monotributista", "1000_5000"])
out = await say("toca Opción 2", tap("opcion_2"), PHONES.vendeMas)

check(
  out[0]?.body ===
    'Muy bien, puedo armarte un plan de marketing que te impulse contemplando tu facturación actual para que pronto podamos instalar "motor de ventas" en tu proyecto. 🚀\n\n¿Cual de estos objetivos asociado al marketing de redes sociales es el que mas te interesa en este momento? 🤔',
  "la Opción 2 ofrece el plan de marketing"
)
check(out[0]?.buttons.join(",") === "aumentar_facturacion,crecer_seguidores,mejorar_interaccion", "mensaje 1: 3 objetivos")
check(out[1]?.buttons.join(",") === "marca_personal", "mensaje 2: el objetivo que sobraba, solo")

// El botón del 2º mensaje avanza y deja el estado en el nodo principal.
out = await say('toca "Desarrollar mi marca personal" (2º mensaje)', tap("marca_personal"), PHONES.vendeMas)
check(last(out)?.body.includes("cual es tu profesión"), "el objetivo de marca personal avanza a la profesión")

// Los 3 del primer mensaje van a su propio nodo de inversión.
out = await advanceTo("vendeMas2", PHONES.vendeMas, ["si", "texto:noa@mail.com", "dos", "monotributista", "1000_5000", "opcion_2", "crecer_seguidores"])
check(last(out)?.buttons.join(",") === "bajo_100k,medio_300k,alto_300k", "crecer en seguidores abre los montos de inversión")

console.log("\n=== Inversión alta: más de $300.000 ===\n")

out = await advanceTo("alto", PHONES.alto, ["si", "texto:lucia@mail.com", "dos", "monotributista", "bajo_1000", "si", "aumentar_facturacion"])
out = await say('toca "Más de $300.000"', tap("alto_300k"), PHONES.alto)
check(
  last(out)?.body ===
    "Muy bien 😊\n\nestoy pensando que podemos hacer una primera prueba, podemos hacer trazar un plan de marketing para redes sociales que tenga 👇🏻\n\n- campaña publicitaría full por 10 días\n- 4 posteos para el feed\n- 2 videos para el feed \n\n\n👉🏻 Te voy a agendar una reunión con un agente humano, para que pueda explicarte mas detalles.\n\n\npor ultimo podrías elegir una de las siguientes opciones (con la que te sientas mas comodo/a, claro) 🤔",
  "el texto de la inversión alta es el esperado"
)
check(last(out)?.interactive === "list", "las 3 opciones de disposición salen como lista")
check(last(out)?.buttons.join(",") === "frio,tibio,caliente", "las 3 opciones de disposición")
check(
  last(out)?.descriptions?.join(" | ") ===
    "Solo quiero información, aun no estoy listo para contratar | Estoy ligeramente listo para contratar | Estoy listo para contratar, solo quiero mas precisiones",
  "los textos de cada opción son los esperados"
)

console.log("\n=== Inversión alta: las 3 agendas ===\n")

// Cada opción tiene su propio nodo de agenda, con su margen: frío 5 días hábiles,
// tibio 3 y caliente 1.
const expectationAlto = {
  frio: 5,
  tibio: 3,
  caliente: 1,
}

for (const [key, dias] of Object.entries(expectationAlto)) {
  let consulta = ""
  globalThis.fetch = (url, init) => {
    if (String(url).includes("event_type_available_times")) consulta = String(url)
    return fetchDelStub(url, init)
  }
  const phone = `${PHONES.alto}${key.length}`
  await advanceTo(key, phone, ["si", "texto:lucia@mail.com", "dos", "monotributista", "bajo_1000", "si", "aumentar_facturacion", "alto_300k"])
  out = await say(`toca "${key}"`, tap(key), phone)
  globalThis.fetch = fetchDelStub

  check(
    last(out)?.body === "Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔",
    `${key}: ofrece la agenda`
  )
  check(last(out)?.buttons.length === 3, `${key}: 3 horarios`)
  check(consulta.includes(earliestBookableDate(dias)), `${key}: consulta desde ${dias} días hábiles`)

  out = await say("elige un horario", tap(last(out).buttons[0]), phone)
  check(out.length === 2, `${key}: sale con los 2 mensajes de confirmación`)
  check(out[0]?.body === "🗓️Muy bien, voy a agendar la reunión, dame un minuto... ", `${key}: mensaje 1`)
  check(out[1]?.body.includes("Reunión confirmada el 03/11/2026 a las 11:00"), `${key}: mensaje 2`)
}

console.log("\n=== Agenda del camino tibio ===\n")

// La rama de $200.000: los 3 caminos van a su propia agenda, con márgenes de
// 5, 3 y 1 día hábil respectivamente.
const expectationM2 = { frio: 5, tibio: 3, caliente: 1 }

for (const [key, dias] of Object.entries(expectationM2)) {
  let consultaM2 = ""
  globalThis.fetch = (url, init) => {
    if (String(url).includes("event_type_available_times")) consultaM2 = String(url)
    return fetchDelStub(url, init)
  }
  const phone = `${PHONES.m2}${key.length}`
  await advanceTo(key, phone, ["si", "texto:diego@mail.com", "dos", "monotributista", "bajo_1000", "si", "aumentar_facturacion", "medio_300k"])
  out = await say(`toca "${key}"`, tap(key), phone)
  globalThis.fetch = fetchDelStub

  check(
    last(out)?.body === "Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔",
    `$200.000 ${key}: ofrece la agenda`
  )
  check(last(out)?.buttons.length === 3, `$200.000 ${key}: 3 horarios`)
  check(consultaM2.includes(earliestBookableDate(dias)), `$200.000 ${key}: consulta desde ${dias} días hábiles`)

  out = await say("elige un horario", tap(last(out).buttons[0]), phone)
  check(out.length === 2, `$200.000 ${key}: sale con los 2 mensajes de confirmación`)
  check(out[0]?.body === "🗓️Muy bien, voy a agendar la reunión, dame un minuto... ", `$200.000 ${key}: mensaje 1`)
  check(out[1]?.body.includes("Reunión confirmada el 03/11/2026 a las 11:00"), `$200.000 ${key}: mensaje 2`)
}

console.log("\n=== Agenda del camino tibio ===\n")

out = await advanceTo("tibio", PHONES.agendaTibio, ["si", "texto:diego@mail.com", "dos", "monotributista", "bajo_1000", "si", "aumentar_facturacion", "medio_300k"])
// El margen está en la consulta a Calendarly: el camino tibio tiene que pedir
// desde 3 días hábiles, no los 5 del frío.
let consultaTibio = ""
globalThis.fetch = (url, init) => {
  // Solo la consulta de disponibilidad: después viene el envío del mensaje a
  // WhatsApp, que no va por la misma URL.
  if (String(url).includes("event_type_available_times")) consultaTibio = String(url)
  return fetchDelStub(url, init)
}

out = await say('toca "Ligeramente listo"', tap("tibio"), PHONES.agendaTibio)
globalThis.fetch = fetchDelStub

check(last(out)?.body.includes("fechas disponibles"), "el tibio también ofrece horarios")
check(last(out)?.body === "Bien , lo comprendo, tengo estas fechas disponibles para la reunión con uno de nuestros representantes ¿cual te queda mejor? 🤔", "el texto del tibio es el mismo que el del frío")
check(last(out)?.buttons.length === 3, "el tibio ofrece 3 horarios")
check(consultaTibio.includes(earliestBookableDate(3)), "el tibio consulta desde 3 días hábiles")
check(!consultaTibio.includes(earliestBookableDate(5)), "el tibio no usa el margen de 5 días del frío")

out = await say("elige un horario", tap(last(out).buttons[1]), PHONES.agendaTibio)
check(out[1]?.body.includes("Reunión confirmada"), "el tibio también confirma la reunión")

console.log("\n=== Botón del mensaje apilado ===\n")

console.log("\n=== Botón del mensaje apilado ===\n")

await advanceTo("apilado", PHONES.apilado, ["si", "texto:luis@mail.com", "dos", "monotributista", "bajo_1000", "si"])
out = await say("toca el botón del 2º mensaje (marca_personal)", tap("marca_personal"), PHONES.apilado)
check(last(out)?.body.includes("cual es tu profesión"), "el botón apilado avanza a la pregunta de profesión")
check(last(out)?.buttons.join(",") === "legal_contable,escritor,otros", "3 opciones de profesión")

out = await say('toca "Legal y contable"', tap("legal_contable"), PHONES.apilado)
check(last(out)?.interactive === "list", "el nodo de disposición se manda como lista (las opciones no entran en botones)")
check(last(out)?.titles.some((t) => t.includes("Solo quiero información")), "la lista lleva el texto largo de cada opción")

out = await say('toca "Solo información" (destino sin definir)', tap("frio"), PHONES.apilado)
check(last(out)?.body.startsWith("PENDIENTE"), "una opción sin definir cae en el nodo pendiente")

console.log("\n=== Limpieza ===\n")

await pool.query("DELETE FROM wa_messages WHERE conversation_phone = ANY($1)", [NUMEROS])
await pool.query("DELETE FROM wa_conversations WHERE phone = ANY($1)", [NUMEROS])
await pool.end()

console.log(`\n${failures === 0 ? "Todo OK" : `${failures} fallo(s)`}`)
process.exit(failures === 0 ? 0 : 1)