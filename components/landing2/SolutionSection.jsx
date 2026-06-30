"use client"

import { Zap } from "lucide-react"
import CTAButtonNeon from "./CTAButtonNeon"

export default function SolutionSection({ onSubscribe }) {
  const solutions = [
    {
      number: "01",
      title: "Dashboard de contactos",
      description: "Agregá contactos de forma rápida, manualmente o importando archivos CSV y Excel.",
      icon: "📋",
    },
    {
      number: "02",
      title: "Fechas en piloto automático",
      description: "El sistema calcula automáticamente la próxima fecha de contacto según la clasificación del lead, personalizable si lo necesitas.",
      icon: "🤖",
    },
    {
      number: "03",
      title: "Clasificación inteligente",
      description: "Clasificá cada lead como Interesado, Potencial cliente, Comprador o No interesado con motivos detallados.",
      icon: "🎯",
    },
    {
      number: "04",
      title: "Estadísticas en tiempo real",
      description: "Ventas por mes, tasa de conversión. Todo medido para que tomes decisiones con datos reales.",
      icon: "📈",
    },
    {
      number: "05",
      title: "Recordatorios automáticos",
      description: "Alarmas visuales y en tu teléfono para que sepas cuándo volver a contactar a cada lead.",
      icon: "⏰",
    },
  ]

  return (
    <section id="solucion" className="section-dark py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: "'Schibsted Grotesk', sans-serif", color: "#FFFFFF" }}>
            La Solución
          </h2>
          <p className="text-center text-[#B0B5BB] text-lg mb-16" style={{ fontFamily: "'Lato', sans-serif" }}>
            Todo lo que necesitás para hacer un seguimiento profesional de tus leads:
          </p>

          <div className="space-y-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="section-dark-card p-8 rounded-lg border border-[#2A3035] hover:border-[#00F74C] transition-all group"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[rgba(0,247,76,0.1)] border border-[#00F74C] text-2xl group-hover:shadow-lg group-hover:shadow-[#00F74C]/50 transition-all">
                      {solution.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[#00F74C] mb-2" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                          {solution.title}
                        </h3>
                        <p className="text-[#B0B5BB]" style={{ fontFamily: "'Lato', sans-serif" }}>
                          {solution.description}
                        </p>
                      </div>
                      <span className="text-3xl font-bold text-[#05D766] opacity-20" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                        {solution.number}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <CTAButtonNeon text="Suscribirme Ahora" size="lg" icon={<Zap className="w-6 h-6" />} onClick={onSubscribe} className="!text-2xl !px-12 !py-6 !rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
