import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook de navegación
import { getAllExpositions } from "../api/ExpositionsApi";
import { toast } from "react-toastify";
import { Exposition } from "../types";
import { FaExclamationTriangle } from "react-icons/fa";

export default function UpcomingAuctions() {
  const [expositions, setExpositions] = useState<Exposition[]>([]);
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const getExpositionsFromApi = async () => {
      try {
        const expos = await getAllExpositions();
        if (Array.isArray(expos) && expos.length > 0) {
          setExpositions(expos);
        } else {
          toast.error("No se encontraron exposiciones");
        }
      } catch (error) {
        console.error("Error al obtener exposiciones:", error);
        toast.error("Hubo un problema al cargar las exposiciones");
      }
    };

    getExpositionsFromApi();
  }, []);

  return (
    <div className="py-12 px-16 bg-white shadow-md rounded-lg my-8">
      <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">
        Exposiciones recientes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expositions.length > 0 ? (
          expositions.slice(-3).map((auction, i) => (
            <div
              key={auction.id}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={`https://picsum.photos/536/354?random=${i}`}
                alt={auction.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-serif text-xl text-gray-800 mb-2">
                  {auction.titulo}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {auction.descripcion}
                </p>
                <button
                  onClick={() => navigate(`/expo/${auction.id}`)}
                  className="w-full px-4 py-2 bg-gray-800 text-white font-serif rounded-lg hover:bg-gray-900 transition duration-300 shadow-md"
                >
                  Ver Exposición
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-md w-[400px]">
              <FaExclamationTriangle className="text-gray-500 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 text-center">
                No hay exposiciones disponibles
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Actualmente no hay exposiciones activas. ¡Vuelve más tarde para
                descubrir nuevas obras!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
