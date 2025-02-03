import { useState } from "react";
import Modal from "./Modal";

export default function UserForm({ userData, handleInputChange, handleCancelEdit, handleSaveChanges }) {
    const [isEditing, setIsEditing] = useState(false);
    const [nombre, setNombre] = useState(userData.nombres || "");
    const [apellido, setApellido] = useState(userData.apellido || "");
    const [email, setEmail] = useState(userData.email || "");
    const [fechaNacimiento, setFechaNacimiento] = useState(userData.fechaNacimiento || "");
    const [pais, setPais] = useState(userData.pais || "");
    const [celular, setCelular] = useState(userData.celular || "");
    return (
        <div className="bg-white rounded-xl md:w-1/3 xs:w-full max-xs:w-full max-xs:m-1 xs:m-2 md:0 xs:h-fit max-xs:h-auto border-black p-3 relative">
            <h3 className="text-xl font-bold text-orange-500">Datos Personales</h3>
            <button className="absolute top-0 right-0 mt-2 mr-2">
                <svg
                    viewBox="0 0 512 512"
                    id="pencil"
                    width={30}
                    height={30}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex flex-row justify-between"
                >
                    <path
                        fill="#0853fc"
                        d="M64 368v80h80l235.727-235.729-79.999-79.998L64 368zm377.602-217.602c8.531-8.531 8.531-21.334 0-29.865l-50.135-50.135c-8.531-8.531-21.334-8.531-29.865 0l-39.468 39.469 79.999 79.998 39.469-39.467z"
                        class="color010101 svgShape"
                    ></path>
                </svg>
            </button>
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
                        readOnly={!isEditing}
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

            {isEditing && (
                <Modal
                    handleCancelEdit={handleCancelEdit}
                    handleSaveChanges={async () => {
                        let isTrue = await handleSaveChanges("user");
                        if (isTrue) {
                            setIsEditing(false);
                        }
                    }}
                />
            )}
        </div>
    );
}
