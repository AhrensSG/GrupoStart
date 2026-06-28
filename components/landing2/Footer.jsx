export default function Footer() {
  return (
    <footer className="section-dark border-t-2 border-dashed border-[#00F74C] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00F74C] to-[#05D766] rounded-lg flex items-center justify-center">
                  <span className="text-[#050807] font-bold" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                    GS
                  </span>
                </div>
                <span className="font-bold text-[#00F74C]" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                  Grupo Start
                </span>
              </div>
              <p className="text-[#B0B5BB] text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
                Sistema de Seguimiento de Leads. Gestioná tus contactos de forma profesional y no pierdas ninguna venta.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#00F74C] mb-4" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                Enlaces
              </h3>
              <ul className="space-y-2 text-[#B0B5BB]" style={{ fontFamily: "'Lato', sans-serif" }}>
                <li><a href="#inicio" className="hover:text-[#00F74C] transition-colors">Inicio</a></li>
                <li><a href="#problema" className="hover:text-[#00F74C] transition-colors">Problema</a></li>
                <li><a href="#solucion" className="hover:text-[#00F74C] transition-colors">Solución</a></li>
                <li><a href="#precios" className="hover:text-[#00F74C] transition-colors">Precios</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#00F74C] mb-4" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                Legal
              </h3>
              <ul className="space-y-2 text-[#B0B5BB]" style={{ fontFamily: "'Lato', sans-serif" }}>
                <li><a href="#" className="hover:text-[#00F74C] transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-[#00F74C] transition-colors">Términos y Condiciones</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#2A3035] pt-8">
            <p className="text-center text-[#4A5157] text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
              © {new Date().getFullYear()} Grupo Start. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
