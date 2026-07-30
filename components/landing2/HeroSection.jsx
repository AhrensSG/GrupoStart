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
                src="https://www.youtube.com/embed/ncWCQJLvFJE?si=W6nqQKua5lsGcQDF"
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
            <a
              href="https://wa.me/543704619402?text=Hola%20GrupoStart%2C%20quiero%20consultar%20sobre%20el%20Sistema%20de%20Seguimiento%20de%20Leads"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#00F74C]/50 text-[#00F74C] hover:bg-[#00F74C]/10 font-bold text-lg px-10 py-4 rounded-full transition-all inline-flex items-center justify-center gap-2"
              style={{ fontFamily: "'Schibsted Grotesk', sans-serif", fontWeight: 800 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar
            </a>
          </div>

          <div className="pt-12 space-y-4 text-base sm:text-lg text-[#B0B5BB]" style={{ fontFamily: "'Lato', sans-serif" }}>
            <p className="text-xl sm:text-2xl font-black text-[#00F74C]">💰 <span className="line-through text-[#B0B5BB] text-lg">$15.000</span> POR SOLO $2.500 ARS/MES</p>
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
