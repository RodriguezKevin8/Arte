import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { toast } from "react-toastify";
import { updateUser } from "../api/UsersApi";
import { FaUser, FaEnvelope, FaLock, FaEdit } from "react-icons/fa";
import { UpdateUserType, Work } from "../types";
import logo from "/logoart.jpg";
import {
  getobrasbyartista,
  getobrasbypropietario,
} from "../api/ExpositionsApi";

export default function ProfilePage() {
  const { user, setUser } = useGlobalContext();
  const [form, setForm] = useState({
    nombre: user.nombre,
    email: user.email,
    password: "",
  });
  const [activeTab, setActiveTab] = useState("publications");
  const [isEditing, setIsEditing] = useState(false);
  const [works, setWorks] = useState<Work[]>([]);
  const [artis, setArtist] = useState<Work[]>([]);

  useEffect(() => {
    if (!user.id) {
      toast.error("Usuario no encontrado.");
      return;
    }

    const fetchWorks = async () => {
      try {
        const data = await getobrasbypropietario(user.id);
        console.log("ojito", user.id);
        if (data) {
          setWorks(data);
          console.log("propietarios", data);
        }
      } catch (error) {
        toast.error("Error al cargar las obras.");
      }
    };

    const fetchArtist = async () => {
      try {
        const data1 = await getobrasbyartista(user.id);
        if (data1) {
          setArtist(data1);
          console.log("artistas", data1);
        }
      } catch (error) {
        toast.error("Error al cargar las obras.");
      }
    };

    fetchWorks();
    fetchArtist();
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const hasChanges =
    form.nombre !== user.nombre ||
    form.email !== user.email ||
    form.password !== "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedData: UpdateUserType = {};
    if (form.nombre.trim() && form.nombre !== user.nombre)
      updatedData.nombre = form.nombre;
    if (form.email.trim() && form.email !== user.email)
      updatedData.email = form.email;
    if (form.password.trim()) updatedData.password = form.password;

    if (Object.keys(updatedData).length === 0) {
      toast.info("No hay cambios para guardar");
      return;
    }
    try {
      const updatedUser = await updateUser(user.id, updatedData);
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      toast.success("Perfil actualizado correctamente");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      toast.error((error as any).message || "Error al actualizar el perfil");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div
        className="w-full h-56 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://picsum.photos/seed/profilecover/1600/400)",
        }}
      ></div>

      <div className="relative -mt-16 max-w-2xl w-full bg-white shadow-2xl rounded-lg border border-gray-200 p-6">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <img
            src={`https://picsum.photos/200/200?random=${user.id}`}
            alt="Avatar"
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
          />
        </div>
        <h2 className="mt-16 text-3xl font-serif text-gray-800 text-center mb-6 border-b pb-2">
          {user.nombre}
        </h2>

        <div className="text-center mb-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="py-2 px-6 bg-blue-500 text-white rounded-md"
            >
              <FaEdit className="inline-block mr-2" />
              Editar Información
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="py-2 px-6 bg-gray-500 text-white rounded-md"
            >
              Cancelar
            </button>
          )}
        </div>

        {isEditing && (
          <form onSubmit={handleSubmit} className="space-y-5 p-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-gray-700 font-medium mb-1"
              >
                <FaUser className="inline-block mr-2" />
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleInputChange}
                placeholder="Ingresa tu nombre"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                <FaEnvelope className="inline-block mr-2" />
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="Ingresa tu email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                <FaLock className="inline-block mr-2" />
                Nueva Contraseña (opcional)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleInputChange}
                placeholder="Ingresa tu nueva contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={!hasChanges}
              className={`w-full py-2 flex items-center justify-center text-white rounded-md transition ${
                hasChanges
                  ? "bg-gray-800 hover:bg-gray-900"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <FaEdit className="mr-2" />
              Actualizar Perfil
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 flex justify-center space-x-8 mb-6">
        <button
          onClick={() => setActiveTab("publications")}
          className={`py-2 px-6 rounded-md font-semibold text-lg ${
            activeTab === "publications"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Mis Publicaciones
        </button>
        <button
          onClick={() => setActiveTab("purchased")}
          className={`py-2 px-6 rounded-md font-semibold text-lg ${
            activeTab === "purchased"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Obras Compradas
        </button>
      </div>

      <div className="w-full max-w-2xl">
        {activeTab === "publications" ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Mis Publicaciones
            </h3>
            {artis.length > 0 ? (
              artis.map((obra) => (
                <div
                  key={obra.id}
                  className="bg-gray-200 p-4 rounded-md flex items-center space-x-4"
                >
                  <img
                    src={obra.imagenUrl}
                    alt={obra.titulo}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{obra.titulo}</h4>
                    <p className="text-sm text-gray-500">{obra.estilo}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tienes publicaciones aún.</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Obras Compradas
            </h3>
            {works.length > 0 ? (
              works.map((obra) => (
                <div
                  key={obra.id}
                  className="bg-gray-200 p-4 rounded-md flex items-center space-x-4"
                >
                  <img
                    src={obra.imagenUrl}
                    alt={obra.titulo}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{obra.titulo}</h4>
                    <p className="text-sm text-gray-500">{obra.estilo}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No has comprado ninguna obra aún.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
