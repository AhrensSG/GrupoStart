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
    <div className="bg-[#FFFFFF] shadow-md rounded-lg py-[10px] px-[30px] border border-gray-300 leading-8">
      <div className="items-center justify-center text-center">
      <span className="text-[24px] font-bold items-center justify-center text-center rounded-medium border rounded-tl-lg rounded-br-lg bg-[#FB8A00] text-white p-2">{title}</span>
      </div>
      <ul className="list-none pl-5 mt-4 mb-4"> {/* Changed list style for spacing */}
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-4">
          <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                  className="mr-2"
                />
            {feature}
            {index === 1 && <span className="feature-spaced" />}
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center pb-[8px]">
        <div className="text-center flex-col justify-center items-center gap-4">
        <span className="text-black-900 line-through font-extrabold text-center justify-center text-[40px]"><s>${price.original}</s></span>
        <br />
        <span className="font-bold text-[#FB8A00] text-center justify-center text-ligth text-[30px]">ahora ${price.discount}</span>
        </div>
      </div>
      <br />
      <div className="static flex flex-static items-end justify-center text-center mb-[5px]">
      <button
        onClick={onButtonClick}
        className="static bottom-5 bg-[#0853FC] hover:bg-blue-700 text-white font-light py-[8px] px-2 rounded-medium border rounded-tl-xl rounded-br-xl text-center items-center justify-center text-3xl"
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
    <div className="p-8 mx-auto static" style={{ background: 'linear-gradient(to bottom, #0853FC, #FFFFFF, #FFFFFF)' }}>
      <div className="items-center justify-center text-center py-12">
      <span className="text-3xl font-bold text-center items-center justify-center mb-8 rounded-medium rounded-tl-xl rounded-br-xl bg-[#FB8A00] text-white py-3 px-[100px]">Elegí tu plan</span>
      </div>
      <div className="grid-container grid grid-cols-3 gap-[74px] px-[185px]">
      <PlanCard
        title="Conexion inicial"
        features={[
        '2 Redes sociales Facebook + Instagram',
        '3 Publicaciones semanales 12 Mensuales',
        '3 Historias semanales 12 Mensuales',
        'Diseño creativo con imágenes del cliente o de internet',
        'Puesta en marcha de campañas publicitarias'
        ]}
        price={{ original: 199900, discount: 179900 }}
        onButtonClick={() => handleBuyNow(2, "Plan Conexion Inicial", 179900)}
        />
        <PlanCard
          title="Social Master"
          className="pb-2"
          features={[
          '3 Redes sociales Facebook + Instagram + Tiktok',
          '5 Publicaciones + historias semanales 20 Mensuales',
          'Diseño creativo con imágenes del cliente o de internet',
          'Puesta en marcha de campañas publicitarias',
          '1 video 30 seg. mensual'
          ]}
          price={{ original: 278900, discount: 258900 }}
          onButtonClick={() => handleBuyNow(3, "Plan Social Master", 258900)}
        />
        <PlanCard
          title="Social Pro"
          features={[
          '3 Redes sociales Facebook + Instagram + Tiktok',
          '8 Publicaciones + historias semanales 32 Mensuales',
          'Diseño creativo con imágenes del cliente o de internet',
          'Puesta en marcha de campañas publicitarias',
          '2 videos 30 seg. mensual',
          ]}
          price={{ original: 399900, discount: 369900 }}
          onButtonClick={() => handleBuyNow(4, "Plan Social Pro", 369900)}
        />
      </div>
    </div>
  );
};

export default DesktopCommunityManagerSection;
