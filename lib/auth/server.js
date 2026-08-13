import crypto from "crypto"
import { User } from "@/db/models/models"

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE

let jwksCache = null
let jwksFetchedAt = 0
const JWKS_TTL = 55 * 60 * 1000
const JWKS_URL = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"

function base64UrlDecode(input) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/")
  return JSON.parse(Buffer.from(padded, "base64").toString("utf8"))
}

async function fetchJWKS() {
  if (jwksCache && Date.now() - jwksFetchedAt < JWKS_TTL) return jwksCache
  const res = await fetch(JWKS_URL, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("No se pudieron obtener las claves de Firebase")
  }
  jwksCache = await res.json()
  jwksFetchedAt = Date.now()
  return jwksCache
}

function verifySignature(parts, header, key) {
  const publicKey = crypto.createPublicKey({
    key: { kty: "RSA", n: key.n, e: key.e },
  })
  const signature = Buffer.from(
    parts[2].replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  )
  const data = Buffer.from(`${parts[0]}.${parts[1]}`)
  return crypto.verify("sha256", data, publicKey, signature)
}

export async function verifyIdToken(token) {
  if (!token) {
    throw new Error("Token no proporcionado")
  }
  const parts = token.split(".")
  if (parts.length !== 3) {
    throw new Error("Token inválido")
  }
  const header = base64UrlDecode(parts[0])
  const payload = base64UrlDecode(parts[1])

  if (header.alg !== "RS256") {
    throw new Error("Algoritmo de token inválido")
  }

  const now = Math.floor(Date.now() / 1000)
  if (typeof payload.exp !== "number" || payload.exp < now - 30) {
    throw new Error("Token expirado")
  }
  if (typeof payload.iat !== "number" || payload.iat > now + 60) {
    throw new Error("Token emitido en el futuro")
  }
  if (payload.aud !== PROJECT_ID) {
    throw new Error("Audiencia inválida")
  }
  if (payload.iss !== `https://securetoken.google.com/${PROJECT_ID}`) {
    throw new Error("Emisor inválido")
  }
  if (!payload.sub) {
    throw new Error("Token sin subject")
  }

  let jwksData = await fetchJWKS()
  let key = jwksData.keys.find((k) => k.kid === header.kid)
  if (!key) {
    jwksCache = null
    jwksFetchedAt = 0
    jwksData = await fetchJWKS()
    key = jwksData.keys.find((k) => k.kid === header.kid)
  }
  if (!key) {
    throw new Error("Clave de firma no encontrada")
  }

  if (!verifySignature(parts, header, key)) {
    throw new Error("Firma inválida")
  }

  return payload
}

export function getBearerToken(req) {
  const header = req.headers.get("authorization")
  if (header && header.startsWith("Bearer ")) {
    return header.slice(7).trim()
  }
  const cookie = req.cookies?.get?.("gs_session")?.value
  return cookie || null
}

export async function getAuthUser(req) {
  const token = getBearerToken(req)
  if (!token) return null
  try {
    return await verifyIdToken(token)
  } catch {
    return null
  }
}

export async function requireUser(req) {
  return getAuthUser(req)
}

export async function requireAdmin(req) {
  const authUser = await getAuthUser(req)
  if (!authUser) return null
  try {
    const user = await User.findByPk(authUser.uid, { attributes: ["role"] })
    if (user?.role !== "admin") return null
    return authUser
  } catch {
    return null
  }
}

export function unauthorizedResponse() {
  return new Response(JSON.stringify({ error: "No autorizado" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  })
}

export function forbiddenResponse() {
  return new Response(JSON.stringify({ error: "No autorizado" }), {
    status: 403,
    headers: { "Content-Type": "application/json" },
  })
}
