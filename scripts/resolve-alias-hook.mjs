import { pathToFileURL } from "node:url"
import path from "node:path"

const ROOT = process.cwd()

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    let target = path.join(ROOT, specifier.slice(2))
    if (!target.endsWith(".js") && !target.endsWith(".mjs") && !target.endsWith(".cjs")) {
      target += ".js"
    }
    return { url: pathToFileURL(target).href, shortCircuit: true }
  }
  return next(specifier, context)
}