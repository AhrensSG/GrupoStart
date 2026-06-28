"use client"

import { Zap } from "lucide-react"
import CTAButtonNeon from "./CTAButtonNeon"

export default function CTASection({ onSubscribe }) {
  return (
    <section id="precios" className="section-dark py-20 md:py-32 border-t-2 border-dashed border-[#00F74C]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Schibsted Grotesk', sans-serif", color: "#FFFFFF" }}>
            Empezá hoy por solo <span className="text-[#00F74C]">$2.500/mes</span>
          </h2>

          <p className="text-lg text-[#B0B5BB]" style={{ fontFamily: "'Lato', sans-serif" }}>
          Un costo ridículamente bajo para tener el control total de tus leads, con recordatorios automáticos, copys sugeridos y estadísticas en tiempo real. Podés dar de baja cuando quieras.
          </p>

          <div className="bg-[#0F1512] border border-[#2A3035] rounded-2xl p-8 max-w-md mx-auto text-left space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#00F74C]" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                $2.500
              </div>
              <p className="text-[#B0B5BB] text-sm mt-1">por mes</p>
            </div>
            <ul className="space-y-3 pt-4 border-t border-[#2A3035]">
              {[
                "Dashboard de contactos ilimitados",
                "Fechas en piloto automático",
                "Estadísticas en tiempo real",
                "Bóveda de copys sugeridos",
                "Recordatorios automáticos",
                "Podés dar de baja cuando quieras",
                "Soporte por email",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#B0B5BB]">
                  <span className="text-[#00F74C] font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <CTAButtonNeon text="Suscribirme Ahora" size="lg" className="w-full" icon={<Zap className="w-5 h-5" />} onClick={onSubscribe} />
            </div>
          </div>

          <p className="text-sm text-[#4A5157] pt-8" style={{ fontFamily: "'Lato', sans-serif" }}>
            *Pago procesado por Mercado Pago. Podés cancelar cuando quieras.
          </p>
        </div>
      </div>
    </section>
  )
}
