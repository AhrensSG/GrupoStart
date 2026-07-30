"use client"

import { useState, useContext, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Context } from "@/app/context/GlobalContext"
import Header from "./Header"
import HeroSection from "./HeroSection"
import ProblemSection from "./ProblemSection"
import CarouselSection from "./CarouselSection"
import SolutionSection from "./SolutionSection"
import CTASection from "./CTASection"
import MobileBottomBar from "./MobileBottomBar"
import Footer from "./Footer"
import SubscribeModal from "@/components/tools/SubscribeModal"

export default function Landing2Page() {
  const { state } = useContext(Context)
  const router = useRouter()
  const searchParams = useSearchParams()
  const subRef = useRef(false)
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)
  const user = state?.user

  const handleSubscribe = () => {
    if (!user) {
      router.push("/login?redirect=" + encodeURIComponent("/sistema-seguimiento-clientes?subscribe=1"))
      return
    }
    setShowSubscribeModal(true)
  }

  useEffect(() => {
    if (searchParams.get("subscribe") === "1" && user && !subRef.current) {
      subRef.current = true
      window.history.replaceState({}, "", window.location.pathname)
      setShowSubscribeModal(true)
    }
  }, [searchParams, user])

  return (
    <div className="min-h-screen bg-[#050807]">
      <Header onSubscribe={handleSubscribe} />
      <HeroSection onSubscribe={handleSubscribe} />
      <ProblemSection onSubscribe={handleSubscribe} />
      <CarouselSection />
      <SolutionSection onSubscribe={handleSubscribe} />
      <CTASection onSubscribe={handleSubscribe} />
      <MobileBottomBar onSubscribe={handleSubscribe} />
      <Footer />
      {showSubscribeModal && (
        <SubscribeModal user={user} onClose={() => setShowSubscribeModal(false)} />
      )}
    </div>
  )
}
