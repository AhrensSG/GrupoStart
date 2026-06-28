export default function ProblemSection() {
  const problems = [
    {
      title: "Perdés leads valiosos",
      description: "El 48% de las empresas se rinden después del primer mensaje. Dejás dinero sobre la mesa.",
      icon: "❌",
    },
    {
      title: "Sin organización",
      description: "No sabés a quién contactar ni cuándo. Todo se acumula y los clientes se enfrían.",
      icon: "⏱️",
    },
    {
      title: "Sin estadísticas",
      description: "No medís tu rendimiento. No sabés qué funciona y qué no en tu proceso de ventas.",
      icon: "📉",
    },
  ]

  return (
    <section id="problema" className="section-dark py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: "'Schibsted Grotesk', sans-serif", color: "#FFFFFF" }}>
            El Problema
          </h2>
          <p className="text-center text-[#B0B5BB] text-lg mb-16" style={{ fontFamily: "'Lato', sans-serif" }}>
            Si no hacés nada, nada cambia. Estos son los obstáculos que enfrentan la mayoría de los vendedores:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="section-dark-card p-6 rounded-lg border-l-4 border-[#00F74C] hover:shadow-lg hover:shadow-[#00F74C]/30 transition-all"
              >
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#00F74C]" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
                  {problem.title}
                </h3>
                <p className="text-[#B0B5BB]" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
