import { Check } from "lucide-react";
import { RatingBadge } from "./RatingBadge";
import { CTAButton } from "./CTAButton";

export function Sidebar({
  price,
  rating,
  totalReviews,
  guarantee = "7 días de garantía",
  features = [],
  onSubscribe,
}) {
  return (
    <div id="comprar" className="sticky top-20 space-y-6" data-section="comprar">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="mb-6">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            ${price}
            <span className="text-lg text-gray-600">/mes</span>
          </div>
          <p className="text-sm text-gray-600">Acceso de por vida</p>
        </div>

        <CTAButton variant="primary" size="lg" className="w-full mb-4" onClick={onSubscribe}>
          Adquiere ahora
        </CTAButton>

        <div className="mb-6 pb-6 border-b border-gray-200">
          <RatingBadge
            rating={rating}
            totalReviews={totalReviews}
            isBestRated={true}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">{guarantee}</span>
          </div>

          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
