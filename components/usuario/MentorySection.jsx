export default function MentorySection({ mentoriaRef }) {
    return (
        <section ref={mentoriaRef} className="w-full flex flex-col space-y-6">
            <h2 className="text-orange-500 font-bold text-2xl">Mis mentorías</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-orange-500">Mentorías</h2>
                <span className="justify-center items-center text-center">PROXIMAMENTE</span>
            </div>
        </section>
    );
}
