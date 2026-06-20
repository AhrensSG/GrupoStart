"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function ModuleCard({
  moduleNumber,
  title,
  description,
  isExpanded = false,
  onToggle,
}) {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle?.();
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <span className="text-2xl font-bold text-brand-blue min-w-12">
            {String(moduleNumber).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-bold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && description && (
        <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
}
