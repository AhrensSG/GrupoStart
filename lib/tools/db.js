import { Pool } from "pg"
import { addBusinessDays, formatFecha, parseFecha } from "./business-days"

const toolsDbUrl = process.env.TOOLS_DATABASE_URL || process.env.DATABASE_URL || (() => {
  const user = process.env.DB_USERNAME || "postgres"
  const pass = process.env.DB_PASSWORD || ""
  const host = process.env.DB_HOSTNAME || "localhost"
  const port = process.env.DB_PORT || "5432"
  const db = process.env.DB_NAME || "grupostart"
  return `postgres://${user}:${pass}@${host}:${port}/${db}`
})()

const pool = new Pool({ connectionString: toolsDbUrl })

async function setupDatabase() {
  try {
    const client = await pool.connect()
    try {
      await client.query("BEGIN")
      await client.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          celular VARCHAR(100) DEFAULT '',
          email VARCHAR(255) DEFAULT '',
          red_social VARCHAR(50) DEFAULT '',
          nombre_usuario VARCHAR(255) DEFAULT '',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `)
      await client.query(`
        CREATE TABLE IF NOT EXISTS contact_rounds (
          id SERIAL PRIMARY KEY,
          contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
          round_index INTEGER NOT NULL,
          clasificacion VARCHAR(100) DEFAULT '',
          fecha VARCHAR(20) DEFAULT '',
          estado TEXT DEFAULT '',
          proxima_fecha VARCHAR(20) DEFAULT '',
          hora_proximo_contacto VARCHAR(10) DEFAULT '',
          UNIQUE(contact_id, round_index)
        )
      `)
      await client.query(`
        CREATE TABLE IF NOT EXISTS user_profile (
          id SERIAL PRIMARY KEY,
          hora_ingreso VARCHAR(10) DEFAULT '09:00',
          hora_salida VARCHAR(10) DEFAULT '18:00',
          whatsapp_api_url TEXT DEFAULT '',
          whatsapp_api_token TEXT DEFAULT '',
          company_name VARCHAR(255) DEFAULT '',
          company_logo TEXT DEFAULT '',
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `)
      await client.query("ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT ''")
      await client.query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS pinned BOOLEAN DEFAULT FALSE")
      await client.query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS user_id VARCHAR(255) DEFAULT ''")
      await client.query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL")
      await client.query("ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS company_logo TEXT DEFAULT ''")
      await client.query("ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS user_id VARCHAR(255) DEFAULT ''")
      await client.query("ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS horario_ranges TEXT DEFAULT ''")
      await client.query("UPDATE user_profile SET horario_ranges = '[{\"ingreso\":\"' || hora_ingreso || '\",\"salida\":\"' || hora_salida || '\"}]' WHERE (horario_ranges IS NULL OR horario_ranges = '') AND hora_ingreso IS NOT NULL AND hora_salida IS NOT NULL")
      await client.query("ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS telefono VARCHAR(50) DEFAULT ''")
      await client.query(`
        CREATE TABLE IF NOT EXISTS subscriptions (
          id SERIAL PRIMARY KEY,
          uid VARCHAR(255) NOT NULL UNIQUE,
          email VARCHAR(255) DEFAULT '',
          status VARCHAR(50) DEFAULT 'active',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `)
      await client.query("COMMIT")
      console.log("Tools database tables initialized successfully")
    } catch (err) {
      await client.query("ROLLBACK")
      console.error("Error creating tools tables:", err.message)
    } finally {
      client.release()
    }
  } catch (err) {
    console.error("Could not connect to tools database:", err.message)
  }
}

let setupPromise = null

async function ensureSetup() {
  if (!setupPromise) {
    setupPromise = setupDatabase().catch((err) => {
      console.error("Database setup failed:", err.message)
      setupPromise = null
    })
  }
  return setupPromise
}

const NO_SALVABLE_REASONS = new Set([
  "No interesado: demora al responder",
  "No interesado: Mala atención",
])

function calcProximaFecha(clasificacion, estado, fechaBase) {
  const date = parseFecha(fechaBase)
  if (!date) return ""
  if (NO_SALVABLE_REASONS.has(clasificacion)) return ""
  const lookup = clasificacion === "No interesado" && estado ? estado : clasificacion
  if (NO_SALVABLE_REASONS.has(lookup)) return ""
  const daysMap = {
    "Interesado": 5,
    "Potencial cliente": 1,
    "No hubo respuesta": 20,
    "No interesado: por razones económicas": 60,
    "No interesado: tiene una mejor oferta": 3,
    "No interesado: La oferta no es lo que buscaba": 30,
    "No interesado: Otras razones": 45,
  }
  const days = daysMap[lookup]
  if (days) return formatFecha(addBusinessDays(date, days))
  return ""
}

export async function getAllContacts(userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const contacts = (await client.query("SELECT * FROM contacts WHERE user_id = $1 AND deleted_at IS NULL ORDER BY pinned DESC, nombre ASC", [userId])).rows
    const rounds = (await client.query("SELECT cr.* FROM contact_rounds cr INNER JOIN contacts c ON c.id = cr.contact_id WHERE c.user_id = $1 AND c.deleted_at IS NULL ORDER BY cr.contact_id, cr.round_index ASC", [userId])).rows
    const roundsByContact = new Map()
    for (const r of rounds) {
      if (!roundsByContact.has(r.contact_id)) roundsByContact.set(r.contact_id, [])
      roundsByContact.get(r.contact_id).push(r)
    }
    return contacts.map((c) => ({ ...c, contactos: roundsByContact.get(c.id) || [] }))
  } finally {
    client.release()
  }
}

export async function getContact(id, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query("SELECT * FROM contacts WHERE id = $1 AND user_id = $2", [id, userId])
    if (rows.length === 0) return null
    const rounds = (await client.query("SELECT * FROM contact_rounds WHERE contact_id = $1 ORDER BY round_index ASC", [id])).rows
    return { ...rows[0], contactos: rounds }
  } finally {
    client.release()
  }
}

export async function createContact(data, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const { rows } = await client.query(
      "INSERT INTO contacts (nombre, celular, email, red_social, nombre_usuario, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [data.nombre, data.celular, data.email, data.red_social || "", data.nombre_usuario || "", userId]
    )
    const contactId = rows[0].id
    const fechaBase = data.contactos[0]?.fecha || ""
    for (let i = 0; i < data.contactos.length; i++) {
      const r = data.contactos[i]
      const prox = calcProximaFecha(r.clasificacion, r.estado, fechaBase)
      await client.query(
        "INSERT INTO contact_rounds (contact_id, round_index, clasificacion, fecha, estado, proxima_fecha, hora_proximo_contacto) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [contactId, i, r.clasificacion, r.fecha, r.estado, prox, r.hora_proximo_contacto || ""]
      )
    }
    await client.query("COMMIT")
    return contactId
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

export async function updateContact(id, data, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const sets = []
    const values = []
    let idx = 1
    if (data.nombre !== undefined) { sets.push(`nombre = $${idx++}`); values.push(data.nombre) }
    if (data.celular !== undefined) { sets.push(`celular = $${idx++}`); values.push(data.celular) }
    if (data.email !== undefined) { sets.push(`email = $${idx++}`); values.push(data.email) }
    if (data.red_social !== undefined) { sets.push(`red_social = $${idx++}`); values.push(data.red_social) }
    if (data.nombre_usuario !== undefined) { sets.push(`nombre_usuario = $${idx++}`); values.push(data.nombre_usuario) }
    if (data.pinned !== undefined) { sets.push(`pinned = $${idx++}`); values.push(data.pinned) }
    if (sets.length === 0) return
    sets.push("updated_at = NOW()")
    values.push(id, userId)
    await client.query(`UPDATE contacts SET ${sets.join(", ")} WHERE id = $${idx} AND user_id = $${idx + 1}`, values)
  } finally {
    client.release()
  }
}

export async function updateContactRound(contactId, roundIndex, data, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows: contact } = await client.query("SELECT id FROM contacts WHERE id = $1 AND user_id = $2", [contactId, userId])
    if (contact.length === 0) return
    const sets = []
    const values = []
    let idx = 1
    if (data.clasificacion !== undefined) { sets.push(`clasificacion = $${idx++}`); values.push(data.clasificacion) }
    if (data.fecha !== undefined) { sets.push(`fecha = $${idx++}`); values.push(data.fecha) }
    if (data.estado !== undefined) { sets.push(`estado = $${idx++}`); values.push(data.estado) }
    if (data.hora_proximo_contacto !== undefined) { sets.push(`hora_proximo_contacto = $${idx++}`); values.push(data.hora_proximo_contacto) }
    if (sets.length === 0) return
    if (data.proxima_fecha !== undefined) {
      sets.push(`proxima_fecha = $${idx++}`)
      values.push(data.proxima_fecha)
    } else {
      const clasif = data.clasificacion ?? (await getCurrentClasif(client, contactId, roundIndex))
      const estado = data.estado ?? (await getCurrentEstado(client, contactId, roundIndex))
      const fechaBase = await getRound1Fecha(client, contactId)
      const prox = calcProximaFecha(clasif, estado, fechaBase)
      sets.push(`proxima_fecha = $${idx++}`)
      values.push(prox)
    }
    values.push(contactId, roundIndex)
    await client.query(`UPDATE contact_rounds SET ${sets.join(", ")} WHERE contact_id = $${idx} AND round_index = $${idx + 1}`, values)
  } finally {
    client.release()
  }
}

async function getRound1Fecha(client, contactId) {
  const { rows } = await client.query("SELECT fecha FROM contact_rounds WHERE contact_id = $1 AND round_index = 0", [contactId])
  return rows[0]?.fecha || ""
}

async function getCurrentClasif(client, contactId, roundIndex) {
  const { rows } = await client.query("SELECT clasificacion FROM contact_rounds WHERE contact_id = $1 AND round_index = $2", [contactId, roundIndex])
  return rows[0]?.clasificacion ?? ""
}

async function getCurrentEstado(client, contactId, roundIndex) {
  const { rows } = await client.query("SELECT estado FROM contact_rounds WHERE contact_id = $1 AND round_index = $2", [contactId, roundIndex])
  return rows[0]?.estado ?? ""
}

export async function checkContactExists(uid, celular, email) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const params = []
    const conditions = []
    let idx = 1
    if (celular) {
      conditions.push(`celular = $${idx++}`)
      params.push(celular)
    }
    if (email) {
      conditions.push(`email = $${idx++}`)
      params.push(email)
    }
    if (conditions.length === 0) return false
    params.push(uid)
    const { rows } = await client.query(`SELECT id FROM contacts WHERE (${conditions.join(" OR ")}) AND user_id = $${idx} AND deleted_at IS NULL`, params)
    return rows.length > 0
  } finally {
    client.release()
  }
}

export async function deleteContact(id, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("UPDATE contacts SET deleted_at = NOW() WHERE id = $1 AND user_id = $2", [id, userId])
  } finally {
    client.release()
  }
}

export async function getDeletedContacts(userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const contacts = (await client.query("SELECT * FROM contacts WHERE user_id = $1 AND deleted_at IS NOT NULL ORDER BY deleted_at DESC", [userId])).rows
    const ids = contacts.map((c) => c.id)
    if (ids.length === 0) return []
    const rounds = (await client.query("SELECT * FROM contact_rounds WHERE contact_id = ANY($1::int[]) ORDER BY contact_id, round_index ASC", [ids])).rows
    const roundsByContact = new Map()
    for (const r of rounds) {
      if (!roundsByContact.has(r.contact_id)) roundsByContact.set(r.contact_id, [])
      roundsByContact.get(r.contact_id).push(r)
    }
    return contacts.map((c) => ({ ...c, contactos: roundsByContact.get(c.id) || [] }))
  } finally {
    client.release()
  }
}

export async function restoreContact(id, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("UPDATE contacts SET deleted_at = NULL WHERE id = $1 AND user_id = $2", [id, userId])
  } finally {
    client.release()
  }
}

export async function permanentlyDeleteContact(id, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("DELETE FROM contact_rounds WHERE contact_id = $1", [id])
    await client.query("DELETE FROM contacts WHERE id = $1 AND user_id = $2", [id, userId])
  } finally {
    client.release()
  }
}

export async function clearAll(userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query("DELETE FROM contact_rounds WHERE contact_id IN (SELECT id FROM contacts WHERE user_id = $1)", [userId])
    await client.query("DELETE FROM contacts WHERE user_id = $1", [userId])
    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

export async function clearTrash(userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query("DELETE FROM contact_rounds WHERE contact_id IN (SELECT id FROM contacts WHERE user_id = $1 AND deleted_at IS NOT NULL)", [userId])
    await client.query("DELETE FROM contacts WHERE user_id = $1 AND deleted_at IS NOT NULL", [userId])
    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

export async function getUserProfile(userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query("SELECT * FROM user_profile WHERE user_id = $1", [userId])
    return rows[0] || null
  } finally {
    client.release()
  }
}

export async function updateUserProfile(data, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const current = await getUserProfile(userId)
    if (!current) {
      await client.query(
        "INSERT INTO user_profile (hora_ingreso, hora_salida, horario_ranges, telefono, whatsapp_api_url, whatsapp_api_token, company_name, company_logo, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [data.hora_ingreso || "09:00", data.hora_salida || "18:00", data.horario_ranges || "", data.telefono || "", data.whatsapp_api_url || "", data.whatsapp_api_token || "", data.company_name || "", data.company_logo || "", userId]
      )
      return
    }
    const sets = []
    const values = []
    let idx = 1
    if (data.hora_ingreso !== undefined) { sets.push(`hora_ingreso = $${idx++}`); values.push(data.hora_ingreso) }
    if (data.hora_salida !== undefined) { sets.push(`hora_salida = $${idx++}`); values.push(data.hora_salida) }
    if (data.horario_ranges !== undefined) { sets.push(`horario_ranges = $${idx++}`); values.push(data.horario_ranges) }
    if (data.telefono !== undefined) { sets.push(`telefono = $${idx++}`); values.push(data.telefono) }
    if (data.whatsapp_api_url !== undefined) { sets.push(`whatsapp_api_url = $${idx++}`); values.push(data.whatsapp_api_url) }
    if (data.whatsapp_api_token !== undefined) { sets.push(`whatsapp_api_token = $${idx++}`); values.push(data.whatsapp_api_token) }
    if (data.company_name !== undefined) { sets.push(`company_name = $${idx++}`); values.push(data.company_name) }
    if (data.company_logo !== undefined) { sets.push(`company_logo = $${idx++}`); values.push(data.company_logo) }
    if (sets.length === 0) return
    sets.push("updated_at = NOW()")
    values.push(userId)
    await client.query(`UPDATE user_profile SET ${sets.join(", ")} WHERE user_id = $${idx}`, values)
  } finally {
    client.release()
  }
}

export async function replaceAllContacts(contacts, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query("DELETE FROM contact_rounds WHERE contact_id IN (SELECT id FROM contacts WHERE user_id = $1)", [userId])
    await client.query("DELETE FROM contacts WHERE user_id = $1", [userId])
    for (const data of contacts) {
      const { rows } = await client.query(
        "INSERT INTO contacts (nombre, celular, email, red_social, nombre_usuario, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [data.nombre, data.celular, data.email, data.red_social || "", data.nombre_usuario || "", userId]
      )
      const contactId = rows[0].id
      const fechaBase = data.contactos[0]?.fecha || ""
      for (let i = 0; i < data.contactos.length; i++) {
        const r = data.contactos[i]
        const prox = calcProximaFecha(r.clasificacion, r.estado, fechaBase)
        await client.query(
          "INSERT INTO contact_rounds (contact_id, round_index, clasificacion, fecha, estado, proxima_fecha, hora_proximo_contacto) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [contactId, i, r.clasificacion, r.fecha, r.estado, prox, r.hora_proximo_contacto || ""]
        )
      }
    }
    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

export async function updateContactWithRounds(contactId, data, contactos, userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    const sets = []
    const values = []
    let idx = 1
    if (data.nombre !== undefined) { sets.push(`nombre = $${idx++}`); values.push(data.nombre) }
    if (data.celular !== undefined) { sets.push(`celular = $${idx++}`); values.push(data.celular) }
    if (data.email !== undefined) { sets.push(`email = $${idx++}`); values.push(data.email) }
    if (data.red_social !== undefined) { sets.push(`red_social = $${idx++}`); values.push(data.red_social) }
    if (data.nombre_usuario !== undefined) { sets.push(`nombre_usuario = $${idx++}`); values.push(data.nombre_usuario) }
    if (data.pinned !== undefined) { sets.push(`pinned = $${idx++}`); values.push(data.pinned) }
    if (sets.length > 0) {
      sets.push("updated_at = NOW()")
      values.push(contactId, userId)
      await client.query(`UPDATE contacts SET ${sets.join(", ")} WHERE id = $${idx} AND user_id = $${idx + 1}`, values)
    }

    if (contactos && Array.isArray(contactos)) {
      const { rows: verified } = await client.query("SELECT id FROM contacts WHERE id = $1 AND user_id = $2", [contactId, userId])
      const ownsContact = verified.length > 0
      for (let i = 0; i < contactos.length; i++) {
        const r = contactos[i]
        if (r.clasificacion !== undefined || r.fecha !== undefined || r.estado !== undefined || r.hora_proximo_contacto !== undefined || r.proxima_fecha !== undefined) {
          const cols = []
          const vals = []
          if (r.clasificacion !== undefined) { cols.push("clasificacion"); vals.push(r.clasificacion) }
          if (r.fecha !== undefined) { cols.push("fecha"); vals.push(r.fecha) }
          if (r.estado !== undefined) { cols.push("estado"); vals.push(r.estado) }
          if (r.hora_proximo_contacto !== undefined) { cols.push("hora_proximo_contacto"); vals.push(r.hora_proximo_contacto) }
          if (r.proxima_fecha !== undefined) {
            cols.push("proxima_fecha"); vals.push(r.proxima_fecha)
          } else {
            const clasif = r.clasificacion ?? (await getCurrentClasif(client, contactId, i))
            const estado = r.estado ?? (await getCurrentEstado(client, contactId, i))
            const fechaBase = await getRound1Fecha(client, contactId)
            const prox = calcProximaFecha(clasif, estado, fechaBase)
            cols.push("proxima_fecha"); vals.push(prox)
          }
          if (cols.length > 0 && ownsContact) {
            const allCols = ["contact_id", "round_index", ...cols]
            const allVals = [contactId, i, ...vals]
            const placeholders = allVals.map((_, vi) => `$${vi + 1}`).join(", ")
            const updateSet = cols.map(c => `${c} = EXCLUDED.${c}`).join(", ")
            await client.query(
              `INSERT INTO contact_rounds (${allCols.join(", ")}) VALUES (${placeholders}) ON CONFLICT (contact_id, round_index) DO UPDATE SET ${updateSet}`,
              allVals
            )
          }
        }
      }
    }

    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

export async function getContactsPendingReminder(userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const today = formatFecha(new Date())
    const { rows } = await client.query(
      `SELECT c.* FROM contacts c INNER JOIN contact_rounds cr ON cr.contact_id = c.id WHERE cr.proxima_fecha = $1 AND cr.clasificacion = 'Pendiente' AND c.user_id = $2 ORDER BY c.nombre ASC`,
      [today, userId]
    )
    const result = []
    for (const c of rows) {
      const rounds = (await client.query("SELECT * FROM contact_rounds WHERE contact_id = $1 ORDER BY round_index ASC", [c.id])).rows
      result.push({ ...c, contactos: rounds })
    }
    return result
  } finally {
    client.release()
  }
}

export async function setUserSubscribed(uid, email) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query("SELECT * FROM subscriptions WHERE uid = $1", [uid])
    if (rows.length > 0) {
      await client.query("UPDATE subscriptions SET status = 'active', updated_at = NOW() WHERE uid = $1", [uid])
    } else {
      await client.query(
        "INSERT INTO subscriptions (uid, email, status) VALUES ($1, $2, 'active')",
        [uid, email]
      )
    }
  } finally {
    client.release()
  }
}

export async function checkUserSubscribed(uid, email) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    let { rows } = await client.query("SELECT * FROM subscriptions WHERE uid = $1 AND status = 'active'", [uid])
    if (rows.length === 0 && email) {
      const { rows: emailRows } = await client.query("SELECT * FROM subscriptions WHERE email = $1 AND status = 'active'", [email])
      rows = emailRows
    }
    return rows.length > 0
  } finally {
    client.release()
  }
}
