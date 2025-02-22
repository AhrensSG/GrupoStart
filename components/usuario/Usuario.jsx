"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import CompanySection from "./CompanySection";
import UserForm from "./UserForm";
import ServicesSection from "./ServicesSection";
import CoursesSection from "./CoursesSection";
import MentorySection from "./MentorySection";
import Modal from "./Modal";
import axios from "axios";
import { logOut } from "@/firebase/logOut";
import { useRouter } from "next/navigation";

const Usuario = ({ data }) => {
  const [selectedSection, setSelectedSection] = useState("perfil");
  const router = useRouter()

  // Crear referencias para cada seccion
  const perfilRef = useRef(null);
  const serviciosRef = useRef(null);
  const cursosRef = useRef(null);
  const mentoriaRef = useRef(null);

  //Datos del usuario

  // Estado inicial del usuario, incluye datos de contacto y empresa
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
  const [alert, setAlert] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [planes, setPlanes] = useState([]);
  const [mostrarInfoServices, setMostrarInfoServices] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
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

  // Mostrar alertas temporales para el usuario
  const showAlert = useCallback((message) => {
    setAlert({ visible: true, message });
    setTimeout(() => setAlert({ visible: false, message: "" }), 3000);
  }, []);

  // Validación del formulario antes de guardar cambios
  const validateForm = useCallback(() => {
    if (!userData.nombres || !userData.apellido || !userData.email) {
      showAlert("Por favor, completa todos los campos.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userData.email)) {
      showAlert("Por favor, ingresa un correo electrónico válido.");
      return false;
    }
    return true;
  }, [userData, showAlert]);

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
            const response = await axios.put("/api/routes/company", {
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
            const response = await axios.post("/api/routes/company", {
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

  // Maneja el inicio de edición, restaurando datos originales si es necesario
  const handleEdit = useCallback(() => {
    showModal("¿Estás seguro de que deseas editar tus datos?", () => {
      setUserData({ ...originalData });
      setIsEditing(true);
    });
  }, [originalData]);

  const handleCancelEdit = useCallback(() => {
    showModal("¿Deseas eliminar los cambios realizados?", () => {
      setUserData({ ...originalData });
      setIsEditing(false);
    });
  }, [originalData]);

  const handleLogout = useCallback(() => {
    showModal("¿Estás seguro de que deseas cerrar sesión?", async () => {
      await logOut();
      router.push('/login')
    });
  }, []);

  const toggleInfoServices = (plan) => {
    setPlanSeleccionado(plan);
    setMostrarInfoServices(!mostrarInfoServices);
  };

  // Cambia el color del texto del periodo de contratación
  const periodoContratacion = (periodo) => {
    const colorMap = {
      Anual: "text-green-600",
      Mensual: "text-blue-600",
      Semanal: "text-purple-600",
    };
    return (
      <span className={colorMap[periodo] || "text-gray-600"}>{periodo}</span>
    );
  };

  // Manejo del pago de plan(Guille fijate aqui si paga directo o si agrega al carrito)
  const handlePagar = (plan) => {
    showModal(
      "¿Estás seguro de que deseas pagar por la renovacion del plan " +
        plan.nombre +
        "?",
      () => {
        const estado = calcularEstado(plan.vencimiento);
        const importeFinal = estado.mensaje.includes("10%")
          ? plan.importe * 1.1
          : plan.importe;
        alert(`Pagando $${importeFinal.toFixed(2)} por el plan ${plan.nombre}`);
      }
    );
  };

  // Calcula el estado de vencimiento del plan según la fecha de vencimiento
  const calcularEstado = (vencimiento) => {
    const hoy = new Date();
    const diferencia = new Date(vencimiento) - hoy;
    const diasRestantes = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor(
      (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    let mensaje = "";
    let estadoColor = "";

    if (diasRestantes > 7) {
      mensaje = "¡Felicidades! Estás al día";
      estadoColor = "text-green-600";
    } else if (diasRestantes > 3) {
      mensaje = `Estás a ${diasRestantes} días del vencimiento, evita el 10% de interés`;
      estadoColor = "text-yellow-500";
    } else if (diasRestantes > 0) {
      mensaje = `Estás a ${diasRestantes} días del vencimiento, evita el 10% de interés`;
      estadoColor = "text-orange-600";
    } else {
      mensaje = "Tu plan está vencido, pagarás el 10%";
      estadoColor = "text-red-600";
    }
    return { mensaje, estadoColor };
  };

  const handleCambiarPlan = (plan) => {
    showModal(
      "¿Estás seguro de que deseas cambiar al plan " + plan.nombre + "?",
      () => {
        console.log(`Cambiando plan: ${plan.nombre}`);
      }
    );
  };

  const handleClick = () => {
    window.open(
      "https://wa.me/+543704619402?text=¡Hola!%20Me%20gustaría%20tener%20una%20asesoria%20sobre",
      "_blank",
      "noopener noreferrer"
    );
  };

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
            id="dataUserAndCompany">
            <h2 className="text-2xl text-orange-500 font-bold">Mi Perfil</h2>
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
        return (
          <ServicesSection
            planes={planes}
            handleClick={handleClick}
            estado={null}
            periodoContratacion={periodoContratacion}
            handlePagar={handlePagar}
            toggleInfoServices={toggleInfoServices}
          />
        );

      case "cursos":
        return <CoursesSection cursosRef={cursosRef} />;

      case "mentoria":
        return <MentorySection mentoriaRef={mentoriaRef} />;

      default:
        return null;
    }
  };

  return (
    <main className="flex w-full h-full bg-[#0853FC] relative">
      {/* Imagen de fondo usando el componente Image actualizado */}
      <div className="absolute inset-0 w-full full z-0">
        <Image
          src="/login/Slogo.png"
          alt="S Logo"
          fill
          style={{ objectFit: "cover", opacity: 0.5 }}
        />
      </div>
      {/* SIDEBAR */}
      <div className="basis-1/5 z-10 sticky h-screen top-0 flex flex-col justify-start items-center bg-gradient-to-r from-black/10 to-transparent">
        {loading && <div className="loading-indicator">Loading...</div>}
        {/* Navbar */}
        <nav className="grid place-items-center">
          <Link href={"/#home"}>
            <Image
              src="/OrangeLogo.svg"
              alt="Logo"
              width={180}
              height={146}
              priority
            />
          </Link>
        </nav>
        <section className="flex flex-row px-4">
          <div className="justify-start items-center px-2 flex-col">
            <div id="presentacionUser ">
              <h1 className="text-2xl text-orange-500 font-extrabold">
                Hola {userData.nombres}, bienvenido
              </h1>
              <p className="text-xl text-orange-500">¡Qué bueno verte!</p>
            </div>
            <br />
          </div>
        </section>
        <aside className="p-4 w-full grid place-items-center">
          <div className="bg-white rounded-xl p-4 w-full">
            <ul className="flex flex-col justify-center items-start gap-1">
              <li
                className={`p-2 rounded cursor-pointer w-full ${
                  selectedSection === "perfil"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSection("perfil")}>
                Mi Perfil
              </li>
              <li
                className={`p-2 rounded cursor-pointer w-full ${
                  selectedSection === "servicios"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSection("servicios")}>
                Mis Servicios
              </li>
              <li
                className={`p-2 rounded cursor-pointer w-full ${
                  selectedSection === "cursos"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSection("cursos")}>
                Mis Cursos
              </li>
              <li
                className={`p-2 rounded cursor-pointer w-full ${
                  selectedSection === "mentoria"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSection("mentoria")}>
                Mentoría
              </li>
            </ul>

            {/* Información del usuario */}
            <div className="mt-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                id="User  Icon"
                width="52"
                height="52"
                className="mr-2 mb-5">
                <path
                  fill="#ff6800"
                  fillRule="evenodd"
                  d="M3 20C3 16.8289 5.10851 14.1503 8 13.2898V18C8 18.5522 8.44772 19 9 19C11.1785 19 20.9291 19 20.9291 19C20.9758 19.3266 21 19.6604 21 20C21 21.6568 19.6569 23 18 23H6C4.34315 23 3 21.6568 3 20Z"
                  clipRule="evenodd"
                  className="colorc4e6ff svgShape"></path>
                <path
                  fill="#0853fc"
                  fillRule="evenodd"
                  d="M12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3ZM7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6Z"
                  clipRule="evenodd"
                  className="color1e93ff svgShape"></path>
                <path
                  fill="#0853fc"
                  fillRule="evenodd"
                  d="M3 20C3 16.134 6.13401 13 10 13H14C17.866 13 21 16.134 21 20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20ZM10 15C7.23858 15 5 17.2386 5 20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20C19 17.2386 16.7614 15 14 15H10Z"
                  clipRule="evenodd"
                  className="color024493 svgShape"></path>
              </svg>
              <div className="ml-2 xs:flex-col max-xs:flex-row">
                <h3>ID:{""}</h3>
                <h2 className="text-lg font-semibold">
                  {userData.nombres} {userData.apellido}
                </h2>
                <br />
              </div>
            </div>
            <div className="flex justify-center mx-2">
              <button
                onClick={handleLogout}
                className="flex items-center text-red-500 hover:underline rounded-xl hover:border-red-500 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="closeSession"
                  width="42"
                  height="42"
                  className="mr-2">
                  <path
                    fill="#0853fc"
                    d="M22,13.75H16a.75.75,0,0,1,0-1.5h6a.75.75,0,0,1,0,1.5Z"
                    className="color7fbde7 svgShape"></path>
                  <path
                    fill="#0853fc"
                    d="M18,15.75a.744.744,0,0,1-.53-.22l-2-2a.749.749,0,0,1,0-1.06l2-2a.75.75,0,0,1,1.06,1.06L17.061,13l1.469,1.47A.75.75,0,0,1,18,15.75Z"
                    className="color7fbde7 svgShape"></path>
                  <path
                    fill="#ff6800"
                    d="M11,22.273a1.75,1.75,0,0,1-.65-.125h0l-8-3.2a1.744,1.744,0,0,1-1.1-1.625V3.618A1.75,1.75,0,0,1,3.783,2.053l8,4a1.741,1.741,0,0,1,.967,1.565V20.523A1.75,1.75,0,0,1,11,22.273Zm-.093-1.518a.249.249,0,0,0,.233-.025.244.244,0,0,0,.11-.207V7.618a.248.248,0,0,0-.138-.223l-8-4a.239.239,0,0,0-.243.01.244.244,0,0,0-.119.213V17.323a.249.249,0,0,0,.157.232Z"
                    className="color232323 svgShape"></path>
                  <path
                    fill="#ff6800"
                    d="M19 19.75H12a.75.75 0 010-1.5h7a.253.253 0 00.25-.25V17a.75.75 0 011.5 0v1A1.752 1.752 0 0119 19.75zM20 9.75A.75.75 0 0119.25 9V4A.253.253 0 0019 3.75H8a.75.75 0 010-1.5H19A1.752 1.752 0 0120.75 4V9A.75.75 0 0120 9.75z"
                    className="color232323 svgShape"></path>
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>
        </aside>
      </div>
      {/* CONTENT */}
      <div className="basis-4/5 p-10 z-10 space-y-5">
        <div className="p-4 flex justify-end gap-6">
          <Link
            href="#servicios"
            className="text-orange-500 font-bold text-2xl hover:bg-black/10 px-2 py-1 rounded-lg duration-300">
            Servicios
          </Link>
          <Link
            href="#nosotros"
            className="text-orange-500 font-bold text-2xl hover:bg-black/10 px-2 py-1 rounded-lg duration-300">
            Nosotros
          </Link>
          <Link
            href="#contacto"
            className="text-orange-500 font-bold text-2xl hover:bg-black/10 px-2 py-1 rounded-lg duration-300">
            Contacto
          </Link>
        </div>

        <section className="">
          {renderSectionContent()}
          {modalVisible && (
            <div className="fixed inset-0 bg-orange-200 bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 xs:w-1/3 max-xs:w-full shadow-lg text-center">
                <p>{modalMessage}</p>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={handleConfirm}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Confirmar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
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
