"use client";
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import PropTypes from 'prop-types';

const Usuario = ({ 
    nombreUser, 
    email, 
    idUsuario, 
    apellidoUser, 
    fechaNacimientoUser, 
    paisUser, 
    celularUser, 
    nombreCompany,
    rubroCompany,
    celularCompany,
    direccionCompany,
    alturaCompany,
    deptoCompany,
    facebookCompany,
    instagramCompany,
    tiktokCompany,
    competidorCompany,
}) => {
  const [selectedSection, setSelectedSection] = useState("perfil");

  // Crear referencias para cada seccion
  const perfilRef = useRef(null);
  const serviciosRef = useRef(null);
  const cursosRef = useRef(null);
  const mentoriaRef = useRef(null);

  // Estado inicial del usuario, incluye datos de contacto y empresa
  const [userData, setUserData] = useState({
    nombres: nombreUser,
    apellido: apellidoUser,
    email: email,
    fechaNacimiento: fechaNacimientoUser,
    pais: paisUser,
    celular: celularUser,
    nombreDeEmpresa: nombreCompany,
    rubro: rubroCompany,
    celularEmpresa: celularCompany,
    direccionEmpresa: direccionCompany,
    alturaEmpresa: alturaCompany,
    deptoEmpresa: deptoCompany,
    facebookEmpresa: facebookCompany,
    instagramEmpresa: instagramCompany,
    tiktokEmpresa: tiktokCompany,
    competidorEmpresa: competidorCompany,
    edadesEmpresa: {
      min: "",
      max: "",
    },
    horarioAtencion: {
      manana: {
        apertura: "",
        cierre: "",
      },
      tarde: {
        apertura: "",
        cierre: "",
      },
    },
  });

  const [originalData, setOriginalData] = useState({ ...userData });
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [planes, setPlanes] = useState([]);
  const [mostrarInfoServices, setMostrarInfoServices] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
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
    setTimeout(() => setAlert({ visible: false, message: '' }), 3000);
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

  // Guardar cambios de los datos y actualizar el estado original
  const handleSaveChanges = useCallback(async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        // Simulación de llamada a la API
        console.log("Datos guardados:", userData);
        setOriginalData({ ...userData });
        setIsEditing(false);
        showModal("Cambios guardados exitosamente.");
      } catch (error) {
        showModal("Error al guardar los cambios. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  }, [userData, validateForm]);

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
    showModal("¿Estás seguro de que deseas cerrar sesión?", () => {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    });
  }, []);


{/*  // Cargar planes desde el backend al montar el componente
  useEffect(() => {
    const obtenerPlanes = async () => {
      try {
        const response = await fetch('URL_DEL_BACKEND');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setPlanes(data);
      } catch (error) {
        console.error('Error:', error);
        showModal("Error al obtener los datos. Intentando de nuevo...");
        setTimeout(obtenerPlanes, 3000); // Retry cada 3 segundos
      }
    };
    obtenerPlanes();
  }, []);
*/}


  const toggleInfoServices = (plan) => {
    setPlanSeleccionado(plan);
    setMostrarInfoServices(!mostrarInfoServices);
  };

  // Cambia el color del texto del periodo de contratación
  const periodoContratacion = (periodo) => {
    const colorMap = {
      "Anual": "text-green-600",
      "Mensual": "text-blue-600",
      "Semanal": "text-purple-600",
    };
    return <span className={colorMap[periodo] || "text-gray-600"}>{periodo}</span>;
  };


  // Manejo del pago de plan(Guille fijate aqui si paga directo o si agrega al carrito)
  const handlePagar = (plan) => {
    showModal("¿Estás seguro de que deseas pagar por la renovacion del plan " + plan.nombre + "?", () => {
      const estado = calcularEstado(plan.vencimiento);
      const importeFinal = estado.mensaje.includes("10%") ? plan.importe * 1.1 : plan.importe;
      alert(`Pagando $${importeFinal.toFixed(2)} por el plan ${plan.nombre}`);
    });
  };

  // Calcula el estado de vencimiento del plan según la fecha de vencimiento
  const calcularEstado = (vencimiento) => {
    const hoy = new Date();
    const diferencia = new Date(vencimiento) - hoy;
    const diasRestantes = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

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
    showModal("¿Estás seguro de que deseas cambiar al plan " + plan.nombre + "?", () => {
      console.log(`Cambiando plan: ${plan.nombre}`);
    });
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
          <section ref={perfilRef} className="w-full md:flex-row xs:flex-col max-xs:flex-col space-y-6"id="dataUserAndCompany">
            <h2 className="text-2xl text-orange-500 font-bold">Mi Perfil</h2>
            <div className="flex md:flex-row xs:flex-col max-xs:flex-col md:space-x-4">
              {/* Tarjeta de Datos Personales */}
              <div className="bg-white rounded-xl md:w-1/3 xs:w-full max-xs:w-full max-xs:m-1 xs:m-2 md:0 md:min-h-screen xs:h-auto max-xs:h-auto border-black p-3 relative">
                <h3 className="text-xl font-bold text-orange-500">Datos Personales</h3>
                {isEditing ? (
          <div className="xs:space-x-2  max-xs:space-x-0 mt-4">
                            <div className="flex justify-between mt-4">
                  <button className="bg-red-500 text-white xs:p-2 max-xs:p-1 rounded" onClick={handleCancelEdit}>Cancelar</button>
                  <button className="bg-blue-500 text-white xs:p-2 max-xs:p-1 rounded" onClick={handleSaveChanges}>Guardar Cambios</button>
                </div>
          </div>
        ) : (<button className="absolute top-0 right-0 mt-2 mr-2">
                <svg viewBox="0 0 512 512" id="pencil" width={30} height={30} onClick={handleEdit} className="flex flex-row justify-between">
                  <path fill="#0853fc" d="M64 368v80h80l235.727-235.729-79.999-79.998L64 368zm377.602-217.602c8.531-8.531 8.531-21.334 0-29.865l-50.135-50.135c-8.531-8.531-21.334-8.531-29.865 0l-39.468 39.469 79.999 79.998 39.469-39.467z" class="color010101 svgShape"></path>
                </svg>
                </button>
              )}
                <form className="space-y-3">
                  <label className="block">
                    Nombres:
                    <input type="text" name="nombres" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.nombres} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Apellido:
                    <input type="text" name="apellido" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.apellido} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Correo Electrónico Personal:
                    <input type="email" name="email" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.email} onChange={handleInputChange} readOnly />
                  </label>
                  <label className="block">
                    Fecha de Nacimiento:
                    <input type="date" name="fechaNacimiento" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.fechaNacimiento} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    País:
                    <input type="text" name="pais" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.pais} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Número de Celular:
                    <input type="tel" name="celular" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.celular} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                </form>

              </div>

              {/* Tarjeta de Datos de la Empresa */}
              <div className="bg-white rounded-xl md:w-2/3 xs:w-full max-xs:w-full md:min-h-screen xs:h-auto max-xs:h-auto max-xs:m-1 xs:m-2 md:m-0 border-black p-3 relative md:my-2">
                <h3 className="text-xl font-bold text-orange-500">Datos de la Empresa</h3>
                {isEditing ? (
          <div className="space-x-2 mt-4">
                            <div className="flex justify-between mt-4">
                  <button className="bg-red-500 text-white xs:p-2 max-xs:p-1 rounded" onClick={handleCancelEdit}>Cancelar</button>
                  <button className="bg-blue-500 text-white xs:p-2 max-xs:p-1 rounded" onClick={handleSaveChanges}>Guardar Cambios</button>
                </div>
          </div>
        ) : (<button className="absolute top-0 right-0 mt-2 mr-2 p-2">
                <svg viewBox="0 0 512 512" id="pencil" width={30} height={30} onClick={handleEdit}>
                  <path fill="#0853fc" d="M64 368v80h80l235.727-235.729-79.999-79.998L64 368zm377.602-217.602c8.531-8.531 8.531-21.334 0-29.865l-50.135-50.135c-8.531-8.531-21.334-8.531-29.865 0l-39.468 39.469 79.999 79.998 39.469-39.467z" class="color010101 svgShape"></path>
                </svg>
                </button>
              )}
                <form className="grid grid-cols-2 gap-4">
                  <label className="block col-span-2">
                    Nombre de la Empresa:
                    <input type="text" name="nombreDeEmpresa" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.nombreDeEmpresa} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Rubro al que pertenece:
                    <input type="text" name="rubro" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.rubro} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Número de celular:
                    <input type="tel" name="celularEmpresa" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.celularEmpresa} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Dirección:
                    <input type="text" name="direccionEmpresa" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.direccionEmpresa} onChange={handleInputChange} readOnly ={!isEditing} />
                  </label>
                  <label className="block">
                    Altura:
                    <input type="text" name="alturaEmpresa" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.alturaEmpresa} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Departamento (opcional):
                    <input type="text" name="deptoEmpresa" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.deptoEmpresa} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Usuario de Facebook de la Empresa:
                    <input type="text" name="facebookEmpresa" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.facebookEmpresa} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Usuario de Instagram de la Empresa:
                    <input type="text" name="instagramEmpresa" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.instagramEmpresa} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Usuario de TikTok de la Empresa:
                    <input type="text" name="tiktokEmpresa" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.tiktokEmpresa} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Competidor Directo:
                    <input type="text" name="competidorEmpresa" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.competidorEmpresa} onChange={handleInputChange} readOnly={!isEditing} />
                  </label>
                  <label className="block">
                    Rango de edades de clientes:
                    <div className="flex space-x-2">
                      <input type="number" name="edadMin" placeholder="Mín" className="mt-1 py-2 border border-gray-300 rounded w-full" value={userData.edadesEmpresa.min} onChange={(e) => setUserData({ ...userData, edadesEmpresa: { ...userData.edadesEmpresa, min: e.target.value } })} readOnly={!isEditing} />
                      <span> hasta </span>
                      <input type="number" name="edadMax" placeholder="Máx" className="mt-1 py-2 border border-gray-300 rounded w-full" value={userData.edadesEmpresa.max} onChange={(e) => setUserData({ ...userData, edadesEmpresa: { ...userData.edadesEmpresa, max: e.target.value } })} readOnly={!isEditing} />
                    </div>
                  </label>
                  <label className="block">
                    Horario de atención por la mañana:
                    <div className="flex space-x-2">
                      <input type="time" name="horarioAperturaManana" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.horarioAtencion.manana.apertura} onChange={(e) => setUserData({ ...userData, horarioAtencion: { ...userData.horarioAtencion, manana: { ...userData.horarioAtencion.manana, apertura: e.target.value }}})} readOnly={!isEditing} />
                      <span> hasta </span>
                      <input type="time" name="horarioCierreManana" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.horarioAtencion.manana.cierre} onChange={(e) => setUserData({ ...userData, horarioAtencion: { ...userData.horarioAtencion, manana: { ...userData.horarioAtencion.manana, cierre: e.target.value }}})} readOnly={!isEditing} />
                    </div>
                  </label>
                  <label className="block mb-1">
                    Horario de atención por la tarde:
                    <div className="flex space-x-2 mt-2">
                      <input type="time" name="horarioAperturaTarde" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.horarioAtencion.tarde.apertura} onChange={(e) => setUserData({ ...userData, horarioAtencion: { ...userData.horarioAtencion, tarde: { ...userData.horarioAtencion.tarde, apertura: e.target.value }}})} readOnly={!isEditing} />
                      <span> hasta </span>
                      <input type="time" name="horarioCierreTarde" className="mt-1 p-2 border border-gray-300 rounded w-full" value={userData.horarioAtencion.tarde.cierre} onChange={(e) => setUserData({ ...userData, horarioAtencion: { ...userData.horarioAtencion, tarde: { ...userData.horarioAtencion.tarde, cierre: e.target.value }}})} readOnly={!isEditing} />
                    </div>
                  </label>
                </form>
              </div>
            </div>
          </section>
        );

      case "servicios":
        return (
          <section className="w-full flex flex-col space-y-6" id="sectionPlansShow">
                {/* Subtitulo y ChatWsp */}
                <div className="flex justify-between items-center w-full relative">
                  <h2 className="font-bold text-orange-500 text-2xl" id="subMisServicios">Mis Servicios</h2>
                  <div className="flex ml-auto space-x-4" id="actionButtonsServices">
                    <Link href={"/payment"}>
                      <button
                        className="bg-orange-500 text-white p-5 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none transition-all duration-300 ease-in-out w-16 h-16 flex items-center justify-center"
                        aria-label="Ir a la página de pago"
                        title="Ir al carrito"
                      >
                        <Image
                          src="/cartIconUser.png"
                          alt="Icono de carrito"
                          width={35}
                          height={35}
                        />
                      </button>
                    </Link>

                    <button
                      className="bg-orange-500 text-white p-5 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none transition-all duration-300 ease-in-out w-16 h-16 flex items-center justify-center"
                      onClick={handleClick}
                      aria-label="Abrir chat"
                      title="Ir al chat"
                    >
                      <Image
                        src="/imgChatIcon.png"
                        alt="Icono de chat"
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
                <div className="rounded-xl bg-white shadow-lg p-6">
                  <h2 className="text-lg font-bold text-orange-500 justify-start ml-2 my-1">Planes</h2>
                <div className="flex flex-row space-y-4">
                  {/* Render de los planes */}
                  {planes.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-lg shadow-lg p-6 w-full flex-grow">
                      <h2 className="text-lg font-bold text-orange-500">{plan.nombre}</h2>
                      <div className="bg-white rounded-lg shadow-lg p-3 flex items-center justify-between w-full">
                        <div className="flex-grow">
                          <p className="text-gray-500 text-sm">ID: #{plan.id}</p>
                          <p className="text-md text-blue-600 font-bold flex items-center" id="periodContrat">
                            Período: {periodoContratacion(plan.periodo)}  
                          </p>
                          <p className="text-md text-green-600 font-bold flex items-center" id="estatePayPlan">
                          <p className="text-gray-500 text-sm">Estado:</p>
                          <p className={estado.estadoColor}>{estado.mensaje}</p>
                          </p>
                        </div>

                        <div className="flex flex-row justify-center items-center space-x-3 px-2">
                          <div className="text-center flex-1" id="colContratacion">
                            <p className="text-gray-500 text-sm">CONTRATACION</p>
                            <p className="text-lg font-semibold">{plan.contratacion.toLocaleDateString()}</p>
                          </div>
                          <div className="text-center flex-1" id="colVencimiento">
                            <p className="text-red-500 text-sm">VENCIMIENTO</p>
                            <p className="text-lg font-semibold">{plan.vencimiento.toLocaleDateString()}</p>
                          </div>

                          <div className="text-right flex-1" id="colImporte">
                            <p className="text-gray-500 text-sm">IMPORTE</p>
                            <p className="text-lg font-semibold">${Math.round(plan.importe)}</p>
                          </div>
                        </div>

                        <div className="flex flex-col justify-end mt-4 space-x-2 space-y-2">
                          <button className="bg-blue-600 text-white py-1 px-4 rounded-lg" onClick={() => handleCambiarPlan(plan)}>Cambiar plan</button>
                          <button className="bg-green-600 text-white py-1 px-4 rounded-lg" onClick={() => handlePagar(plan)}>Pagar</button>
                        </div>

                        <svg
                          onClick={() => toggleInfoServices(plan)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-info-circle-fill ml-4 cursor-pointer"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="orange"
                            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5 a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                          />
                        </svg>

                        {mostrarInfo && planSeleccionado === plan && (
                          <div className="absolute top-16 right-4 bg-white text-white rounded-lg shadow-lg p-4 w-full max-w-md">
                            <div className="flex justify-between items-center">
                              <h3 className="font-bold text-black">Contenido del plan</h3>
                              <svg
                                onClick={() => toggleInfoServices(plan)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="red"
                                className="bi bi-x-circle cursor-pointer"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-4.5-3.5a.5.5 0 0 0-.707 0L8 8.293 4.207 4.5a.5.5 0 0 0-.707.707L7.293 8l-3.5 3.5a.5.5 0 0 0 .707 .707L8 8.707l3.793 3.793a.5.5 0 0 0 .707-.707L8.707 8l3.5-3.5a.5.5 0 0 0 0-.707z" />
                              </svg>
                            </div>
                            <p className="text-gray-500" id="contenido1Card">{item1.plan}</p>
                            <p className="text-gray-500" id="contenido2Card">{item2.plan}</p>
                            <p className="text-gray-500" id="contenido3Card">{item3.plan}</p>
                            <p className="text-gray-500" id="contenido4Card">{item4.plan}</p>
                            <p className="text-gray-500" id="contenido5Card">{item5.plan}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </section>
        );

      case "cursos":
        return (
          <section ref={cursosRef} className="w-full flex flex-col space-y-6">
            <h2 className="text-orange-500 font-bold text-2xl">Mis Cursos</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-orange-500">Cursos</h2>
              <span className="font-extrabold xs:text-4xl max-xs:text-2xl justify-center items-center text-center">PROXIMAMENTE</span>
            </div>
          </section>
        );

      case "mentoria":
        return (
          <section ref={mentoriaRef} className="w-full flex flex-col space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-orange-500">Mentoría</h2>
              <span className="font-extrabold xs:text-4xl max-xs:text-3xl justify-center items-center text-center">PROXIMAMENTE</span>
            </div>
          </section>
        );

      default:
        return null;
    }
  };


  return (
    <main className="flex flex-col md:min-h-screen w-auto xs:h-auto bg-[#0853FC] px-[2%] relative">
      {/* Imagen de fondo usando el componente Image actualizado */}
      <div className="absolute inset-0 w-full full -z-8">
        <Image 
          src="/login/Slogo.png" 
          alt="S Logo" 
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }} 
        />
      </div>
      {loading && <div className="loading-indicator">Loading...</div>}
      {/* Navbar */}
      <nav className="bg-transparent w-1/4 p-2 z-20">
        <Link href={"/#home"} className="min-w-max">
          <Image src="/OrangeLogo.svg" alt="Logo" width={220} height={161} priority />
        </Link>
      </nav>
      
      {/* Sección Bienvenida al Usuario */}
      <section className="flex flex-row px-4 bg-transparent w-1/2 h-1/2 z-20">
        <div className="justify-start items-center px-2 flex-col">
          <div id="presentacionUser ">
            <h1 className="text-5xl text-orange-500 font-bold">Hola {nombreUser }, bienvenido</h1>
            <p className="text-5xl text-orange-500 font-light">¡Qué bueno verte!</p>
          </div>
          <br />
        </div>
      </section>

      <div className="flex lg:flex-row md:flex-row sm:flex-row xs:flex-col max-xs:flex-col w-full min-h-screen">
        {/* Menú estático en la izquierda */}
        <aside className="sm:w-1/4 max-xs:w-full xs:w-full bg-white rounded-xl p-4 h-full sm:sticky top-0 z-20">
        <ul className="space-y-2 max-xs:grid max-xs:grid-cols-4 xs:grid xs:grid-cols-4 sm:flex-col sm:space-x-0 xs:space-x-0 xs:space-y-0">
              <li
                className={`p-2 rounded cursor-pointer ${
                  selectedSection === "perfil"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSection("perfil")}
              >
                Mi Perfil
              </li>
              <li
                className={`p-2 rounded cursor-pointer ${
                  selectedSection === "servicios"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSection("servicios")}
              >
                Mis Servicios
              </li>
              <li
                className={`p-2 rounded cursor-pointer ${
                  selectedSection === "cursos"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSection("cursos")}
              >
                Mis Cursos
              </li>
              <li
                className={`p-2 rounded cursor-pointer ${
                  selectedSection === "mentoria"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSection("mentoria")}
              >
                Mentoría
              </li>
            </ul>

          {/* Información del usuario */}
          <div className="mt-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="User  Icon" width="52" height="52" className="mr-2 mb-5">
          <path fill="#ff6800" fillRule="evenodd" d="M3 20C3 16.8289 5.10851 14.1503 8 13.2898V18C8 18.5522 8.44772 19 9 19C11.1785 19 20.9291 19 20.9291 19C20.9758 19.3266 21 19.6604 21 20C21 21.6568 19.6569 23 18 23H6C4.34315 23 3 21.6568 3 20Z" clipRule="evenodd" className="colorc4e6ff svgShape"></path>
          <path fill="#0853fc" fillRule="evenodd" d="M12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3ZM7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6Z" clipRule="evenodd" className="color1e93ff svgShape"></path>
          <path fill="#0853fc" fillRule="evenodd" d="M3 20C3 16.134 6.13401 13 10 13H14C17.866 13 21 16.134 21 20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20ZM10 15C7.23858 15 5 17.2386 5 20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20C19 17.2386 16.7614 15 14 15H10Z" clipRule="evenodd" className="color024493 svgShape"></path>
        </svg>
            <div className="ml-2 xs:flex-col max-xs:flex-row">
                <h3>ID:{idUsuario}</h3>
              <h2 className="text-lg font-semibold">{nombreUser } {apellidoUser }</h2>
              <br/>
            </div>
          </div>
            <div className="flex justify-center mx-2">
          <button onClick={handleLogout} className="flex items-center text-red-500 hover:underline rounded-xl hover:border-red-500 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="closeSession"
                width="42" height="42" className="mr-2">
                    <path fill="#0853fc" d="M22,13.75H16a.75.75,0,0,1,0-1.5h6a.75.75,0,0,1,0,1.5Z" className="color7fbde7 svgShape"></path>
                    <path fill="#0853fc" d="M18,15.75a.744.744,0,0,1-.53-.22l-2-2a.749.749,0,0,1,0-1.06l2-2a.75.75,0,0,1,1.06,1.06L17.061,13l1.469,1.47A.75.75,0,0,1,18,15.75Z" className="color7fbde7 svgShape"></path>
                    <path fill="#ff6800" d="M11,22.273a1.75,1.75,0,0,1-.65-.125h0l-8-3.2a1.744,1.744,0,0,1-1.1-1.625V3.618A1.75,1.75,0,0,1,3.783,2.053l8,4a1.741,1.741,0,0,1,.967,1.565V20.523A1.75,1.75,0,0,1,11,22.273Zm-.093-1.518a.249.249,0,0,0,.233-.025.244.244,0,0,0,.11-.207V7.618a.248.248,0,0,0-.138-.223l-8-4a.239.239,0,0,0-.243.01.244.244,0,0,0-.119.213V17.323a.249.249,0,0,0,.157.232Z" className="color232323 svgShape"></path>
                    <path fill="#ff6800" d="M19 19.75H12a.75.75 0 010-1.5h7a.253.253 0 00.25-.25V17a.75.75 0 011.5 0v1A1.752 1.752 0 0119 19.75zM20 9.75A.75.75 0 0119.25 9V4A.253.253 0 0019 3.75H8a.75.75 0 010-1.5H19A1.752 1.752 0 0120.75 4V9A.75.75 0 0120 9.75z" className="color232323 svgShape"></path>
                </svg>
                Cerrar sesión</button>
            </div>
        </aside>

        {/* Sección dinámica */}
        <section className="sm:w-3/4 xs:w-full xs:p-2 max-xs:w-full sm:p-6 max-xs:p-2 space-y-2 z-20">
          {renderSectionContent()}
          {modalVisible && (
  <div className="fixed inset-0 bg-orange-200 bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 xs:w-1/3 max-xs:w-full shadow-lg text-center">
      <p>{modalMessage}</p>
      <div className="mt-4 space-x-2">
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