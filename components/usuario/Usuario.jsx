"use client";
import React, { useState, useCallback, useRef } from "react";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Usuario = ({ data }) => {
    const [selectedSection, setSelectedSection] = useState("perfil");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    // Crear referencias para cada seccion
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

    // Maneja cambios en los inputs del formulario de usuario
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    }, []);

    const showModal = (message, action) => {
        setModalMessage(message);
        setOnConfirmAction(() => action);
        setModalVisible(true);
    };

    // Validación del formulario antes de guardar cambios
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
                    // Simulación de llamada a la API
                    const response = await axios.put("/api/routes/users", {
                        id: userData.id,
                        name: userData.nombres,
                        surname: userData.apellido,
                        email: userData.email,
                        birthday: userData.fechaNacimiento,
                        country: userData.pais,
                        phone: userData.celular,
                    });
                } else if (type === "company") {
                    // Simulación de llamada a la API
                    if (data.Company !== null) {
                        const response = await axios.put(
                            "/api/routes/company",
                            {
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
                                morningOpeningTime:
                                    userData.horarioAtencion.manana.apertura,
                                morningClosingTime:
                                    userData.horarioAtencion.manana.cierre,
                                afternoonOpeningTime:
                                    userData.horarioAtencion.tarde.apertura,
                                afternoonClosingTime:
                                    userData.horarioAtencion.tarde.cierre,
                                id: data.Company.id,
                            }
                        );
                    } else {
                        const response = await axios.post(
                            "/api/routes/company",
                            {
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
                                morningOpeningTime:
                                    userData.horarioAtencion.manana.apertura,
                                morningClosingTime:
                                    userData.horarioAtencion.manana.cierre,
                                afternoonOpeningTime:
                                    userData.horarioAtencion.tarde.apertura,
                                afternoonClosingTime:
                                    userData.horarioAtencion.tarde.cierre,
                            }
                        );
                    }
                }
                setOriginalData({ ...userData });
                showModal("Cambios guardados exitosamente.");
                return true;
            } catch (error) {
                console.log(error);
                showModal("Error al guardar los cambios. Inténtalo de nuevo.");
                return false;
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
        if (onConfirmAction) {
            onConfirmAction(); // Ejecuta la acción pasada al modal
        }
        setModalVisible(false); // Cierra el modal
    }, [onConfirmAction]);

    const handleCancel = () => {
        setModalVisible(false); // Cierra el modal
    };

    const renderSectionContent = () => {
        switch (selectedSection) {
            case "perfil":
                return (
                    <section
                        ref={perfilRef}
                        className="w-full md:flex-row xs:flex-col max-xs:flex-col space-y-6"
                        id="dataUserAndCompany"
                    >
                        <h2 className="text-2xl text-orange-500 font-bold">
                            Mi Perfil
                        </h2>
                        <div className="flex md:flex-row xs:flex-col max-xs:flex-col md:space-x-4">
                            {/* Tarjeta de Datos Personales */}

                            <UserForm
                                isEditing={isEditing}
                                userData={userData}
                                handleInputChange={handleInputChange}
                                handleCancelEdit={handleCancelEdit}
                                handleSaveChanges={handleSaveChanges}
                            />

                            {/* Tarjeta de Datos de la Empresa */}
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
        <main className="relative flex flex-col md:flex-row w-full h-full bg-[#0853FC]">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/login/Slogo.png"
                    alt="S Logo"
                    fill
                    className="object-cover opacity-50"
                />
            </div>

            {/* Botón para abrir el menú en móvil */}
            <button
                className={`absolute top-4 left-4 z-30 md:hidden ${
                    sidebarOpen ? "" : "bg-white shadow-lg"
                } p-2 rounded-full`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? "✖" : "☰"}
            </button>

            {/* SIDEBAR */}
            <aside
                className={`md:sticky fixed w-4/5 md:w-1/5 z-20 top-0 h-full md:h-screen bg-gradient-to-r from-black/10 to-transparent p-4 transform ${
                    sidebarOpen ? "translate-x-0 bg-white" : "-translate-x-full"
                } transition-transform md:translate-x-0`}
            >
                {loading && <div className="loading-indicator">Loading...</div>}

                {/* Navbar */}
                <nav className="my-4">
                    <Link href="/#home">
                        <Image
                            src="/OrangeLogo.svg"
                            alt="Logo"
                            width={140}
                            height={100}
                            priority
                        />
                    </Link>
                </nav>

                {/* Bienvenida */}
                <div className="text-center text-orange-500">
                    <h1 className="text-2xl font-bold">
                        Hola {userData.nombres}, bienvenido
                    </h1>
                    <p className="text-lg">¡Qué bueno verte!</p>
                </div>
                <div
                    className={`${
                        sidebarOpen ? "" : "bg-white"
                    } rounded-lg grid place-items-center w-full`}
                >
                    {/* Menú de navegación */}
                    <ul className="mt-6 w-full text-lg p-2">
                        {[
                            { label: "Mi Perfil", key: "perfil" },
                            { label: "Mis Servicios", key: "servicios" },
                            { label: "Mis Cursos", key: "cursos" },
                            { label: "Mentoría", key: "mentoria" },
                        ].map((item) => (
                            <li
                                key={item.key}
                                className={`p-2 rounded cursor-pointer text-center transition-all ${
                                    selectedSection === item.key
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-gray-300"
                                }`}
                                onClick={() => {
                                    setSelectedSection(item.key);
                                    setSidebarOpen(false);
                                }}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>

                    {/* Información del usuario */}
                    <div className="mt-4 flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            id="User  Icon"
                            width="52"
                            height="52"
                            className="mr-2 mb-5"
                        >
                            <path
                                fill="#ff6800"
                                fillRule="evenodd"
                                d="M3 20C3 16.8289 5.10851 14.1503 8 13.2898V18C8 18.5522 8.44772 19 9 19C11.1785 19 20.9291 19 20.9291 19C20.9758 19.3266 21 19.6604 21 20C21 21.6568 19.6569 23 18 23H6C4.34315 23 3 21.6568 3 20Z"
                                clipRule="evenodd"
                                className="colorc4e6ff svgShape"
                            ></path>
                            <path
                                fill="#0853fc"
                                fillRule="evenodd"
                                d="M12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3ZM7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6Z"
                                clipRule="evenodd"
                                className="color1e93ff svgShape"
                            ></path>
                            <path
                                fill="#0853fc"
                                fillRule="evenodd"
                                d="M3 20C3 16.134 6.13401 13 10 13H14C17.866 13 21 16.134 21 20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20ZM10 15C7.23858 15 5 17.2386 5 20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20C19 17.2386 16.7614 15 14 15H10Z"
                                clipRule="evenodd"
                                className="color024493 svgShape"
                            ></path>
                        </svg>
                        <h2 className="text-lg font-semibold">
                            {userData.nombres} {userData.apellido}
                        </h2>
                    </div>

                    {/* Botón de Cerrar Sesión */}
                    <button
                        onClick={handleLogout}
                        className="py-4 text-red-500 hover:underline flex items-center"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* CONTENT */}
            <div className="w-full md:w-4/5 p-6 space-y-4 z-10">
                {/* Barra de navegación superior */}
                <div className="flex flex-wrap justify-end gap-4">
                    {[
                        { label: "Servicios", href: "/#servicios" },
                        { label: "Nosotros", href: "/about" },
                        { label: "Contacto", href: "/contact" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-orange-500 font-bold text-lg hover:bg-black/10 px-3 py-1 rounded-lg transition-all"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Contenido dinámico */}
                <section>{renderSectionContent()}</section>

                {/* Modal de confirmación */}
                {modalVisible && (
                    <div className="fixed inset-0 bg-orange-200 bg-opacity-70 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 shadow-lg text-center">
                            <p>{modalMessage}</p>
                            <div className="mt-4 flex justify-center gap-4">
                                <button
                                    onClick={handleConfirm}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                >
                                    Confirmar
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

// Guille PropTypes para verificar los tipos de las props y ayudar en la integración con el back
Usuario.propTypes = {
    nombreUser: PropTypes.string.isRequired,
    emailUser: PropTypes.string.isRequired,
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
