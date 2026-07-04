"use client"

import { useState, useEffect, useCallback } from "react"

const STEPS = [
  {
    title: "¡Bienvenido a GrupoStart Tools!",
    desc: "Este tutorial te va a guiar por las partes principales de la herramienta. Al finalizar, vas a poder gestionar tus leads como un profesional.",
    target: null,
    side: "center",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Importar contactos",
    desc: "Si ya tenés una base de datos, subí un archivo Excel o CSV desde esta zona. El sistema lo procesa automáticamente. También podés arrastrar el archivo directamente.",
    target: "upload-zone",
    side: "bottom",
  },
  {
    title: "Agregar un contacto",
    desc: "Este botón naranja abre el formulario para cargar un nuevo contacto manualmente. Ahí podés ingresar nombre, datos de contacto y las rondas de seguimiento.",
    target: "btn-add-contact",
    side: "bottom",
  },
  {
    title: "Secciones de navegación",
    desc: "Usá estas pestañas para moverte entre Contactos, Estadística (métricas y gráficos), Tutoriales (ayuda), Copys (textos de venta) y Perfil. También tenés la Papelera para recuperar contactos eliminados.",
    target: null,
    side: "center",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: "Buscar contactos",
    desc: "Escribí el nombre, celular o email de un contacto para encontrarlo al instante. La búsqueda es en tiempo real mientras escribís.",
    target: "search-input",
    side: "bottom",
  },
  {
    title: "Filtros avanzados",
    desc: "Acá podés filtrar por clasificación (Interesado, Comprador, etc.), por fecha, por cantidad de gestiones y ordenar por próx. contacto.",
    target: "btn-filters",
    side: "bottom",
  },
  {
    title: "Lista de contactos",
    desc: "Cada contacto se muestra con su nombre y datos. Hacé clic para expandir y ver el detalle completo: clasificación, notas, y próx. contacto. Usá el pin para fijar hasta 3 contactos importantes. Los círculos numerados indican el estado de cada ronda de seguimiento.",
    target: null,
    side: "center",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Estadísticas",
    desc: "En la sección Estadística ves gráficos con métricas de rendimiento: ventas por mes, tasa de conversión, pipeline, motivos de pérdida y más. Ideal para ajustar tu estrategia comercial.",
    target: "link-estadistica",
    side: "bottom",
  },
  {
    title: "Tutoriales",
    desc: "Si necesitás ayuda, entrá a Tutoriales. Ahí encontrás la guía completa paso a paso y podés reactivar este tutorial cuando quieras.",
    target: "link-tutoriales",
    side: "bottom",
  },
  {
    title: "Notificaciones",
    desc: "Acá vas a ver alertas importantes: seguimientos vencidos, próximos contactos a realizar, y configuraciones pendientes como tu horario laboral o número de teléfono.",
    target: null,
    side: "center",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: "¡Todo listo!",
    desc: "Ya conocés lo básico. Empezá a cargar tus contactos y hacé seguimiento de tus leads. ¡Éxito en tus ventas!",
    target: null,
    side: "center",
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function GuidedTutorial({ onComplete }) {
  const [step, setStep] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [found, setFound] = useState(true)
  const [visible, setVisible] = useState(true)

  const updatePosition = useCallback(() => {
    const s = STEPS[step]
    if (!s.target || !visible) { setFound(false); return }
    const el = document.getElementById(s.target) || document.querySelector(`[data-tut="${s.target}"]`)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) {
        setFound(false)
      } else {
        setFound(true)
        setPosition({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
      }
    } else {
      setFound(false)
    }
  }, [step, visible])

  useEffect(() => {
    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)
    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [updatePosition])

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      handleSkip()
    }
  }

  const handleSkip = () => {
    setVisible(false)
    localStorage.setItem("guidedTutorial", "done")
    onComplete?.()
  }

  const current = STEPS[step]
  if (!visible) return null

  const isCenter = !current.target || !found
  const isFirst = step === 0
  const isLast = step === STEPS.length - 1

  return (
    <>
      <div className="fixed inset-0 z-[100]">
        <div className="absolute inset-0 bg-black/50" onClick={handleSkip} />
        {!isCenter && (
          <div
            className="absolute bg-transparent rounded-xl border-2 border-white shadow-[0_0_0_4px_rgba(0,81,255,0.3)] transition-all duration-300 pointer-events-none"
            style={{
              top: position.top - 6,
              left: position.left - 6,
              width: position.width + 12,
              height: position.height + 12,
            }}
          />
        )}
      </div>

      <div
        className={`fixed z-[101] transition-all duration-300 ${
          isCenter
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : ""
        }`}
        style={
          !isCenter
            ? {
                top: position.top + position.height + 16,
                left: Math.max(16, Math.min(position.left + position.width / 2 - 180, window.innerWidth - 376)),
              }
            : {}
        }
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[360px] max-w-[calc(100vw-32px)]">
          <div className="p-5">
            {isCenter && (
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                {current.icon}
              </div>
            )}
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Paso {step + 1} de {STEPS.length}
              </span>
              <span className="text-[11px] text-gray-300">{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-[#0051FF] rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">{current.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{current.desc}</p>
          </div>
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
            <button
              onClick={handleSkip}
              className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors px-2 py-1"
            >
              {isLast ? "Cerrar" : "Saltar tutorial"}
            </button>
            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-4 py-1.5 text-xs font-medium text-white bg-[#0051FF] hover:bg-[#0040cc] rounded-lg transition-colors shadow-sm"
              >
                {isLast ? "Finalizar" : isFirst ? "Comenzar" : "Siguiente"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
