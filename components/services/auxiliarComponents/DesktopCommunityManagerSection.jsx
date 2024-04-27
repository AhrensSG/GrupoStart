"use client";

import { Context } from "@/app/context/GlobalContext";
import { addProductToCart } from "@/app/context/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "sonner";

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
    <div className="w-full h-full flex flex-col justify-start items-center gap-16">
      <div>
        <h2 className="text-4xl font-medium text-[#0853FC] text-center">
          Solicita tu documento explicativo gratuito
        </h2>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-4">
        {/* Card */}
        <div className="w-full flex flex-col justify-between items-center bg-white p-4 rounded-md drop-shadow-lg max-w-72 gap-6 min-h-[484px]">
          <div className="w-full space-y-4">
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <h3 className="text-xl font-medium">Plan Emprendedor</h3>
              <span className="text-4xl font-medium">$ 38.000</span>
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                2 Redes sociales
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                3 Publicaciones
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                3 Historias semanales
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                Contenido de valor e imágenes del cliente o el internet
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                Puesta en marcha de campañas publicitarias
              </span>
            </div>
          </div>
          <button
            onClick={() => handleBuyNow(2, "Plan Emprendedor", 38000)}
            className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl "
          >
            COMPRAR
          </button>
        </div>
        <div className="w-full flex flex-col justify-between items-center bg-white p-4 rounded-md drop-shadow-lg max-w-72 gap-6 min-h-[484px]">
          <div className="w-full space-y-4">
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <h3 className="text-xl font-medium">Plan Empresario</h3>
              <span className="text-4xl font-medium">$ 56.000</span>
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                3 Redes sociales
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                5 Publicaciones
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                5 Historias semanales
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                Contenido de valor e imágenes del cliente o el internet
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                Puesta en marcha de campañas publicitarias
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                1 Rell o tik tok
              </span>
            </div>
          </div>
          <button
            onClick={() => handleBuyNow(3, "Plan Empresario", 56000)}
            className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl "
          >
            COMPRAR
          </button>
        </div>
        <div className="w-full flex flex-col justify-between items-center bg-white p-4 rounded-md drop-shadow-lg max-w-72 gap-6 min-h-[484px]">
          <div className="w-full space-y-4">
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <h3 className="text-xl font-medium">Plan Corporativo</h3>
              <span className="text-4xl font-medium">$ 110.000</span>
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                3 Redes sociales
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                8 Publicaciones
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                8 Historias semanales
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                Contenido de valor e imágenes del cliente o el internet
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                Puesta en marcha de campañas publicitarias
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                1 Rell o tik tok
              </span>
              <span className="flex justify-start items-start gap-2">
                <Image
                  src={"/services/CheckIcon.svg"}
                  width={20}
                  height={20}
                  alt="checkIcon"
                />
                Modelo o influencer
              </span>
            </div>
          </div>
          <button
            onClick={() => handleBuyNow(4, "Plan Corporativo", 110000)}
            className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl "
          >
            COMPRAR
          </button>
        </div>
      </div>
      <button className="text-[#FB8A00] text-xl border border-[#FB8A00] p-2 px-6 bg-white rounded-tl-xl rounded-br-xl shadow-[#FB8A00] shadow-md hover:shadow-lg hover:shadow-[#FB8A00] duration-300">
        {" "}
        Quiero mi plan Personalizado{" "}
      </button>
    </div>
  );
};

export default DesktopCommunityManagerSection;
