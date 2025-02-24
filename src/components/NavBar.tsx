import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-800 border-b border-gray-600 shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/">
          <img
            src="/logoart.jpg"
            alt="Logo Art"
            className="w-10 h-10 object-cover rounded-full"
          />
        </Link>
        <Link to="/" className="text-2xl font-serif text-white">
          Galería de Arte
        </Link>
      </div>
      {/* Enlaces de navegación */}
      <div className="flex items-center space-x-4">
        <Link
          to="/auth/login"
          className="px-4 py-2 bg-white text-gray-800 font-serif rounded hover:bg-gray-100 transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
}
