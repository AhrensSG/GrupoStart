export default function CoursesSection({ cursosRef }) {
  return (
    <section ref={cursosRef} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mis Cursos</h2>
        <p className="text-sm text-gray-400 mt-1">Accedé a tus cursos y contenidos</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-900">Próximamente</p>
        <p className="text-xs text-gray-400 mt-1">Los cursos estarán disponibles muy pronto.</p>
      </div>
    </section>
  );
}
