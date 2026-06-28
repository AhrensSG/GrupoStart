"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import CTAButtonNeon from "./CTAButtonNeon"

export default function Header({ onSubscribe }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Problema", href: "#problema" },
    { label: "Solución", href: "#solucion" },
    { label: "Precios", href: "#precios" },
  ]

  return (
    <header className="sticky top-0 z-40 bg-[#050807] border-b-2 border-dashed border-[#00F74C] shadow-lg shadow-[#00F74C]/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00F74C] to-[#05D766] rounded-lg flex items-center justify-center shadow-lg shadow-[#00F74C]/50">
            <span className="text-[#050807] font-bold text-lg" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
              GS
            </span>
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

        <div className="hidden md:block">
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
  )
}
