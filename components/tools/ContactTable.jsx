"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { addBusinessDays, subBusinessDays, formatFecha, parseFecha, isSameDay } from "@/lib/tools/business-days"

const CLASIFICACIONES = ["", "Pendiente", "Interesado", "Potencial cliente", "Comprador", "No interesado", "No hubo respuesta"]

const NO_INTERESADO_REASONS = [
  "No interesado: por razones económicas",
  "No interesado: tiene una mejor oferta",
  "No interesado: demora al responder",
  "No interesado: La oferta no es lo que buscaba",
  "No interesado: Mala atención",
  "No interesado: Otras razones",
]

const REDES_SOCIALES = ["", "WhatsApp", "Instagram", "Facebook", "Otro"]

const CLASIFICACION_COLORS = {
  "Comprador": "bg-green-100 text-green-800",
  "Interesado": "bg-blue-100 text-blue-800",
  "Potencial cliente": "bg-yellow-100 text-yellow-800",
  "Pendiente": "bg-gray-100 text-gray-500",
  "No hubo respuesta": "bg-purple-100 text-purple-800",
  "No interesado": "bg-red-100 text-red-700",
}

function getClasificacionColor(c) {
  return CLASIFICACION_COLORS[c] || "bg-gray-50 text-gray-600"
}

function getEstadoStyle(clasificacion) {
  if (clasificacion === "Interesado" || clasificacion === "Potencial cliente") return "bg-green-50 text-green-700 border-green-200"
  return "bg-gray-50 text-gray-600 border-gray-200"
}

function getRoundStatus(clasificacion, fecha, proximaFecha) {
  if (clasificacion && clasificacion !== "Pendiente") {
    return { type: "realizado", label: "Realizado" }
  }
  if (!proximaFecha) return { type: "inactivo", label: "" }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const prox = parseFecha(proximaFecha)
  if (!prox) return { type: "inactivo", label: "" }
  if (isSameDay(today, prox) || today > prox) return { type: "no_realizado", label: "No realizado" }
  const twoBizDaysBefore = subBusinessDays(prox, 2)
  if (today >= twoBizDaysBefore) return { type: "proximo", label: "Próximo" }
  return { type: "inactivo", label: "" }
}

function getStatusDotColor(type, clasificacion) {
  if (type === "realizado") {
    if (clasificacion.startsWith("No interesado")) return "bg-red-300"
    if (clasificacion === "Comprador") return "bg-green-500"
    if (clasificacion === "Interesado") return "bg-blue-500"
    if (clasificacion === "Potencial cliente") return "bg-amber-500"
    if (clasificacion === "No hubo respuesta") return "bg-purple-400"
    return "bg-green-400"
  }
  if (type === "no_realizado") return "bg-red-300"
  if (type === "proximo") return "bg-yellow-500"
  return "bg-gray-200"
}

const PROXIMA_FECHA_DAYS = {
  "Interesado": 5,
  "Potencial cliente": 1,
  "No hubo respuesta": 20,
  "No interesado: por razones económicas": 60,
  "No interesado: tiene una mejor oferta": 3,
  "No interesado: La oferta no es lo que buscaba": 30,
  "No interesado: Otras razones": 45,
}

const NO_SALVABLE = new Set([
  "No interesado: demora al responder",
  "No interesado: Mala atención",
])

function calcProximaFechaLocal(clasificacion, fechaBase) {
  if (!clasificacion || NO_SALVABLE.has(clasificacion)) return ""
  const date = parseFecha(fechaBase)
  if (!date) return ""
  const days = PROXIMA_FECHA_DAYS[clasificacion]
  if (!days) return ""
  return formatFecha(addBusinessDays(date, days))
}

const ROUND_LABELS = ["1er", "2do", "3er", "4to", "5to"]

function getNextContactInfo(contactos) {
  const fechaBase = contactos[0]?.fecha || ""
  for (let j = contactos.length - 1; j >= 0; j--) {
    const r = contactos[j]
    if (!r.clasificacion || r.clasificacion === "Pendiente") continue
    const prox = r.proxima_fecha || calcProximaFechaLocal(r.clasificacion, fechaBase)
    if (prox) return { roundIndex: j, date: prox }
  }
  return null
}

function isOverdueDate(ddmm) {
  if (!ddmm) return false
  const d = parseFecha(ddmm)
  if (!d) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

function isNextRoundUnclassified(contactos, roundIndex) {
  const next = contactos[roundIndex + 1]
  if (!next) return false
  return !next.clasificacion || next.clasificacion === "Pendiente"
}

function hasComprador(contactos) {
  return contactos.some((r) => r.clasificacion === "Comprador")
}

export default function ContactTable({ contacts, onDelete, onUpdate }) {
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [saving, setSaving] = useState({})
  const [localEdits, setLocalEdits] = useState({})
  const [contactEdits, setContactEdits] = useState({})
  const [editingDateId, setEditingDateId] = useState(null)
  const debounceRef = useRef({})

  useEffect(() => {
    return () => {
      Object.values(debounceRef.current).forEach(clearTimeout)
    }
  }, [])

  const toggleExpand = (i) => {
    setExpanded((prev) => prev === i ? null : i)
  }

  const saveRound = useCallback(async (contactId, roundIndex, field, value) => {
    const key = `save-${contactId}-${roundIndex}`
    setSaving((prev) => ({ ...prev, [key]: true }))
    try {
      const contact = contacts.find((c) => c.id === contactId)
      if (!contact) return
      let updatedFecha = contact.contactos[roundIndex]?.fecha || ""
      if (field === "clasificacion") {
        if (value !== "" && value !== "Pendiente") {
          const now = new Date()
          const d = String(now.getDate()).padStart(2, "0")
          const m = String(now.getMonth() + 1).padStart(2, "0")
          const y = now.getFullYear()
          updatedFecha = `${d}/${m}/${y}`
        } else {
          updatedFecha = ""
        }
      }
      const updatedContactos = contact.contactos.map((r, i) => {
        if (i !== roundIndex) return r
        const base = { ...r, [field]: value }
        if (field === "clasificacion") base.fecha = updatedFecha
        return base
      })
      const res = await fetch(`/api/tools/contacts/${contactId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactos: updatedContactos }),
      })
      if (!res.ok) throw new Error()
      onUpdate?.()
    } catch (err) {
      console.error("Error saving round:", err)
    } finally {
      setSaving((prev) => ({ ...prev, [key]: false }))
      if (field === "estado") {
        setLocalEdits((prev) => {
          const next = { ...prev }
          delete next[`edit-${contactId}-${roundIndex}`]
          return next
        })
      }
    }
  }, [contacts, onUpdate])

  const saveContactField = useCallback(async (contactId, field, value) => {
    const key = `save-contact-${contactId}-${field}`
    setSaving((prev) => ({ ...prev, [key]: true }))
    try {
      const res = await fetch(`/api/tools/contacts/${contactId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      })
      if (!res.ok) throw new Error()
      onUpdate?.()
    } catch (err) {
      console.error("Error saving contact field:", err)
    } finally {
      setSaving((prev) => ({ ...prev, [key]: false }))
    }
  }, [onUpdate])

  const handleEstadoChange = (contactId, roundIndex, value) => {
    const key = `edit-${contactId}-${roundIndex}`
    setLocalEdits((prev) => ({ ...prev, [key]: value }))
    if (debounceRef.current[key]) clearTimeout(debounceRef.current[key])
    debounceRef.current[key] = setTimeout(() => saveRound(contactId, roundIndex, "estado", value), 600)
  }

  const handleEstadoBlur = (contactId, roundIndex, value) => {
    const key = `edit-${contactId}-${roundIndex}`
    if (debounceRef.current[key]) clearTimeout(debounceRef.current[key])
    saveRound(contactId, roundIndex, "estado", value)
  }

  const hasAnyRoundData = (c) => c.contactos.some((r) => r.clasificacion || r.fecha || r.estado)

  const getSocialIcon = (red) => {
    switch (red) {
      case "WhatsApp": return "WA"
      case "Instagram": return "IG"
      case "Facebook": return "FB"
      default: return red ? "RS" : null
    }
  }

  return (
    <div className="divide-y divide-gray-100">
      {contacts.map((c, i) => {
        const contact = c
        const id = contact.id
        const isExpanded = expanded === i
        const hasData = hasAnyRoundData(c)

        const renderStatusBadge = (mobile) => {
          const cls = mobile ? "sm:hidden" : "hidden sm:flex"
          if (hasComprador(c.contactos)) {
            return <div className={`${cls} items-center gap-1 text-green-600`}><svg className="w-4 h-4 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span className="text-[10px] font-semibold leading-tight">¡Venta realizada!</span></div>
          }
          const info = getNextContactInfo(c.contactos)
          if (!info) return null
          const contactNotDone = isNextRoundUnclassified(c.contactos, info.roundIndex) && isOverdueDate(info.date)
          const dateParts = info.date.split("/")
          const dateValue = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
          return (
            <div className={`${cls} items-center gap-1 ${contactNotDone ? "text-red-400" : "text-orange-600"}`}>
              <svg className={`w-4 h-4 shrink-0 ${contactNotDone ? "text-red-400" : "text-orange-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              {editingDateId === id ? (
                <input type="date" value={dateValue} onChange={(e) => { if (!e.target.value) return; const p = e.target.value.split("-"); const fechaStr = `${p[2]}/${p[1]}/${p[0]}`; saveRound(id, info.roundIndex, "proxima_fecha", fechaStr); setEditingDateId(null) }} onBlur={() => setEditingDateId(null)} className="w-24 px-1 py-0.5 rounded text-[10px] border border-orange-300 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400" autoFocus />
              ) : (
                <button onClick={(e) => { e.stopPropagation(); setEditingDateId(id) }} className="text-[10px] sm:text-xs font-semibold leading-tight hover:underline text-left">{contactNotDone ? "Contacto no realizado" : info.date}</button>
              )}
            </div>
          )
        }

        const desktopBadge = hasData ? renderStatusBadge(false) : null

        return (
          <div key={id} className="group relative">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => toggleExpand(i)}>
              <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <button
                  onClick={(e) => { e.stopPropagation(); saveContactField(id, "pinned", !c.pinned) }}
                  className={`shrink-0 p-0.5 transition-colors ${c.pinned ? "text-[#0051FF]" : "text-gray-200 hover:text-gray-400"}`}
                  title={c.pinned ? "Desfijar" : "Fijar"}
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill={c.pinned ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4 2-4-2V4M6 4h12" />
                  </svg>
                </button>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{c.nombre}</p>
                  <div className="flex items-center gap-2 mt-1.5 sm:hidden">
                    {hasData && (<div className="flex items-center gap-1">{c.contactos.map((r, j) => { const fechaBase = c.contactos[0]?.fecha || ""; const proxFecha = r.proxima_fecha || calcProximaFechaLocal(r.clasificacion, fechaBase); const st = getRoundStatus(r.clasificacion, r.fecha, proxFecha); return (<span key={j} className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white ${getStatusDotColor(st.type, r.clasificacion)}`} title={`${ROUND_LABELS[j]}: ${st.label || r.clasificacion || "—"}`}>{j + 1}</span>) })}</div>)}
                    {renderStatusBadge(true)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
                {hasData && (
                  <div className="hidden sm:flex items-center gap-1 mr-1">
                    {c.contactos.map((r, j) => { const fechaBase = c.contactos[0]?.fecha || ""; const proxFecha = r.proxima_fecha || calcProximaFechaLocal(r.clasificacion, fechaBase); const st = getRoundStatus(r.clasificacion, r.fecha, proxFecha); return (<span key={j} className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${getStatusDotColor(st.type, r.clasificacion)}`} title={`${ROUND_LABELS[j]}: ${st.label || r.clasificacion || "—"}`}>{j + 1}</span>) })}
                  </div>
                )}
                {hasData && <span className="text-[10px] text-gray-300 hidden sm:inline">{isExpanded ? "ocultar" : "detalle"}</span>}
                <button onClick={(e) => { e.stopPropagation(); toggleExpand(i) }} className={`p-1 text-gray-300 hover:text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg></button>
                {id && onDelete && (<div className="relative"><button onClick={(e) => { e.stopPropagation(); setConfirmDelete(confirmDelete === id ? null : id) }} className="text-gray-300 hover:text-red-500 transition-all p-1"><svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>{confirmDelete === id && (<div className="absolute right-0 top-8 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[120px]"><p className="text-xs text-gray-500 mb-2 px-1">¿Eliminar?</p><div className="flex gap-1"><button onClick={(e) => { e.stopPropagation(); onDelete(id); setConfirmDelete(null) }} className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600">Sí</button><button onClick={(e) => { e.stopPropagation(); setConfirmDelete(null) }} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200">No</button></div></div>)}</div>)}
              </div>
            </div>
            {desktopBadge && (
              <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex-col items-center pointer-events-none">
                <div className="pointer-events-auto">{desktopBadge}</div>
              </div>
            )}

            {isExpanded && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                {id && (<div className="mb-3 p-2 sm:p-3 bg-gray-50 rounded-xl"><div className="flex items-center gap-2 mb-2"><svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg><span className="text-xs font-semibold text-gray-500">Datos de contacto</span></div><div className="flex flex-col sm:flex-row gap-2 sm:gap-3">{(c.celular || c.email) && <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-xs text-gray-600 sm:flex-1">{c.celular && <span>{c.celular}</span>}{c.celular && c.email && <span className="text-gray-300">·</span>}{c.email && <span className="truncate">{c.email}</span>}</div>}<select value={contact.red_social || ""} onChange={(e) => { const val = e.target.value; setContactEdits((prev) => ({ ...prev, [`red_social-${id}`]: val })); saveContactField(id, "red_social", val) }} className="w-full sm:flex-1 px-2.5 py-1.5 rounded-lg text-xs border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]">{REDES_SOCIALES.map((opt) => (<option key={opt} value={opt}>{opt || "Sin red social"}</option>))}</select><input type="text" value={(contactEdits[`nombre_usuario-${id}`] ?? contact.nombre_usuario) || ""} onChange={(e) => { const val = e.target.value; setContactEdits((prev) => ({ ...prev, [`nombre_usuario-${id}`]: val })) }} onBlur={(e) => saveContactField(id, "nombre_usuario", e.target.value)} placeholder="Nombre de usuario" disabled={!contact.red_social || contact.red_social === "WhatsApp"} className={`w-full sm:flex-1 px-2.5 py-1.5 rounded-lg text-xs border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300 ${!contact.red_social || contact.red_social === "WhatsApp" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}/></div></div>)}

                <div className="hidden lg:grid grid-cols-[16px_32px_2fr_140px_1fr_150px_100px_16px] gap-2 px-3 py-2 mb-1">
                  <div></div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase">Ronda</div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase">Clasificación</div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase">Fecha</div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase">Notas</div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase">Próx. contacto</div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase">Hora</div>
                  <div></div>
                </div>

                <div className="space-y-1">
                  {c.contactos.map((r, j) => {
                    const saveKey = id ? `save-${id}-${j}` : `save-${i}-${j}`
                    const editKey = id ? `edit-${id}-${j}` : `edit-${i}-${j}`
                    const isSaving = saving[saveKey]
                    const estadoValue = localEdits[editKey] ?? r.estado
                    const fechaBase = c.contactos[0]?.fecha || ""
                    const proxFecha = r.proxima_fecha || calcProximaFechaLocal(r.clasificacion, fechaBase)
                    const status = getRoundStatus(r.clasificacion, r.fecha, proxFecha)
                    const noSalvable = NO_SALVABLE.has(r.clasificacion)

                    return (
                      <div key={j} className="grid grid-cols-1 md:grid-cols-[16px_32px_2fr_140px_1fr_150px_100px_16px] gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 bg-gray-50 rounded-xl items-start md:items-center">
                        <div className="flex items-center gap-2 md:block"><div className={`w-2 h-2 rounded-full shrink-0 ${getStatusDotColor(status.type, r.clasificacion)}`} title={status.label} /><span className="md:hidden text-[11px] text-gray-500">{status.label}</span></div>
                        <span className="text-[11px] sm:text-xs font-semibold text-gray-400">{ROUND_LABELS[j]}</span>
                        <div><label className="md:hidden text-[9px] font-semibold text-gray-400 uppercase mb-0.5 block">Clasificación</label>{id ? (<div className="flex gap-1"><select value={r.clasificacion} onChange={(e) => saveRound(id, j, "clasificacion", e.target.value)} className="flex-1 min-w-0 px-2 py-1.5 rounded-lg text-xs border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]">{CLASIFICACIONES.map((opt) => (<option key={opt} value={opt}>{opt || "Sin clasificación"}</option>))}</select>{r.clasificacion === "No interesado" && (<select value={r.estado} onChange={(e) => saveRound(id, j, "estado", e.target.value)} className="flex-1 min-w-0 px-2 py-1.5 rounded-lg text-xs border border-red-200 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400"><option value="">Motivo</option>{NO_INTERESADO_REASONS.map((motivo) => (<option key={motivo} value={motivo}>{motivo.replace("No interesado: ", "")}</option>))}</select>)}</div>) : (r.clasificacion && <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getClasificacionColor(r.clasificacion)}`}>{r.clasificacion}</span>)}</div>
                        <div><label className="md:hidden text-[9px] font-semibold text-gray-400 uppercase mb-0.5 block">Fecha</label>{id ? (<input type="date" value={r.fecha ? r.fecha.split("/").reverse().join("-") : ""} onChange={(e) => { if (!e.target.value) return; const p = e.target.value.split("-"); saveRound(id, j, "fecha", `${p[2]}/${p[1]}/${p[0]}`) }} className="w-full px-2 py-1.5 rounded-lg text-xs border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]" />) : (r.fecha ? <span className="text-xs text-gray-500">{r.fecha}</span> : <span className="text-xs text-gray-300">—</span>)}</div>
                        <div><label className="md:hidden text-[9px] font-semibold text-gray-400 uppercase mb-0.5 block">Notas</label>{id ? (<input type="text" value={r.clasificacion === "No interesado" ? "" : estadoValue} onChange={(e) => { if (r.clasificacion !== "No interesado") handleEstadoChange(id, j, e.target.value) }} onBlur={(e) => { if (r.clasificacion !== "No interesado") handleEstadoBlur(id, j, e.target.value) }} placeholder={r.clasificacion === "No hubo respuesta" ? "Sin respuesta" : r.clasificacion === "No interesado" ? "" : "Agregar nota..."} className={`w-full px-2 py-1.5 rounded-lg text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300 ${r.clasificacion === "No interesado" ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-white"} ${r.clasificacion ? getEstadoStyle(r.clasificacion) : ""}`} readOnly={r.clasificacion === "No interesado"} />) : (r.estado && <span className={`inline-block px-2 py-1 rounded-md text-xs border ${getEstadoStyle(r.clasificacion)}`}>{r.estado.length > 30 ? r.estado.slice(0, 30) + "…" : r.estado}</span>)}</div>
                        <div><label className="md:hidden text-[9px] font-semibold text-gray-400 uppercase mb-0.5 block">Próx. contacto</label>{id ? (<input type="date" value={(() => { const fechaBase = c.contactos[0]?.fecha || ""; return (r.proxima_fecha || calcProximaFechaLocal(r.clasificacion, fechaBase)).split("/").reverse().join("-") })()} onChange={(e) => { if (!e.target.value) return; const parts = e.target.value.split("-"); const fechaStr = `${parts[2]}/${parts[1]}/${parts[0]}`; saveRound(id, j, "proxima_fecha", fechaStr) }} className="w-full px-2 py-1.5 rounded-lg text-xs border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]" title="Próximo contacto (manual)"/>) : (r.proxima_fecha || calcProximaFechaLocal(r.clasificacion, c.contactos[0]?.fecha || "")) ? (<span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold bg-orange-50 text-orange-700 border border-orange-200"><span className="text-orange-400 font-normal">Próx.:</span> {r.proxima_fecha || calcProximaFechaLocal(r.clasificacion, c.contactos[0]?.fecha || "")}</span>) : (<span className="text-xs text-gray-300">—</span>)}</div>
                        <div><label className="md:hidden text-[9px] font-semibold text-gray-400 uppercase mb-0.5 block">Hora</label>{j > 0 && id ? (<input type="time" value={r.hora_proximo_contacto || ""} onChange={(e) => saveRound(id, j, "hora_proximo_contacto", e.target.value)} className="w-full px-2 py-1.5 rounded-lg text-xs border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]" />) : (<span className="text-xs text-gray-300">—</span>)}</div>
                        <div className="flex items-center gap-1">{noSalvable && <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200">No salvable</span>}{isSaving && <svg className="w-3 h-3 animate-spin text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
