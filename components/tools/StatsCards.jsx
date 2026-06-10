const CARD_STYLES = [
  { label: "Total contactos", desc: "Todos los contactos registrados", color: "text-[#0051FF]", bg: "bg-blue-50", icon: "users" },
  { label: "Compradores", desc: "Clientes que ya compraron", color: "text-[#FB8A00]", bg: "bg-orange-50", icon: "check" },
  { label: "Interesados", desc: "Mostraron interés en la oferta", color: "text-green-600", bg: "bg-green-50", icon: "star" },
  { label: "Pendientes", desc: "Sin clasificar aún", color: "text-gray-400", bg: "bg-gray-50", icon: "clock" },
  { label: "Sin respuesta", desc: "No contestaron el contacto", color: "text-purple-500", bg: "bg-purple-50", icon: "noanswer" },
]

const ICONS = {
  users: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  star: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  clock: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  noanswer: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-3.96 0a9 9 0 010-12.727m0 0L6.343 8.464M3.515 3.515l2.828 2.828" />
    </svg>
  ),
}

export default function StatsCards({ contacts }) {
  const total = contacts.length

  const clasificaciones = new Map()
  const estados = new Map()

  for (const c of contacts) {
    for (const r of c.contactos) {
      if (r.clasificacion) {
        clasificaciones.set(r.clasificacion, (clasificaciones.get(r.clasificacion) || 0) + 1)
      }
      if (r.estado && r.estado.startsWith("No interesado")) {
        const razon = r.estado
        estados.set(razon, (estados.get(razon) || 0) + 1)
      }
    }
  }

  const noInteresados = Array.from(estados.entries()).sort((a, b) => b[1] - a[1])

  const cards = [
    { ...CARD_STYLES[0], value: total },
    { ...CARD_STYLES[1], value: clasificaciones.get("Comprador") || 0 },
    { ...CARD_STYLES[2], value: clasificaciones.get("Interesado") || 0 },
    { ...CARD_STYLES[3], value: clasificaciones.get("Pendiente") || 0 },
    { ...CARD_STYLES[4], value: clasificaciones.get("No hubo respuesta") || 0 },
  ]

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
                {ICONS[card.icon]}
              </div>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">{card.label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{card.desc}</p>
          </div>
        ))}
      </div>

      {noInteresados.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Razones de &laquo;No interesado&raquo;</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {noInteresados.map(([razon, count]) => (
              <span key={razon} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs border border-red-100">
                <span className="font-bold">{count}</span>
                {razon.replace("No interesado: ", "")}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
