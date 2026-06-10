"use client"

import { Suspense, useEffect, useState, useContext } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Context } from "@/app/context/GlobalContext"
import Link from "next/link"

function PaymentSuccessContent() {
  const { state } = useContext(Context)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState("loading")
  const [errorMsg, setErrorMsg] = useState("")

  const user = state?.user

  useEffect(() => {
    if (!state?.isLoading && !user) {
      router.push("/login?redirect=/payment/success")
      return
    }
    if (!user) return

    const preapprovalId = searchParams.get("preapproval_id")
    const externalRef = searchParams.get("external_reference")
    const paymentStatus = searchParams.get("status")

    if (paymentStatus === "success" || paymentStatus === "authorized") {
      fetch("/api/tools/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: externalRef || user.id,
          email: user.email,
          preapproval_id: preapprovalId,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            setStatus("success")
          } else {
            setStatus("error")
            setErrorMsg("Error al activar la suscripción.")
          }
        })
        .catch(() => {
          setStatus("error")
          setErrorMsg("Error de conexión al activar la suscripción.")
        })
    } else if (paymentStatus === "failure" || paymentStatus === "cancelled") {
      setStatus("error")
      setErrorMsg("El pago fue cancelado o rechazado.")
    } else {
      setStatus("error")
      setErrorMsg("Estado de pago desconocido.")
    }
  }, [state?.isLoading, user, searchParams, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-[#0051FF] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-gray-500">Procesando tu pago...</p>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Algo salió mal</h1>
          <p className="text-sm text-gray-500 mb-6">{errorMsg || "No se pudo procesar el pago."}</p>
          <Link
            href="/landing"
            className="inline-flex items-center px-6 py-3 bg-[#0051FF] text-white text-sm font-medium rounded-lg hover:bg-[#0040cc] transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">¡Suscripción activada!</h1>
        <p className="text-sm text-gray-500 mb-2">
          Ya tenés acceso al <strong>Sistema de Seguimiento de Leads</strong>.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          El pago de $2.500 ARS/mes se debitará automáticamente. Podés cancelar cuando quieras.
        </p>
        <Link
          href="/user?section=servicios"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0051FF] text-white text-sm font-medium rounded-lg hover:bg-[#0040cc] transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Ir a Mis Servicios
        </Link>
      </div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-[#0051FF] border-t-transparent rounded-full" /></div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
