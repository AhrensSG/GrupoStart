"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SubscriptionsSection = ({ adminUid }) => {
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionUid, setActionUid] = useState(null);

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch(`/api/admin/subscriptions?admin_uid=${adminUid}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSubscriptions(data.subscriptions || [])
    } catch {
      toast.error("Error al cargar las suscripciones.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminUid])

  const runAction = async (sub, action) => {
    const label = action === "activate" ? "activar" : "desactivar"
    if (!window.confirm(`¿Deseas ${label} la suscripción de ${sub.email || sub.uid}?`)) return
    setActionUid(sub.uid)
    try {
      const res = await fetch("/api/admin/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_uid: adminUid,
          uid: sub.uid,
          email: sub.email || "",
          action,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Error al ${label} la suscripción`)
      toast.success(data.message || `Suscripción ${action === "activate" ? "activada" : "desactivada"}.`)
      fetchSubscriptions()
    } catch (err) {
      toast.error(err.message || `Error al ${label} la suscripción.`)
    } finally {
      setActionUid(null)
    }
  }

  const formatDate = (date) => {
    if (!date) return "—"
    try {
      return new Date(date).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" })
    } catch {
      return "—"
    }
  }

  const activeCount = subscriptions ? subscriptions.filter((s) => s.status === "active").length : 0
  const activeNow = subscriptions ? subscriptions.filter((s) => s.status === "active" || (s.status === "cancelled" && s.expires_at && new Date(s.expires_at) > new Date())).length : 0

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Suscripciones</h2>
        <p className="text-sm text-gray-400 mt-1">Gestioná las suscripciones de Tools</p>
      </div>

      {subscriptions && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
            <p className="text-xs text-gray-400">Total registradas</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-green-600">{activeNow}</p>
            <p className="text-xs text-gray-400">Activas ahora</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-[#FB8A00]">{activeCount}</p>
            <p className="text-xs text-gray-400">Con estado activo</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin w-6 h-6 border-4 border-[#0051FF] border-t-transparent rounded-full" />
          </div>
        ) : !subscriptions || subscriptions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400">No hay suscripciones registradas</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">UID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Inicio</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Vence</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subscriptions.map((s) => {
                  const active = s.status === "active" || (s.status === "cancelled" && s.expires_at && new Date(s.expires_at) > new Date())
                  return (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{s.email || "—"}</p>
                        <p className="text-xs text-gray-400 truncate md:hidden">{s.uid}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-gray-400 truncate block max-w-[160px]" title={s.uid}>{s.uid}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                          active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-500" : "bg-red-400"}`} />
                          {active ? "Activa" : "Inactiva"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">{formatDate(s.created_at)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">{formatDate(s.expires_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {active ? (
                            <button
                              onClick={() => runAction(s, "deactivate")}
                              disabled={actionUid === s.uid}
                              className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {actionUid === s.uid ? "..." : "Desactivar"}
                            </button>
                          ) : (
                            <button
                              onClick={() => runAction(s, "activate")}
                              disabled={actionUid === s.uid}
                              className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {actionUid === s.uid ? "..." : "Activar"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubscriptionsSection;
