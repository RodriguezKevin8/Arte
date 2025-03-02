import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { toast } from "react-toastify";
import { updateUser } from "../api/UsersApi";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { UpdateUserType } from "../types";

export default function ProfilePage() {
  const { user, setUser } = useGlobalContext();
  const [form, setForm] = useState({
    nombre: user.nombre,
    email: user.email,
    password: "",
  });

  // Sincroniza el estado del formulario con los datos del usuario
  useEffect(() => {
    setForm({
      nombre: user.nombre,
      email: user.email,
      password: "",
    });
  }, [user]);

  // Maneja los cambios en los inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Verifica si hay cambios en el formulario
  const hasChanges =
    form.nombre !== user.nombre ||
    form.email !== user.email ||
    form.password !== "";

  // Maneja el envío del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Crea un objeto con solo los campos que han cambiado
    const updatedData: UpdateUserType = {};
    if (form.nombre.trim() && form.nombre !== user.nombre)
      updatedData.nombre = form.nombre;
    if (form.email.trim() && form.email !== user.email)
      updatedData.email = form.email;
    if (form.password.trim()) updatedData.password = form.password;

    // Si no hay cambios, mostrar mensaje y salir
    if (Object.keys(updatedData).length === 0) {
      toast.info("No hay cambios para guardar");
      return;
    }

    try {
      const updatedUser = await updateUser(user.id, updatedData);
      setUser(updatedUser);

      // Guardar los datos actualizados en el localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      toast.success("Perfil actualizado correctamente");
      setForm((prev) => ({ ...prev, password: "" })); // Limpia la contraseña
    } catch (error) {
      toast.error(error.message || "Error al actualizar el perfil");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Imagen de Portada */}
      <div
        className="w-full h-56 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://picsum.photos/seed/profilecover/1600/400)",
        }}
      ></div>

      {/* Tarjeta de Perfil con Avatar superpuesto */}
      <div className="relative -mt-16 max-w-2xl w-full bg-white shadow-2xl rounded-lg border border-gray-200 p-6">
        {/* Avatar */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <img
            src="/logoart.jpg"
            alt="Avatar"
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
          />
        </div>
        <h2 className="mt-16 text-3xl font-serif text-gray-800 text-center mb-6 border-b pb-2">
          Perfil de Usuario
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 p-4">
          {/* Campo Nombre */}
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

          {/* Campo Email */}
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

          {/* Campo Contraseña */}
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

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={!hasChanges}
            className={`w-full py-2 flex items-center justify-center text-white rounded-md transition ${
              hasChanges
                ? "bg-gray-800 hover:bg-gray-900"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <FaUser className="mr-2" />
            Actualizar Perfil
          </button>
        </form>
      </div>

      {/* Pie de Página Opcional para el Perfil */}
      <div className="mt-8 text-center text-gray-600 text-sm">
        <p>
          Mantén tu información actualizada para recibir mejores ofertas y
          novedades.
        </p>
      </div>
    </div>
  );
}
