// Envío de video por WhatsApp Cloud API.
//
// Meta no acepta rutas locales ni URLs arbitrarias: hay que subir el archivo a su
// CDN con la API de upload resumible y mandar el media_id resultante. Además los
// medios subidos se borran a los 30 días, así que cacheamos el media_id y lo
// re-subimos antes de que caduque.
import { open, stat } from "node:fs/promises"
import { basename } from "node:path"
import { getWaMediaCache, saveWaMediaCache } from "@/lib/tools/db"

const API = "v22.0"
const MEDIA_TTL_DAYS = 25
const CHUNK_BYTES = 4 * 1024 * 1024
const GRAPH = "https://graph.facebook.com"

function config() {
  return {
    token: process.env.WHATSAPP_CLOUD_TOKEN || "",
    phoneId: process.env.WHATSAPP_CLOUD_PHONE_ID || "",
    appId: process.env.META_APP_ID || "",
  }
}

async function graphError(res, what) {
  const body = await res.json().catch(() => ({}))
  const detail = body?.error?.message || res.statusText
  console.error(`[WhatsApp Media] ${what}: ${detail}`)
  return detail
}

async function createUploadSession(fileLength, mimeType, token, appId) {
  const url = `${GRAPH}/${API}/${appId}/uploads?file_length=${fileLength}&file_type=${encodeURIComponent(mimeType)}`
  const res = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    await graphError(res, "no se pudo crear la sesión de upload")
    return null
  }
  const data = await res.json().catch(() => ({}))
  return data?.id || null
}

async function uploadChunk(sessionId, buffer, offset, fileLength, token) {
  const res = await fetch(`${GRAPH}/${API}/${sessionId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      offset: String(offset),
      file_size: String(fileLength),
      "Content-Type": "application/octet-stream",
    },
    body: new Uint8Array(buffer),
  })
  if (!res.ok) {
    await graphError(res, `falló el chunk en el offset ${offset}`)
    return null
  }
  return res.json().catch(() => ({}))
}

async function fetchMediaId(sessionId, token) {
  const res = await fetch(`${GRAPH}/${API}/${sessionId}`, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    await graphError(res, "no se pudo obtener el media_id")
    return null
  }
  const data = await res.json().catch(() => ({}))
  return data?.id || null
}

/** Sube el archivo a Meta con el protocolo resumible y devuelve su media_id. */
export async function uploadMedia(filePath, mimeType = "video/mp4") {
  const { token, appId } = config()
  if (!token || !appId) {
    console.error("[WhatsApp Media] Faltan WHATSAPP_CLOUD_TOKEN o META_APP_ID")
    return null
  }

  const { size } = await stat(filePath)
  if (size === 0) {
    console.error("[WhatsApp Media] El archivo está vacío:", filePath)
    return null
  }
  if (size > 16 * 1024 * 1024) {
    console.error(`[WhatsApp Media] ${basename(filePath)} pesa ${(size / 1048576).toFixed(1)} MB y el límite de WhatsApp para video es 16 MB`)
    return null
  }

  const sessionId = await createUploadSession(size, mimeType, token, appId)
  if (!sessionId) return null

  const handle = await open(filePath, "r")
  let offset = 0
  try {
    const buffer = Buffer.allocUnsafe(CHUNK_BYTES)
    while (offset < size) {
      const { bytesRead } = await handle.read(buffer, 0, CHUNK_BYTES, offset)
      if (bytesRead <= 0) break
      const res = await uploadChunk(sessionId, buffer.subarray(0, bytesRead), offset, size, token)
      if (!res) return null
      const next = typeof res.h === "number" ? res.h : offset + bytesRead
      // Si la API no avanza el offset, cortar: si no, loop infinito.
      if (next <= offset) break
      offset = next
      if (res.done === true) break
    }
  } finally {
    await handle.close()
  }

  if (offset < size) {
    console.error(`[WhatsApp Media] Upload incompleto: ${offset} de ${size} bytes`)
    return null
  }
  return fetchMediaId(sessionId, token)
}

/** Devuelve un media_id vigente, re-subiendo el archivo si el cache caducó. */
export async function getOrUploadMediaId(key, filePath, mimeType = "video/mp4") {
  const cached = await getWaMediaCache(key).catch(() => null)
  if (cached?.media_id) {
    const ageDays = (Date.now() - new Date(cached.uploaded_at).getTime()) / 86_400_000
    if (ageDays < MEDIA_TTL_DAYS) return cached.media_id
  }

  const mediaId = await uploadMedia(filePath, mimeType)
  if (!mediaId) return null
  const { size } = await stat(filePath).catch(() => ({ size: 0 }))
  await saveWaMediaCache(key, { mediaId, mimeType, bytes: size }).catch(() => null)
  return mediaId
}

/**
 * Envía un video ya subido. El caption de WhatsApp admite máximo 1024 caracteres;
 * los botones de respuesta no aceptan caption, por eso va en el mensaje de texto.
 */
export async function sendVideoMessage(phone, { filePath, caption, mimeType = "video/mp4" } = {}) {
  const { token, phoneId } = config()
  if (!token || !phoneId) return null

  const key = `video:${basename(filePath)}`
  const mediaId = await getOrUploadMediaId(key, filePath, mimeType)
  if (!mediaId) return null

  const video = { id: mediaId }
  if (caption) video.caption = String(caption).slice(0, 1024)

  const res = await fetch(`${GRAPH}/${API}/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      type: "video",
      video,
    }),
  })
  if (!res.ok) {
    // Un media_id vencido se manifiesta acá: se invalida el cache para el próximo intento.
    const detail = await graphError(res, "no se pudo enviar el video")
    if (/media|expired|not found|100|62703485/i.test(detail)) {
      await saveWaMediaCache(key, { mediaId: "", mimeType, bytes: 0 }).catch(() => null)
    }
    return null
  }
  const data = await res.json().catch(() => ({}))
  return data?.messages?.[0]?.id || null
}
