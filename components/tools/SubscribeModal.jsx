"use client"
import { useState } from "react"

export default function SubscribeModal({ user, onClose }) {
  const [mpEmail, setMpEmail] = useState(user?.email || "")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!mpEmail.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/routes/preapproval/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.id, payer_email: mpEmail.trim() }),
      })
      const data = await res.json()
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        alert(data.error || "Error al generar la suscripción. Intentalo de nuevo.")
      }
    } catch {
      alert("Error al conectar con el sistema de pagos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Confirmar suscripción</h2>
          <button type="button" onClick={onClose} className="p-1 text-gray-300 hover:text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-blue-700">
              <strong>Importante:</strong> El email debe coincidir con el de tu cuenta de Mercado Pago.
              Si usás uno diferente, actualizalo antes de continuar.
            </p>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email de Mercado Pago
          </label>
          <input
            type="email"
            value={mpEmail}
            onChange={(e) => setMpEmail(e.target.value)}
            placeholder="tuemail@ejemplo.com"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] placeholder:text-gray-300"
            required
          />
          <p className="text-xs text-gray-400 mt-1.5 mb-4">
            $2.500 ARS/mes · Débito automático · Cancelá cuando quieras
          </p>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || !mpEmail.trim()}
              className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Procesando...
                </span>
              ) : "Ir a Mercado Pago"}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
