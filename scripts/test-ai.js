import "./load-env.js"
import { generateReply } from "../lib/ai/assistant.js"

const turnos = [
  {
    history: [{ direction: "in", body: "Hola quiero más información del programa Motor de Ventas" }],
    state: {},
    label: "Turno 1 - consulta Motor de Ventas",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "Hola 👋 mucho gusto, somos Grupo Start 🚀 ¿Comenzamos?" },
      { direction: "in", body: "Dale, adelante" },
    ],
    state: { stage: "consentimiento", profile: {} },
    label: "Turno 2 - consentimiento dado",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "¿Comenzamos?" },
      { direction: "in", body: "Si" },
      { direction: "out", body: "¿Cuántas personas forman parte de tu equipo comercial?" },
      { direction: "in", body: "Soy solo yo" },
    ],
    state: { stage: "equipo", profile: {} },
    label: "Turno 3 - equipo: solo yo",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "¿Comenzamos?" },
      { direction: "in", body: "Si" },
      { direction: "out", body: "¿Cuántas personas forman parte de tu equipo comercial?" },
      { direction: "in", body: "2 personas" },
    ],
    state: { stage: "equipo", profile: {} },
    label: "Turno 4 - equipo: 2 personas",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "¿Comenzamos?" },
      { direction: "in", body: "Si" },
      { direction: "out", body: "¿Cuántas personas forman parte de tu equipo comercial?" },
      { direction: "in", body: "5 personas o más" },
      { direction: "out", body: "¿Cuál es la figura legal de tu empresa?" },
      { direction: "in", body: "Sociedad de Responsabilidad Limitada" },
    ],
    state: { stage: "figura_legal", profile: { equipo_comercial: "5 o más" } },
    label: "Turno 5 - figura legal",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "¿Comenzamos?" },
      { direction: "in", body: "Si" },
      { direction: "out", body: "¿Cuántas personas forman parte de tu equipo comercial?" },
      { direction: "in", body: "5 personas o más" },
      { direction: "out", body: "¿Cuál es la figura legal de tu empresa?" },
      { direction: "in", body: "Sociedad Anónima" },
      { direction: "out", body: "¿Cuánto facturas al mes?" },
      { direction: "in", body: "Entre usd 1.000 a 5.000 al mes" },
    ],
    state: { stage: "facturacion", profile: { equipo_comercial: "5 o más", figura_legal: "SA" } },
    label: "Turno 6 - facturación 1-5k",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "¿Comenzamos?" },
      { direction: "in", body: "Si" },
      { direction: "out", body: "¿Cuántas personas forman parte de tu equipo comercial?" },
      { direction: "in", body: "5 personas o más" },
      { direction: "out", body: "¿Cuál es la figura legal de tu empresa?" },
      { direction: "in", body: "Sociedad Anónima" },
      { direction: "out", body: "¿Cuánto facturas al mes?" },
      { direction: "in", body: "Entre usd 5.000 y 10.000 al mes" },
    ],
    state: { stage: "facturacion", profile: { equipo_comercial: "5 o más", figura_legal: "SA" } },
    label: "Turno 7 - facturación 5-10k",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "¿Comenzamos?" },
      { direction: "in", body: "Si" },
      { direction: "out", body: "¿Cuántas personas forman parte de tu equipo comercial?" },
      { direction: "in", body: "Soy solo yo" },
      { direction: "out", body: "¿Tenés personas que se ocupen de otras áreas?" },
      { direction: "in", body: "Sí, somos varios" },
    ],
    state: { stage: "areas", profile: { equipo_comercial: "solo" } },
    label: "Turno 8 - areas: sí, varios (handoff)",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "¿Comenzamos?" },
      { direction: "in", body: "Si" },
      { direction: "out", body: "¿Cuántas personas forman parte de tu equipo comercial?" },
      { direction: "in", body: "Soy solo yo" },
      { direction: "out", body: "¿Tenés personas que se ocupen de otras áreas?" },
      { direction: "in", body: "NO, soy solo yo" },
    ],
    state: { stage: "areas", profile: { equipo_comercial: "solo" } },
    label: "Turno 9 - areas: no soy solo yo (no fit)",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "¿Comenzamos?" },
      { direction: "in", body: "Si" },
      { direction: "out", body: "¿Cuántas personas forman parte de tu equipo comercial?" },
      { direction: "in", body: "5 personas o más" },
      { direction: "out", body: "¿Cuál es la figura legal de tu empresa?" },
      { direction: "in", body: "Monotributista" },
      { direction: "out", body: "¿Cuánto facturas al mes?" },
      { direction: "in", body: "Menos de usd 1.000 al mes" },
      { direction: "out", body: "¿Te gustaría que te ofrezca una solución alternativa?" },
      { direction: "in", body: "Si" },
    ],
    state: { stage: "alternativa_confirmacion", profile: { equipo_comercial: "5 o más", figura_legal: "monotributista", facturacion_mensual: "menos de 1.000" } },
    label: "Turno 10 - alternativa aceptada",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      { direction: "out", body: "¿Comenzamos?" },
      { direction: "in", body: "Si" },
      { direction: "out", body: "¿Cuántas personas forman parte de tu equipo comercial?" },
      { direction: "in", body: "2 personas" },
    ],
    state: { stage: "email", profile: { equipo_comercial: "2 personas" } },
    label: "Turno 11 - pedido de email",
  },
]

let state = {}
for (const turno of turnos) {
  console.log(`\n=== ${turno.label} ===`)
  const { reply, stageUpdate, profileUpdates, action, outcome, ui } = await generateReply({
    history: turno.history,
    customerName: "Cliente de prueba",
    state: turno.state || state,
  })
  console.log("REPLY:", reply || "(sin respuesta)")
  console.log("STAGE:", stageUpdate)
  console.log("PROFILE_UPDATES:", JSON.stringify(profileUpdates))
  console.log("ACTION:", JSON.stringify(action))
  console.log("OUTCOME:", outcome)
  console.log("UI:", ui?.type, ui?.options?.map((o) => o.title).join(" | ") || "-")
}