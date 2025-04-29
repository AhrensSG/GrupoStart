import React from "react";
import NavBarV2 from "../navbar/NavBarV2";
import Footer from "../footer/Footer";

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBarV2 />
      <div className="grow px-6 py-12 max-w-5xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold text-[#0853FC] mb-6">
          Términos y condiciones
        </h1>

        <p className="mb-4">
          Estos términos rigen el uso de la información que proporciona a Grupo
          Start S.A.S y cualquier otro vínculo legal relacionado con el
          propietario, usuario o comprador de los servicios mencionados en la
          página web de la agencia.
        </p>

        <h2 className="text-2xl font-semibold text-[#FB8A00] mt-8 mb-4">
          Tecnologías de terceros utilizadas
        </h2>
        <p className="mb-4">
          Nuestra página web utiliza tecnologías de terceros tales como:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Firebase Authentication</li>
          <li>Firebase Auth ID</li>
        </ul>
        <p className="mb-4">
          Estas tecnologías suelen utilizar datos básicos del usuario (nombre,
          dirección de correo electrónico y profile picture).
        </p>

        <h2 className="text-2xl font-semibold text-[#FB8A00] mt-8 mb-4">
          Plataforma de compras
        </h2>
        <p className="mb-4">
          Todo pago se realiza a través de la plataforma de Mercado pago,
          garantizando así la confidencialidad de sus datos y medios de pagos.
          El procedimiento es el siguiente: al realizar la compra, se crea un
          link en el procesador de pagos mediante la generación de un token
          temporal el cual es otorgado luego de una solicitud al servicio de
          Mercado Pago, por lo tanto, toda la seguridad del proceso de compras
          está a cargo de Mercado Pago.
        </p>
        <p className="mb-4">
          Detalle técnico: CheckOut Pro - Pasarela de pagos.
        </p>

        <h2 className="text-2xl font-semibold text-[#FB8A00] mt-8 mb-4">
          Términos y condiciones de contratación del servicio
        </h2>
        <p className="mb-4">
          Si el usuario compra alguno de los servicios ofrecidos en el sitio web
          consiente que leyó y aceptó las formas de contratación descritas a
          continuación:
        </p>
        <p className="mb-4">
          El soporte comercial puede demorar hasta 72 horas hábiles en programar
          el primer contacto con el comprador. Luego de la primera entrevista,
          la agencia tiene hasta 96 horas, contadas únicamente en días hábiles,
          para realizar la primera propuesta gráfica y pactar la primera acción
          de marketing en las redes sociales del cliente. El cliente consiente
          que, para que dichas acciones se puedan llevar a cabo, deberá tener
          total predisposición en los procesos necesarios para llegar al
          resultado esperado en el periodo mencionado.
        </p>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Medios autorizados de contacto
        </h3>
        <p className="mb-4">
          Los medios por los cuales se realizará el contacto serán únicamente
          por vía WhatsApp desde el número +54 9 370 4619402 al número brindado
          por el cliente o en su defecto por mail, desde
          support@grupostart.com.ar.
        </p>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Proceso previo a la prestación del servicio de marketing
        </h3>
        <p className="mb-4">El cliente debe brindar:</p>
        <ul className="list-disc list-inside mb-6">
          <li>
            Usuario y contraseña de las redes sociales que delega a Grupo Start
            S.A.S para su gestión.
          </li>
          <li>
            Manual de marca de la empresa o consultar soporte si no posee.
          </li>
          <li>
            Formulario “Briefing-Content” completado en su totalidad provisto
            por el asesor comercial.
          </li>
        </ul>

        <p className="mb-4">
          El usuario declara total comprensión que el servicio prestado será
          exclusivamente aquel que este hubiera contratado y no podrá exigir una
          prestación diferente a la contratada, sin embargo, este siempre podrá
          ampliar su rango de prestaciones contratando nuevos ítems a través de
          las distintas secciones presentadas en el sitio web o a través de
          reuniones con representantes oficiales, para tal fin la empresa
          declara que el único medio habilitado para que los usuarios se
          contacten con representantes oficiales será a través de la siguiente
          plataforma https://calendly.com/grupostart-ok/30min
        </p>

        <p className="mb-4">
          El usuario declara comprender que si contratara un servicio de la
          sección MEDIA los plazos requeridos para su entrega serán acordados
          por el soporte comercial, quien finalizado el proceso de compra
          entregará un documento donde se detallan los requerimientos
          solicitados por el cliente, política de cambios y plazos de entregas.
        </p>

        <p className="mb-4">
          También declara comprender que para obtener los resultados deseados al
          contratar el servicio de "gestión de redes sociales" este deberá
          asesorarse con un representante comercial y entiende también que los
          plazos dependen de: a) el plan contratado, b) los objetivos deseados
          y, c) que en cualquier caso, los plazos mínimos requeridos para ver
          resultados no son menores a 3 meses.
        </p>

        <p className="mb-4">
          Los servicios contratados en la sección “media” poseen una
          característica de pago único y de prestación única y, los servicios
          contratados en la sección “gestión de redes” poseen una característica
          de suscripción mensual, tanto en pago como en prestación del servicio.
        </p>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Poderes delegados al contratar el servicio “gestión de redes”
        </h3>
        <p className="mb-4">
          El usuario delega a Grupo Start S.A.S la exclusividad total en las
          acciones relacionadas al Feed del cliente, la optimización de su
          perfil general, y la creación de anuncios publicitarios. Se compromete
          a respetar en esta relación comercial los poderes delegados y que en
          caso de requerir su uso deberá consultarlo con el project manager
          designado en su equipo de marketing o bien con el soporte comercial de
          la agencia.
        </p>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Poderes delegados parcialmente
        </h3>
        <p className="mb-4">Acciones relacionadas con las stories:</p>
        <p className="mb-4">
          Grupo Start S.A.S posee derecho pleno para ejercer acciones
          relacionadas con el ejercicio de su actividad también en esta área,
          sin embargo, el cliente puede utilizar libremente esta sección sin
          necesidad de intermediación con el soporte de GRUPO START, no obstante
          se recomienda al cliente mantenerse siempre asesorado con el project
          manager designado para no realizar acciones que puedan perjudicar
          el/los cumplimientos de los objetivos planteados.
        </p>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Autorización de uso de imagen
        </h3>
        <p className="mb-4">
          El cliente/usuario/comprador presta su consentimiento expreso e
          informado para que GRUPO START S.A.S utilice los datos personales,
          logotipos, testimonios, imágenes y demás contenidos proporcionados con
          fines comerciales y publicitarios, sin que esto genere derecho a
          compensación económica o reclamo alguno.
        </p>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Mora en el pago de la contratación de prestaciones de suscripción
          mensual
        </h3>
        <p className="mb-4">
          Cuando se contrate un servicio de suscripción mensual, el pago se
          realizará por adelantado, desde esa fecha de pago se contarán 30 días
          para abonar el siguiente pago, de no cumplir con el plazo estipulado
          éste deberá abonar un 1% diario por cada día de atraso en el pago. Si
          la mora excediera los 10 días de pago el servicio será suspendido, si
          el cliente desea volver a disfrutar de la prestación deberá abonar el
          monto total de la cuota, intereses acumulados y una multa del 10% fijo
          sobre el total de capital más los intereses adeudados.
        </p>

        <h3 className="text-xl font-semibold text-[#0853FC] mt-6 mb-2">
          Jurisdicción
        </h3>
        <p className="mb-4">
          En caso de disputa legal, las partes (usuario/comprador y Grupo Start
          S.A.S) se someten a la Jurisdicción de los Tribunales Ordinarios de la
          Ciudad de Formosa, Provincia de Formosa, Argentina.
        </p>

        <p className="mb-4">
          Si requiere información que no se encuentra en este documento, puede
          enviar su consulta a support@grupostart.com.ar
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Versión 1 - Última modificación: 29/04/2025
        </p>
      </div>

      <Footer className="relative bottom-0 left-0 w-full" />
    </div>
  );
};

export default TermsAndConditions;
