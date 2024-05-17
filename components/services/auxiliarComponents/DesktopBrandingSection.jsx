"use client";
import React from "react";
import CheckSpan from "./reusableComponents/CheckSpan";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Context } from "@/app/context/GlobalContext";
import { toast } from "sonner";
import { addProductToCart } from "@/app/context/actions";

const DesktopBrandingSection = () => {
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
    <div>
      <div className="w-full h-full flex flex-col justify-start items-center gap-16">
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <h2 className="text-4xl font-medium text-[#0853FC] text-center">
            ¡Preséntate como un verdadero profesional!
          </h2>
          <p className="max-w-[50%] text-center text-2xl font-medium">
            Innovamos la forma en la que te presentas con tus clientes,{" "}
            <span className="text-[#0853FC]">
              el QR que agregamos a tu tarjeta esta enlazado a una landing page
              tuya
            </span>
            , para mantenerla activa elegí el paquete que mas te convenga
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <h3 className="text-4xl font-medium text-[#0853FC] text-center">
            Conoce las opciones disponibles
          </h3>
        </div>
        <div className="w-full flex flex-wrap items-center justify-center gap-4">
          {/* CARD */}
          <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
            <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
              <div className="w-full space-y-4">
                <div className="w-full flex flex-col justify-center items-center gap-4">
                  <h3 className="text-xl font-medium">PACK 1</h3>
                  <span className="text-4xl font-medium">$ 12.000</span>
                  <span className="text-lg text-center text-[#FB8A00]">
                    + Suscripción mensual
                    <br />
                    $500
                  </span>
                </div>
                <div className="flex flex-col justify-center items-start gap-3">
                  <CheckSpan title="50 Tarjetas con QR único" />
                  <CheckSpan title="Landing page con botones de acceso directo" />
                  <CheckSpan title="Descripción personaliza" />
                  <CheckSpan title="Diseño personalizado" />
                  <CheckSpan title="Carrusel de imagenes" />
                </div>
              </div>
              <button
                onClick={() => handleBuyNow(15, "Pack 1", 12000)}
                className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl text-white"
              >
                COMPRAR
              </button>
            </div>
          </div>
          <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
            <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
              <div className="w-full space-y-4">
                <div className="w-full flex flex-col justify-center items-center gap-4">
                  <h3 className="text-xl font-medium">PACK 2</h3>
                  <span className="text-4xl font-medium">$ 23.000</span>
                  <span className="text-lg text-center text-[#FB8A00]">
                    + Suscripción Anual
                    <br />
                    <br />
                  </span>
                </div>
                <div className="flex flex-col justify-center items-start gap-3">
                  <CheckSpan title="100 Tarjetas con QR único" />
                  <CheckSpan title="Landing page con botones de acceso directo" />
                  <CheckSpan title="Descripción personaliza" />
                  <CheckSpan title="Diseño personalizado" />
                  <CheckSpan title="Carrusel de imagenes" />
                </div>
              </div>
              <button
                onClick={() => handleBuyNow(16, "Pack 2", 23000)}
                className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl text-white"
              >
                COMPRAR
              </button>
            </div>
          </div>
          <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
            <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
              <div className="w-full space-y-4">
                <div className="w-full flex flex-col justify-center items-center gap-4">
                  <h3 className="text-xl font-medium">PACK 3</h3>
                  <span className="text-4xl font-medium">$ 46.000</span>
                  <span className="text-lg text-center text-[#FB8A00]">
                    + Suscripción vitalica
                    <br />
                    <br />
                  </span>
                </div>
                <div className="flex flex-col justify-center items-start gap-3">
                  <CheckSpan title="150 Tarjetas con QR único" />
                  <CheckSpan title="Landing page con botones de acceso directo" />
                  <CheckSpan title="Descripción personaliza" />
                  <CheckSpan title="Diseño personalizado" />
                  <CheckSpan title="Carrusel de imagenes" />
                </div>
              </div>
              <button
                onClick={() => handleBuyNow(17, "Pack 3", 46000)}
                className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl text-white"
              >
                COMPRAR
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-12">
          <Link href={"/services/CustomizedBrandingPlan"}>
            <button className="text-[#FB8A00] text-xl border border-[#FB8A00] p-2 px-6 bg-white rounded-tl-xl rounded-br-xl shadow-[#FB8A00] shadow-md hover:shadow-lg hover:shadow-[#FB8A00] duration-300">
              Quiero mi pack Personalizado
            </button>
          </Link>
          <span className="text-4xl font-medium text-[#0853FC] text-center">
            ¡Te lo enviamos a donde estés!
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesktopBrandingSection;
