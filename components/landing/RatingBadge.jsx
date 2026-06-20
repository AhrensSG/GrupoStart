import { Star } from "lucide-react";

export function RatingBadge({
  rating,
  totalReviews,
  isBestRated = false,
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        <span className="font-bold text-lg">
          {rating}
          <span className="text-sm text-gray-600">({totalReviews})</span>
        </span>
      </div>
      {isBestRated && (
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          ✓ Mejor evaluado
        </div>
      )}
    </div>
  );
}
