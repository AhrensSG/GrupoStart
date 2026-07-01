"use client"

import { useState, useEffect, useMemo, useContext, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Context } from "@/app/context/GlobalContext"
import UploadZone from "./UploadZone"
import ContactTable from "./ContactTable"
import StatsCards from "./StatsCards"
import AddContactModal from "./AddContactModal"
import UploadModal from "./UploadModal"
import ProfileModal from "./ProfileModal"
import SuggestModal from "./SuggestModal"
import GuidedTutorial from "./GuidedTutorial"
import { parseSheet } from "@/lib/tools/parser"

function parseFecha(ddmm) {
  if (!ddmm) return null
  const parts = ddmm.split("/")
  if (parts.length !== 3) return null
  const d = parseInt(parts[0], 10)
  const m = parseInt(parts[1], 10) - 1
  const y = parseInt(parts[2], 10)
  if (isNaN(d) || isNaN(m) || isNaN(y)) return null
  return new Date(y, m, d)
}

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(0, 0, 0, 0)
  return d
}

export default function ToolsPage() {
  const { state } = useContext(Context)
  const router = useRouter()

  const [contacts, setContacts] = useState(null)
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showSuggestModal, setShowSuggestModal] = useState(false)
  const [viewMode, setViewMode] = useState("active")
  const [trashContacts, setTrashContacts] = useState(null)
  const [subscribed, setSubscribed] = useState(null)
  const [subLoading, setSubLoading] = useState(true)

  const [searchText, setSearchText] = useState("")
  const [clasifFilter, setClasifFilter] = useState("")
  const [periodFilter, setPeriodFilter] = useState("")
  const [minRoundsFilter, setMinRoundsFilter] = useState(0)
  const [sortOrder, setSortOrder] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const [profile, setProfile] = useState(null)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const filterRef = useRef(null)
  const notifRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!contacts || contacts.length === 0) return
    const status = localStorage.getItem("guidedTutorial")
    if (status === null || status === "pending") {
      const timer = setTimeout(() => setShowTutorial(true), 500)
      return () => clearTimeout(timer)
    }
  }, [contacts])

  const user = state?.user

  useEffect(() => {
    if (!user) return
    fetch(`/api/tools/profile?uid=${user.id}`)
      .then((r) => r.json())
      .then((data) => setProfile(data))
      .catch(() => {})
  }, [user])

  useEffect(() => {
    function handleScroll() {
      setShowScrollBtn(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!state?.isLoading && !user) {
      router.push("/login?redirect=/tools")
    }
  }, [state?.isLoading, user, router])

  useEffect(() => {
    if (!user) return
    fetch(`/api/tools/subscription?uid=${user.id}&email=${encodeURIComponent(user.email || "")}`)
      .then((r) => r.json())
      .then((data) => {
        setSubscribed(data.subscribed)
        setSubLoading(false)
      })
      .catch(() => {
        setSubscribed(false)
        setSubLoading(false)
      })
  }, [user])

  function getLastClasificacion(contactos) {
    for (let j = contactos.length - 1; j >= 0; j--) {
      const r = contactos[j]
      if (r.clasificacion && r.clasificacion !== "Pendiente") return r.clasificacion
    }
    return null
  }

  function getNextProximaFecha(contactos) {
    for (let j = contactos.length - 1; j >= 0; j--) {
      const r = contactos[j]
      if (!r.clasificacion || r.clasificacion === "Pendiente") continue
      if (r.proxima_fecha) return r.proxima_fecha
    }
    return ""
  }

  const fetchContacts = async () => {
    try {
      const res = await fetch(`/api/tools/contacts?uid=${user.id}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      if (data.length > 0) {
        setContacts(data)
        setFileName("Base de datos local")
      }
    } catch {
    } finally {
      setPageLoading(false)
    }
  }

  const fetchTrash = async () => {
    try {
      const res = await fetch(`/api/tools/contacts/trash?uid=${user.id}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setTrashContacts(data)
    } catch {
      setTrashContacts([])
    }
  }

  useEffect(() => { if (subscribed) fetchContacts() }, [subscribed])

  const handleFile = async (file) => {
    setError("")
    setFileName(file.name)

    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const data = e.target?.result
          if (!(data instanceof ArrayBuffer)) { reject(new Error()); return }
          const result = parseSheet(data)
          if (result.length === 0) {
            setError("No se encontraron contactos en el archivo.")
            reject(new Error())
            return
          }

          const res = await fetch("/api/tools/contacts/batch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: user.id, contacts: result }),
          })
          if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Error al importar contactos") }

          await fetchContacts()
          resolve()
        } catch {
          setError("Error al procesar el archivo.")
          reject(new Error())
        }
      }
      reader.readAsArrayBuffer(file)
    })
  }

  const handlePin = async (id) => {
    if (!contacts) return
    const contact = contacts.find((c) => c.id === id)
    if (!contact) return
    const newPinned = !contact.pinned

    setContacts((prev) => {
      if (!prev) return prev
      return prev.map((c) =>
        c.id === id ? { ...c, pinned: newPinned } : c
      )
    })

    try {
      const res = await fetch(`/api/tools/contacts/${id}?uid=${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pinned: newPinned }),
      })
      if (!res.ok) throw new Error()
      fetchContacts()
    } catch {
      fetchContacts()
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/tools/contacts/${id}?uid=${user.id}`, { method: "DELETE" })
      if (contacts) {
        setContacts(contacts.filter((c) => c.id !== id))
      }
    } catch {
      setError("Error al eliminar contacto")
    }
  }

  const handleRefresh = () => {
    setError("")
    fetchContacts()
  }

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/routes/preapproval/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.id, email: user.email }),
      })
      const data = await res.json()
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        alert("Error al generar la suscripción. Intentalo de nuevo.")
      }
    } catch {
      alert("Error al conectar con el sistema de pagos.")
    } finally {
      setLoading(false)
    }
  }

  const { stats, noInteresados } = useMemo(() => {
    if (!contacts) return { stats: [], noInteresados: [] }
    const clasificaciones = new Map()
    const noInteresadoStats = new Map()
    for (const c of contacts) {
      const last = getLastClasificacion(c.contactos)
      if (last) {
        clasificaciones.set(last, (clasificaciones.get(last) || 0) + 1)
        if (last.startsWith("No interesado")) {
          noInteresadoStats.set(last, (noInteresadoStats.get(last) || 0) + 1)
        }
      }
    }
    return {
      stats: [
        { label: "Total", value: contacts.length, color: "text-[#0051FF]" },
        { label: "Compradores", value: clasificaciones.get("Comprador") || 0, color: "text-[#FB8A00]" },
        { label: "Interesados", value: clasificaciones.get("Interesado") || 0, color: "text-green-600" },
        { label: "Pendientes", value: clasificaciones.get("Pendiente") || 0, color: "text-gray-400" },
        { label: "Sin respuesta", value: clasificaciones.get("No hubo respuesta") || 0, color: "text-purple-500" },
      ],
      noInteresados: Array.from(noInteresadoStats.entries()).sort((a, b) => b[1] - a[1]),
    }
  }, [contacts])

  const compradoresCount = useMemo(() => {
    if (!contacts) return 0
    return contacts.filter((c) => getLastClasificacion(c.contactos) === "Comprador").length
  }, [contacts])

  const filteredContacts = useMemo(() => {
    if (!contacts) return null
    let result = contacts

    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase()
      result = result.filter(
        (c) =>
          c.nombre.toLowerCase().includes(q) ||
          c.celular.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      )
    }

    if (!clasifFilter) {
      result = result.filter((c) =>
        !c.contactos.some((r) => r.clasificacion === "Comprador")
      )
    }

    if (clasifFilter) {
      if (clasifFilter === "No interesado") {
        result = result.filter((c) =>
          c.contactos.some((r) => r.clasificacion.startsWith("No interesado"))
        )
      } else {
        result = result.filter((c) =>
          c.contactos.some((r) => r.clasificacion === clasifFilter)
        )
      }
    }

    if (periodFilter) {
      const cutoff = (() => {
        switch (periodFilter) {
          case "week": return daysAgo(7)
          case "month": return daysAgo(30)
          case "quarter": return daysAgo(90)
          default: return null
        }
      })()
      if (cutoff) {
        result = result.filter((c) =>
          c.contactos.some((r) => {
            const d = parseFecha(r.fecha)
            return d && d >= cutoff
          })
        )
      }
    }

    if (minRoundsFilter > 0) {
      result = result.filter((c) => {
        const filled = c.contactos.filter((r) => r.clasificacion && r.clasificacion !== "Pendiente").length
        return filled >= minRoundsFilter
      })
    }

    result = [...result].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      if (!sortOrder) return 0
      if (sortOrder === "az") return a.nombre.localeCompare(b.nombre)
      if (sortOrder === "proxima") {
        const fechaA = getNextProximaFecha(a.contactos)
        const fechaB = getNextProximaFecha(b.contactos)
        if (!fechaA && !fechaB) return 0
        if (!fechaA) return 1
        if (!fechaB) return -1
        const [dA, mA, yA] = fechaA.split("/").map(Number)
        const [dB, mB, yB] = fechaB.split("/").map(Number)
        return (yA - yB) || (mA - mB) || (dA - dB)
      }
      if (sortOrder === "carga") {
        const dateA = a.created_at ? new Date(a.created_at) : new Date(0)
        const dateB = b.created_at ? new Date(b.created_at) : new Date(0)
        return dateA - dateB
      }
      return 0
    })

    return result
  }, [contacts, searchText, clasifFilter, periodFilter, minRoundsFilter, sortOrder])

  const notifications = useMemo(() => {
    const items = []

    if (profile) {
      const hasHorario = profile.horario_ranges ? (() => { try { return JSON.parse(profile.horario_ranges).length > 0 } catch { return false } })() : (profile.hora_ingreso && profile.hora_salida)
      if (!hasHorario) {
        items.push({
          id: "horario",
          type: "warning",
          title: "Jornada laboral pendiente",
          message: "Configurá tu horario de trabajo para recibir alertas en tu teléfono.",
          action: () => setShowProfileModal(true),
        })
      }
      if (!profile.whatsapp_api_url || !profile.whatsapp_api_token) {
        items.push({
          id: "whatsapp",
          type: "warning",
          title: "WhatsApp API pendiente",
          message: "Configurá la integración de WhatsApp para recibir notificaciones en tu teléfono.",
          action: () => setShowProfileModal(true),
        })
      }
    }

    if (contacts) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      let overdueCount = 0
      let upcomingCount = 0

      for (const c of contacts) {
        for (const r of c.contactos) {
          if (!r.proxima_fecha) continue
          const parts = r.proxima_fecha.split("/")
          if (parts.length !== 3) continue
          const fecha = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10))
          fecha.setHours(0, 0, 0, 0)

          const diffDays = Math.round((fecha - today) / (1000 * 60 * 60 * 24))
          if (diffDays < 0) overdueCount++
          else if (diffDays <= 3) upcomingCount++
        }
      }

      if (overdueCount > 0) {
        items.push({
          id: "vencidos",
          type: "danger",
          title: "Seguimientos vencidos",
          message: `Tenés ${overdueCount} contacto${overdueCount > 1 ? "s" : ""} con fecha de seguimiento vencida. Revisalos ahora.`,
          action: () => setSortProxima(true),
        })
      }

      if (upcomingCount > 0) {
        items.push({
          id: "proximos",
          type: "info",
          title: "Próximos seguimientos",
          message: `Tenés ${upcomingCount} contacto${upcomingCount > 1 ? "s" : ""} para seguir en los próximos 3 días.`,
        })
      }
    }

    return items
  }, [contacts, profile])

  const activeFilters = [searchText, clasifFilter, periodFilter, minRoundsFilter, sortOrder].some(
    (f) => f !== "" && f !== 0 && f !== false
  )

  if (state?.isLoading || subLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#0051FF] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-gray-500">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  if (!subscribed) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0051FF]/10 to-[#FB8A00]/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-[#0051FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Suscripción requerida</h1>
          <p className="text-sm text-gray-500 mb-6">
            Necesitás una suscripción activa para usar el Sistema de Seguimiento de Leads.
            Son solo <strong>$2.500 ARS/mes</strong>.
          </p>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full py-4 px-4 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-green-500/30"
          >
            {loading ? "PROCESANDO..." : "SUSCRIBIRME AHORA"}
          </button>
          <p className="text-xs text-gray-400 mt-4">
            Podés dar de baja cuando quieras. Pago procesado por Mercado Pago.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        {/* Top bar */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-[#0051FF]/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sm:justify-start sm:relative">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
              <img src="/iconos/logoStartBlue.svg" alt="GrupoStart" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-sm sm:text-lg font-bold text-gray-900">Grupo Start</span>
            </Link>
            <span className="text-xs sm:text-base font-semibold text-gray-700 sm:absolute sm:left-1/2 sm:-translate-x-1/2 truncate ml-2 sm:ml-0">Seguimiento de leads</span>
          </div>
        </div>
        {contacts && (
          <div className="border-b border-gray-100 bg-gradient-to-r from-[#0051FF]/5 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-none">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                  <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{s.label}</span>
                </div>
              ))}
              {noInteresados.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5 pl-4 border-l border-gray-200 shrink-0">
                  {noInteresados.slice(0, 2).map(([razon, count]) => (
                    <span key={razon} className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs whitespace-nowrap">
                      <span className="font-medium">{count}</span>
                      {razon.replace("No interesado: ", "")}
                    </span>
                  ))}
                  {noInteresados.length > 2 && (
                    <span className="text-xs text-gray-400">+{noInteresados.length - 2} más</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
              <img src={profile?.company_logo || "/iconos/logoStartBlue.svg"} alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain rounded shrink-0" onError={(e) => { e.target.src = "/iconos/logoStartBlue.svg"; e.target.onerror = null }} />
              <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">{profile?.company_name || (!profile?.company_logo ? user?.email : "GrupoStart Tools")}</span>
              <div className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-gray-200">
                <button onClick={() => setViewMode("active")} className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors ${viewMode === "active" ? "text-[#0051FF] bg-blue-50 font-semibold" : "text-gray-400 hover:text-[#0051FF] hover:bg-blue-50"}`}>
                  Contactos
                </button>
                <Link href="/tools/estadistica" id="link-estadistica" className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-[#0051FF] hover:bg-blue-50 rounded-lg transition-colors">
                  Estadística
                </Link>
                <Link href="/tools/tutoriales" data-tut="link-tutoriales" className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-[#0051FF] hover:bg-blue-50 rounded-lg transition-colors">
                  Tutoriales
                </Link>
                <Link href="/user" className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-[#0051FF] hover:bg-blue-50 rounded-lg transition-colors">
                  Perfil
                </Link>
                <button onClick={() => { setViewMode("trash"); fetchTrash() }} className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors ${viewMode === "trash" ? "text-red-500 bg-red-50 font-semibold" : "text-gray-400 hover:text-red-500 hover:bg-red-50"}`}>
                  Papelera
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {contacts && (
                <>
                  <button
                    id="btn-add-contact"
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#FB8A00] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#e07a00] transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="hidden sm:inline">Agregar</span>
                  </button>
                  <button
                    id="btn-upload"
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-2 border border-gray-200 text-gray-500 sm:text-gray-600 text-sm rounded-lg hover:border-[#0051FF] hover:text-[#0051FF] transition-colors"
                    title="Importar archivo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="hidden sm:inline ml-1.5">Importar</span>
                  </button>
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="flex items-center justify-center w-8 h-8 sm:w-auto sm:px-2 text-gray-400 hover:text-[#0051FF] transition-colors"
                    title="Configuración de perfil"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <div className="relative" ref={notifRef}>
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative flex items-center justify-center w-8 h-8 text-gray-400 hover:text-[#0051FF] transition-colors"
                      title="Notificaciones"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      {notifications.length > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white leading-none">{notifications.length}</span>
                        </span>
                      )}
                    </button>

                    {showNotifications && (
                      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-bold text-gray-900">Notificaciones</p>
                        </div>
                        {notifications.length === 0 ? (
                          <div className="px-4 py-8 text-center">
                            <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-gray-400">No hay notificaciones</p>
                          </div>
                        ) : (
                          <div className="max-h-80 overflow-y-auto">
                            {notifications.map((n) => (
                              <button
                                key={n.id}
                                onClick={() => { n.action?.(); setShowNotifications(false) }}
                                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-b-0 ${
                                  n.action ? "cursor-pointer" : "cursor-default"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <span className="mt-0.5 shrink-0">
                                    {n.type === "danger" ? (
                                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                      </svg>
                                    ) : n.type === "warning" ? (
                                      <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    )}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-28">
        {pageLoading && !contacts ? (
          <div className="max-w-xl mx-auto pt-16">
            <div className="text-center mb-8">
              <div className="animate-spin w-8 h-8 border-4 border-[#0051FF] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-sm text-gray-500">Cargando contactos...</p>
            </div>
          </div>
        ) : !contacts ? (
          <div className="max-w-xl mx-auto pt-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0051FF]/10 to-[#FB8A00]/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-[#0051FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Cargá tus contactos</h1>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                Subí un archivo <strong>CSV</strong> o <strong>Excel</strong> con tus contactos, o agregalos manualmente uno por uno.
              </p>
            </div>
            <UploadZone onFile={handleFile} />
            <div className="mt-6 text-center">
              <button
                id="btn-add-contact"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FB8A00] text-white text-sm font-semibold rounded-lg hover:bg-[#e07a00] transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar manualmente
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
            {loading && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700 flex items-center gap-2">
                Procesando <strong>{fileName}</strong>…
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {viewMode === "active" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    id="search-input"
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Buscar por nombre, teléfono o email…"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300"
                  />
                </div>

                <div className="relative" ref={filterRef}>
                  <button
                    id="btn-filters"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg border transition-colors bg-[#0051FF] border-[#0051FF] text-white shadow-sm ${
                      activeFilters ? "" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <circle cx="10" cy="6" r="1.5" fill="currentColor" stroke="none" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="none" />
                      <line x1="4" y1="18" x2="20" y2="18" />
                      <circle cx="8" cy="18" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                    <span className="hidden sm:inline">Filtros</span>
                    {activeFilters && (
                      <span className="w-2 h-2 rounded-full bg-white inline-block" />
                    )}
                  </button>

                  {showFilters && (
                    <div className="fixed sm:absolute left-4 sm:left-auto right-4 sm:right-auto top-auto sm:top-full mt-2 z-50 sm:w-72 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Clasificación</label>
                        <select
                          value={clasifFilter}
                          onChange={(e) => setClasifFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] appearance-none pr-8"
                        >
                          <option value="">Todas las clasificaciones</option>
                          <option value="Interesado">Interesados</option>
                          <option value="Potencial cliente">Potenciales clientes</option>
                          <option value="Comprador">Compradores</option>
                          <option value="Pendiente">Pendientes</option>
                          <option value="No interesado">No interesados</option>
                          <option value="No hubo respuesta">Sin respuesta</option>
                          <option value="No interesado: por razones económicas">No interesado: económico</option>
                          <option value="No interesado: tiene una mejor oferta">No interesado: mejor oferta</option>
                          <option value="No interesado: demora al responder">No interesado: demora</option>
                          <option value="No interesado: La oferta no es lo que buscaba">No interesado: no buscaba</option>
                          <option value="No interesado: Mala atención">No interesado: mala atención</option>
                          <option value="No interesado: Otras razones">No interesado: otras razones</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Fecha</label>
                        <select
                          value={periodFilter}
                          onChange={(e) => setPeriodFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] appearance-none pr-8"
                        >
                          <option value="">Cualquier fecha</option>
                          <option value="week">Última semana</option>
                          <option value="month">Último mes</option>
                          <option value="quarter">Últimos 3 meses</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Gestión</label>
                        <select
                          value={minRoundsFilter}
                          onChange={(e) => setMinRoundsFilter(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] appearance-none pr-8"
                        >
                          <option value={0}>Cualquier gestión</option>
                          <option value={1}>1+ gestiones</option>
                          <option value={2}>2+ gestiones</option>
                          <option value={3}>3+ gestiones</option>
                          <option value={4}>4+ gestiones</option>
                          <option value={5}>5 gestiones</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ordenar</label>
                        <select
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] appearance-none pr-8"
                        >
                          <option value="">Sin orden</option>
                          <option value="az">A → Z</option>
                          <option value="proxima">Próx. contacto</option>
                          <option value="carga">Fecha de carga</option>
                        </select>
                      </div>

                      {activeFilters && (
                        <button
                          onClick={() => { setClasifFilter(""); setPeriodFilter(""); setMinRoundsFilter(0); setSortOrder(""); setShowFilters(false) }}
                          className="w-full px-3 py-2 text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center gap-1 border-t border-gray-100 pt-3"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Limpiar filtros
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}

            {viewMode === "trash" ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-gray-500">
                    {trashContacts ? `${trashContacts.length} contacto${trashContacts.length !== 1 ? "s" : ""} eliminado${trashContacts.length !== 1 ? "s" : ""}` : "Cargando..."}
                  </p>
                  {trashContacts && trashContacts.length > 0 && (
                    <button onClick={async () => { if (!confirm("¿Vaciar papelera? No se podrá recuperar.")) return; await fetch(`/api/tools/contacts/trash?uid=${user.id}`, { method: "DELETE" }); setTrashContacts([]); fetchContacts() }} className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors">
                      Vaciar papelera
                    </button>
                  )}
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-100">
                  {!trashContacts ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin w-6 h-6 border-4 border-[#0051FF] border-t-transparent rounded-full" />
                    </div>
                  ) : trashContacts.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <p className="text-sm text-gray-400">La papelera está vacía</p>
                    </div>
                  ) : (
                    trashContacts.map((c) => (
                      <div key={c.id} className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50/50 transition-colors">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{c.nombre}</p>
                          <p className="text-xs text-gray-400 truncate">{c.celular || c.email || "Sin datos"}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <button
                            onClick={async () => { await fetch(`/api/tools/contacts/trash?uid=${user.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "restore", id: c.id }) }); setTrashContacts((prev) => prev.filter((t) => t.id !== c.id)); fetchContacts() }}
                            className="px-3 py-1.5 text-xs font-medium text-[#0051FF] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Restaurar
                          </button>
                          <button
                            onClick={async () => { if (!confirm("¿Eliminar permanentemente?")) return; await fetch(`/api/tools/contacts/trash?uid=${user.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "permanent-delete", id: c.id }) }); setTrashContacts((prev) => prev.filter((t) => t.id !== c.id)) }}
                            className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                            title="Eliminar permanentemente"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-gray-500">
                    {filteredContacts && filteredContacts.length < contacts.length
                      ? `${filteredContacts.length} de ${contacts.length} contactos`
                      : `${contacts.length} contactos`}
                    {!clasifFilter && compradoresCount > 0 && (
                      <span className="text-xs text-gray-300"> · <span className="text-green-500 font-medium">{compradoresCount}</span> ventas ocultas — <button onClick={() => setClasifFilter("Comprador")} className="text-[#0051FF] hover:underline">ver</button></span>
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-[10px] text-gray-300">Hacé clic en un contacto para ver sus rondas de seguimiento</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <ContactTable contacts={filteredContacts || contacts} userId={user.id} onDelete={handleDelete} onUpdate={fetchContacts} onPin={handlePin} />
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {showAddModal && (
        <AddContactModal
          userId={user.id}
          onClose={() => setShowAddModal(false)}
          onCreated={() => {
            setShowAddModal(false)
            fetchContacts()
          }}
        />
      )}

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onFile={handleFile}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          userId={user.id}
          onClose={() => setShowProfileModal(false)}
          onSaved={() => {
            setShowProfileModal(false)
            fetch(`/api/tools/profile?uid=${user.id}`).then((r) => r.json()).then((data) => setProfile(data)).catch(() => {})
          }}
        />
      )}

      {showSuggestModal && (
        <SuggestModal onClose={() => setShowSuggestModal(false)} />
      )}

      {showTutorial && (
        <GuidedTutorial onComplete={() => setShowTutorial(false)} />
      )}
    </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ position: "fixed", bottom: "80px", right: "24px", zIndex: 9999 }}
        className={`flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#0051FF] rounded-xl shadow-lg hover:bg-[#0040CC] hover:shadow-xl transition-all duration-300 ease-out transform ${
          showScrollBtn ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
        Subir ↑
      </button>

      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">© {new Date().getFullYear()}</span>
          <div className="flex items-center gap-3 sm:gap-5">
            <a href="mailto:support@grupostart.com.ar" className="text-xs sm:text-sm text-gray-400 hover:text-[#0051FF] transition-colors truncate">
              support@grupostart.com.ar
            </a>
            <button
            onClick={() => setShowSuggestModal(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#0051FF] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors shrink-0"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="hidden sm:inline">Realizar sugerencia</span>
          </button>
          </div>
        </div>
      </footer>
    </>
  )
}
