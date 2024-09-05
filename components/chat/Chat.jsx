"use client";
import React, { useState } from "react";
import Image from "next/image";

const Chat = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    // Redirige al link de WhatsApp con el número y un mensaje personalizado
    window.open("https://wa.me/+543704619402?text=¡Hola!%20Me%20gustaría%20saber%20más%20sobre%20sus%20servicios", "_blank", "noopener noreferrer");
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className="fixed bottom-4 right-4 z-10 flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Desplegable cuando el usuario pasa el mouse */}
        {hovered && (
          <div className="bg-gray-800 text-white px-3 py-2 rounded-l-lg shadow-lg mr-2 transition-all duration-300 ease-in-out">
            ¡Chatea con nosotros!
          </div>
        )}

         {/* Botón flotante con SVG */}
         <button
          className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none transition-all duration-300 ease-in-out"
          onClick={handleClick}
        >
          <Image
            src="/icons/chat-icon.svg" // La ruta de tu archivo SVG
            alt="Chat icon"
            width={24}
            height={24} // Ajusta el tamaño si es necesario
          />
        </button>
      </div>
    </>
  );
};

export default Chat;