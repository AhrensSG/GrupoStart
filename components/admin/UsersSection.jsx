"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UsersSection = ({ adminUid }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/admin/users?admin_uid=${adminUid}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setUsers(data)
    } catch {
      toast.error("Error al cargar los usuarios.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminUid])

  const handleRoleChange = async (id, role) => {
    setUpdatingId(id)
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_uid: adminUid, id, role }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al actualizar el rol")
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)))
      toast.success("Rol actualizado.")
    } catch (err) {
      toast.error(err.message || "Error al actualizar el rol.")
    } finally {
      setUpdatingId(null)
    }
  }

  const formatDate = (date) => {
    if (!date) return "—"
    try {
      return new Date(date).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" })
    } catch {
      return "—"
    }
  }

  const admins = users ? users.filter((u) => u.role === "admin").length : 0

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Usuarios</h2>
        <p className="text-sm text-gray-400 mt-1">Administrá los usuarios registrados y sus roles</p>
      </div>

      {users && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            <p className="text-xs text-gray-400">Usuarios registrados</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-[#0051FF]">{admins}</p>
            <p className="text-xs text-gray-400">Administradores</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-[#FB8A00]">{users.length - admins}</p>
            <p className="text-xs text-gray-400">Usuarios</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin w-6 h-6 border-4 border-[#0051FF] border-t-transparent rounded-full" />
          </div>
        ) : !users || users.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400">No hay usuarios registrados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Teléfono</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Registro</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0051FF] to-[#FB8A00] flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {(u.name || u.email || "?")[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {u.name || "Sin nombre"} {u.surname || ""}
                          </p>
                          <p className="text-xs text-gray-400 truncate lg:hidden">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                      <span className="truncate block max-w-[220px]">{u.email || "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{u.phone || "—"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={u.role}
                        disabled={updatingId === u.id}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors focus:outline-none disabled:opacity-50 ${
                          u.role === "admin"
                            ? "text-[#0051FF] bg-blue-50 border-blue-100"
                            : "text-gray-600 bg-gray-50 border-gray-200"
                        }`}
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default UsersSection;
