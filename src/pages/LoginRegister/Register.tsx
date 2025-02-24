import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  // Maneja los cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de registro (llamada al backend, validaciones, etc.)
    console.log('Registrando usuario con:', form);
    // Redirige a donde desees, por ejemplo:
    // navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
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
          Crear Cuenta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
          >
            Registrarme
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          ¿Ya tienes una cuenta?{' '}
          <a href="/auth/login" className="text-gray-800 underline">
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
