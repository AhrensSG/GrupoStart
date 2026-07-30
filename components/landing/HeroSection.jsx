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
                  <li>Efecto de Mera Exposición (Robert Zajonc)</li>
                  <li>Mapeo del Viaje del Cliente (Chip Bell y Ron Zemke)</li>
                  <li>La Teoría de los Tres Impactos (Herbert Krugman)</li>
                  <li>El punto óptimo de 3 a 5 exposiciones (Pechmann & Stewart)</li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <CTAButton variant="primary" size="lg" onClick={onSubscribe}>
                  Adquirí ahora
                </CTAButton>
                <a
                  href="https://wa.me/543704619402?text=Hola%20GrupoStart%2C%20quiero%20consultar%20sobre%20el%20Sistema%20de%20Seguimiento%20de%20Leads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-600 hover:text-green-600 hover:border-green-400 rounded-full text-base font-bold transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar
                </a>
              </div>
            </div>


        </div>
      </div>
    </section>
  );
}
