"use client";

import { ModuleCard } from "./ModuleCard";

export function ContentSection({
  modules,
  detailsContent,
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

      <section id="detalles" className="py-12 bg-white" data-section="detalles">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Detalles</h2>
          {detailsContent}
        </div>
      </section>
    </div>
  );
}
