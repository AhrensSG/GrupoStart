"use client"

import { useState, useEffect } from "react"

export default function ProfileModal({ onClose, onSaved, userId }) {
  const [horaIngreso, setHoraIngreso] = useState("09:00")
  const [horaSalida, setHoraSalida] = useState("18:00")
  const [whatsappUrl, setWhatsappUrl] = useState("")
  const [whatsappToken, setWhatsappToken] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companyLogo, setCompanyLogo] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!userId) return
    fetch(`/api/tools/profile?uid=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.hora_ingreso) setHoraIngreso(data.hora_ingreso)
        if (data.hora_salida) setHoraSalida(data.hora_salida)
        if (data.whatsapp_api_url) setWhatsappUrl(data.whatsapp_api_url)
        if (data.whatsapp_api_token) setWhatsappToken(data.whatsapp_api_token)
        if (data.company_name) setCompanyName(data.company_name)
        if (data.company_logo) setCompanyLogo(data.company_logo)
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      const res = await fetch("/api/tools/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userId,
          hora_ingreso: horaIngreso,
          hora_salida: horaSalida,
          whatsapp_api_url: whatsappUrl,
          whatsapp_api_token: whatsappToken,
          company_name: companyName,
          company_logo: companyLogo,
        }),
      })
      if (!res.ok) throw new Error()
      onSaved()
    } catch {
      setError("Error al guardar configuración")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Configuración de perfil</h2>
            <p className="text-xs text-gray-400 mt-0.5">Personalizá tu jornada laboral y la integración con WhatsApp</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-[#0051FF]/10 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#0051FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Tu empresa</p>
                <p className="text-xs text-gray-400">Personalizá el nombre y logo que se muestran en la barra</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre de la empresa</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="GrupoStart Tools" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300" />
              </div>
              <div className="flex-shrink-0">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Logo</label>
                <div className="flex items-center gap-2">
                  {companyLogo ? (
                    <div className="relative">
                      <img src={companyLogo} alt="logo" className="w-10 h-10 object-contain rounded-lg border border-gray-200" onError={(e) => e.target.style.display = "none"} />
                      <button type="button" onClick={() => setCompanyLogo("")} className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center hover:bg-red-600">×</button>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <label className="cursor-pointer px-3 py-1.5 text-xs font-medium text-[#0051FF] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    Subir
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      if (file.size > 500 * 1024) { alert("La imagen no puede superar los 500KB"); return }
                      const reader = new FileReader()
                      reader.onload = (ev) => setCompanyLogo(ev.target?.result)
                      reader.readAsDataURL(file)
                    }} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#0051FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Jornada laboral</p>
                <p className="text-xs text-gray-400">Definí tu horario para calcular días hábiles y recordatorios</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Hora de ingreso</label>
                <input type="time" value={horaIngreso} onChange={(e) => setHoraIngreso(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]" />
                <p className="text-[10px] text-gray-400 mt-1">Hora a la que comenzás tu jornada</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Hora de salida</label>
                <input type="time" value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]" />
                <p className="text-[10px] text-gray-400 mt-1">Hora a la que finalizás tu jornada</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">WhatsApp API (recordatorios)</p>
                <p className="text-xs text-gray-400">Configuración para enviar recordatorios automáticos de seguimiento</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">URL de la API</label>
                <input type="text" value={whatsappUrl} onChange={(e) => setWhatsappUrl(e.target.value)} placeholder="https://api.whatsapp.com/send..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300" />
                <p className="text-[10px] text-gray-400 mt-1">URL del endpoint de tu proveedor de WhatsApp API</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Token de la API</label>
                <input type="password" value={whatsappToken} onChange={(e) => setWhatsappToken(e.target.value)} placeholder="Ingrese el token de autenticación" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300" />
                <p className="text-[10px] text-gray-400 mt-1">Token de acceso para autenticar las solicitudes</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Si no configurás esto, los recordatorios se mostrarán solo en pantalla
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Cancelar</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-[#0051FF] text-white text-sm font-medium rounded-lg hover:bg-[#0040cc] transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm">
              {saving ? "Guardando…" : "Guardar configuración"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
