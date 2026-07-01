"use client"

import { useState, useRef, useEffect } from "react"
import { addBusinessDays, formatFecha, parseFecha } from "@/lib/tools/business-days"

const CLASIFICACIONES = ["Pendiente", "Interesado", "Potencial cliente", "Comprador", "No interesado", "No hubo respuesta"]
const ROUND_LABELS = ["1er Contacto", "2do Contacto", "3er Contacto", "4to Contacto", "5to Contacto"]

const NO_INTERESADO_REASONS = [
  "No interesado: por razones económicas",
  "No interesado: tiene una mejor oferta",
  "No interesado: demora al responder",
  "No interesado: La oferta no es lo que buscaba",
  "No interesado: Mala atención",
  "No interesado: Otras razones",
]

const NO_SALVABLE_REASONS = new Set([
  "No interesado: demora al responder",
  "No interesado: Mala atención",
])

const REDES_SOCIALES = ["WhatsApp", "Instagram", "Facebook", "Otro"]

function calcProximaFecha(clasificacion, estado, fechaBase) {
  const date = parseFecha(fechaBase)
  if (!date) return ""
  if (clasificacion === "Interesado") return formatFecha(addBusinessDays(date, 5))
  if (clasificacion === "Potencial cliente") return formatFecha(addBusinessDays(date, 1))
  if (clasificacion === "No hubo respuesta") return formatFecha(addBusinessDays(date, 20))
  const daysMap = {
    "No interesado: por razones económicas": 60,
    "No interesado: tiene una mejor oferta": 3,
    "No interesado: La oferta no es lo que buscaba": 30,
    "No interesado: Otras razones": 45,
  }
  const days = daysMap[estado]
  if (clasificacion === "No interesado" && days) return formatFecha(addBusinessDays(date, days))
  return ""
}

function isNoSalvable(clasificacion, estado) {
  return clasificacion === "No interesado" && NO_SALVABLE_REASONS.has(estado)
}

const ROUND_NAMES = ["primer contacto", "segundo contacto", "tercer contacto", "cuarto contacto", "quinto contacto"]

export default function AddContactModal({ userId, onClose, onCreated }) {
  const [nombre, setNombre] = useState("")
  const [celular, setCelular] = useState("")
  const [email, setEmail] = useState("")
  const [redSocial, setRedSocial] = useState("WhatsApp")
  const [nombreUsuario, setNombreUsuario] = useState("")
  const EMPTY_ROUND = { clasificacion: "", fecha: "", estado: "", hora_proximo_contacto: "" }
  const [rounds, setRounds] = useState(Array.from({ length: 5 }, () => ({ ...EMPTY_ROUND })))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [roundDropdownOpen, setRoundDropdownOpen] = useState(false)
  const [selectedRound, setSelectedRound] = useState(0)
  const roundRefs = useRef([])

  useEffect(() => {
    setRounds(Array.from({ length: 5 }, () => ({ ...EMPTY_ROUND })))
  }, [selectedRound])

  const updateRound = (i, field, value) => {
    setRounds((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      if (field === "clasificacion") {
        if (value !== "" && value !== "Pendiente") {
          const now = new Date()
          const d = String(now.getDate()).padStart(2, "0")
          const m = String(now.getMonth() + 1).padStart(2, "0")
          const y = now.getFullYear()
          next[i].fecha = `${d}/${m}/${y}`
        } else {
          next[i].fecha = ""
          next[i].estado = ""
        }
      }
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!nombre.trim()) { setError("El nombre es obligatorio"); return }
    if (!celular && !email) { setError("Debe ingresar al menos un celular o email"); return }
    if (celular && celular.length !== 10) { setError("El celular debe tener exactamente 10 números"); return }
    setSaving(true)
    try {
      const checkRes = await fetch(`/api/tools/contacts/check?uid=${userId}&celular=${encodeURIComponent(celular)}&email=${encodeURIComponent(email)}`)
      const checkData = await checkRes.json()
      if (checkData.exists) {
        setError("El número o correo ya existe en la base de datos")
        setSaving(false)
        return
      }
      const res = await fetch("/api/tools/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: userId, nombre: nombre.trim(), celular, email, red_social: redSocial, nombre_usuario: nombreUsuario, contactos: rounds }),
      })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Error al guardar") }
      onCreated()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión")
    } finally {
      setSaving(false)
    }
  }

  const fechaBase = rounds[selectedRound]?.fecha || ""

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-5xl max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div><h2 className="text-lg font-bold text-gray-900">Nuevo contacto</h2><p className="text-xs text-gray-400 mt-0.5">Completá los datos del contacto y las rondas de seguimiento</p></div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button type="button" onClick={() => setRoundDropdownOpen((prev) => !prev)} className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white bg-[#0051FF] hover:bg-[#0040cc] transition-colors shadow-sm">
                {ROUND_NAMES[selectedRound]}
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${roundDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {roundDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
                  {ROUND_NAMES.map((name, idx) => (
                    <button key={idx} type="button" onClick={() => { setSelectedRound(idx); setRoundDropdownOpen(false); roundRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" }) }} className={`w-full text-left px-3 py-2 text-sm transition-colors ${idx === selectedRound ? "text-white bg-[#0051FF] font-medium" : "text-gray-600 hover:bg-gray-50"}`}>{name}</button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-[#0051FF]/10 flex items-center justify-center"><svg className="w-3.5 h-3.5 text-[#0051FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
              <div><p className="text-sm font-semibold text-gray-900">Datos del contacto</p><p className="text-xs text-gray-400">Información básica para identificar al cliente</p></div>
            </div>
            <div className={`grid grid-cols-2 gap-4 ${redSocial && redSocial !== "WhatsApp" ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
              <div className="md:col-span-1"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre completo <span className="text-red-400">*</span></label><input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Juan Pérez" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300"/><p className="text-[10px] text-gray-400 mt-1">Nombre y apellido del contacto</p></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Celular <span className="text-gray-300 font-normal">(10 dígitos)</span></label><input type="text" inputMode="numeric" value={celular} onChange={(e) => setCelular(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Ej: 1123456789" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300"/><p className="text-[10px] text-gray-400 mt-1">WhatsApp o teléfono de contacto</p></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ej: correo@ejemplo.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300"/><p className="text-[10px] text-gray-400 mt-1">Dirección de correo electrónico</p></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Red social</label><select value={redSocial} onChange={(e) => { setRedSocial(e.target.value); if (e.target.value === "WhatsApp") setNombreUsuario("") }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"><option value="">Seleccionar red social</option>{REDES_SOCIALES.map((r) => (<option key={r} value={r}>{r}</option>))}</select><p className="text-[10px] text-gray-400 mt-1">Red por la que se contactó</p></div>
              {redSocial && redSocial !== "WhatsApp" && (<div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Usuario en {redSocial}</label><input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} placeholder={`@usuario de ${redSocial}`} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300"/><p className="text-[10px] text-gray-400 mt-1">Nombre de usuario en {redSocial}</p></div>)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-[#FB8A00]/10 flex items-center justify-center"><svg className="w-3.5 h-3.5 text-[#FB8A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg></div>
              <div><p className="text-sm font-semibold text-gray-900">Rondas de seguimiento</p><p className="text-xs text-gray-400">Registrá hasta 5 contactos con su clasificación y resultado</p></div>
            </div>
            <div className="hidden md:grid grid-cols-[80px_3fr_1fr_120px_85px] gap-2 px-3 py-2 mb-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Ronda</div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Clasificación <span className="font-normal normal-case text-gray-300">— estado / motivo si No interesado</span></div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Notas <span className="font-normal normal-case text-gray-300">— resultado</span></div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Próx.</div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Hora</div>
            </div>
            <div className="space-y-1.5">
              {[rounds[selectedRound]].map((r, idx) => {
                const i = selectedRound
                const prox = calcProximaFecha(r.clasificacion, r.estado, fechaBase)
                const noSalvable = isNoSalvable(r.clasificacion, r.estado)
                return (
                  <div key={i} ref={(el) => { roundRefs.current[i] = el }} className="grid grid-cols-1 md:grid-cols-[80px_3fr_1fr_120px_85px] gap-2 p-3 bg-gray-50 rounded-xl items-start">
                    <div className="flex items-center gap-2 md:block"><span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold text-white shrink-0 ${r.clasificacion ? "bg-[#0051FF]" : "bg-gray-300"}`}>{i + 1}</span><span className="text-xs font-semibold text-gray-500 md:hidden">{ROUND_LABELS[i]}</span></div>
                    <div className="flex gap-1.5"><select value={r.clasificacion} onChange={(e) => updateRound(i, "clasificacion", e.target.value)} className="flex-1 px-2.5 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"><option value="">Clasificación</option>{CLASIFICACIONES.map((c) => (<option key={c} value={c}>{c}</option>))}</select><select value={r.estado} onChange={(e) => updateRound(i, "estado", e.target.value)} className={`flex-1 px-2.5 py-2 border border-red-200 rounded-lg text-sm bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 ${r.clasificacion !== "No interesado" ? "hidden" : ""}`} style={{ display: r.clasificacion === "No interesado" ? "block" : "none" }}><option value="">Motivo</option>{NO_INTERESADO_REASONS.map((motivo) => (<option key={motivo} value={motivo}>{motivo.replace("No interesado: ", "")}</option>))}</select></div>
                    <div><input type="text" value={r.clasificacion === "No interesado" ? "" : r.estado} onChange={(e) => { if (r.clasificacion !== "No interesado") updateRound(i, "estado", e.target.value) }} placeholder={r.clasificacion === "No hubo respuesta" ? "Sin respuesta" : r.clasificacion === "No interesado" ? "" : "Notas del contacto"} className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300"/></div>
                    <div>{noSalvable ? (<span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200 w-full">No salvable</span>) : prox ? (<span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200 w-full">{prox}</span>) : (<span className="inline-flex items-center px-3 py-2 rounded-lg text-xs text-gray-400 bg-gray-100 w-full">—</span>)}</div>
                    <div>{i > 0 ? (<input type="time" value={r.hora_proximo_contacto} onChange={(e) => updateRound(i, "hora_proximo_contacto", e.target.value)} className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"/>) : (<span className="inline-flex items-center px-3 py-2 text-xs text-gray-300 bg-gray-50 rounded-lg w-full">—</span>)}</div>
                  </div>
                )
              })}
            </div>
          </div>
          {error && (<div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 flex items-center gap-2"><svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>{error}</div>)}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Cancelar</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-[#0051FF] text-white text-sm font-medium rounded-lg hover:bg-[#0040cc] transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm">{saving ? (<svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>) : (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>)}{saving ? "Guardando…" : "Guardar contacto"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
