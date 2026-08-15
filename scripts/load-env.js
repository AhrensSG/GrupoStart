import { readFileSync } from "node:fs"

for (const line of readFileSync(".env", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/)
  if (m && !(m[1] in process.env)) {
    process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "")
  }
}
