import React, { useState, useEffect } from "react"; // Añade useEffect
import { useGlobalContext } from "../hooks/useGlobalContext";
import { toast } from "react-toastify";
import { updateUser } from "../api/UsersApi";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

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
  }, [user]); // Este efecto se ejecuta cada vez que `user` cambia

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

    // Validación: No permitir campos vacíos (excepto la contraseña)
    if (!form.nombre || !form.email) {
      toast.warn("Nombre y correo electrónico son obligatorios");
      return;
    }

    // Si no hay cambios, muestra un mensaje y no hace la solicitud
    if (!hasChanges) {
      toast.info("No hay cambios para guardar");
      return;
    }

    try {
      // Llama a la función updateUser para actualizar los datos
      const updatedUser = await updateUser(user.id, {
        nombre: form.nombre,
        email: form.email,
        password: form.password || undefined, // Solo envía la contraseña si se proporciona
      });

      // Actualiza el estado global del usuario
      setUser(updatedUser);

      // Muestra un mensaje de éxito
      toast.success("Perfil actualizado correctamente");

      // Limpia el campo de la contraseña después de la actualización
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      // Muestra un mensaje de error si algo sale mal
      toast.error(error.message || "Error al actualizar el perfil");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Formulario de perfil */}
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 border border-gray-200">
        <h2 className="text-3xl font-serif text-gray-800 mb-6 text-center">
          Perfil de Usuario
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo para el nombre */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder={user.nombre ? "" : "Ingresa tu nombre"}
              required
            />
          </div>

          {/* Campo para el email */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder={user.email ? "" : "Ingresa tu email"}
              required
            />
          </div>

          {/* Campo para la contraseña */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className={`w-full py-2 ${
              hasChanges ? "bg-gray-800" : "bg-gray-400 cursor-not-allowed"
            } text-white rounded-md hover:bg-gray-900 transition flex items-center justify-center`}
            disabled={!hasChanges}
          >
            <FaUser className="mr-2" />
            Actualizar Perfil
          </button>
        </form>
      </div>
    </div>
  );
}
