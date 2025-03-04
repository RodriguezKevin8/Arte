import { AiOutlineWarning } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-[92vh] bg-gray-200 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <AiOutlineWarning className="text-red-500 text-6xl mb-4" />
        <h1 className="text-6xl font-bold text-gray-800">Oops!</h1>
        <p className="text-lg text-gray-600 mt-4">
          Ha ocurrido un error inesperado.
        </p>
        <p className="text-md text-gray-500 mt-2">
          Por favor, intenta nuevamente o regresa a la página principal.
        </p>
        <Link to="/">
          <button className="mt-6 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
            Regresar al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
