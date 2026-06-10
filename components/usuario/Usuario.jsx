"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import CompanySection from "./CompanySection";
import UserForm from "./UserForm";
import ServicesSection from "./ServicesSection";
import CoursesSection from "./CoursesSection";
import MentorySection from "./MentorySection";
import axios from "axios";
import { logOut } from "@/firebase/logOut";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const NAV_ITEMS = [
  { key: "perfil", label: "Mi Perfil", icon: "user" },
  { key: "servicios", label: "Mis Servicios", icon: "package" },
  { key: "cursos", label: "Mis Cursos", icon: "book" },
  { key: "mentoria", label: "Mentoría", icon: "star" },
];

const ICONS = {
  user: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  package: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  book: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  star: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
};

const Usuario = ({ data }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "perfil";
  const [selectedSection, setSelectedSection] = useState(section);

  const perfilRef = useRef(null);
  const cursosRef = useRef(null);
  const mentoriaRef = useRef(null);

  const [userData, setUserData] = useState({
    id: data.id,
    nombres: data.name,
    apellido: data.surname,
    email: data.email,
    fechaNacimiento: data.birthday || "",
    pais: data.country || "",
    celular: data.phone || "",
    nombreDeEmpresa: data.Company?.companyName || "",
    rubro: data.Company?.industry || "",
    celularEmpresa: data.Company?.phoneNumber || "",
    direccionEmpresa: data.Company?.address || "",
    alturaEmpresa: data.Company?.buildingNumber || "",
    deptoEmpresa: data.Company?.apartment || "",
    facebookEmpresa: data.Company?.facebookUser || "",
    instagramEmpresa: data.Company?.instagramUser || "",
    tiktokEmpresa: data.Company?.tiktokUser || "",
    competidorEmpresa: data.Company?.directCompetitor || "",
    edadesEmpresa: {
      min: data.Company?.customerAgeRangeMin || "",
      max: data.Company?.customerAgeRangeMax || "",
    },
    horarioAtencion: {
      manana: {
        apertura: data.Company?.morningOpeningTime || "",
        cierre: data.Company?.morningClosingTime || "",
      },
      tarde: {
        apertura: data.Company?.afternoonOpeningTime || "",
        cierre: data.Company?.afternoonClosingTime || "",
      },
    },
  });

  const [originalData, setOriginalData] = useState({ ...userData });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const showModal = (message, action) => {
    setModalMessage(message);
    setOnConfirmAction(() => action);
    setModalVisible(true);
  };

  const validateForm = useCallback(() => {
    if (!userData.nombres || !userData.apellido || !userData.email) {
      toast.info("Por favor, completa todos los campos.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userData.email)) {
      toast.info("Por favor, ingresa un correo electrónico válido.");
      return false;
    }
    return true;
  }, [userData]);

  const handleSaveChanges = useCallback(
    async (type) => {
      if (!validateForm()) return;
      setLoading(true);
      try {
        if (type === "user") {
          await axios.put("/api/routes/users", {
            id: userData.id,
            name: userData.nombres,
            surname: userData.apellido,
            email: userData.email,
            birthday: userData.fechaNacimiento,
            country: userData.pais,
            phone: userData.celular,
          });
        } else if (type === "company") {
          if (data.Company !== null) {
            await axios.put("/api/routes/company", {
              UserId: userData.id,
              companyName: userData.nombreDeEmpresa,
              industry: userData.rubro,
              phoneNumber: userData.celularEmpresa,
              address: userData.direccionEmpresa,
              buildingNumber: userData.alturaEmpresa,
              apartment: userData.deptoEmpresa,
              facebookUser: userData.facebookEmpresa,
              instagramUser: userData.instagramEmpresa,
              tiktokUser: userData.tiktokEmpresa,
              directCompetitor: userData.competidorEmpresa,
              customerAgeRangeMin: userData.edadesEmpresa.min,
              customerAgeRangeMax: userData.edadesEmpresa.max,
              morningOpeningTime: userData.horarioAtencion.manana.apertura,
              morningClosingTime: userData.horarioAtencion.manana.cierre,
              afternoonOpeningTime: userData.horarioAtencion.tarde.apertura,
              afternoonClosingTime: userData.horarioAtencion.tarde.cierre,
              id: data.Company.id,
            });
          } else {
            await axios.post("/api/routes/company", {
              UserId: userData.id,
              companyName: userData.nombreDeEmpresa,
              industry: userData.rubro,
              phoneNumber: userData.celularEmpresa,
              address: userData.direccionEmpresa,
              buildingNumber: userData.alturaEmpresa,
              apartment: userData.deptoEmpresa,
              facebookUser: userData.facebookEmpresa,
              instagramUser: userData.instagramEmpresa,
              tiktokUser: userData.tiktokEmpresa,
              directCompetitor: userData.competidorEmpresa,
              customerAgeRangeMin: userData.edadesEmpresa.min,
              customerAgeRangeMax: userData.edadesEmpresa.max,
              morningOpeningTime: userData.horarioAtencion.manana.apertura,
              morningClosingTime: userData.horarioAtencion.manana.cierre,
              afternoonOpeningTime: userData.horarioAtencion.tarde.apertura,
              afternoonClosingTime: userData.horarioAtencion.tarde.cierre,
            });
          }
        }
        setOriginalData({ ...userData });
        showModal("Cambios guardados exitosamente.");
      } catch (error) {
        console.log(error);
        showModal("Error al guardar los cambios. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    },
    [userData, validateForm]
  );

  const handleCancelEdit = useCallback(() => {
    showModal("¿Deseas eliminar los cambios realizados?", () => {
      setUserData({ ...originalData });
      setIsEditing(false);
    });
  }, [originalData]);

  const handleLogout = useCallback(() => {
    showModal("¿Estás seguro de que deseas cerrar sesión?", async () => {
      await logOut();
      router.push("/login");
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirmAction) onConfirmAction();
    setModalVisible(false);
  }, [onConfirmAction]);

  const handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setSelectedSection(section);
  }, [section]);

  const renderSectionContent = () => {
    switch (selectedSection) {
      case "perfil":
        return (
          <section ref={perfilRef} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
              <p className="text-sm text-gray-400 mt-1">Administrá tu información personal y de tu empresa</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <UserForm
                  isEditing={isEditing}
                  userData={userData}
                  handleInputChange={handleInputChange}
                  handleCancelEdit={handleCancelEdit}
                  handleSaveChanges={handleSaveChanges}
                />
              </div>
              <div className="lg:col-span-3">
                <CompanySection
                  isEditing={isEditing}
                  userData={userData}
                  setIsEditing={setIsEditing}
                  handleInputChange={handleInputChange}
                  setUserData={setUserData}
                  handleCancelEdit={handleCancelEdit}
                  handleSaveChanges={handleSaveChanges}
                />
              </div>
            </div>
          </section>
        );
      case "servicios":
        return <ServicesSection user={data} />;
      case "cursos":
        return <CoursesSection cursosRef={cursosRef} />;
      case "mentoria":
        return <MentorySection mentoriaRef={mentoriaRef} />;
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
                {userData.nombres?.[0]}{userData.apellido?.[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{userData.nombres} {userData.apellido}</p>
                <p className="text-xs text-gray-400 truncate">{userData.email}</p>
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
                  router.push(`/user?section=${item.key}`, { scroll: false });
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

          {loading && (
            <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 flex items-center gap-3 shadow-xl">
                <div className="animate-spin w-5 h-5 border-2 border-[#0051FF] border-t-transparent rounded-full" />
                <span className="text-sm text-gray-600">Guardando...</span>
              </div>
            </div>
          )}

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
              <button onClick={handleCancel} className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
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

Usuario.propTypes = {
  nombreUser: PropTypes.string,
  emailUser: PropTypes.string,
  idUsuario: PropTypes.string,
  apellidoUser: PropTypes.string,
  fechaNacimientoUser: PropTypes.string,
  paisUser: PropTypes.string,
  celularUser: PropTypes.string,
  nombreCompany: PropTypes.string,
  rubroCompany: PropTypes.string,
  celularCompany: PropTypes.string,
  direccionCompany: PropTypes.string,
  alturaCompany: PropTypes.string,
  deptoCompany: PropTypes.string,
  facebookCompany: PropTypes.string,
  instagramCompany: PropTypes.string,
  tiktokCompany: PropTypes.string,
  competidorCompany: PropTypes.string,
};

export default Usuario;
