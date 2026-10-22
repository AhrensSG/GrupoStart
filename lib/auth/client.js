import axios from "axios"
import { getAuthToken, setAuthToken } from "./token"
import { auth } from "@/firebase/config"

axios.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (!token) return config
  const url = typeof config.url === "string" ? config.url : ""
  const isSameOrigin =
    url.startsWith("/") ||
    url.startsWith(process.env.NEXT_PUBLIC_SERVER_AUTH_ENDPOINT || "") ||
    url.startsWith(window?.location?.origin || "")
  if (isSameOrigin) {
    config.headers = config.headers || {}
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export async function authFetch(url, options = {}) {
  const token = getAuthToken()
  const headers = new Headers(options.headers || {})
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  let res = await fetch(url, { ...options, headers })

  // El ID token de Firebase vive 1 hora. Si venció, lo refrescamos y reintentamos.
  if (res.status === 401) {
    try {
      const fresh = await auth.currentUser?.getIdToken(true)
      if (fresh && fresh !== token) {
        setAuthToken(fresh)
        headers.set("Authorization", `Bearer ${fresh}`)
        res = await fetch(url, { ...options, headers })
      }
    } catch {}
  }

  return res
}
