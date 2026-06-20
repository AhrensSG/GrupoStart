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
      await client.query("ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS company_logo TEXT DEFAULT ''")
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

setupDatabase()

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

export async function getAllContacts() {
  const client = await pool.connect()
  try {
    const contacts = (await client.query("SELECT * FROM contacts ORDER BY pinned DESC, nombre ASC")).rows
    const rounds = (await client.query("SELECT * FROM contact_rounds ORDER BY contact_id, round_index ASC")).rows
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

export async function getContact(id) {
  const client = await pool.connect()
  try {
    const { rows } = await client.query("SELECT * FROM contacts WHERE id = $1", [id])
    if (rows.length === 0) return null
    const rounds = (await client.query("SELECT * FROM contact_rounds WHERE contact_id = $1 ORDER BY round_index ASC", [id])).rows
    return { ...rows[0], contactos: rounds }
  } finally {
    client.release()
  }
}

export async function createContact(data) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const { rows } = await client.query(
      "INSERT INTO contacts (nombre, celular, email, red_social, nombre_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [data.nombre, data.celular, data.email, data.red_social || "", data.nombre_usuario || ""]
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

export async function updateContact(id, data) {
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
    values.push(id)
    await client.query(`UPDATE contacts SET ${sets.join(", ")} WHERE id = $${idx}`, values)
  } finally {
    client.release()
  }
}

export async function updateContactRound(contactId, roundIndex, data) {
  const client = await pool.connect()
  try {
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

export async function deleteContact(id) {
  const client = await pool.connect()
  try {
    await client.query("DELETE FROM contacts WHERE id = $1", [id])
  } finally {
    client.release()
  }
}

export async function clearAll() {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query("DELETE FROM contact_rounds")
    await client.query("DELETE FROM contacts")
    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

export async function getUserProfile() {
  const client = await pool.connect()
  try {
    const { rows } = await client.query("SELECT * FROM user_profile LIMIT 1")
    return rows[0] || null
  } finally {
    client.release()
  }
}

export async function updateUserProfile(data) {
  const client = await pool.connect()
  try {
    const current = await getUserProfile()
    if (!current) {
      await client.query(
        "INSERT INTO user_profile (hora_ingreso, hora_salida, whatsapp_api_url, whatsapp_api_token, company_name, company_logo) VALUES ($1, $2, $3, $4, $5, $6)",
        [data.hora_ingreso || "09:00", data.hora_salida || "18:00", data.whatsapp_api_url || "", data.whatsapp_api_token || "", data.company_name || "", data.company_logo || ""]
      )
      return
    }
    const sets = []
    const values = []
    let idx = 1
    if (data.hora_ingreso !== undefined) { sets.push(`hora_ingreso = $${idx++}`); values.push(data.hora_ingreso) }
    if (data.hora_salida !== undefined) { sets.push(`hora_salida = $${idx++}`); values.push(data.hora_salida) }
    if (data.whatsapp_api_url !== undefined) { sets.push(`whatsapp_api_url = $${idx++}`); values.push(data.whatsapp_api_url) }
    if (data.whatsapp_api_token !== undefined) { sets.push(`whatsapp_api_token = $${idx++}`); values.push(data.whatsapp_api_token) }
    if (data.company_name !== undefined) { sets.push(`company_name = $${idx++}`); values.push(data.company_name) }
    if (data.company_logo !== undefined) { sets.push(`company_logo = $${idx++}`); values.push(data.company_logo) }
    if (sets.length === 0) return
    sets.push("updated_at = NOW()")
    await client.query(`UPDATE user_profile SET ${sets.join(", ")} WHERE id = 1`, values)
  } finally {
    client.release()
  }
}

export async function replaceAllContacts(contacts) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query("DELETE FROM contact_rounds")
    await client.query("DELETE FROM contacts")
    for (const data of contacts) {
      const { rows } = await client.query(
        "INSERT INTO contacts (nombre, celular, email, red_social, nombre_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [data.nombre, data.celular, data.email, data.red_social || "", data.nombre_usuario || ""]
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

export async function updateContactWithRounds(contactId, data, contactos) {
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
      values.push(contactId)
      await client.query(`UPDATE contacts SET ${sets.join(", ")} WHERE id = $${idx}`, values)
    }

    if (contactos && Array.isArray(contactos)) {
      for (let i = 0; i < contactos.length; i++) {
        const r = contactos[i]
        if (r.clasificacion !== undefined || r.fecha !== undefined || r.estado !== undefined || r.hora_proximo_contacto !== undefined || r.proxima_fecha !== undefined) {
          const roundSets = []
          const roundValues = []
          let ridx = 1
          if (r.clasificacion !== undefined) { roundSets.push(`clasificacion = $${ridx++}`); roundValues.push(r.clasificacion) }
          if (r.fecha !== undefined) { roundSets.push(`fecha = $${ridx++}`); roundValues.push(r.fecha) }
          if (r.estado !== undefined) { roundSets.push(`estado = $${ridx++}`); roundValues.push(r.estado) }
          if (r.hora_proximo_contacto !== undefined) { roundSets.push(`hora_proximo_contacto = $${ridx++}`); roundValues.push(r.hora_proximo_contacto) }
          if (r.proxima_fecha !== undefined) {
            roundSets.push(`proxima_fecha = $${ridx++}`)
            roundValues.push(r.proxima_fecha)
          } else {
            const clasif = r.clasificacion ?? (await getCurrentClasif(client, contactId, i))
            const estado = r.estado ?? (await getCurrentEstado(client, contactId, i))
            const fechaBase = await getRound1Fecha(client, contactId)
            const prox = calcProximaFecha(clasif, estado, fechaBase)
            roundSets.push(`proxima_fecha = $${ridx++}`)
            roundValues.push(prox)
          }
          if (roundSets.length > 0) {
            roundValues.push(contactId, i)
            await client.query(`UPDATE contact_rounds SET ${roundSets.join(", ")} WHERE contact_id = $${ridx} AND round_index = $${ridx + 1}`, roundValues)
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

export async function getContactsPendingReminder() {
  const client = await pool.connect()
  try {
    const today = formatFecha(new Date())
    const { rows } = await client.query(
      `SELECT c.* FROM contacts c INNER JOIN contact_rounds cr ON cr.contact_id = c.id WHERE cr.proxima_fecha = $1 AND cr.clasificacion = 'Pendiente' ORDER BY c.nombre ASC`,
      [today]
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

export async function checkUserSubscribed(uid) {
  const client = await pool.connect()
  try {
    const { rows } = await client.query("SELECT * FROM subscriptions WHERE uid = $1 AND status = 'active'", [uid])
    return rows.length > 0
  } finally {
    client.release()
  }
}
