import "./load-env.js"
import { generateReply } from "../lib/ai/assistant.js"

const history = [
  { direction: "in", body: "Hola! Vi la web de GrupoStart y quiero saber cómo me pueden ayudar con las redes de mi negocio" },
  { direction: "out", body: "¡Hola! Con gusto te cuento. ¿A qué se dedica tu negocio y qué te gustaría lograr?" },
  { direction: "in", body: "Tengo una tienda de ropa y quiero tener más presencia en Instagram" },
]

const { reply, meeting } = await generateReply({ history, customerName: "Cliente de prueba" })

console.log("\n=== RESPUESTA DEL BOT ===\n")
console.log(reply || "(sin respuesta)")
console.log("\n=== REUNIÓN DETECTADA ===\n")
console.log(meeting || "(sin reunión aún)")
