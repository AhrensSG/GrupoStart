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
    <div className="bg-[#FFFFFF] shadow-md rounded-lg border border-gray-300 leading-8 h-[556px] w-[307px] relative container flex flex-col pb-1">
      <div className="items-center justify-center text-center pt-5 pb-[12px]">
      <span className="text-[24px] font-bold items-center justify-center text-center rounded-medium border rounded-tl-lg rounded-br-lg bg-[#FB8A00] text-white py-2 px-6">{title}</span>
      </div>
      <ul className="list-none pl-[33px] pr-[12px] py-[2px] h-[220px] w-[300px] flex-grow justify-center relative"> {/* Changed list style for spacing */}
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-center justify-center mb-4">
            {feature}
            {index === 1 && <span className="feature-spaced" />}
          </li>
        ))}
      </ul>
      <br />
      <div className="flex items-end justify-center text-center pb-1">
        <button
          onClick={onButtonClick}
          className="bg-[#0853FC] hover:bg-blue-700 text-white font-light py-[8px] px-2 rounded-medium border rounded-tl-xl rounded-br-xl text-center items-center justify-center text-xl h-[43px] w-[132]"
        >
        Comprar
      </button>
      </div>
    </div>
  );
};

const DesktopBrandingSection = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const handleBuyNow = async (id, name, price) => {
    const data = {
      id,
      name,
      description: "Servicio Herramientas Útiles",
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
    <div className="p-8 mx-auto static" style={{ background: '#0853FC' }}>
      <div className="items-center justify-center text-center py-12">
      <span className="text-3xl font-bold text-center items-center justify-center mb-8 rounded-medium rounded-tl-xl rounded-br-xl bg-[#FFFFFF] text-[#FB8A00] py-3 px-[100px]">Packs de tarjetas</span>
      </div>
      <div className="grid-container grid grid-cols-3 gap-[74px] px-[185px]">
      <PlanCard
        title="Pack 1"
        features={[
        'Diseño personalizado: foto, colores, letras y logo',
        'Landing page con descripción de tu negocio, botones de acceso directo a Whatsapp, Google maps y todas tus redes sociales',
        'Posicionamiento SEO en internet',
        '50 tarjetas full color doble face',
        'Suscripción de $500 de mantenimiento mensual a tu landing page'
        ]}
        price={{ original: 0, discount: 0 }}
        onButtonClick={() => handleBuyNow(2, "Plan Pack 1", 0)}
        />
        <PlanCard
          title="Pack 2"
          className="pb-2"
          features={[
          'Diseño personalizado: foto, colores, letras y logo',
          'Landing page con descripción de tu negocio, botones de acceso directo a Whatsapp, Google maps y todas tus redes sociales',
          'Posicionamiento SEO en internet',
          '100 tarjetas full color doble face',
          'Suscripción de $5.000 de mantenimiento anual a tu landing page'
          ]}
          price={{ original: 0, discount: 0 }}
          onButtonClick={() => handleBuyNow(3, "Plan Pack 2", 0)}
        />
        <PlanCard
          title="Pack 3"
          features={[
          'Diseño personalizado: foto, colores, letras y logo',
          'Landing page con descripción de tu negocio, botones de acceso directo a Whatsapp, Google maps y todas tus redes sociales',
          'Posicionamiento SEO en internet',
          '200 tarjetas full color doble face',
          'Pago vitalicio no tiene costo de mantenimiento'
          ]}
          style={{ marginBottom: '30px'}}
          price={{ original: 0, discount: 0 }}
          onButtonClick={() => handleBuyNow(4, "Plan Pack", 0)}
        />
      </div>
    </div>
  );
};

export default DesktopBrandingSection;
