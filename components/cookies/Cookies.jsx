import React from "react";
import Footer from "../footer/Footer";
import NavBarV2 from "../navbar/NavBarV2";

const Cookies = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBarV2 />
      <div className="grow px-6 py-12 max-w-5xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold text-[#0853FC] mb-6">
          Política de cookies de Grupo Start S.A.S
        </h1>

        <p className="mb-4">
          Este documento informa a los Usuarios sobre las tecnologías que ayudan
          a Grupo Start S.A.S, en adelante “LA EMPRESA”, a lograr los fines
          descritos a continuación. Dichas tecnologías permiten al Titular
          acceder y almacenar información (por ejemplo, mediante el uso de una
          cookie) o utilizar recursos (por ejemplo, mediante la ejecución de un
          script) en el dispositivo del Usuario mientras interactúa con LA
          EMPRESA.
        </p>

        <p className="mb-4">
          Para simplificar, todas estas tecnologías se definen como
          "Rastreadores" en este documento, salvo que exista una razón para
          diferenciarlas. Algunos de los rastreadores son cookies, que se
          utilizan específicamente en navegadores web.
        </p>

        <p className="mb-4">
          Algunas finalidades para las que se utilizan los Rastreadores pueden
          requerir el consentimiento del Usuario. Utilizamos rastreadores
          propios y de terceros para ofrecer nuestros servicios.
        </p>

        <h2 className="text-2xl font-semibold text-[#FB8A00] mt-8 mb-4">
          Duración y vencimiento de los rastreadores
        </h2>
        <p className="mb-4">
          La validez y el plazo de caducidad de las cookies y otros rastreadores
          pueden variar según lo establecido por el Titular o el proveedor
          correspondiente. Algunos expiran al finalizar la sesión de navegación
          del Usuario.
        </p>

        <h2 className="text-2xl font-semibold text-[#FB8A00] mt-8 mb-4">
          Uso de rastreadores
        </h2>
        <p className="mb-4">
          Utilizamos rastreadores para mejorar la calidad de la experiencia del
          usuario y permitir interacciones con contenidos, redes y plataformas
          externas.
        </p>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Rastreadores gestionados por terceros
        </h3>
        <ul className="list-disc list-inside mb-6">
          <li>Firebase Authentication</li>
          <li>Firebase Auth ID</li>
          <li>Mercadopago CheckOut Pro</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Medición
        </h3>
        <p className="mb-4">
          Utilizamos rastreadores para medir el tráfico y analizar el
          comportamiento del Usuario para mejorar el servicio.
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Google Analytics (Universal Analytics)</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Marketing
        </h3>
        <p className="mb-4">
          Utilizamos rastreadores para ofrecer anuncios personalizados o
          contenido de marketing y para medir su rendimiento.
        </p>
      </div>

      <Footer className="relative bottom-0 left-0 w-full" />
    </div>
  );
};

export default Cookies;
