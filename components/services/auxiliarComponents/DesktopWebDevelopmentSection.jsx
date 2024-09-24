"use client";

import { Context } from "@/app/context/GlobalContext";
import { addProductToCart } from "@/app/context/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "sonner";

const PlanCard = ({ title, features, price, onButtonClick, buttonLabel = "Contratar", crossedItems = [] }) => {
  return (
    <div className="bg-[#FFFFFF] shadow-md rounded-lg border border-gray-300 leading-8 h-[545px] w-[318px] relative container flex flex-col pb-1">
      {/* Título del plan */}
      <div className="items-center justify-center text-center pt-[29px] pb-[7px]">
        <span className="text-[18px] font-bold items-center justify-center text-center rounded-sm border rounded-tl-xl rounded-br-xl bg-[#FB8A00] text-white p-2 h-[43px] w-[183px]">
          {title}
        </span>
      </div>

      {/* Lista de características */}
      <ul className="list-none pl-[33px] pr-[10px] py-[4px] h-[229px] flex-grow justify-center">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center w-full mb-2">
            <div className="flex-shrink-0 w-[16px] h-[16px] mr-3">
              <Image
                src={crossedItems.includes(index) ? "/services/CrossIcon.svg" : "/services/CheckIcon.svg"}
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
            {price}
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

  const handleBuyNow = async (id, name, price) => {
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

  return (
    <div className="p-8 mx-auto static" style={{ background: '#FFFFFF' }}>
      <div className="items-center justify-center text-center py-12">
        <span className="text-3xl font-bold text-center items-center justify-center mb-8 rounded-medium rounded-tl-xl rounded-br-xl bg-[#0853FC] text-white py-3 px-[100px]">Planes de Identidad</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[74px] px-[0px] md:px-[185px]">
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
          price="$119900"
          onButtonClick={() => handleBuyNow(2, "Plan Identidad Simplificada", 119900)}
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
          price="$179900"
          onButtonClick={() => handleBuyNow(3, "Plan Identidad Standar", 179900)}
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
          onButtonClick={() => handleBuyNow(4, "Plan Identidad Completa", "Pedir Cotización")}
          buttonLabel="Cotizar"
          crossedItems={[]}
        />
      </div>
    </div>
  );
};

export default DesktopWebDevelopmentSection;