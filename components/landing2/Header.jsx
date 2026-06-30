"use client"

import { Menu, X, Timer } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import CTAButtonNeon from "./CTAButtonNeon"

export default function Header({ onSubscribe }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Problema", href: "#problema" },
    { label: "Solución", href: "#solucion" },
    { label: "Precios", href: "#precios" },
  ]

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-[#0F1512] via-[#0a1a0e] to-[#0F1512] border-b-2 border-[#00F74C]/30 px-4 py-2.5">
        <div className="container mx-auto flex items-center justify-center gap-3">
          <Timer className="w-5 h-5 text-[#00F74C] animate-pulse drop-shadow-[0_0_4px_#00F74C]" />
          <span className="text-white text-sm sm:text-base font-bold tracking-wide" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
            La oferta termina en:
          </span>
          <span
            className="text-[#00F74C] font-black text-lg sm:text-xl tabular-nums tracking-widest drop-shadow-[0_0_6px_#00F74C]"
            style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}
          >
            {timeString}
          </span>
          <span className="text-[#00F74C]/70 text-xs sm:text-sm font-bold ml-1 hidden sm:inline" style={{ fontFamily: "'Lato', sans-serif" }}>
            ⏳ El precio aumentará
          </span>
        </div>
      </div>

      <header className="bg-[#050807] border-b-2 border-dashed border-[#00F74C] shadow-lg shadow-[#00F74C]/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <Image src="/logoverde.png" alt="GrupoStart" width={40} height={40} className="object-contain drop-shadow-[0_0_6px_#00F74C]" />
            </div>
            <span className="font-bold text-xl text-[#00F74C] hidden sm:inline" style={{ fontFamily: "'Schibsted Grotesk', sans-serif", fontWeight: 800 }}>
              Grupo <span className="text-[#05D766]">Start</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[#B0B5BB] hover:text-[#00F74C] font-semibold transition-colors text-sm"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <div className="text-[#B0B5BB] text-xs line-through" style={{ fontFamily: "'Lato', sans-serif" }}>
                $15000/mes
              </div>
              <div className="text-[#00F74C] font-black text-lg" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                $2500<span className="text-sm font-semibold text-[#B0B5BB]">/mes</span>
              </div>
            </div>
            <CTAButtonNeon text="Comenzar Ahora" size="md" onClick={onSubscribe} />
          </div>

          <button
            className="md:hidden p-2 hover:bg-[#0F1512] rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-[#00F74C]" /> : <Menu className="w-6 h-6 text-[#00F74C]" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-dashed border-[#00F74C] bg-[#050807]">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[#B0B5BB] hover:text-[#00F74C] font-medium transition-colors py-2"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <CTAButtonNeon text="Comenzar Ahora" size="md" className="w-full" onClick={onSubscribe} />
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}
