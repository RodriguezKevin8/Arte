import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm">
          © {new Date().getFullYear()} Galería de Arte. Todos los derechos reservados.
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-gray-400 text-sm">
            Política de Privacidad
          </a>
          <a href="#" className="hover:text-gray-400 text-sm">
            Términos de Uso
          </a>
          <a href="#" className="hover:text-gray-400 text-sm">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
