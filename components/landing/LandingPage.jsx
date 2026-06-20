"use client";

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
              studentCount={productData.studentCount}
              category={productData.category}
              guarantee={productData.guarantee}
              features={productData.detailsContent.whatYouGet}
            />
          </div>
        </div>
      </main>

      <MobileBottomBar
        price={productData.price}
        currency={productData.currency}
        billingPeriod={productData.billingPeriod}
        onCtaClick={() => {
          document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <Footer />
    </div>
  );
}
