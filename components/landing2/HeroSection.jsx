"use client"

import { Zap } from "lucide-react"
import CTAButtonNeon from "./CTAButtonNeon"

export default function HeroSection({ onSubscribe }) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050807] pt-20"
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#00F74C] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#05D766] rounded-full opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block bg-[rgba(0,247,76,0.15)] border border-[#00F74C] text-[#00F74C] px-4 py-2 rounded-full font-bold text-sm" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
            🚀 SISTEMA DE SEGUIMIENTO DE LEADS
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ fontFamily: "'Schibsted Grotesk', sans-serif", color: "#FFFFFF" }}>
            El 80% de las ventas ocurren entre el <span className="text-[#00F74C]">3er y 5to contacto</span>
          </h1>

          <p className="text-xl md:text-2xl text-[#B0B5BB] leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>
            Siente la tranquilidad de saber que intentaste un seguimiento correcto para cada intención de compra. Automatizado, ordenado y al alcance de un clic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <CTAButtonNeon text="Suscribirme Ahora" size="lg" icon={<Zap className="w-5 h-5" />} onClick={onSubscribe} />
            <a
              href="#solucion"
              className="border-2 border-[#B0B5BB] text-[#B0B5BB] hover:border-[#00F74C] hover:text-[#00F74C] font-bold text-lg px-10 py-4 rounded-full transition-all inline-flex items-center justify-center"
              style={{ fontFamily: "'Schibsted Grotesk', sans-serif", fontWeight: 800 }}
            >
              Ver Detalles
            </a>
          </div>

          <div className="pt-12 space-y-3 text-sm text-[#B0B5BB]" style={{ fontFamily: "'Lato', sans-serif" }}>
            <p className="font-semibold">💰 SOLO $2.500 ARS/MES</p>
            <p>✓ Dashboard para agregar contactos de forma rápida</p>
            <p>✓ Fechas en piloto automático basadas en clasificación</p>
            <p>✓ Estadísticas en tiempo real</p>
            <p>✓ Podés dar de baja cuando quieras</p>
          </div>
        </div>
      </div>
    </section>
  )
}
