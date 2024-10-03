"use client";

import { Context } from "@/app/context/GlobalContext";
import { addProductToCart } from "@/app/context/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "sonner";

const PlanCard = ({ title, features, price, onButtonClick }) => {
  return (
    <div className="bg-[#FFFFFF] shadow-md rounded-lg border border-gray-300 leading-8 h-[536px] w-[307px] relative container flex flex-col pb-1 sm:w-3/4">
      {/* Título del plan */}
      <div className="items-center justify-center text-center pt-[29px] pb-[8px]">
        <span className="text-[18px] font-bold items-center justify-center text-center rounded-sm border rounded-tl-xl rounded-br-xl bg-[#FB8A00] text-white p-2 h-[43px] w-[183px]">
          {title}
        </span>
      </div>

          {/* Lista de características */}
        <ul className="list-none pl-[30px] pr-[5px] py-[4px] h-[265px] w-[300px] flex-grow sm:overflow-y-auto justify-items-center lg:h-[300px] lg:w-[330px] sm:w-3/4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center w-full mb-2">
              <div className="flex-shrink-0 w-[16px] h-[16px] mr-3">
                <Image
                  src="/services/CheckIcon.svg"
                  width={16}
                  height={16} // Tamaño fijo de 20px x 20px
                  alt="checkIcon"
                  className="w-full h-full"
                />
              </div>
              <span className="text-left text-xs md:text-sm lg:text-base leading-tight">
              {feature}
              </span>
            </li>
          ))}
        </ul>

      {/* Precios */}
      <div className="flex justify-center items-center pb-[3px] relative w-full">
        <div className="text-center flex-col justify-center items-center gap-4 relative">
          <span className="text-black-900 line-through font-extrabold text-center justify-center text-[32px] w-[206px] h-[64px]">
            <s>${price.original}</s>
          </span>
          <br />
          <span className="font-bold text-[#FB8A00] text-center justify-center text-ligth text-[26px] w-[202px] h-[39px]">
            ahora ${price.discount}
          </span>
        </div>
      </div>

      {/* Botón de contratación */}
      <div className="flex items-end justify-center text-center">
        <button
          onClick={onButtonClick}
          className="bg-[#0853FC] hover:bg-blue-700 text-white font-light py-[8px] px-2 rounded-medium border rounded-tl-xl rounded-br-xl text-center items-center justify-center text-xl h-[43px] w-[132]"
        >
          Contratar
        </button>
      </div>
    </div>
  );
};

const DesktopCommunityManagerSection = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const handleBuyNow = async (id, name, price) => {
    const data = {
      id,
      name,
      description: "Servicio gestion de redes",
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
    <div
      className="py-8 md:px-[2%] lg:px-[4%] xl:px-[8%] xxl:px-[16%] w-full flex-row relative justify-center"
      style={{
        background:
          "linear-gradient(to bottom, #0853FC, #0853FC, #FFFFFF, #FFFFFF)",
      }}
    >
      <div className="items-center justify-center text-center py-[36px] relative px-[20px] md:px-[60px] sm:px-[40px] w-full">
        <h2 className="xs:text-md sm:text-lg md:text-xl lg:text-3xl font-bold text-center items-center justify-center mb-8 rounded-full rounded-tr-xl rounded-bl-xl bg-[#FB8A00] text-white py-3 lg:max-w-[20%] sm:max-w-[30%] md:max-w-[70%] mx-auto">
          Elegí tu plan
        </h2>
      </div>
      {/* Ajustamos el grid para que sea responsive */}
      <div className="grid grid-cols-3 justify-items-center items-center object-center gap-[5%] px-[50%] md:px-0 md:gap-0 flex-row">
        <PlanCard
          title="Conexion inicial"
          features={[
            "2 Redes sociales Facebook + Instagram",
            "3 Publicaciones semanales 12 Mensuales",
            "3 Historias semanales 12 Mensuales",
            "Diseño creativo con imágenes del cliente o de internet",
            "Puesta en marcha de campañas publicitarias",
          ]}
          price={{ original: 199900, discount: 179900 }}
          onButtonClick={() => handleBuyNow(2, "Plan Conexion Inicial", 179900)}
        />
        <PlanCard
          title="Social Master"
          features={[
            "3 Redes sociales Facebook + Instagram + Tiktok",
            "5 Publicaciones + historias semanales 20 Mensuales",
            "Diseño creativo con imágenes del cliente o de internet",
            "Puesta en marcha de campañas publicitarias",
            "1 video 30 seg. mensual",
          ]}
          price={{ original: 278900, discount: 258900 }}
          onButtonClick={() => handleBuyNow(3, "Plan Social Master", 258900)}
        />
        <PlanCard
          title="Social Pro"
          features={[
            "3 Redes sociales Facebook + Instagram + Tiktok",
            "8 Publicaciones + historias semanales 32 Mensuales",
            "Diseño creativo con imágenes del cliente o de internet",
            "Puesta en marcha de campañas publicitarias",
            "2 videos 30 seg. mensual",
          ]}
          price={{ original: 399900, discount: 369900 }}
          onButtonClick={() => handleBuyNow(4, "Plan Social Pro", 369900)}
        />
      </div>
    </div>
  );
};

export default DesktopCommunityManagerSection;
