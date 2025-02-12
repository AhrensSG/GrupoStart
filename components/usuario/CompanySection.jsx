import { useState } from "react";
import Modal from "./Modal";

export default function CompanySection({ userData, handleInputChange, setUserData, handleCancelEdit, handleSaveChanges }) {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className="bg-white rounded-xl md:w-2/3 xs:w-full max-xs:w-full xs:h-fit max-xs:h-auto max-xs:m-1 xs:m-2 md:m-0 border-black p-3 relative md:my-2 h-fit">
            <h3 className="text-xl font-bold text-orange-500">Datos de la Empresa</h3>

            <button className="absolute top-0 right-0 mt-2 mr-2 p-2">
                <svg viewBox="0 0 512 512" id="pencil" width={30} height={30} onClick={() => setIsEditing(!isEditing)}>
                    <path
                        fill="#0853fc"
                        d="M64 368v80h80l235.727-235.729-79.999-79.998L64 368zm377.602-217.602c8.531-8.531 8.531-21.334 0-29.865l-50.135-50.135c-8.531-8.531-21.334-8.531-29.865 0l-39.468 39.469 79.999 79.998 39.469-39.467z"
                        class="color010101 svgShape"
                    ></path>
                </svg>
            </button>
            <form className="grid md:grid-cols-2 gap-4 grid-cols-1">
                <label className="block col-span-2">
                    Nombre de la Empresa:
                    <input
                        type="text"
                        name="nombreDeEmpresa"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.nombreDeEmpresa}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block md:col-span-1 col-span-2">
                    Rubro al que pertenece:
                    <input
                        type="text"
                        name="rubro"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.rubro}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block md:col-span-1 col-span-2">
                    Número de celular:
                    <input
                        type="tel"
                        name="celularEmpresa"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.celularEmpresa}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block md:col-span-1 col-span-2">
                    Dirección:
                    <input
                        type="text"
                        name="direccionEmpresa"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.direccionEmpresa}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block md:col-span-1 col-span-2">
                    Altura:
                    <input
                        type="text"
                        name="alturaEmpresa"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.alturaEmpresa}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block md:col-span-1 col-span-2">
                    Departamento (opcional):
                    <input
                        type="text"
                        name="deptoEmpresa"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.deptoEmpresa}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block md:col-span-1 col-span-2">
                    Usuario de Facebook de la Empresa:
                    <input
                        type="text"
                        name="facebookEmpresa"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.facebookEmpresa}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block md:col-span-1 col-span-2">
                    Usuario de Instagram de la Empresa:
                    <input
                        type="text"
                        name="instagramEmpresa"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.instagramEmpresa}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block md:col-span-1 col-span-2">
                    Usuario de TikTok de la Empresa:
                    <input
                        type="text"
                        name="tiktokEmpresa"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.tiktokEmpresa}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block md:col-span-1 col-span-2">
                    Competidor Directo:
                    <input
                        type="text"
                        name="competidorEmpresa"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={userData.competidorEmpresa}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </label>
                <label className="block xl:col-span-1 col-span-2">
                    Rango de edades de clientes:
                    <div className="flex space-x-2 mt-2">
                        <input
                            type="number"
                            name="edadMin"
                            placeholder="Mín"
                            className="mt-1 py-2 border border-gray-300 rounded w-full"
                            value={userData.edadesEmpresa.min}
                            onChange={(e) => setUserData({ ...userData, edadesEmpresa: { ...userData.edadesEmpresa, min: e.target.value } })}
                            readOnly={!isEditing}
                        />
                        <span> hasta </span>
                        <input
                            type="number"
                            name="edadMax"
                            placeholder="Máx"
                            className="mt-1 py-2 border border-gray-300 rounded w-full"
                            value={userData.edadesEmpresa.max}
                            onChange={(e) => setUserData({ ...userData, edadesEmpresa: { ...userData.edadesEmpresa, max: e.target.value } })}
                            readOnly={!isEditing}
                        />
                    </div>
                </label>
                <label className="block xl:col-span-1 col-span-2 space-y-2">
                    Horario de atención por la mañana:
                    <div className="flex space-x-2 mt-2">
                        <input
                            type="time"
                            name="horarioAperturaManana"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            value={userData.horarioAtencion.manana.apertura}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    horarioAtencion: {
                                        ...userData.horarioAtencion,
                                        manana: { ...userData.horarioAtencion.manana, apertura: e.target.value },
                                    },
                                })
                            }
                            readOnly={!isEditing}
                        />
                        <span> hasta </span>
                        <input
                            type="time"
                            name="horarioCierreManana"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            value={userData.horarioAtencion.manana.cierre}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    horarioAtencion: {
                                        ...userData.horarioAtencion,
                                        manana: { ...userData.horarioAtencion.manana, cierre: e.target.value },
                                    },
                                })
                            }
                            readOnly={!isEditing}
                        />
                    </div>
                </label>
                <label className="block xl:col-span-1 col-span-2 space-y-2">
                    Horario de atención por la tarde:
                    <div className="flex space-x-2 mt-2">
                        <input
                            type="time"
                            name="horarioAperturaTarde"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            value={userData.horarioAtencion.tarde.apertura}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    horarioAtencion: {
                                        ...userData.horarioAtencion,
                                        tarde: { ...userData.horarioAtencion.tarde, apertura: e.target.value },
                                    },
                                })
                            }
                            readOnly={!isEditing}
                        />
                        <span> hasta </span>
                        <input
                            type="time"
                            name="horarioCierreTarde"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            value={userData.horarioAtencion.tarde.cierre}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    horarioAtencion: {
                                        ...userData.horarioAtencion,
                                        tarde: { ...userData.horarioAtencion.tarde, cierre: e.target.value },
                                    },
                                })
                            }
                            readOnly={!isEditing}
                        />
                    </div>
                </label>
            </form>
            {isEditing && (
                <Modal
                    handleCancelEdit={handleCancelEdit}
                    handleSaveChanges={async () => {
                        let isTrue = await handleSaveChanges("company");
                        if (isTrue) {
                            setIsEditing(false);
                        }
                    }}
                />
            )}
        </div>
    );
}
