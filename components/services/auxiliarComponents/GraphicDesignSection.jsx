import React from "react";

const GraphicDesignSection = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center gap-4">
      <div>
        <h2 className="text-4xl font-medium text-[#0853FC] text-center">
          ¿Qué servicio te gustaría contratar?
        </h2>
      </div>
      <div className="flex flex-col w-2/3 justify-center items-start gap-4">
        <span className="text-xl cursor-pointer">
          1 Manual de identidad simplificada
        </span>
        <span className="text-xl cursor-pointer">
          2 Manual de identidad estándar
        </span>
        <span className="text-xl cursor-pointer">
          3 Manual de identidad completo
        </span>
        <span className="text-xl cursor-pointer">
          4 Pieza trafica para redes sociales
        </span>
        <span className="text-xl cursor-pointer">
          5 Tarjetas de presentación personal
        </span>
        <span className="text-xl cursor-pointer">6 Banner</span>
        <span className="text-xl cursor-pointer">7 Otros</span>
      </div>
      <button className="border w-2/3 py-2 px-3 rounded-md bg-[#0853FC] text-white font-medium mt-2">
        Contratar
      </button>
    </div>
  );
};

export default GraphicDesignSection;
