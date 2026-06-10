export default function Modal({ handleCancelEdit, handleSaveChanges }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCancelEdit}
        className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Cancelar
      </button>
      <button
        onClick={handleSaveChanges}
        className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#0051FF] rounded-lg hover:bg-[#0040cc] transition-colors shadow-sm"
      >
        Guardar cambios
      </button>
    </div>
  );
}
