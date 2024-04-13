import React from "react";
import CheckSpan from "./reusableComponents/CheckSpan";

const BrandIdentitySection = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-16 py-20">
      <h1 className="text-4xl font-medium">Identidad de marca</h1>
      <p className="text-2xl text-center font-medium max-w-xl">
        Si queres tener
        <span className="text-[#0853FC]">
          {" "}
          un negocio que sea sostenible con el tiempo{" "}
        </span>
        debes consolidar una marca. Permití que nuestro equipo creativo genere
        <span className="text-[#0853FC] uppercase"> tu logo</span>
      </p>
      <h2 className="text-4xl font-medium">Elegí tu plan adaptado a vos</h2>
      <div className="w-full flex flex-row flex-wrap justify-center items-center gap-4 bg-gradient-to-b from-slate-100 via-[#FB8A00] to-slate-100">
        {/* CARD */}
        <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
          <div className="w-full h-4 rounded-t-xl bg-[#0853FC]" />
          <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
            <div className="w-full space-y-4">
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <h3 className="text-xl font-medium text-center">Identidad de marca simplificada</h3>
                <span className="text-4xl font-medium">$ 32.000</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Diseño de logotipo"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Eleccion de tipografias"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Imprension del manual"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Manual corto"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Eleccion de colores corporativos deacurdo a un estudio realizado"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Free: 25 tarjetas QR"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Investigacion de la competencia"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Modelado de interiores"
                />
              </div>
            </div>
            <button className="bg-[#0853FC] p-2 px-4 rounded-tl-xl rounded-br-xl text-white">
              COMPRAR
            </button>
          </div>
        </div>
        <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
          <div className="w-full h-4 rounded-t-xl bg-[#0853FC]" />
          <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
            <div className="w-full space-y-4">
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <h3 className="text-xl font-medium text-center">Identidad de marca estandar</h3>
                <span className="text-4xl font-medium">$ 47.000</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Diseño de logotipo"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Eleccion de tipografias"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Imprension del manual"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Manual ampliado"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Eleccion de colores corporativos deacurdo a un estudio realizado"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Free: 50 tarjetas QR"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Investigacion de la competencia"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Modelado de interiores"
                />
              </div>
            </div>
            <button className="bg-[#0853FC] p-2 px-4 rounded-tl-xl rounded-br-xl text-white">
              COMPRAR
            </button>
          </div>
        </div>
        <div className="hover:drop-shadow-2xl duration-500 w-full bg-white rounded-md drop-shadow-lg max-w-72 min-h-[484px]">
          <div className="w-full h-4 rounded-t-xl bg-[#0853FC]" />
          <div className="w-full flex flex-col justify-between items-center gap-6 p-4">
            <div className="w-full space-y-4">
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <h3 className="text-xl font-medium text-center">Identidad de marca completa</h3>
                <span className="cursor-default text-transparent text-4xl font-medium">$ 00.000</span>
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Diseño de logotipo"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Eleccion de tipografias"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Imprension del manual"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Manual completo"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Eleccion de colores corporativos deacurdo a un estudio realizado"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Free: 100 tarjetas QR"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Investigacion de la competencia"
                />
                <CheckSpan
                  icon="/services/BlueCheckIcon.svg"
                  title="Modelado de interiores"
                />
              </div>
            </div>
            <button className="bg-[#0853FC] p-2 px-4 rounded-tl-xl rounded-br-xl text-white">
              A PRESUPUESTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandIdentitySection;
