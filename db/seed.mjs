import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import "dotenv/config"
import { Pool } from "pg"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SEEDS_DIR = path.join(__dirname, "seeds")

const dbUrl = process.env.TOOLS_DATABASE_URL || process.env.DATABASE_URL || (() => {
  const user = process.env.DB_USERNAME || "postgres"
  const pass = process.env.DB_PASSWORD || ""
  const host = process.env.DB_HOSTNAME || "localhost"
  const port = process.env.DB_PORT || "5432"
  const db = process.env.DB_NAME || "grupostart"
  return `postgres://${user}:${pass}@${host}:${port}/${db}`
})()

/**
 * Corre los archivos de db/seeds. Son idempotentes (todo es ON CONFLICT), así
 * que se pueden volver a correr para pisar el contenido del flujo.
 */
async function main() {
  const pool = new Pool({ connectionString: dbUrl })
  const client = await pool.connect()
  try {
    const files = (await readdir(SEEDS_DIR)).filter((f) => f.endsWith(".sql")).sort()
    if (files.length === 0) {
      console.log("No hay seeds en db/seeds")
      return
    }
    for (const file of files) {
      const sql = await readFile(path.join(SEEDS_DIR, file), "utf8")
      console.log(`[seed] ${file} ...`)
      await client.query("BEGIN")
      try {
        await client.query(sql)
        await client.query("COMMIT")
        console.log(`[ok] ${file}`)
      } catch (err) {
        await client.query("ROLLBACK")
        throw new Error(`Seed ${file} falló: ${err.message}`)
      }
    }
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
