import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonios" className="py-16 bg-white" data-section="testimonios">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre cómo el Sistema de Seguimiento de Leads ha transformado los resultados de miles de empresas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              name={t.name}
              role={t.role}
              comment={t.comment}
              rating={t.rating}
              avatar={t.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
