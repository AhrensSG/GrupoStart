"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/GlobalContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { HeroSection } from "./HeroSection";
import { ContentSection } from "./ContentSection";
import { FAQSection } from "./FAQSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { MobileBottomBar } from "./MobileBottomBar";
import { productData } from "./productData";

export default function LandingPage() {
  const { state } = useContext(Context);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = state?.user;

  const handleSubscribe = async () => {
    if (!user) {
      router.push("/login?redirect=/landing");
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
        alert(data.error ? `Error: ${data.error}` : "Error al generar la suscripción. Intentalo de nuevo.");
      }
    } catch {
      alert("Error al conectar con el sistema de pagos.");
    } finally {
      setLoading(false);
    }
  };
  const detailsContent = (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Qué obtendrás?
        </h3>
        <ul className="space-y-3">
          {productData.detailsContent.whatYouGet.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-brand-blue font-bold mt-1">✓</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Cómo funciona?
        </h3>
        <ol className="space-y-3">
          {productData.detailsContent.howItWorks.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Beneficios principales
        </h3>
        <ul className="space-y-3">
          {productData.detailsContent.benefits.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-brand-orange font-bold mt-1">⚡</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white font-nunito">
      <Header />

      <main className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 container mx-auto px-4 py-12">
          <div className="lg:col-span-2 space-y-0">
            <HeroSection
              title={productData.title}
              subtitle={productData.subtitle}
              videoEmbed={productData.videoEmbed}
              rating={productData.rating}
              totalReviews={productData.totalReviews}
              isBestRated={productData.isBestRated}
              onSubscribe={handleSubscribe}
            />

            <ContentSection
              modules={productData.modules}
              detailsContent={detailsContent}
            />

            <FAQSection items={productData.faq} />

            <TestimonialsSection testimonials={productData.testimonials} />
          </div>

          <div className="lg:col-span-1">
            <Sidebar
              price={productData.price}
              rating={productData.rating}
              totalReviews={productData.totalReviews}
              guarantee={productData.guarantee}
              features={productData.detailsContent.whatYouGet}
              onSubscribe={handleSubscribe}
            />
          </div>
        </div>
      </main>

      <MobileBottomBar
        price={productData.price}
        currency={productData.currency}
        billingPeriod={productData.billingPeriod}
        onSubscribe={handleSubscribe}
      />

      <Footer />
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl">
            <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-900 font-semibold">Procesando suscripción...</p>
            <p className="text-gray-600 text-sm mt-2">Redirigiendo a Mercado Pago</p>
          </div>
        </div>
      )}
    </div>
  );
}
