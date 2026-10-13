const ACCENTS = /[\u0300-\u036f]/g
const PUNCTUATION = /[¿?¡!.,;:"'`´“”‘’*_\-—()[\]{}/\\|]/g

/**
 * Deja el texto comparable: sin acentos, minúsculas y sin puntuación, para que
 * "Menu", "menú" o "  MENÚ  " sean la misma cosa.
 */
export function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(ACCENTS, "")
    .toLowerCase()
    .replace(PUNCTUATION, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Reemplaza los placeholders {{clave}} con lo que haya en el estado de la
 * conversación, así un nodo puede personalized el texto: "Gracias {{nombre}}".
 * Un placeholder que no exista se queda vacío.
 */
export function renderTemplate(body, state) {
  const rendered = String(body || "").replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const value = state?.[key]
    return value === undefined || value === null ? "" : String(value)
  })

  // Limpieza visual para WhatsApp: evita bloques con demasiadas líneas vacías y
  // quita espacios sobrantes al final de cada línea.
  return rendered
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}
