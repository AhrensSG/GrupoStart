"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">
              GS
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:inline">
              Grupo Start
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#contenido" className="text-gray-700 hover:text-brand-blue font-medium transition-colors">
              Contenido
            </a>
            <a href="#detalles" className="text-gray-700 hover:text-brand-blue font-medium transition-colors">
              Detalles
            </a>
            <a href="#faq" className="text-gray-700 hover:text-brand-blue font-medium transition-colors">
              Preguntas
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="#comprar" className="px-6 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark transition-colors">
              Comprar Ahora
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 space-y-3">
            <a
              href="#contenido"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contenido
            </a>
            <a
              href="#detalles"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Detalles
            </a>
            <a
              href="#faq"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Preguntas
            </a>
            <a href="#comprar" className="w-full block px-4 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark transition-colors text-center">
              Comprar Ahora
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
