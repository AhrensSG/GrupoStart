"use client"
import { useState } from "react";
import Modal from "./Modal";

export default function CompanySection({ userData, handleInputChange, setUserData, handleCancelEdit, handleSaveChanges }) {
  const [isEditing, setIsEditing] = useState(false);

  const BASIC_FIELDS = [
    { name: "nombreDeEmpresa", label: "Nombre de la empresa", colSpan: 2 },
    { name: "rubro", label: "Rubro", colSpan: 1 },
    { name: "celularEmpresa", label: "Celular", colSpan: 1 },
    { name: "direccionEmpresa", label: "Dirección", colSpan: 1 },
    { name: "alturaEmpresa", label: "Altura", colSpan: 1 },
    { name: "deptoEmpresa", label: "Departamento (opcional)", colSpan: 1 },
  ];

  const SOCIAL_FIELDS = [
    { name: "facebookEmpresa", label: "Facebook" },
    { name: "instagramEmpresa", label: "Instagram" },
    { name: "tiktokEmpresa", label: "TikTok" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#FB8A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Datos de la empresa</h3>
            <p className="text-xs text-gray-400">Información de tu negocio</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-2 rounded-lg transition-colors ${isEditing ? "bg-[#0051FF] text-white" : "text-gray-400 hover:text-[#0051FF] hover:bg-blue-50"}`}
          title={isEditing ? "Cancelar edición" : "Editar"}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BASIC_FIELDS.map((field) => (
          <div key={field.name} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={userData[field.name] || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                isEditing
                  ? "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"
                  : "border-transparent bg-gray-50 text-gray-600 cursor-default"
              }`}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Rango de edades de clientes</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Mín"
              value={userData.edadesEmpresa.min}
              onChange={(e) => setUserData({ ...userData, edadesEmpresa: { ...userData.edadesEmpresa, min: e.target.value } })}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                isEditing
                  ? "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"
                  : "border-transparent bg-gray-50 text-gray-600 cursor-default"
              }`}
            />
            <span className="text-sm text-gray-400">a</span>
            <input
              type="number"
              placeholder="Máx"
              value={userData.edadesEmpresa.max}
              onChange={(e) => setUserData({ ...userData, edadesEmpresa: { ...userData.edadesEmpresa, max: e.target.value } })}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                isEditing
                  ? "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"
                  : "border-transparent bg-gray-50 text-gray-600 cursor-default"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Redes sociales</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOCIAL_FIELDS.map((field) => (
            <div key={field.name}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={userData[field.name] || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                  isEditing
                    ? "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"
                    : "border-transparent bg-gray-50 text-gray-600 cursor-default"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Horario de atención</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Mañana</label>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={userData.horarioAtencion.manana.apertura}
                onChange={(e) => setUserData({ ...userData, horarioAtencion: { ...userData.horarioAtencion, manana: { ...userData.horarioAtencion.manana, apertura: e.target.value } } })}
                readOnly={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                  isEditing
                    ? "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"
                    : "border-transparent bg-gray-50 text-gray-600 cursor-default"
                }`}
              />
              <span className="text-sm text-gray-400">a</span>
              <input
                type="time"
                value={userData.horarioAtencion.manana.cierre}
                onChange={(e) => setUserData({ ...userData, horarioAtencion: { ...userData.horarioAtencion, manana: { ...userData.horarioAtencion.manana, cierre: e.target.value } } })}
                readOnly={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                  isEditing
                    ? "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"
                    : "border-transparent bg-gray-50 text-gray-600 cursor-default"
                }`}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tarde</label>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={userData.horarioAtencion.tarde.apertura}
                onChange={(e) => setUserData({ ...userData, horarioAtencion: { ...userData.horarioAtencion, tarde: { ...userData.horarioAtencion.tarde, apertura: e.target.value } } })}
                readOnly={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                  isEditing
                    ? "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"
                    : "border-transparent bg-gray-50 text-gray-600 cursor-default"
                }`}
              />
              <span className="text-sm text-gray-400">a</span>
              <input
                type="time"
                value={userData.horarioAtencion.tarde.cierre}
                onChange={(e) => setUserData({ ...userData, horarioAtencion: { ...userData.horarioAtencion, tarde: { ...userData.horarioAtencion.tarde, cierre: e.target.value } } })}
                readOnly={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                  isEditing
                    ? "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0051FF]/20 focus:border-[#0051FF]"
                    : "border-transparent bg-gray-50 text-gray-600 cursor-default"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Modal
            handleCancelEdit={() => {
              setIsEditing(false);
              handleCancelEdit();
            }}
            handleSaveChanges={async () => {
              const ok = await handleSaveChanges("company");
              if (ok) setIsEditing(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
