"use client";
import React, { useState } from "react";
import Image from "next/image";

const Chat = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    // Redirige al link de WhatsApp con el número y un mensaje personalizado
    window.open(
      "https://wa.me/+543704619402?text=¡Hola!%20Me%20gustaría%20saber%20más%20sobre%20sus%20servicios",
      "_blank",
      "noopener noreferrer"
    );
  };

  const handleButtonClick = () => {
    // Acción del botón secundario superior
    alert("Botón superior presionado");
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-4 right-6 z-10 flex flex-col items-center space-y-4">
        {/* Botón secundario superior flotante */}
        <button
          className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none transition-all duration-300 ease-in-out justify-center"
          onClick={handleButtonClick}
        >
          <Image
            src="./services/flechabotoncarousel.svg" // Ruta del SVG para el botón superior
            alt="OpenChat"
            width={25}
            height={50} // Ajusta el tamaño si es necesario
            className="transform rotate-90 filter invert brightness-0 px-1 py-[-2]"
          />
        </button>
        
        {/* Contenedor para el botón principal y el desplegable */}
        <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Desplegable cuando el usuario pasa el mouse solo sobre el botón principal */}
          {hovered && (
            <div className="absolute left-[-178px] top-1/2 transform -translate-y-1/2 bg-[#FB8A00] text-white px-3 py-1 rounded-tl-lg shadow-lg transition-all duration-300 ease-in-out z-10 mr-[-35px]">
              ¡Chatea con nosotros!
            </div>
          )}

          {/* Botón flotante principal con SVG */}
          <button
            className="bg-orange-500 text-white p-5 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none transition-all duration-300 ease-in-out justify-center relative"
            onClick={handleClick}
          >
            <Image
              src="/icons/chat-icon.svg" // La ruta de tu archivo SVG
              alt="Chat icon"
              width={80}
              height={80} // Ajusta el tamaño si es necesario
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
