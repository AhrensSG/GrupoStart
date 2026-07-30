"use client";

import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Context } from "@/app/context/GlobalContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { HeroSection } from "./HeroSection";
import { ContentSection } from "./ContentSection";
import { FAQSection } from "./FAQSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { MobileBottomBar } from "./MobileBottomBar";
import { CTAButton } from "./CTAButton";
import { productData } from "./productData";
import SubscribeModal from "@/components/tools/SubscribeModal";

export default function LandingPage() {
  const { state } = useContext(Context);
  const router = useRouter();
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const user = state?.user;
  const searchParams = useSearchParams();
  const subRef = useRef(false);

  const handleSubscribe = useCallback(() => {
    if (!user) {
      router.push("/login?redirect=" + encodeURIComponent("/gestion-de-leads?subscribe=1"));
      return;
    }
    setShowSubscribeModal(true);
  }, [user, router]);

  useEffect(() => {
    if (searchParams.get("subscribe") === "1" && user && !subRef.current) {
      subRef.current = true;
      window.history.replaceState({}, "", window.location.pathname);
      handleSubscribe();
    }
  }, [searchParams, user]);

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
              onSubscribe={handleSubscribe}
            />

            <div className="pt-8">
              <CTAButton variant="primary" size="lg" onClick={handleSubscribe}>
                Adquirí ahora
              </CTAButton>
            </div>

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
      {showSubscribeModal && (
        <SubscribeModal user={user} onClose={() => setShowSubscribeModal(false)} />
      )}

      <a
        href="https://wa.me/543704619402?text=Hola%20GrupoStart%2C%20quiero%20consultar%20sobre%20el%20Sistema%20de%20Seguimiento%20de%20Leads"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
