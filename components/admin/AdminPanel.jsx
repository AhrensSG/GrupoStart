"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logOut } from "@/firebase/logOut";
import { toast } from "sonner";
import UsersSection from "./UsersSection";
import SubscriptionsSection from "./SubscriptionsSection";

const NAV_ITEMS = [
  { key: "usuarios", label: "Usuarios", icon: "user" },
  { key: "suscripciones", label: "Suscripciones", icon: "membership" },
];

const ICONS = {
  user: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  membership: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

const AdminPanel = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("usuarios");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(null);
  const router = useRouter();

  const adminUid = user.id;

  const showModal = (message, action) => {
    setModalMessage(message);
    setOnConfirmAction(() => action);
    setModalVisible(true);
  };

  const handleLogout = () => {
    showModal("¿Estás seguro de que deseas cerrar sesión?", async () => {
      await logOut();
      router.push("/login");
    });
  };

  const handleConfirm = () => {
    if (onConfirmAction) onConfirmAction();
    setModalVisible(false);
  };

  const renderSectionContent = () => {
    switch (selectedSection) {
      case "usuarios":
        return <UsersSection adminUid={adminUid} />;
      case "suscripciones":
        return <SubscriptionsSection adminUid={adminUid} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <aside className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
          flex flex-col
        `}>
          <div className="p-5 border-b border-gray-100">
            <Link href="/">
              <Image src="/OrangeLogo.svg" alt="GrupoStart" width={140} height={45} priority className="h-auto" />
            </Link>
          </div>

          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0051FF] to-[#FB8A00] flex items-center justify-center text-white font-bold text-sm">
                {user.name?.[0] || user.email?.[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name || "Administrador"}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setSelectedSection(item.key);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedSection === item.key
                    ? "bg-[#0051FF] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className={selectedSection === item.key ? "text-white" : "text-gray-400"}>
                  {ICONS[item.icon]}
                </span>
                {item.label}
              </button>
            ))}
            <Link
              href="/user"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al panel
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-20 bg-white border-b border-gray-200 lg:hidden">
            <div className="flex items-center justify-between px-4 h-14">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/">
                <Image src="/OrangeLogo.svg" alt="GrupoStart" width={100} height={32} priority />
              </Link>
              <div className="w-9" />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            {renderSectionContent()}
          </main>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {modalVisible && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-700 mb-6">{modalMessage}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setModalVisible(false)} className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancelar
              </button>
              <button onClick={handleConfirm} className="px-5 py-2 text-sm font-medium text-white bg-[#0051FF] rounded-lg hover:bg-[#0040cc] transition-colors">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
