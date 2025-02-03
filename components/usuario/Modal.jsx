export default function Modal({ handleCancelEdit, handleSaveChanges }) {
    return (
        <div className="xs:space-x-2  max-xs:space-x-0 mt-4 ">
            <div className="flex justify-between mt-4">
                <button className="bg-red-500 text-white xs:p-2 max-xs:p-1 rounded" onClick={handleCancelEdit}>
                    Cancelar
                </button>
                <button className="bg-blue-500 text-white xs:p-2 max-xs:p-1 rounded" onClick={handleSaveChanges}>
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
}
