"use client";

import { ModuleCard } from "./ModuleCard";
import { TabNavigation } from "./TabNavigation";

export function ContentSection({
  modules,
  detailsContent,
}) {
  const tabs = [
    {
      id: "contenido",
      label: "Contenido",
      content: (
        <div id="detalles" className="space-y-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              moduleNumber={module.number}
              title={module.title}
              description={module.description}
            />
          ))}
        </div>
      ),
    },
    {
      id: "detalles",
      label: "Detalles",
      content: detailsContent,
    },
  ];

  return (
    <section id="contenido" className="py-12 bg-gray-50" data-section="contenido">
      <div className="container mx-auto px-4">
        <TabNavigation tabs={tabs} defaultTab="contenido" />
      </div>
    </section>
  );
}
