"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"
import { Context } from "@/app/context/GlobalContext"
import Header from "./Header"
import HeroSection from "./HeroSection"
import ProblemSection from "./ProblemSection"
import SolutionSection from "./SolutionSection"
import CTASection from "./CTASection"
import Footer from "./Footer"

export default function Landing2Page() {
  const { state } = useContext(Context)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const user = state?.user

  const handleSubscribe = async () => {
    if (!user) {
      router.push("/login?redirect=/landing2")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/routes/preapproval/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.id, email: user.email }),
      })
      const data = await res.json()
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        alert("Error al generar la suscripción. Intentalo de nuevo.")
      }
    } catch {
      alert("Error al conectar con el sistema de pagos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050807]">
      <Header onSubscribe={handleSubscribe} />
      <HeroSection onSubscribe={handleSubscribe} />
      <ProblemSection />
      <SolutionSection onSubscribe={handleSubscribe} />
      <CTASection onSubscribe={handleSubscribe} />
      <Footer />
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-[#0F1512] border border-[#00F74C] rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl shadow-[#00F74C]/20">
            <div className="w-12 h-12 border-4 border-[#00F74C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white font-semibold" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>Procesando suscripción...</p>
            <p className="text-[#B0B5BB] text-sm mt-2" style={{ fontFamily: "'Lato', sans-serif" }}>Redirigiendo a Mercado Pago</p>
          </div>
        </div>
      )}
    </div>
  )
}
