"use client";

import React, { useContext } from 'react';
import { PlayCircle, Star, Shield, RotateCcw } from 'lucide-react';
import { Context } from "@/app/context/GlobalContext";

const Header = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
         <span className="text-blue-600 font-extrabold text-2xl tracking-tight">grupo</span>
         <span className="text-blue-600 font-extrabold text-2xl tracking-tight uppercase">Start</span>
      </div>
      <div className="hidden sm:flex space-x-4 text-sm text-gray-600">
        <a href="#" className="hover:text-blue-600 transition-colors">Marketplace</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Mis Compras</a>
      </div>
    </div>
  </header>
);

const VideoPlayer = () => (
  <div className="relative w-full aspect-video bg-slate-900 flex items-center justify-center group cursor-pointer mb-6 rounded-md overflow-hidden">
    <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">VIDEO</div>
    <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white transition-transform group-hover:scale-110" />
  </div>
);

const BuyCard = () => {
  const [loading, setLoading] = React.useState(false);
  const { state } = useContext(Context);
  const user = state?.user;

  const handleSubscription = async () => {
    if (!user) {
      window.location.href = "/login?redirect=/tools";
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/routes/preapproval/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.id, email: user.email }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al generar la suscripción. Intentalo de nuevo.");
      }
    } catch {
      alert("Error al conectar con el sistema de pagos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6 border border-gray-100 sticky top-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        SISTEMA DE SEGUIMIENTO DE LEADS
      </h2>
      <div className="flex items-center text-yellow-500 mb-6">
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <span className="text-gray-500 text-sm ml-2 font-medium">5.0 (Evaluaciones)</span>
      </div>

      <div className="text-4xl font-black text-green-600 mb-1">$2.500</div>
      <div className="text-sm text-gray-500 mb-6">mensuales</div>

      <button
        onClick={handleSubscription}
        disabled={loading}
        className="block w-full py-4 px-4 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white text-center font-bold text-lg rounded transition-colors mb-4 shadow-lg shadow-green-500/30"
      >
        {loading ? "PROCESANDO..." : "SÍ, QUIERO MI SISTEMA DE SEGUIMIENTO AHORA"}
      </button>

      <p className="text-xs text-gray-500 text-center mb-6 px-2">
        Adquiere ahora mismo el Sistema de Seguimiento + Los Copys de Venta + La Planilla de Hábitos de Regalo por solo $2.500 mensuales, podes dar de baja cuando quieras!
      </p>

      <div className="space-y-4 border-t border-gray-100 pt-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-600">Compra segura y protegida</span>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="w-5 h-5 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-600">Podes dar de baja cuando quieras</span>
        </div>
      </div>
    </div>
  );
};

const Section1 = () => (
  <div className="mb-10">
    <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
      <p className="font-bold text-lg">El 80% de las ventas ocurren recién entre el 3er y 5to contacto, las empresas que facturan de verdad lo saben.</p>
      <VideoPlayer />
      <p>Sí, el 80% se cierra entre el tercer y quinto contacto, no son números al azar, estudios que podes buscar por tu cuenta lo respaldan:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Efecto de Mera Exposición</li>
        <li>Mapeo del Viaje del Cliente</li>
        <li>La Teoría de los Tres Impactos (Herbert Krugman)</li>
        <li>El punto óptimo de 3 a 5 exposiciones (Pechmann & Stewart)</li>
      </ul>
      <p>¿Estás tirando a la basura el presupuesto de tus anuncios por no hacer un seguimiento adecuado?</p>
      <p>Sabemos que hacerlo manualmente es un verdadero dolor de cabeza, notas en el cuaderno, alarmas ¡un caos! Hacerlo así es completamente inviable</p>
      <p>Vamos a darle orden y evitar que esos potenciales clientes que llegan a tus redes (WhatsApp, messenger, instagram) se sigan perdiendo</p>
      <p className="font-bold text-green-600">Adquirí hoy tu espacio de seguimiento por solo $2.500</p>
      <p>Pagas a Meta o a Google por cada clic. Logras que te escriban, les respondes... y te dejan en &quot;visto&quot; y eso te hace sentir que tu inversión se esfuma frente a tus ojos.</p>
      <p>El 48% de las empresas y Pymes se rinden después del primer mensaje ¡Grave! En todo proceso de venta la primera etapa es el descubrimiento, después sigue la consideración, comparación con otras opciones, luego la compra y finalmente la recomendación si todo salió bien.</p>
      <p>No volver a hacer contacto con los interesados implica dejar mucho dinero sobre la mesa y todo solo por no tener un sistema de seguimiento</p>
    </div>
  </div>
);

const Section2 = () => (
  <div className="mb-10 border-t border-gray-200 pt-10">
    <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
      <p>Hemos diseñado una solución con automatizaciones que maximiza tu orden y el seguimiento se hace con un simple &quot;clic&quot;.</p>
      <p>Tener un soporte de seguimiento inteligente te ahorra horas de trabajo y mucho dinero. Nuestra herramienta está diseñada para que solo debas elegir el nivel de interés de tu lead (&quot;Interesado&quot;, &quot;Potencial cliente&quot; o &quot;No interesado&quot;).</p>
      <p>¿El lead te dijo que no? ¡No lo descartes tan rápido! Nuestro sistema clasifica la razón del rechazo (ej. &quot;razones económicas&quot; o &quot;mejor oferta&quot;). Muchas de estas objeciones son salvables con el mensaje correcto en el momento adecuado... ¡Y nosotros te damos esos mensajes!</p>
      <p>El sistema generará recordatorios visuales automatizados para que sepas exactamente a quién contactar y cuándo hacerlo. Todo a un costo ridículamente bajo.</p>
      <p className="font-bold">Adquirirlo ahora por solo $2.500</p>
    </div>
  </div>
);

const Section3 = () => (
  <div className="mb-10 border-t border-gray-200 pt-10">
    <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
      <p className="font-bold">Automatizado para ser rápido, flexible para ser útil</p>
      <p>Esta herramienta no es solo un software más, es el centro de control de tu negocio. Hemos automatizado las tareas repetitivas para que hagas la menor cantidad de pasos posibles, pero manteniendo la libertad de ajustar lo que necesites.</p>
      <p>Con este sistema podrás registrar la etapa exacta de cada prospecto:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Fechas Automáticas o Manuales:</strong> El sistema te sugerirá automáticamente la fecha ideal para el re-contacto según reglas de expertos. (No es lo mismo volver a escribirle a un &quot;potencial cliente caliente&quot; que a un &quot;no interesado por precio&quot;).</li>
        <li><strong>Estrategia probada:</strong> Podes modificar la fecha si lo deseas, pero te recomendamos confiar en las fechas sugeridas: te ahorrarán clics y están diseñadas para maximizar tu tasa de respuesta y éxito comercial.</li>
      </ul>
    </div>
  </div>
);

const Section4 = () => (
  <div className="mb-10 border-t border-gray-200 pt-10">
    <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
      <p className="font-bold">Tu Máquina de Cierres: ¿Qué incluye la herramienta?</p>
      <p>Esta planilla cuenta con funciones avanzadas</p>
      <ul className="space-y-3 mt-4">
        <li className="flex items-start gap-2">
          <span className="text-xl shrink-0 mt-0.5">🚀</span>
          <span><strong>Dashboard &quot;Agregar nuevo contacto&quot;</strong> para que agregues tus contactos de forma rápida, sencilla e intuitiva</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl shrink-0 mt-0.5">📅</span>
          <span><strong>Fechas en Piloto Automático:</strong> Se calculan y asignan basándose en la clasificación que le des al lead.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl shrink-0 mt-0.5">🔔</span>
          <span><strong>Alarmas de Seguimiento:</strong> Alertas visuales que cambian de color cuando se cumple el plazo máximo para re-contactar a un prospecto.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl shrink-0 mt-0.5">📊</span>
          <span><strong>Dashboard de Estadísticas en Tiempo Real:</strong> Gráficos y números precisos que te muestran cuántos leads tienes en cada etapa. Toma decisiones basadas en datos reales para escalar tu negocio.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl shrink-0 mt-0.5">💬</span>
          <span><strong>Bóveda de Copys Sugeridos:</strong> Te entregamos guiones de venta probados. Solo tienes que copiar, pegar y personalizar según tu nicho, el interés del lead y la etapa de seguimiento en la que se encuentre. ¡Dile adiós a la hoja en blanco!</span>
        </li>
      </ul>
      <h3 className="font-bold mt-6">Suscripción ridículamente baja</h3>
      <p>Por solo el costo de una bolsita de caramelos tendrás el control total de tus leads, sabras a quien contactar, en qué etapa se encuentra, su grado de interés, notas importantes de cada uno y fechas de contacto en automático, todo más recordatorios de todo y copys sugeridos para cada etapa y grado de interés</p>
    </div>
  </div>
);

const Section6 = () => (
  <div className="mb-10 border-t border-gray-200 pt-10">
    <div className="bg-[#f0f4f8] border border-blue-100 rounded-lg p-6 prose prose-gray max-w-none text-gray-700">
      <p className="font-bold text-blue-800 text-lg">🎁 REGALO EXCLUSIVO (100% GRATIS HOY)</p>
      <p>Para tener éxito en los negocios, necesitas disciplina. Por eso, si compras hoy, te llevas completamente GRATIS nuestra &quot;Plantilla Élite de Seguimiento de Hábitos&quot;.</p>
      <p>Mide y controla tus metas diarias: desde tu hábito #1 (&quot;Hacer seguimiento a mis leads todos los días&quot;), hasta ir al gimnasio, leer o comer saludable. Lo que se mide, se mejora.</p>
    </div>
  </div>
);

const Section7 = () => (
  <div className="mb-10 border-t border-gray-200 pt-10 text-center" id="comprar">
    <div className="prose prose-gray max-w-none text-gray-700 mx-auto mt-4">
      <h3 className="text-2xl font-black mb-6">👉 SÍ, QUIERO MI SISTEMA DE SEGUIMIENTO AHORA 👈</h3>
      <p className="text-lg">Adquiere ahora mismo el Sistema de Seguimiento + Los Copys de Venta + La Planilla de Hábitos de Regalo por solo $2.500 mensuales, podes dar de baja cuando quieras!</p>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 py-10 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 space-y-4">
      <p>Este sitio no es parte del sitio web de Facebook o Facebook Inc. Además, este sitio no está respaldado por Facebook de ninguna manera. FACEBOOK es una marca comercial de FACEBOOK, Inc.</p>
      <p>&copy; {new Date().getFullYear()} Grupo Start. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h1 className="text-2xl font-bold text-gray-900 mb-6 md:hidden">
          SISTEMA DE SEGUIMIENTO DE LEADS
        </h1>

        <div className="flex flex-col md:flex-row gap-8">

          <div className="w-full md:w-2/3 bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section6 />
            <Section7 />
          </div>

          <div className="w-full md:w-1/3 relative">
            <BuyCard />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
