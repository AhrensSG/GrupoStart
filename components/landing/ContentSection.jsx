"use client";

import { ModuleCard } from "./ModuleCard";
import { CTAButton } from "./CTAButton";

export function ContentSection({
  modules,
  detailsContent,
  onSubscribe,
}) {
  return (
    <div>
      <section id="contenido" className="py-12 bg-gray-50" data-section="contenido">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contenido</h2>
          <div className="space-y-4">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                moduleNumber={module.number}
                title={module.title}
                description={module.description}
                fullDescription={module.fullDescription}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-start pt-8 pb-4">
        <CTAButton variant="primary" size="lg" onClick={onSubscribe}>
          Adquirí ahora
        </CTAButton>
      </div>

      <section id="detalles" className="py-12 bg-white" data-section="detalles">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Detalles</h2>
          {detailsContent}
        </div>
      </section>
    </div>
  );
}
