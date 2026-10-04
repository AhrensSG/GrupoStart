import { existsSync } from "node:fs"
import { fileURLToPath, pathToFileURL } from "node:url"
import path from "node:path"

const ROOT = process.cwd()
const EXTENSIONS = /\.(js|mjs|cjs|json)$/

/**
 * Resuelve el alias "@/" de jsconfig.json y también los imports relativos sin
 * extensión, que el resolver de ESM no acepta. Necesario para correr los
 * scripts de lib/ directamente con node.
 */
export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/") || specifier.startsWith("./") || specifier.startsWith("../")) {
    const parentDir = context.parentURL ? path.dirname(fileURLToPath(context.parentURL)) : ROOT
    const target = specifier.startsWith("@/") ? path.join(ROOT, specifier.slice(2)) : path.resolve(parentDir, specifier)
    const withExtension = EXTENSIONS.test(target) ? target : `${target}.js`
    const file = existsSync(target) ? target : existsSync(withExtension) ? withExtension : null
    if (file) return { url: pathToFileURL(file).href, shortCircuit: true }
  }
  return next(specifier, context)
}
