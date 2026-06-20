"use client";

import { ShoppingCart } from "lucide-react";

export function MobileBottomBar({
  price,
  currency = "ARS",
  billingPeriod = "mes",
  onCtaClick,
}) {
  return (
    <>
      <div className="h-20 md:hidden" />
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <div className="flex-1">
            <div className="text-2xl font-bold text-gray-900">
              ${price}
              <span className="text-sm text-gray-600 font-normal">/{billingPeriod}</span>
            </div>
          </div>
          <button
            onClick={onCtaClick}
            className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Ir al carrito
          </button>
        </div>
      </div>
    </>
  );
}
