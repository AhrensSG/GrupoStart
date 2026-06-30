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
  imageSrc,
  onSubscribe,
}) {
  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-3">
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
              Adquirir ahora
            </CTAButton>
          </div>

          <div className="lg:col-span-1">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <div className="bg-gradient-to-br from-brand-blue-light to-brand-blue-light rounded-lg p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-gray-600 font-semibold">
                    Sistema de Seguimiento de Leads
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
