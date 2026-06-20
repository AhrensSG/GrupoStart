import { Star } from "lucide-react";

export function TestimonialCard({ name, role, comment, rating, avatar }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        &ldquo;{comment}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {avatar && (
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        )}
        <div>
          <p className="font-semibold text-gray-900 text-sm">{name}</p>
          <p className="text-xs text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}
