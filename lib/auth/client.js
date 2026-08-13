import axios from "axios"
import { getAuthToken } from "./token"

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
  return fetch(url, { ...options, headers })
}
