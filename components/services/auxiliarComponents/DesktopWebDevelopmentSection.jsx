"use client";

import { Context } from "@/app/context/GlobalContext";
import { addProductToCart } from "@/app/context/actions";
import Modal from "@/components/login/Modal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const PlanCard = ({ title, features, price, onButtonClick, buttonLabel = "Contratar", crossedItems = [] }) => {
  return (
    <div className="bg-[#FFFFFF] shadow-md rounded-lg border border-gray-300 leading-8 h-[536px] w-[307px] relative container flex flex-col pb-1 sm:h-1/2 sm:w-3/4 md:w-full md:h-full">
      {/* Título del plan */}
      <div className="items-center justify-center text-center pt-[29px] pb-[7px]">
        <span className="text-[18px] font-bold items-center justify-center text-center rounded-sm border rounded-tl-xl rounded-br-xl bg-[#FB8A00] text-white p-2 h-[43px] w-[183px]">
          {title}
        </span>
      </div>

      {/* Lista de características */}
      <ul className="list-none pl-[33px] pr-[10px] pt-[5px] h-[265px] sm:h-1/4 md:h-3/4 flex-grow justify-center">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center w-full mb-2">
            <div className="flex-shrink-0 w-[16px] h-[16px] mr-3">
              <Image
                src={crossedItems.includes(index) ? "/services/IconX.svg" : "/services/CheckIcon.svg"}
                width={16}
                height={16}
                alt={crossedItems.includes(index) ? "crossIcon" : "checkIcon"}
                className="w-full h-full"
              />
            </div>
            <span className="text-left text-xs md:text-sm lg:text-base leading-tight">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center pb-[3px] relative w-full">
        <div className="text-center flex-col justify-center items-center gap-4 relative">
          <span className="text-orange-500 font-bold text-center justify-center text-[32px] w-[128px] h-[40px]">
          {typeof price === 'number' ? `$${price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : price}
          </span>
        </div>
      </div>

      <div className="static flex flex-static items-end justify-center text-center mb-[5px]">
        <button
          onClick={onButtonClick}
          className="static bottom-5 bg-[#0853FC] hover:bg-blue-700 text-white font-light py-[8px] px-2 rounded-medium border rounded-tl-xl rounded-br-xl text-center items-center justify-center text-3xl"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

const DesktopWebDevelopmentSection = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  const handleBuyNow = async (id, name, price) => {
    if (!state.user) {
      setShowLogin(true);
      return toast.info("¡Inicia sesión y continúa!");
    }
    const data = {
      id,
      name,
      description: "Servicio Media",
      price,
      items: 1,
      productType: "pack",
    };
    if (state.cart?.some((prod) => prod.id === id)) {
      toast.info(`Se actualizó el producto en tu carrito!`);
    } else {
      toast.success(`Añadiste ${name} a tu carrito!`);
    }
    await addProductToCart(data, dispatch);
    return router.push("/payment");
  };

  const handleWspClick = () => {
    // Redirige al link de WhatsApp con el número y un mensaje personalizado
    window.open(
      "https://wa.me/+543704619402?text=¡Hola!%20Me%20gustaría%20saber%20más%20sobre%20el%20Plan%20Identidad%20Completa",
      "_blank",
      "noopener noreferrer"
    );
  };

  return (
    <div className="py-8 md:px-[2%] lg:px-[4%] xl:px-[8%] xxl:px-[16%] w-full flex-row relative justify-center" style={{ background: '#FFFFFF' }}>
      {showLogin === true && <Modal setShowLogin={setShowLogin} />}
      <div className="items-center justify-center text-center py-12">
        <span className="text-3xl font-bold text-center items-center justify-center mb-8 rounded-medium rounded-tl-xl rounded-br-xl bg-[#0853FC] text-white py-3 px-[100px]">Planes de Identidad</span>
      </div>
      <div className="grid grid-cols-3 justify-items-center items-center object-center lg:gap-[5%] px-[50%] md:px-0 md:gap-0 flex-row">
        <PlanCard
          title="Identidad Simplificada"
          features={[
            'Creación de logo (icono, inicial o imagen)',
            'Búsqueda y selección de tipografía',
            'Elección de colores corporativos',
            'Manual básico de aprox. 8 páginas',
            'Estudio de competencia',
            'Diseño de mockups, perfil y portada de facebook',
            'Modelado 3D de interiores'
          ]}
          price={119900}
          onButtonClick={() => handleBuyNow(5, "Plan Identidad Simplificada", 119900)}
          crossedItems={[4, 5, 6]}
        />
        <PlanCard
          title="Identidad Standar"
          className="pb-2"
          features={[
            'Creación de logo (icono, inicial o imagen)',
            'Búsqueda y selección de tipografía',
            'Elección de colores corporativos',
            'Manual básico de aprox. 8 páginas',
            'Estudio de competencia',
            'Diseño de mockups, perfil y portada de facebook',
            'Modelado 3D de interiores'
          ]}
          price={179900}
          onButtonClick={() => handleBuyNow(6, "Plan Identidad Standar", 179900)}
          crossedItems={[6]}
        />
        <PlanCard
          title="Identidad Completa"
          features={[
            'Creación de logo (icono, inicial o imagen)',
            'Búsqueda y selección de tipografía',
            'Elección de colores corporativos',
            'Manual básico de aprox. 8 páginas',
            'Estudio de competencia',
            'Diseño de mockups, perfil y portada de facebook',
            'Modelado 3D de interiores'
          ]}
          price="Etapa sujeta a aprobación"
          onButtonClick={() => handleWspClick("Plan Identidad Completa")}
          buttonLabel="Cotizar"
          crossedItems={[]}
        />
      </div>
    </div>
  );
};

export default DesktopWebDevelopmentSection;