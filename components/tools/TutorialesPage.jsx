"use client"

import Link from "next/link"

const STEPS = [
  {
    title: "Agregar un contacto",
    desc: "Hacé clic en el botón naranja \"+Agregar\" en la barra superior. Se abrirá un modal donde podés registrar los datos del cliente: nombre, celular, email, red social y el número de contacto, por defecto este será \"1\" pero si se trata de un contacto al que le estuviste haciendo seguimiento fuera de la planilla podés asignar otro número de ronda, por ejemplo si es tu tercer contacto con él asignale el \"3\". En la planilla te mostraremos los seguimientos desde el número asignado.",
    img: "add",
  },
  {
    title: "Importar",
    desc: "Usá esta alternativa de carga si ya tenés tus contactos en un archivo de excel (.xlsx), sin embargo para que esta herramienta funcione la planilla debe tener una estructura específica, usá las que te brindamos para que la herramienta no falle.",
    img: "import",
  },
  {
    title: "Configuración del perfil",
    desc: "Usá la herramienta de configuración para darle personalidad a la planilla, desde este apartado podrás cargar el nombre de tu empresa, cargar tu logo (no debe pesar más de 500 kb), configurar tu horario laboral (usalo para que te demos alertas en esa franja elegida) y cargá tu número de teléfono para recibir alertas por WhatsApp.",
    img: "profile",
  },
  {
    title: "Clasificar un contacto",
    desc: "En cada ronda de seguimiento, seleccioná el estado del cliente: Interesado, Potencial cliente, Comprador, No interesado, No hubo respuesta. Esta clasificación es clave para activar las siguientes fechas de re-contacto (ya que el sistema toma por defecto la fecha del día en el que realizaste una clasificación en la planilla) y el panel de estadísticas.",
    img: "classify",
  },
  {
    title: "Próx. contacto y hora",
    desc: "El sistema asigna automáticamente la próxima fecha de contacto según la clasificación de acuerdo a criterios pre-establecidos pero podés modificarla manualmente. El campo \"Hora\" usalo si pactaste una hora de re-contacto específica con el lead, si este campo no es rellenado el sistema te dará los recordatorios de acuerdo a los siguientes criterios: 1 - Hora de tu inicio de jornada laboral + 30 minutos. 2 - Si no completaste los campos de jornada laboral por defecto te avisaremos a las 10:00 am.",
    img: "followup",
  },
  {
    title: "Buscar y filtrar contactos",
    desc: "Usá la barra de búsqueda para encontrar contactos por nombre, celular o email. Activá los filtros para ver por clasificación, período, cantidad de gestiones y ordenar por próx. contacto, también podés visualizar tu lista por orden alfabético o por fecha de carga, sin embargo siempre verás primeros independientemente de la clasificación que elijas a los contactos \"fijados\".",
    img: "filter",
  },
  {
    title: "Pestañas",
    desc: "1 - Contactos: Úsala para regresar a tu lista de contactos cuando estés fuera de ella. 2 - Estadísticas: Esta interfaz te mostrará de forma gráfica distintas métricas importantes de tus contactos. 3 - Tutoriales: Si tenés dudas sobre cómo usar tu planilla siempre podrás consultar las guías de uso: aquí podrás reactivar el \"recorrido de uso\", ver la guía en \"texto\" o el tutorial en \"video\". 4 - Copys: Desde ahí podrás inspirarte para la redacción de los mensajes de re-contacto a tus leads. 5 - Perfil: Te llevará a tu perfil general, allí podrás completar información detallada de tu empresa. 6 - Papelera: Desde ahí podrás gestionar tus eliminados y reincorporarlos a la lista general si lo deseas.",
    img: "tabs",
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
                  <div className="mt-3 bg-gray-50 rounded-xl border border-gray-200 p-0 overflow-hidden">
                    <DemoImage type={step.img} />
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
    add: "/tutoriales/1 - agregar contacto.jpg",
    import: "/tutoriales/2 - importar.jpg",
    profile: "/tutoriales/3 - Configuraciones.jpg",
    classify: "/tutoriales/4 - clasificar.jpg",
    followup: "/tutoriales/5 - dia y hora.jpg",
    filter: "/tutoriales/6 - buscar.jpg",
    tabs: "/tutoriales/7 - pestañas.jpg",
  }
  const src = images[type]
  if (!src) return null
  return (
    <img
      src={src}
      alt={`Imagen tutorial ${type}`}
      className="w-full h-auto rounded-lg shadow-sm border border-gray-200"
    />
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
