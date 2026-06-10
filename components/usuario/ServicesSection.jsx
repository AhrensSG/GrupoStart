import { useState, useEffect, useContext } from "react"
import { Context } from "@/app/context/GlobalContext"
import Link from "next/link"

export default function ServicesSection({ user }) {
  const { state } = useContext(Context)
  const [subscribed, setSubscribed] = useState(null)
  const orders = user?.Orders || [];

  useEffect(() => {
    if (!state?.user) return
    fetch(`/api/tools/subscription?uid=${state.user.id}`)
      .then((r) => r.json())
      .then((data) => setSubscribed(data.subscribed))
      .catch(() => setSubscribed(false))
  }, [state?.user])

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return { label: "Pagado", className: "bg-green-50 text-green-700 border-green-200" };
      case "Pending":
        return { label: "Pendiente", className: "bg-yellow-50 text-yellow-700 border-yellow-200" };
      case "Shopping":
        return { label: "En proceso", className: "bg-blue-50 text-blue-700 border-blue-200" };
      case "Cancel":
        return { label: "Cancelado", className: "bg-red-50 text-red-700 border-red-200" };
      default:
        return { label: status || "Indefinido", className: "bg-gray-50 text-gray-600 border-gray-200" };
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mis Servicios</h2>
        <p className="text-sm text-gray-400 mt-1">Servicios contratados y órdenes de compra</p>
      </div>

      {/* CRM Subscription Card */}
      {subscribed === true && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <Link href="/tools" className="block p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0051FF]/10 to-[#FB8A00]/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#0051FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Sistema de Seguimiento de Leads</h3>
                  <p className="text-xs text-gray-400 mt-0.5">CRM con 5 rondas de seguimiento, estadísticas y recordatorios</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-200">
                      Activo
                    </span>
                    <span className="text-xs text-gray-400">$2.500 ARS/mes</span>
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      )}

      {/* Regular Orders */}
      {orders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Órdenes de compra</h3>
          {orders.map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Orden #{order.orderId}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("es-AR", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
                        {badge.label}
                      </span>
                      <span className="text-sm font-bold text-gray-900">${parseFloat(order.totalPrice).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
                {order.OrderProducts?.length > 0 && (
                  <div className="divide-y divide-gray-50">
                    {order.OrderProducts.map((product) => (
                      <div key={product.id} className="px-5 py-3 flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-700">{product.name}</p>
                          <p className="text-xs text-gray-400">Cantidad: {product.items}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          {Array.isArray(product.data) && product.data.length > 0 && product.data[0]?.name && (
                            <span className="text-xs text-gray-400">{product.data.length} items</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!subscribed && orders.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900">No tenés servicios contratados</p>
          <p className="text-xs text-gray-400 mt-1">Cuando contrates un servicio, aparecerá acá.</p>
        </div>
      )}
    </section>
  );
}
