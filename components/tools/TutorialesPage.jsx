"use client"

import Link from "next/link"

const STEPS = [
  {
    title: "Agregar un contacto",
    desc: "Hacé clic en el botón naranja \"+ Nuevo contacto\" en la barra superior. Se abre un modal donde podés completar los datos del cliente: nombre, celular, email y red social. También registrás hasta 5 rondas de seguimiento con su clasificación.",
    img: "add",
  },
  {
    title: "Clasificar un contacto",
    desc: "En cada ronda de seguimiento, seleccioná el estado del cliente: Interesado, Potencial cliente, Comprador, No interesado, No hubo respuesta o Pendiente. Esta clasificación es clave para el panel de estadísticas.",
    img: "classify",
  },
  {
    title: "Seguimiento y próx. contacto",
    desc: "El sistema calcula automáticamente la próxima fecha de contacto según la clasificación. Podés modificarla manualmente. Usá el campo \"Hora\" para agendar el recordatorio.",
    img: "followup",
  },
  {
    title: "Buscar y filtrar contactos",
    desc: "Usá la barra de búsqueda para encontrar contactos por nombre, celular o email. Activá los filtros para ver por clasificación, período, cantidad de gestiones y ordenar por próx. contacto.",
    img: "filter",
  },
  {
    title: "Panel de estadísticas",
    desc: "Andá a la sección \"Estadística\" para ver métricas de rendimiento: ventas por mes, tasa de conversión, pipeline, motivos de pérdida y más. Ideal para ajustar tu estrategia comercial.",
    img: "stats",
  },
  {
    title: "Importar contactos",
    desc: "Si ya tenés una base de datos, subí un archivo CSV o Excel desde la pantalla principal. El sistema detecta automáticamente las columnas y crea los contactos con sus rondas.",
    img: "import",
  },
]

const FAQS = [
  {
    q: "¿Cómo edito un contacto después de crearlo?",
    a: "Hacé clic sobre el contacto en la lista. Se expande la vista detallada donde podés modificar clasificación, notas, fechas y más. Los cambios se guardan automáticamente.",
  },
  {
    q: "¿Qué significa cada clasificación?",
    a: "Interesado: mostró interés pero no compró. Potencial cliente: muy cerca de comprar. Comprador: venta concretada. No interesado: rechazó la oferta (con motivo). No hubo respuesta: no contestó. Pendiente: sin gestionar aún.",
  },
  {
    q: "¿Cómo calcula el sistema la próxima fecha?",
    a: "Según la clasificación: Interesado → 5 días hábiles, Potencial cliente → 1 día, No hubo respuesta → 20 días. Para No interesado depende del motivo (económico 60 días, mejor oferta 3 días, etc.).",
  },
  {
    q: "¿Puedo recuperar un cliente marcado como No interesado?",
    a: "Sí. Algunos motivos tienen una próxima fecha calculada (económico, mejor oferta, otras razones). Solo los motivos \"demora al responder\" y \"mala atención\" se marcan como no recuperables.",
  },
  {
    q: "¿Los datos se guardan en mi computadora o en la nube?",
    a: "Todos los datos se guardan en la nube (base de datos remota). Podés acceder desde cualquier dispositivo con tu cuenta de Google.",
  },
]

export default function TutorialesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16 space-y-10">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0051FF]/10 to-[#FB8A00]/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[#0051FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tutoriales</h1>
          <p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
            Aprendé a usar todas las funcionalidades del Sistema de Seguimiento de Leads.
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#0051FF] to-[#3b82f6] rounded-2xl p-6 sm:p-8 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-bold">Video tutorial</h2>
              <p className="text-sm text-blue-100 mt-1">Mirá el video completo para ver el flujo de principio a fin.</p>
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Video tutorial próximamente.") }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0051FF] text-sm font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-sm shrink-0"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Ver video
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Guía paso a paso</h2>
              <p className="text-sm text-gray-400 mt-0.5">Todo lo que necesitás saber para usar la herramienta.</p>
            </div>
            <button
              onClick={() => {
                localStorage.setItem("guidedTutorial", "pending")
                window.location.href = "/tools"
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-[#0051FF] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reactivar tutorial guiado
            </button>
          </div>

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#0051FF] text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  {i < STEPS.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  <div className="mt-3 bg-gray-50 rounded-xl border border-gray-200 p-4 sm:p-6 flex items-center justify-center text-gray-300">
                    <div className="flex flex-col items-center gap-2">
                      <DemoImage type={step.img} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-900">{faq.q}</span>
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-sm text-gray-500 leading-relaxed px-4 pt-3 pb-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DemoImage({ type }) {
  const images = {
    add: (
      <>
        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        <span className="text-xs text-gray-400">Modal de nuevo contacto</span>
      </>
    ),
    classify: (
      <>
        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <span className="text-xs text-gray-400">Selector de clasificación</span>
      </>
    ),
    followup: (
      <>
        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-xs text-gray-400">Calendario de próx. contacto</span>
      </>
    ),
    filter: (
      <>
        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="text-xs text-gray-400">Panel de filtros</span>
      </>
    ),
    stats: (
      <>
        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="text-xs text-gray-400">Gráficos de estadísticas</span>
      </>
    ),
    import: (
      <>
        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
        </svg>
        <span className="text-xs text-gray-400">Subir archivo Excel / CSV</span>
      </>
    ),
  }
  return images[type] || null
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
            <Link href="/tools/estadistica" className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-[#0051FF] hover:bg-blue-50 rounded-lg transition-colors">
              Estadística
            </Link>
            <Link href="/tools/tutoriales" className="px-2.5 py-1.5 text-xs text-white bg-[#0051FF] rounded-lg font-medium">
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
