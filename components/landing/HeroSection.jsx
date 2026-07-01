import { Share2 } from "lucide-react";
import { RatingBadge } from "./RatingBadge";
import { CTAButton } from "./CTAButton";

export function HeroSection({
  title,
  subtitle,
  videoEmbed,
  rating,
  totalReviews,
  isBestRated = true,
  onSubscribe,
}) {
  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-4">
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {subtitle}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <RatingBadge
                    rating={rating}
                    totalReviews={totalReviews}
                    isBestRated={isBestRated}
                  />
                  <button className="flex items-center gap-2 text-gray-700 hover:text-brand-blue font-semibold">
                    <Share2 className="w-5 h-5" />
                    Compartir
                  </button>
                </div>
                <p className="text-lg text-gray-600 font-semibold">{title}</p>
              </div>

              {videoEmbed && (
                <div className="mb-8">
                  <div
                    className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: videoEmbed }}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                </div>
              )}

              <div className="mb-8 text-lg text-gray-600 font-semibold leading-relaxed">
                <p className="mb-3">
                  Sí, el 80% se cierra entre el tercer y quinto contacto, no son números al azar, estudios que podes buscar por tu cuenta lo respaldan:
                </p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li>Efecto de Mera Exposición</li>
                  <li>Mapeo del Viaje del Cliente</li>
                  <li>La Teoría de los Tres Impactos (Herbert Krugman)</li>
                  <li>El punto óptimo de 3 a 5 exposiciones (Pechmann & Stewart)</li>
                </ul>
              </div>

              <CTAButton variant="primary" size="lg" onClick={onSubscribe}>
                Adquiere ahora
              </CTAButton>
            </div>


        </div>
      </div>
    </section>
  );
}
