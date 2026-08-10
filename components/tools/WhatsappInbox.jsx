"use client"

import { useState, useEffect, useRef, useContext, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Context } from "@/app/context/GlobalContext"

function formatTime(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
  }
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" })
}

function SingleCheck() {
  return (
    <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 16 12" fill="none">
      <path d="M1.5 6.5L5 10L10.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DoubleCheck({ read }) {
  return (
    <svg className={`w-4 h-4 ${read ? "text-[#53bdeb]" : "text-gray-400"}`} viewBox="0 0 20 12" fill="none">
      <path d="M1.5 6.5L5 10L10.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 8.5L10 11L15.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  )
}

export default function WhatsappInbox() {
  const { state } = useContext(Context)
  const router = useRouter()
  const user = state?.user
  const adminUid = user?.id || user?.uid || ""

  const [conversations, setConversations] = useState([])
  const [activePhone, setActivePhone] = useState("")
  const [messages, setMessages] = useState([])
  const [search, setSearch] = useState("")
  const [draft, setDraft] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")

  const activePhoneRef = useRef("")
  const prevLenRef = useRef(0)
  const messagesEndRef = useRef(null)
  const adminUidRef = useRef(adminUid)

  useEffect(() => {
    adminUidRef.current = adminUid
  }, [adminUid])

  const scrollToBottom = useCallback((smooth = true) => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "end" })
    }, 60)
  }, [])

  useEffect(() => {
    if (messages.length > prevLenRef.current) scrollToBottom()
    prevLenRef.current = messages.length
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (!user) return
    let cancelled = false
    const tick = async () => {
      try {
        const uid = adminUidRef.current
        const res = await fetch(`/api/tools/whatsapp/conversations?admin_uid=${encodeURIComponent(uid)}`)
        if (res.status === 403) {
          router.push("/user")
          return
        }
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        setConversations(data)
        const phone = activePhoneRef.current
        if (phone) {
          const mres = await fetch(`/api/tools/whatsapp/conversations/${phone}?admin_uid=${encodeURIComponent(uid)}`)
          if (mres.ok) setMessages(await mres.json())
        }
      } catch {}
    }
    tick().finally(() => {
      if (!cancelled) setLoading(false)
    })
    const id = setInterval(tick, 5000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [user, router])

  const selectConversation = async (phone) => {
    setActivePhone(phone)
    activePhoneRef.current = phone
    prevLenRef.current = 0
    setConversations((prev) => prev.map((c) => (c.phone === phone ? { ...c, unread_count: 0 } : c)))
    try {
      const res = await fetch(`/api/tools/whatsapp/conversations/${phone}?admin_uid=${encodeURIComponent(adminUid)}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
        prevLenRef.current = data.length
        scrollToBottom(false)
      }
    } catch {}
  }

  const goBack = () => {
    setActivePhone("")
    activePhoneRef.current = ""
  }

  const handleSend = async () => {
    const text = draft.trim()
    if (!text || sending || !activePhone) return
    setSending(true)
    setSendError("")
    try {
      const res = await fetch("/api/tools/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_uid: adminUid, to: activePhone, body: text }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setSendError(data.error || "Error al enviar el mensaje")
        return
      }
      setDraft("")
      const [mres, cres] = await Promise.all([
        fetch(`/api/tools/whatsapp/conversations/${activePhone}?admin_uid=${encodeURIComponent(adminUid)}`),
        fetch(`/api/tools/whatsapp/conversations?admin_uid=${encodeURIComponent(adminUid)}`),
      ])
      if (mres.ok) {
        const data2 = await mres.json()
        setMessages(data2)
        prevLenRef.current = data2.length
        scrollToBottom()
      }
      if (cres.ok) setConversations(await cres.json())
    } catch {
      setSendError("Error de conexión. Intentalo de nuevo.")
    } finally {
      setSending(false)
    }
  }

  const filtered = search.trim()
    ? conversations.filter((c) =>
        [c.name, c.phone, c.last_body].some((v) => String(v || "").toLowerCase().includes(search.toLowerCase()))
      )
    : conversations

  const activeConversation = conversations.find((c) => c.phone === activePhone)
  const activeDisplay = activeConversation?.name || activePhone

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Barra superior */}
      <header className="shrink-0 bg-[#f0f2f5] border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/iconos/logoStartBlue.svg" alt="GrupoStart" className="w-8 h-8" />
          <div className="leading-tight">
            <p className="font-bold text-gray-900 text-sm">WhatsApp</p>
            <p className="text-[11px] text-gray-500">Bandeja de entrada</p>
          </div>
        </div>
        <Link
          href="/tools"
          className="text-xs text-gray-500 hover:text-[#0051FF] hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          ← Volver a herramientas
        </Link>
      </header>

      <div className="flex-1 min-h-0 flex bg-[#efeae2]">
        {/* Sidebar */}
        <aside
          className={`${
            activePhone ? "hidden sm:flex" : "flex"
          } w-full sm:w-80 md:w-96 lg:w-[380px] flex-col border-r border-gray-200 bg-white`}
        >
          <div className="p-3 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2 bg-[#f0f2f5] rounded-full px-4 py-2.5">
              <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" strokeWidth={2} />
                <path strokeLinecap="round" strokeWidth={2} d="M20 20l-3.5-3.5" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar o empezar un chat"
                className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-sm text-gray-400">Cargando conversaciones…</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-500">No hay conversaciones todavía.</p>
                <p className="text-xs text-gray-400 mt-1">
                  Cuando alguien le escriba a tu número de negocio, el chat aparece acá.
                </p>
              </div>
            ) : (
              filtered.map((c) => {
                const isActive = c.phone === activePhone
                const initial = String(c.name || c.phone).trim().charAt(0).toUpperCase() || "#"
                const preview = c.last_direction === "out" ? `Tú: ${c.last_body || ""}` : c.last_body || ""
                return (
                  <button
                    key={c.phone}
                    onClick={() => selectConversation(c.phone)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                      isActive ? "bg-[#f0f2f5]" : "hover:bg-[#f5f6f6]"
                    }`}
                  >
                    <div className="w-11 h-11 rounded-full bg-[#dfe5e7] flex items-center justify-center text-gray-600 font-bold text-base shrink-0">
                      {initial}
                    </div>
                    <div className="flex-1 min-w-0 border-b border-gray-100 pb-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-[14.5px] text-gray-900 truncate">
                          {c.name || c.phone}
                        </span>
                        <span className="text-[11px] text-gray-400 shrink-0">{formatTime(c.last_at)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span className="text-[13px] text-gray-500 truncate">{preview}</span>
                        {c.unread_count > 0 && (
                          <span className="bg-[#25D366] text-white text-[10.5px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 shrink-0">
                            {c.unread_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </aside>

        {/* Chat */}
        <main className="flex-1 min-w-0 flex flex-col">
          {!activePhone ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-10 h-10 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2a9.91 9.91 0 00-8.52 14.92L2 22l5.25-1.48A9.9 9.9 0 1012.04 2zm0 18.09a8.1 8.1 0 01-4.14-1.13l-.3-.18-3.11.88.85-3.03-.2-.31a8.14 8.14 0 116.9 3.77zm4.46-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06a6.65 6.65 0 01-3.31-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.09.16 1.5.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-700">Selecciona una conversación</p>
              <p className="text-sm text-gray-500 mt-1 max-w-sm">
                Elegí un chat de la lista para leer los mensajes y responder.
              </p>
            </div>
          ) : (
            <>
              <div className="h-14 bg-[#f0f2f5] border-b border-gray-200 flex items-center px-3 sm:px-4 gap-3 shrink-0">
                <button
                  onClick={goBack}
                  className="sm:hidden text-gray-500 hover:text-gray-700 p-1"
                  aria-label="Volver"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-9 h-9 rounded-full bg-[#dfe5e7] flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">
                  {String(activeDisplay).trim().charAt(0).toUpperCase() || "#"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{activeDisplay}</p>
                  <p className="text-xs text-gray-500 truncate">{activePhone}</p>
                </div>
              </div>

              <div
                className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4"
                style={{
                  backgroundImage:
                    "radial-gradient(#d1c8bd 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              >
                <div className="max-w-3xl mx-auto flex flex-col">
                  {messages.length === 0 ? (
                    <div className="text-center text-sm text-gray-500 py-10">
                      Sin mensajes todavía. Envía el primero 👋
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div key={m.id} className={`flex ${m.direction === "in" ? "justify-start" : "justify-end"}`}>
                        <div
                          className={`max-w-[78%] sm:max-w-[60%] mb-1.5 rounded-lg px-2.5 py-1.5 shadow-sm relative ${
                            m.direction === "in"
                              ? "bg-white rounded-tl-none"
                              : "bg-[#d9fdd3] rounded-tr-none"
                          }`}
                        >
                          <p className="text-[14.5px] leading-snug whitespace-pre-wrap break-words text-gray-900 pr-14">
                            {m.body}
                          </p>
                          <span className="absolute bottom-1 right-1.5 text-[10px] text-gray-400 flex items-center gap-0.5">
                            {formatTime(m.created_at)}
                            {m.direction === "out" &&
                              (m.status === "read" ? (
                                <DoubleCheck read />
                              ) : m.status === "delivered" ? (
                                <DoubleCheck />
                              ) : (
                                <SingleCheck />
                              ))}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {sendError && (
                <div className="shrink-0 bg-red-50 border-t border-red-100 px-4 py-2">
                  <p className="text-xs text-red-600">{sendError}</p>
                </div>
              )}

              <div className="bg-[#f0f2f5] px-3 sm:px-4 py-2.5 shrink-0">
                <div className="max-w-3xl mx-auto flex items-center gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder="Escribe un mensaje"
                    maxLength={4096}
                    className="flex-1 bg-white rounded-full px-4 py-2.5 text-[15px] text-gray-900 outline-none focus:ring-2 focus:ring-[#25D366]/40 shadow-sm placeholder:text-gray-400"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!draft.trim() || sending}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#1fb959] transition-colors shrink-0"
                    aria-label="Enviar"
                  >
                    {sending ? (
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
