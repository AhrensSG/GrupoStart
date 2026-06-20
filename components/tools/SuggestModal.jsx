"use client"
import { useState } from "react"

export default function SuggestModal({ onClose }) {
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setSending(true)
    try {
      const res = await fetch("/api/routes/send_mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "grupostart.seguimiento@gmail.com",
          subject: "Sugerencia - GrupoStart Tools",
          text: message,
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      alert("Error al enviar la sugerencia. Intentalo de nuevo.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-1">¡Gracias por tu sugerencia!</p>
            <p className="text-sm text-gray-500 mb-6">La recibimos correctamente.</p>
            <button onClick={onClose} className="px-6 py-2 bg-[#0051FF] text-white rounded-lg text-sm font-medium hover:bg-[#0040CC]">
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Realizar sugerencia</h2>
              <button type="button" onClick={onClose} className="p-1 text-gray-300 hover:text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-3">Tu opinión nos ayuda a mejorar. Dejanos tu comentario o sugerencia.</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribí tu sugerencia o comentario..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF] min-h-[130px] resize-y placeholder:text-gray-300"
              required
            />
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={sending || !message.trim()}
                className="flex-1 px-4 py-2.5 bg-[#0051FF] text-white rounded-lg text-sm font-medium hover:bg-[#0040CC] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : "Enviar sugerencia"}
              </button>
              <button type="button" onClick={onClose} className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
