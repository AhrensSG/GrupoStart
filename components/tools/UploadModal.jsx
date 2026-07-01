"use client"

import { useState, useRef } from "react"

export default function UploadModal({ onClose, onFile }) {
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  const handleFile = async (file) => {
    setError("")
    setLoading(true)
    try {
      await onFile(file)
      onClose()
    } catch {
      setError("Error al procesar el archivo")
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-3xl max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Importar archivo</h2>
            <p className="text-xs text-gray-400 mt-0.5">Subí un archivo CSV o Excel con tus contactos</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold text-amber-800">Formatos de archivo soportados</p>
            </div>
            <p className="text-xs text-amber-700 mb-3">
              El archivo debe ser <strong>.csv</strong>, <strong>.xlsx</strong> o <strong>.xls</strong>.
              El sistema detecta automáticamente el formato.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const header = ",Nombre,Celular,Email,Red social,Nombre de usuario,1er Contacto · Clasificación,1er Contacto · Fecha,1er Contacto · Estado,1er Contacto · Hora,2do Contacto · Clasificación,2do Contacto · Fecha,2do Contacto · Estado,2do Contacto · Hora,3er Contacto · Clasificación,3er Contacto · Fecha,3er Contacto · Estado,3er Contacto · Hora,4to Contacto · Clasificación,4to Contacto · Fecha,4to Contacto · Estado,4to Contacto · Hora,5to Contacto · Clasificación,5to Contacto · Fecha,5to Contacto · Estado,5to Contacto · Hora"
                  const row = ",Juan Pérez,11 2345-6789,juan@email.com,Instagram,@juanperez,Interesado,15/01/2026,Pidió información,10:30,,,,,,,,,,,,,,,,,,,"
                  const blob = new Blob(["\uFEFF" + header + "\n" + row + "\n"], { type: "text/csv;charset=utf-8" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url; a.download = "plantilla_con_red_social.csv"; a.click()
                  URL.revokeObjectURL(url)
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#0051FF] bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar plantilla con red social
              </button>
              <button
                onClick={() => {
                  const header = ",Nombre,Celular,Email,1er Contacto · Clasificación,1er Contacto · Fecha,1er Contacto · Estado,2do Contacto · Clasificación,2do Contacto · Fecha,2do Contacto · Estado,3er Contacto · Clasificación,3er Contacto · Fecha,3er Contacto · Estado,4to Contacto · Clasificación,4to Contacto · Fecha,4to Contacto · Estado,5to Contacto · Clasificación,5to Contacto · Fecha,5to Contacto · Estado"
                  const row = ",Juan Pérez,11 2345-6789,juan@email.com,Interesado,15/01/2026,Pidió información,,,,,,,,,,,,,,,"
                  const blob = new Blob(["\uFEFF" + header + "\n" + row + "\n"], { type: "text/csv;charset=utf-8" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url; a.download = "plantilla_sin_red_social.csv"; a.click()
                  URL.revokeObjectURL(url)
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#0051FF] bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar plantilla sin red social
              </button>
            </div>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onClick={() => !loading && inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
              dragging
                ? "border-[#0051FF] bg-blue-50"
                : "border-gray-200 bg-white hover:border-[#FB8A00] hover:bg-orange-50"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              disabled={loading}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
              }}
            />
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <svg className="w-8 h-8 animate-spin text-[#0051FF]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-sm text-gray-500">Procesando archivo…</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <svg className={`w-10 h-10 ${dragging ? "text-[#0051FF]" : "text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16V4m0 0L8 8m4-4l4 4m-9 8v2a2 2 0 002 2h6a2 2 0 002-2v-2" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {dragging ? "Soltá el archivo aquí" : "Cargá tu archivo CSV o Excel"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">o hacé clic para seleccionar</p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
