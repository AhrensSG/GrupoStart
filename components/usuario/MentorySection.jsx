export default function MentorySection({ mentoriaRef }) {
  return (
    <section ref={mentoriaRef} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mentorías</h2>
        <p className="text-sm text-gray-400 mt-1">Sesiones de mentoría personalizadas</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-900">Próximamente</p>
        <p className="text-xs text-gray-400 mt-1">Las mentorías estarán disponibles muy pronto.</p>
      </div>
    </section>
  );
}
