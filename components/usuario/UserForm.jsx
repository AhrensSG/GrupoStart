"use client"
import { useState } from "react";
import Modal from "./Modal";

const FIELDS = [
  { name: "nombres", label: "Nombre", type: "text" },
  { name: "apellido", label: "Apellido", type: "text" },
  { name: "email", label: "Correo electrónico", type: "email" },
  { name: "fechaNacimiento", label: "Fecha de nacimiento", type: "date" },
  { name: "pais", label: "País", type: "text" },
  { name: "celular", label: "Celular", type: "tel" },
];

export default function UserForm({ userData, handleInputChange, handleCancelEdit, handleSaveChanges }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#0051FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Datos personales</h3>
            <p className="text-xs text-gray-400">Tu información de contacto</p>
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

      <div className="space-y-4">
        {FIELDS.map((field) => (
          <div key={field.name}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{field.label}</label>
            <input
              type={field.type}
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

      {isEditing && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Modal
            handleCancelEdit={() => {
              setIsEditing(false);
              handleCancelEdit();
            }}
            handleSaveChanges={async () => {
              const ok = await handleSaveChanges("user");
              if (ok) setIsEditing(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
