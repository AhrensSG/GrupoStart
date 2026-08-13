let currentToken = null

export function setAuthToken(token) {
  currentToken = token || null
}

export function getAuthToken() {
  return currentToken
}
