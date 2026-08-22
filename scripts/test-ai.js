import "./load-env.js"
import { generateReply } from "../lib/ai/assistant.js"

const turnos = [
  {
    history: [{ direction: "in", body: "Hola" }],
    state: {},
    label: "Turno 1 - primer contacto",
  },
  {
    history: [
      { direction: "in", body: "Hola" },
      {
        direction: "out",
        body: "Hola 👋 mucho gusto, soy Sofi IA, agente de Grupo Start. Me gustaría hacerte solo unas pocas preguntas bien sencillas y después puedo darte curso con un representante humano. ¿Comenzamos?",
      },
      { direction: "in", body: "Dale, adelante" },
    ],
    state: { stage: "consentimiento", profile: {} },
    label: "Turno 2 - consentimiento dado",
  },
]

let state = {}
for (const turno of turnos) {
  console.log(`\n=== ${turno.label} ===`)
  const { reply, stageUpdate, profileUpdates, action, outcome } = await generateReply({
    history: turno.history,
    customerName: "Cliente de prueba",
    state: turno.state,
  })
  console.log("REPLY:", reply || "(sin respuesta)")
  console.log("STAGE:", stageUpdate)
  console.log("PROFILE_UPDATES:", JSON.stringify(profileUpdates))
  console.log("ACTION:", JSON.stringify(action))
  console.log("OUTCOME:", outcome)
}
