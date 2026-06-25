"use client"

import { useState, useEffect, useMemo, useContext } from "react"
import Link from "next/link"
import { Context } from "@/app/context/GlobalContext"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
} from "recharts"

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

const PIE_COLORS = {
  "Comprador": "#22c55e",
  "Interesado": "#3b82f6",
  "Potencial cliente": "#f59e0b",
  "Pendiente": "#9ca3af",
  "No interesado": "#ef4444",
  "No hubo respuesta": "#a855f7",
}

const roundLabels = ["1er Contacto", "2do Contacto", "3er Contacto", "4to Contacto", "5to Contacto"]

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

function formatShortDate(d) {
  if (!d) return ""
  return `${d.getDate()}/${d.getMonth() + 1}`
}

function getWeekId(d) {
  const year = d.getFullYear()
  const jan1 = new Date(year, 0, 1)
  const days = Math.floor((d - jan1) / 86400000)
  const week = Math.ceil((days + jan1.getDay() + 1) / 7)
  return `${year}-W${String(week).padStart(2, "0")}`
}

function getWeekLabel(weekId) {
  const parts = weekId.split("-W")
  const year = parseInt(parts[0], 10)
  const week = parseInt(parts[1], 10)
  const jan1 = new Date(year, 0, 1)
  const daysOffset = (week - 1) * 7 - jan1.getDay() + 1
  const start = new Date(year, 0, daysOffset)
  return `${start.getDate()}/${start.getMonth() + 1}`
}

export default function EstadisticaPage() {
  const { state } = useContext(Context)
  const user = state?.user

  const [contacts, setContacts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/tools/contacts?uid=${user.id}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setContacts(data || [])
      } catch {
        setContacts([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user?.id])

  const stats = useMemo(() => {
    if (!contacts) return null
    const total = contacts.length
    let compradores = 0
    let interesados = 0
    let potenciales = 0
    let pendientes = 0
    let noInteresados = 0
    let noRespuesta = 0
    let conClasificacion = 0
    const noInteresadoReasons = {}
    const monthlySales = {}
    const weeklySales = {}
    const weekdaySales = [0, 0, 0, 0, 0, 0, 0]
    const monthlyContacts = {}
    const pipelineCount = {}
    const roundConversion = [0, 0, 0, 0, 0]
    const roundSuccess = [0, 0, 0, 0, 0]
    const daysToClose = []
    const salesByDay = {}

    for (const c of contacts) {
      if (!c.contactos || c.contactos.length === 0) continue

      const hasClassification = c.contactos.some((r) => r.clasificacion && r.clasificacion !== "Pendiente")
      if (!hasClassification) continue
      conClasificacion++

      let latestClasif = ""
      for (const r of c.contactos) {
        if (r.clasificacion && r.clasificacion !== "Pendiente") latestClasif = r.clasificacion
      }

      pipelineCount[latestClasif] = (pipelineCount[latestClasif] || 0) + 1

      for (let j = 0; j < c.contactos.length; j++) {
        const r = c.contactos[j]
        if (!r.clasificacion || r.clasificacion === "Pendiente") continue
        roundConversion[j]++
        if (r.clasificacion === "Comprador") {
          roundSuccess[j]++
          const fecha = parseFecha(r.fecha)
          if (fecha) {
            const monthKey = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`
            monthlySales[monthKey] = (monthlySales[monthKey] || 0) + 1
            const weekId = getWeekId(fecha)
            weeklySales[weekId] = (weeklySales[weekId] || 0) + 1
            weekdaySales[fecha.getDay()]++
            const dayKey = formatShortDate(fecha)
            salesByDay[dayKey] = (salesByDay[dayKey] || 0) + 1
          }
        }
      }

      for (const r of c.contactos) {
        if (r.clasificacion === "Comprador") {
          compradores++
          const fecha = parseFecha(r.fecha)
          if (fecha) {
            const firstRound = c.contactos.find((rr) => rr.fecha)
            if (firstRound) {
              const firstDate = parseFecha(firstRound.fecha)
              if (firstDate && fecha > firstDate) {
                daysToClose.push(Math.round((fecha - firstDate) / 86400000))
              }
            }
          }
        } else if (r.clasificacion === "Interesado") interesados++
        else if (r.clasificacion === "Potencial cliente") potenciales++
        else if (r.clasificacion === "Pendiente") pendientes++
        else if (r.clasificacion === "No interesado") {
          noInteresados++
          const reason = r.estado || "Sin motivo"
          noInteresadoReasons[reason] = (noInteresadoReasons[reason] || 0) + 1
        } else if (r.clasificacion === "No hubo respuesta") noRespuesta++
      }

      for (const r of c.contactos) {
        const fecha = parseFecha(r.fecha)
        if (fecha) {
          const monthKey = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`
          monthlyContacts[monthKey] = (monthlyContacts[monthKey] || 0) + 1
        }
      }
    }

    const conversionRate = conClasificacion > 0 ? (compradores / conClasificacion) * 100 : 0

    const now = new Date()
    const last12Months = []
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      last12Months.push({
        month: MONTHS[d.getMonth()].slice(0, 3),
        key,
        ventas: monthlySales[key] || 0,
        contactos: monthlyContacts[key] || 0,
      })
    }

    const last8Weeks = []
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i * 7)
      const weekId = getWeekId(d)
      last8Weeks.push({
        week: getWeekLabel(weekId),
        ventas: weeklySales[weekId] || 0,
      })
    }

    const weekdayData = DAYS.map((name, i) => ({
      day: name.slice(0, 3),
      ventas: weekdaySales[i],
    }))

    const sortedMonths = last12Months
      .filter((m) => m.ventas > 0)
      .sort((a, b) => b.ventas - a.ventas)

    const avgDaysToClose = daysToClose.length > 0
      ? Math.round(daysToClose.reduce((a, b) => a + b, 0) / daysToClose.length)
      : 0

    const pipelineData = Object.entries(pipelineCount).map(([name, value]) => ({
      name,
      value,
      color: PIE_COLORS[name] || "#6b7280",
    }))

    const noInteresadoData = Object.entries(noInteresadoReasons)
      .map(([name, value]) => ({
        name: name.replace("No interesado: ", ""),
        value,
      }))
      .sort((a, b) => b.value - a.value)

    const roundData = roundLabels.map((name, i) => ({
      name,
      contactados: roundConversion[i] || 0,
      ventas: roundSuccess[i] || 0,
      tasa: roundConversion[i] > 0 ? ((roundSuccess[i] / roundConversion[i]) * 100).toFixed(1) : "0.0",
    }))

    return {
      total,
      compradores,
      interesados,
      potenciales,
      pendientes,
      noInteresados,
      noRespuesta,
      conClasificacion,
      conversionRate,
      last12Months,
      last8Weeks,
      weekdayData,
      sortedMonths,
      avgDaysToClose,
      daysToClose,
      pipelineData,
      noInteresadoData,
      roundData,
    }
  }, [contacts])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Cargando estadísticas…</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Debés iniciar sesión para ver estadísticas.</p>
      </div>
    )
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8">
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">No hay datos para mostrar estadísticas.</p>
            <p className="text-gray-300 text-xs mt-1">Cargá contactos para ver tus métricas.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8 space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Estadísticas</h1>
          <p className="text-sm text-gray-400 mt-1">Análisis completo del rendimiento comercial</p>
        </div>

        <KpiCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard title="Ventas Mensuales" subtitle="Últimos 12 meses">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stats.last12Months}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                    labelStyle={{ fontWeight: 600, fontSize: 13 }}
                  />
                  <Bar dataKey="ventas" name="Ventas" radius={[6, 6, 0, 0]} maxBarSize={32}>
                    {stats.last12Months.map((entry, idx) => (
                      <Cell key={idx} fill={entry.ventas > 0 ? "#22c55e" : "#e5e7eb"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {stats.sortedMonths.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">Mejores meses</p>
                  <div className="flex flex-wrap gap-2">
                    {stats.sortedMonths.slice(0, 3).map((m, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-medium border border-green-200">
                        {i === 0 && "🥇"} {i === 1 && "🥈"} {i === 2 && "🥉"}
                        {MONTHS[parseInt(m.key.split("-")[1], 10) - 1]} {m.key.split("-")[0]}: {m.ventas} venta{m.ventas !== 1 ? "s" : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </ChartCard>
          </div>

          <ChartCard title="Pipeline" subtitle="Estado actual de contactos">
            {stats.pipelineData.length > 0 ? (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={stats.pipelineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {stats.pipelineData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2">
                  {stats.pipelineData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-xs text-gray-500">{entry.name}</span>
                      <span className="text-xs font-semibold text-gray-700">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-gray-300 text-sm">Sin datos</div>
            )}
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard title="Ventas Semanales" subtitle="Últimas 8 semanas">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={stats.last8Weeks}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  />
                  <Area type="monotone" dataKey="ventas" name="Ventas" stroke="#22c55e" fill="#22c55e" fillOpacity={0.12} strokeWidth={2.5} dot={{ fill: "#22c55e", strokeWidth: 0, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <ChartCard title="Rendimiento" subtitle="Métricas clave">
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Tasa de conversión</span>
                  <span className="text-sm font-bold text-gray-900">{stats.conversionRate.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all" style={{ width: `${Math.min(stats.conversionRate, 100)}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Tiempo promedio en cerrar venta</span>
                <span className="text-sm font-bold text-gray-900">{stats.avgDaysToClose > 0 ? `${stats.avgDaysToClose} días` : "—"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Contactos con clasificación</span>
                <span className="text-sm font-bold text-gray-900">{stats.conClasificacion}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-gray-500">Total de ventas cerradas</span>
                <span className="text-sm font-bold text-gray-900">{stats.compradores}</span>
              </div>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Ventas por día de la semana" subtitle="Distribución de cierres">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.weekdayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                />
                <Bar dataKey="ventas" name="Ventas" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {stats.weekdayData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.ventas > 0 ? "#3b82f6" : "#e5e7eb"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Conversión por ronda" subtitle="Efectividad de cada etapa">
            <div className="space-y-3 pt-1">
              {stats.roundData.map((r, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 font-medium">{r.name}</span>
                    <span className="text-xs text-gray-400">{r.ventas}/{r.contactados} · <strong className={parseFloat(r.tasa) > 0 ? "text-green-600" : "text-gray-400"}>{r.tasa}%</strong></span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${r.contactados > 0 ? (r.ventas / r.contactados) * 100 : 0}%`,
                        background: parseFloat(r.tasa) > 20 ? "#22c55e" : parseFloat(r.tasa) > 5 ? "#f59e0b" : "#e5e7eb",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {stats.noInteresadoData.length > 0 && (
          <ChartCard title="Motivos de No interesado" subtitle="Análisis de pérdidas">
            <ResponsiveContainer width="100%" height={Math.max(180, stats.noInteresadoData.length * 40)}>
              <BarChart data={stats.noInteresadoData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} width={140} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                />
                <Bar dataKey="value" name="Contactos" radius={[0, 6, 6, 0]} maxBarSize={24}>
                  {stats.noInteresadoData.map((entry, idx) => (
                    <Cell key={idx} fill={idx === 0 ? "#ef4444" : "#f87171"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}
      </div>
    </div>
  )
}

function KpiCards({ stats }) {
  const cards = [
    {
      label: "Total contactos",
      value: stats.total,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "text-[#0051FF]",
      bg: "bg-[#0051FF]/5",
    },
    {
      label: "Ventas cerradas",
      value: stats.compradores,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Tasa de conversión",
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: "text-[#FB8A00]",
      bg: "bg-[#FB8A00]/10",
    },
    {
      label: "Interesados activos",
      value: stats.interesados,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      color: "text-blue-600",
      bg: "bg-blue-50",
      sub: `${stats.potenciales} potenciales`,
    },
    {
      label: "Pendientes",
      value: stats.pendientes,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-gray-500",
      bg: "bg-gray-100",
      sub: `${stats.noRespuesta} sin respuesta`,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-xs text-gray-400">{card.label}</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{card.value}</p>
              {card.sub && <p className="text-[10px] text-gray-300 mt-0.5">{card.sub}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/tools" className="flex items-center gap-2">
            <img src="/iconos/logoStartBlue.svg" alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain rounded shrink-0" />
            <span className="font-semibold text-gray-900 text-sm sm:text-base">GrupoStart Tools</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-gray-200">
            <Link href="/tools" className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-[#0051FF] hover:bg-blue-50 rounded-lg transition-colors">
              Contactos
            </Link>
            <Link href="/tools/estadistica" className="px-2.5 py-1.5 text-xs text-white bg-[#0051FF] rounded-lg font-medium">
              Estadística
            </Link>
            <Link href="/tutoriales" className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-[#0051FF] hover:bg-blue-50 rounded-lg transition-colors">
              Tutoriales
            </Link>
            <Link href="/user" className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-[#0051FF] hover:bg-blue-50 rounded-lg transition-colors">
              Perfil
            </Link>
          </div>
        </div>
        <Link
          href="/tools"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </Link>
      </div>
    </div>
  )
}
