import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import "dotenv/config"
import { Pool } from "pg"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MIGRATIONS_DIR = path.join(__dirname, "migrations")

const dbUrl = process.env.TOOLS_DATABASE_URL || process.env.DATABASE_URL || (() => {
  const user = process.env.DB_USERNAME || "postgres"
  const pass = process.env.DB_PASSWORD || ""
  const host = process.env.DB_HOSTNAME || "localhost"
  const port = process.env.DB_PORT || "5432"
  const db = process.env.DB_NAME || "grupostart"
  return `postgres://${user}:${pass}@${host}:${port}/${db}`
})()

async function main() {
  const pool = new Pool({ connectionString: dbUrl })
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    const files = (await readdir(MIGRATIONS_DIR))
      .filter((f) => f.endsWith(".sql"))
      .sort()

    if (files.length === 0) {
      console.log("No hay migraciones pendientes")
      return
    }

    const applied = new Set(
      (await client.query("SELECT version FROM schema_migrations")).rows.map((r) => r.version)
    )

    let ran = 0
    for (const file of files) {
      const version = file.replace(/\.sql$/, "")
      if (applied.has(version)) {
        console.log(`[skip] ${version} ya aplicada`)
        continue
      }
      const sql = await readFile(path.join(MIGRATIONS_DIR, file), "utf8")
      console.log(`[run] ${version} ...`)
      await client.query("BEGIN")
      try {
        await client.query(sql)
        await client.query("INSERT INTO schema_migrations (version, name) VALUES ($1, $2)", [version, file])
        await client.query("COMMIT")
        console.log(`[ok] ${version}`)
        ran++
      } catch (err) {
        await client.query("ROLLBACK")
        throw new Error(`Migración ${version} falló: ${err.message}`)
      }
    }

    if (ran === 0) {
      console.log("Migraciones al día")
    } else {
      console.log(`${ran} migración(es) aplicada(s)`)
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
