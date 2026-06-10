"use client"

import { useState, useRef } from "react"

export default function UploadZone({ onFile }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
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
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
        }}
      />
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
    </div>
  )
}
