import { Pool } from "pg"
import { addBusinessDays, formatFecha, parseFecha, getArgentinaNow } from "./business-days"

const toolsDbUrl = process.env.TOOLS_DATABASE_URL || process.env.DATABASE_URL || (() => {
  const user = process.env.DB_USERNAME || "postgres"
  const pass = process.env.DB_PASSWORD || ""
  const host = process.env.DB_HOSTNAME || "localhost"
  const port = process.env.DB_PORT || "5432"
  const db = process.env.DB_NAME || "grupostart"
  return `postgres://${user}:${pass}@${host}:${port}/${db}`
})()

const pool = new Pool({ connectionString: toolsDbUrl })

const AI_PAUSE_MINUTES = Number(process.env.AI_PAUSE_MINUTES || 60)

async function ensureSetup() {
  // El esquema de la base de datos lo gestionan las migraciones versionadas
  // (npm run migrate, ver db/migrations). No se ejecuta DDL automático acá.
  return
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
        "INSERT INTO user_profile (hora_ingreso, hora_salida, horario_ranges, whatsapp_api_url, whatsapp_api_token, company_name, company_logo, user_phone, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [data.hora_ingreso || "09:00", data.hora_salida || "18:00", data.horario_ranges || "", data.whatsapp_api_url || "", data.whatsapp_api_token || "", data.company_name || "", data.company_logo || "", data.user_phone || "", userId]
      )
      return
    }
    const sets = []
    const values = []
    let idx = 1
    if (data.hora_ingreso !== undefined) { sets.push(`hora_ingreso = $${idx++}`); values.push(data.hora_ingreso) }
    if (data.hora_salida !== undefined) { sets.push(`hora_salida = $${idx++}`); values.push(data.hora_salida) }
    if (data.horario_ranges !== undefined) { sets.push(`horario_ranges = $${idx++}`); values.push(data.horario_ranges) }
    if (data.whatsapp_api_url !== undefined) { sets.push(`whatsapp_api_url = $${idx++}`); values.push(data.whatsapp_api_url) }
    if (data.whatsapp_api_token !== undefined) { sets.push(`whatsapp_api_token = $${idx++}`); values.push(data.whatsapp_api_token) }
    if (data.company_name !== undefined) { sets.push(`company_name = $${idx++}`); values.push(data.company_name) }
    if (data.company_logo !== undefined) { sets.push(`company_logo = $${idx++}`); values.push(data.company_logo) }
    if (data.user_phone !== undefined) { sets.push(`user_phone = $${idx++}`); values.push(data.user_phone) }
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
      const prox = r.proxima_fecha || calcProximaFecha(r.clasificacion, r.estado, fechaBase)
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
    const today = getArgentinaNow().fecha
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

export async function setUserSubscribed(uid, email, preapproval_id) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query("SELECT * FROM subscriptions WHERE uid = $1", [uid])
    if (rows.length > 0) {
      await client.query(
        "UPDATE subscriptions SET status = 'active', preapproval_id = $2, expires_at = NOW() + INTERVAL '30 days', updated_at = NOW() WHERE uid = $1",
        [uid, preapproval_id || ""]
      )
    } else {
      await client.query(
        "INSERT INTO subscriptions (uid, email, status, preapproval_id, expires_at) VALUES ($1, $2, 'active', $3, NOW() + INTERVAL '30 days')",
        [uid, email, preapproval_id || ""]
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
    const { rows } = await client.query(
      "SELECT * FROM subscriptions WHERE uid = $1 AND (status = 'active' OR (status = 'cancelled' AND COALESCE(expires_at, created_at + INTERVAL '30 days') > NOW()))",
      [uid]
    )
    return rows.length > 0
  } finally {
    client.release()
  }
}

export async function getUserSubscriptions(uid) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query(
      "SELECT * FROM subscriptions WHERE uid = $1 ORDER BY created_at DESC",
      [uid]
    )
    return rows
  } finally {
    client.release()
  }
}

export async function cancelSubscriptionByUid(uid) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query(
      "UPDATE subscriptions SET status = 'cancelled', updated_at = NOW() WHERE uid = $1 AND status = 'active' RETURNING *",
      [uid]
    )
    return rows[0] || null
  } finally {
    client.release()
  }
}

export async function getUserPhone(userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query("SELECT user_phone FROM user_profile WHERE user_id = $1", [userId])
    if (rows.length > 0 && rows[0].user_phone) return rows[0].user_phone
    const { rows: urows } = await client.query('SELECT phone FROM "User" WHERE id = $1', [userId])
    const phone = urows[0]?.phone || ""
    if (phone) await saveUserPhone(userId, phone)
    return phone
  } finally {
    client.release()
  }
}

export async function getUserName(userId) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query('SELECT name FROM "User" WHERE id = $1', [userId])
    return rows[0]?.name || ""
  } finally {
    client.release()
  }
}

export async function saveUserPhone(userId, phone) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query("SELECT id FROM user_profile WHERE user_id = $1", [userId])
    if (rows.length > 0) {
      await client.query("UPDATE user_profile SET user_phone = $1 WHERE user_id = $2", [phone, userId])
    } else {
      await client.query(
        "INSERT INTO user_profile (user_id, user_phone, hora_ingreso, hora_salida) VALUES ($1, $2, '09:00', '18:00')",
        [userId, phone]
      )
    }
  } finally {
    client.release()
  }
}

export async function getAllActiveSubscribedUsers() {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query(
      "SELECT uid, email FROM subscriptions WHERE status = 'active' OR (status = 'cancelled' AND COALESCE(expires_at, created_at + INTERVAL '30 days') > NOW())"
    )
    return rows
  } finally {
    client.release()
  }
}

export async function getAllSubscriptions() {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query(
      "SELECT * FROM subscriptions ORDER BY created_at DESC"
    )
    return rows
  } finally {
    client.release()
  }
}

export async function getSubscriptionByUid(uid) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query(
      "SELECT * FROM subscriptions WHERE uid = $1 ORDER BY created_at DESC LIMIT 1",
      [uid]
    )
    return rows[0] || null
  } finally {
    client.release()
  }
}

export async function getUpcomingContactsForUser(userId, targetDate) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows: contacts } = await client.query(
      `SELECT c.id, c.nombre, cr.round_index FROM contacts c
       INNER JOIN contact_rounds cr ON cr.contact_id = c.id
       WHERE c.user_id = $1 AND c.deleted_at IS NULL
         AND cr.proxima_fecha = $2 AND cr.clasificacion = 'Pendiente'
         AND (cr.upcoming_notified_date IS NULL OR cr.upcoming_notified_date != $2)`,
      [userId, targetDate]
    )
    return contacts
  } finally {
    client.release()
  }
}

export async function getDueNowContactsForUser(userId, today) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows: contacts } = await client.query(
      `SELECT c.id, c.nombre, cr.round_index, cr.hora_proximo_contacto, cr.proxima_fecha FROM contacts c
       INNER JOIN contact_rounds cr ON cr.contact_id = c.id
       WHERE c.user_id = $1 AND c.deleted_at IS NULL
         AND cr.proxima_fecha = $2 AND cr.clasificacion = 'Pendiente'
         AND (cr.due_notified_date IS NULL OR cr.due_notified_date != $2)`,
      [userId, today]
    )
    return contacts
  } finally {
    client.release()
  }
}

export async function getOverdueContactsForUser(userId, yesterdayDate) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows: contacts } = await client.query(
      `SELECT c.id, c.nombre, cr.round_index, cr.proxima_fecha FROM contacts c
       INNER JOIN contact_rounds cr ON cr.contact_id = c.id
       WHERE c.user_id = $1 AND c.deleted_at IS NULL
         AND cr.proxima_fecha IS NOT NULL AND cr.proxima_fecha != ''
         AND cr.proxima_fecha ~ '^[0-9]{2}/[0-9]{2}/[0-9]{4}$'
         AND to_date(cr.proxima_fecha, 'DD/MM/YYYY') < to_date($2, 'DD/MM/YYYY')
         AND cr.clasificacion = 'Pendiente'
         AND (cr.overdue_notified_date IS NULL OR cr.overdue_notified_date != $2)
         AND c.id NOT IN (
           SELECT contact_id FROM contact_rounds
           WHERE contact_id = c.id AND round_index > cr.round_index
             AND proxima_fecha ~ '^[0-9]{2}/[0-9]{2}/[0-9]{4}$'
             AND to_date(proxima_fecha, 'DD/MM/YYYY') >= to_date($2, 'DD/MM/YYYY')
             AND clasificacion != 'Pendiente'
         )`,
      [userId, yesterdayDate]
    )
    return contacts
  } finally {
    client.release()
  }
}

export async function markNotificationSent(contactId, roundIndex, type, date) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const column = type === "upcoming" ? "upcoming_notified_date" : type === "due_now" ? "due_notified_date" : "overdue_notified_date"
    await client.query(
      `UPDATE contact_rounds SET ${column} = $1 WHERE contact_id = $2 AND round_index = $3`,
      [date, contactId, roundIndex]
    )
  } finally {
    client.release()
  }
}

export function normalizeWaPhone(phone) {
  return String(phone || "").replace(/[^\d]/g, "")
}

export async function saveWaIncomingMessage({ from, name, body, type, mediaUrl, waMessageId }) {
  await ensureSetup()
  const phone = normalizeWaPhone(from)
  if (!phone) return null
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query(
      `INSERT INTO wa_conversations (phone, name, unread_count, last_message_at, updated_at)
       VALUES ($1, $2, 1, NOW(), NOW())
       ON CONFLICT (phone) DO UPDATE SET
         name = CASE WHEN $2 <> '' THEN $2 ELSE wa_conversations.name END,
         unread_count = wa_conversations.unread_count + 1,
         last_message_at = NOW(),
         updated_at = NOW()`,
      [phone, name || ""]
    )
    const inserted = await client.query(
      `INSERT INTO wa_messages (conversation_phone, direction, body, type, media_url, wa_message_id, status)
       VALUES ($1, 'in', $2, $3, $4, $5, 'received')
       ON CONFLICT (wa_message_id) WHERE wa_message_id <> '' DO NOTHING`,
      [phone, body || "", type || "text", mediaUrl || "", waMessageId || ""]
    )
    await client.query("COMMIT")
    return { phone, isNew: inserted.rowCount > 0 }
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

export async function saveWaOutgoingMessage({ to, body, waMessageId, status, source, isBot }) {
  await ensureSetup()
  const phone = normalizeWaPhone(to)
  if (!phone) return null
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query(
      `INSERT INTO wa_conversations (phone, name, unread_count, last_message_at, updated_at)
       VALUES ($1, '', 0, NOW(), NOW())
       ON CONFLICT (phone) DO UPDATE SET
         last_message_at = NOW(),
         updated_at = NOW()`,
      [phone]
    )
    if (source === "manual") {
      await client.query(
        `UPDATE wa_conversations SET ai_paused_until = NOW() + ($1::int * interval '1 minute') WHERE phone = $2`,
        [AI_PAUSE_MINUTES, phone]
      )
    }
    await client.query(
      `INSERT INTO wa_messages (conversation_phone, direction, body, type, media_url, wa_message_id, status, is_bot)
       VALUES ($1, 'out', $2, 'text', '', $3, $4, $5)`,
      [phone, body || "", waMessageId || "", status || "sent", isBot ? true : false]
    )
    await client.query("COMMIT")
    return phone
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}

export async function getWaConversations() {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query(`
      SELECT c.phone, c.name, c.unread_count, c.updated_at AS last_at,
        m.last_body, m.last_direction
      FROM wa_conversations c
      LEFT JOIN LATERAL (
        SELECT body AS last_body, direction AS last_direction
        FROM wa_messages
        WHERE conversation_phone = c.phone
        ORDER BY created_at DESC, id DESC
        LIMIT 1
      ) m ON true
      ORDER BY c.updated_at DESC
    `)
    return rows
  } finally {
    client.release()
  }
}

export async function getWaMessages(phone, limit = 200) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query(
      `SELECT id, conversation_phone AS phone, direction, body, type, media_url, wa_message_id, status, created_at
       FROM wa_messages
       WHERE conversation_phone = $1
       ORDER BY created_at ASC, id ASC
       LIMIT $2`,
      [normalizeWaPhone(phone), limit]
    )
    return rows
  } finally {
    client.release()
  }
}

export async function markWaConversationRead(phone) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("UPDATE wa_conversations SET unread_count = 0 WHERE phone = $1", [normalizeWaPhone(phone)])
  } finally {
    client.release()
  }
}

export async function updateWaMessageStatus(waMessageId, status) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    await client.query("UPDATE wa_messages SET status = $1 WHERE wa_message_id = $2", [status, waMessageId])
  } finally {
    client.release()
  }
}

export async function getWaAiPaused(phone) {
  await ensureSetup()
  const client = await pool.connect()
  try {
    const { rows } = await client.query(
      "SELECT ai_paused_until FROM wa_conversations WHERE phone = $1",
      [normalizeWaPhone(phone)]
    )
    return rows[0]?.ai_paused_until || null
  } finally {
    client.release()
  }
}
