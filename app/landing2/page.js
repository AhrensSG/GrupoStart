import Landing2Page from "@/components/landing2/Landing2Page"
import { Suspense } from "react"

export const metadata = {
  title: "Sistema de Seguimiento de Leads | GrupoStart",
  description: "Sistema de seguimiento de leads automatizado",
}

export default function Landing2() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050807]" />}>
      <Landing2Page />
    </Suspense>
  )
}
