import Image from "next/image";
import React from "react";
import CheckSpan from "./reusableComponents/CheckSpan";

const DesktopWebDevelopmentSection = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-16">
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <h2 className="text-4xl font-medium text-[#0853FC] text-center">
          ¡Tu pagina web te espera!
        </h2>
        <span className="max-w-[50%] text-center text-2xl font-medium">
          El presupuesto para tu proyecto va a depender de la complejidad,
          cantidad de pestañas, funcionalidades y animaciones
        </span>
        <span className="max-w-[50%] text-center text-xl font-medium text-[#0853FC]">
          ¡Siempre vas a tener asesoramiento personalizado!
        </span>
        <button className="text-[#0853FC] text-xl border border-[#0853FC] p-2 px-6 bg-white rounded-tl-xl rounded-br-xl shadow-[#0853FC] shadow-md hover:shadow-lg hover:shadow-[#0853FC] duration-300">
          Quier hablar con un asesor
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <h3 className="text-4xl font-medium text-[#0853FC] text-center">
          Elegí tu Proyecto Web
        </h3>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-4">
        {/* CARD */}
        <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
          <div className="w-full h-4 rounded-t-xl bg-[#FB8A00]" />
          <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
            <div className="w-full space-y-4">
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <h3 className="text-xl font-medium">Landing</h3>
                <span className="text-4xl font-medium">$ 150.000</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <CheckSpan title="Funciones basicas" />
                <CheckSpan title="Diseño responsive" />
                <CheckSpan title="Autogestionable" />
                <CheckSpan title="3 Subpáginas" />
                <CheckSpan title="Catalogo" />
                <CheckSpan title="Venta online" />
                <CheckSpan title="Pasarela de pagos" />
                <CheckSpan title="Sistema de envios" />
                <CheckSpan title="Adicionales" />
              </div>
              <div className="w-full text-center">
                <span className="text-lg font-medium">3 semanas</span>
              </div>
            </div>
            <button className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl text-white">
              COMPRAR
            </button>
          </div>
        </div>
        <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
          <div className="w-full h-4 rounded-t-xl bg-[#FB8A00]" />
          <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
            <div className="w-full space-y-4">
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <h3 className="text-xl font-medium">Ecomerce</h3>
                <span className="text-4xl font-medium">$ 380.000</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <CheckSpan title="Funciones basicas" />
                <CheckSpan title="Diseño responsive" />
                <CheckSpan title="Autogestionable" />
                <CheckSpan title="6 Subpáginas" />
                <CheckSpan title="Catalogo" />
                <CheckSpan title="Venta online" />
                <CheckSpan title="Pasarela de pagos" />
                <CheckSpan title="Sistema de envios" />
                <CheckSpan title="Adicionales 3" />
              </div>
              <div className="w-full text-center">
                <span className="text-lg font-medium">3 semanas</span>
              </div>
            </div>
            <button className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl text-white">
              COMPRAR
            </button>
          </div>
        </div>
        <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
          <div className="w-full h-4 rounded-t-xl bg-[#FB8A00]" />
          <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
            <div className="w-full space-y-4">
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <h3 className="text-xl font-medium">Ecomerce Full</h3>
                <span className="text-4xl font-medium">$ 440.000</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <CheckSpan title="Funciones basicas" />
                <CheckSpan title="Diseño responsive" />
                <CheckSpan title="Autogestionable" />
                <CheckSpan title="6 Subpáginas" />
                <CheckSpan title="Catalogo" />
                <CheckSpan title="Venta online" />
                <CheckSpan title="Pasarela de pagos" />
                <CheckSpan title="Sistema de envios" />
                <CheckSpan title="Adicionales 5" />
              </div>
              <div className="w-full text-center">
                <span className="text-lg font-medium">3 semanas</span>
              </div>
            </div>
            <button className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl text-white">
              COMPRAR
            </button>
          </div>
        </div>
        <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
          <div className="w-full h-4 rounded-t-xl bg-[#FB8A00]" />
          <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
            <div className="w-full space-y-4">
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <h3 className="text-xl font-medium">Premium</h3>
                <span className="text-4xl font-medium">$ 650.000</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <CheckSpan title="Funciones basicas" />
                <CheckSpan title="Diseño responsive" />
                <CheckSpan title="Autogestionable" />
                <CheckSpan title="8 Subpáginas" />
                <CheckSpan title="Catalogo" />
                <CheckSpan title="Venta online" />
                <CheckSpan title="Pasarela de pagos" />
                <CheckSpan title="Sistema de envios" />
                <CheckSpan title="Adicionales 10" />
              </div>
              <div className="w-full text-center">
                <span className="text-lg font-medium">3 semanas</span>
              </div>
            </div>
            <button className="bg-[#FB8A00] p-2 px-4 rounded-tl-xl rounded-br-xl text-white">
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopWebDevelopmentSection;
