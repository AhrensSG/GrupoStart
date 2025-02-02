export default function UserForm({ isEditing, userData, handleInputChange }) {
    return (
        <form className="space-y-3">
            <label className="block">
                Nombres:
                <input
                    type="text"
                    name="nombres"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={userData.nombres}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </label>
            <label className="block">
                Apellido:
                <input
                    type="text"
                    name="apellido"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={userData.apellido}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </label>
            <label className="block">
                Correo Electrónico Personal:
                <input
                    type="email"
                    name="email"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={userData.email}
                    onChange={handleInputChange}
                    readOnly
                />
            </label>
            <label className="block">
                Fecha de Nacimiento:
                <input
                    type="date"
                    name="fechaNacimiento"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={userData.fechaNacimiento}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </label>
            <label className="block">
                País:
                <input
                    type="text"
                    name="pais"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={userData.pais}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </label>
            <label className="block">
                Número de Celular:
                <input
                    type="tel"
                    name="celular"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={userData.celular}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </label>
        </form>
    );
}
