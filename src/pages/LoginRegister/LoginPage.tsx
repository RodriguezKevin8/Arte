import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Login } from "../../api/UsersApi";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const LoginPage: React.FC = () => {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Maneja los cambios de los inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Esto ve que los campos no vayan vacios
    if (!form.email || !form.password) {
      toast.warn("Todos los campos son obligatorios");
      return;
    }
    try {
      // Intenta hacer el login
      const everyThingOk = await Login(form);
      if (!everyThingOk) {
        toast.error("Algo salio mal");
        return;
      }
      // Si el login es exitoso, muestra un mensaje de todo bien papu y redirige
      toast.success(
        "Bienvenido a la galería de arte " +
          (everyThingOk?.nombre || "") +
          ". Ten un buen día"
      );
      //Esto lo setea para que este disponible en toda la app
      setUser(everyThingOk!);
      //Setea el valor en el local storage y lo convierte a string porque el local storage solo recibe texto
      localStorage.setItem("userData", JSON.stringify(everyThingOk));
      //te lleva al inicio (negro)
      navigate("/");
    } catch (error) {
      // Captura el error y muestra el mensaje
      if (error instanceof Error) {
        toast.error(error.message || "Ups... Algo salió mal");
      } else {
        toast.error("Ups... Algo salió mal");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full border border-gray-200">
        {/* Logo centrado */}
        <div className="flex justify-center mb-6">
          <img
            src="/logoart.jpg"
            alt="Logo Art"
            className="w-50 h-50 object-cover rounded-full"
          />
        </div>
        <h2 className="text-3xl font-serif text-gray-800 mb-6 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Contraseña
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
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/auth/register" className="text-gray-800 underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
