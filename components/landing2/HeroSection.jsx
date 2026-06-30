"use client"

import { Zap } from "lucide-react"
import CTAButtonNeon from "./CTAButtonNeon"

export default function HeroSection({ onSubscribe }) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050807] pt-4"
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#00F74C] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#05D766] rounded-full opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-block bg-[rgba(0,247,76,0.15)] border border-[#00F74C] text-[#00F74C] px-4 py-2 rounded-full font-bold text-sm" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
            🚀 SISTEMA DE SEGUIMIENTO DE LEADS
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ fontFamily: "'Schibsted Grotesk', sans-serif", color: "#FFFFFF" }}>
            El 80% de las ventas ocurren entre el <span className="text-[#00F74C]">3er y 5to contacto</span>
          </h1>

          <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-[#00F74C]/10 border border-[#00F74C]/20">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/QSj4ej5Rc6k?si=x398LqfezOCbIbB_"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <p className="text-xl md:text-2xl text-[#B0B5BB] leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>
            Sentí la tranquilidad de saber que intentaste un seguimiento correcto para cada intención de compra. Automatizado, ordenado y al alcance de un clic.
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

          <div className="pt-12 space-y-4 text-base sm:text-lg text-[#B0B5BB]" style={{ fontFamily: "'Lato', sans-serif" }}>
            <p className="text-xl sm:text-2xl font-black text-[#00F74C]">💰 SOLO $2.500 ARS/MES</p>
            <p className="font-semibold">✓ Dashboard para agregar contactos de forma rápida</p>
            <p className="font-semibold">✓ Fechas en piloto automático basadas en clasificación</p>
            <p className="font-semibold">✓ Estadísticas en tiempo real</p>
            <p className="font-semibold">✓ Podés dar de baja cuando quieras</p>
          </div>
        </div>
      </div>
    </section>
  )
}
