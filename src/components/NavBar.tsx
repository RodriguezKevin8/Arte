import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { IoLogOut } from "react-icons/io5";

export default function NavBar() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

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
        <Link to="/obras" className="text-lg font-serif text-white">
          Exposiciones
        </Link>
        {user.id !== 0 ? (
          <>
            <Link
              to="/perfil"
              className="px-4 py-2 bg-white text-gray-800 font-serif rounded hover:bg-gray-200 transition flex items-center space-x-2 hover:scale-110"
            >
              <FaUser />
              <span>Perfil</span>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("userData");
                navigate("/");
                window.location.reload();
              }}
              className="px-4 py-2 bg-white text-gray-800 font-serif rounded cursor-pointer transition hover:bg-red-500 flex items-center space-x-2 hover:scale-110 hover:text-white"
            >
              <IoLogOut size={25} />
              <span>Cerrar sesión</span>
            </button>
          </>
        ) : (
          <Link
            to="/auth/login"
            className="px-4 py-2 bg-white text-gray-800 font-serif rounded hover:bg-gray-200 transition-colors"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
