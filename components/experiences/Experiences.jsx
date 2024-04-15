import React from "react";
import Image from "next/image";

const Experiences = () => {
  return (
    <div className="grid place-items-center gap-12 py-20">
      <h1 className="text-4xl">
        Ya confiamos en <span className="font-medium">START</span>
      </h1>
      <Image
        src={"/Experiences.svg"}
        width={1200}
        height={650}
        alt="Experiences"
      />
      <div className="w-full grid place-items-center gap-16">
        <h2 className="text-4xl">Experiencias conectadas</h2>
        <p className="text-2xl max-w-screen-md text-center">
          Contratando cualquier servicio de <span className="text-[#FB8A00] font-medium">START</span> , te ayudamos a
          posicionarte en las búsquedas de Google gracias a nuestras estrategias
          SEO
        </p>
      </div>
      <div className="w-full py-10 space-y-6">
        <h3 className="text-3xl font-medium text-[#0853FC]">¡Visita las landing page de nuestros clientes!</h3>
        <ul className="list-disc pl-5 text-[#0853FC] text-2xl space-y-6">
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
        </ul>
      </div>
    </div>
  );
};

export default Experiences;
