"use client"

import { useState, useEffect } from "react"

export default function MembershipSection({ user }) {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!user?.id) return
    fetch(`/api/tools/subscription?uid=${user.id}&list=true`)
      .then(r => r.json())
      .then(data => {
        if (data.subscriptions) setSubscriptions(data.subscriptions)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user?.id])

  const handleCancel = async (sub) => {
    if (!confirm("¿Estás seguro de que querés darte de baja? Podés volver a suscribirte cuando quieras.")) return

    setCancelling(sub.id)
    setMessage("")
    try {
      const res = await fetch("/api/tools/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.id }),
      })
      const data = await res.json()
      if (data.success) {
        setMessage("Suscripción cancelada correctamente.")
        setSubscriptions(prev => prev.map(s => s.id === sub.id ? { ...s, status: "cancelled" } : s))
      } else {
        setMessage("Error al cancelar. Intentalo de nuevo.")
      }
    } catch {
      setMessage("Error de conexión.")
    } finally {
      setCancelling(null)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "-"
    const d = new Date(dateStr)
    return d.toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })
  }

  if (loading) {
    return (
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestiones de Membresía</h2>
        <p className="text-sm text-gray-400">Cargando suscripciones...</p>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestiones de Membresía</h2>
        <p className="text-sm text-gray-400 mt-1">Administrá tus suscripciones activas e inactivas</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${message.includes("correctamente") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message}
        </div>
      )}

      {subscriptions.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No tenés suscripciones registradas.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${sub.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                  <span className="font-semibold text-gray-900">
                    {sub.status === "active" ? "Activa" : "Cancelada"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {sub.email && <>{sub.email} · </>}
                  Desde el {formatDate(sub.created_at)}
                </p>
                {sub.cancelled_at && (
                  <p className="text-sm text-gray-400">
                    Cancelada el {formatDate(sub.updated_at)}
                  </p>
                )}
              </div>

              {sub.status === "active" && (
                <button
                  onClick={() => handleCancel(sub)}
                  disabled={cancelling === sub.id}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300 rounded-lg transition-colors whitespace-nowrap"
                >
                  {cancelling === sub.id ? "Cancelando..." : "Darse de baja"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
