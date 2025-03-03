import { useEffect, useState } from "react";
import { getAllExpositions } from "../api/ExpositionsApi";
import { toast } from "react-toastify";
import { Exposition } from "../types";

export default function UpcomingAuctions() {
  // Función para calcular el tiempo restante
  const [expositions, setExpositions] = useState<Exposition[]>([]);
  useEffect(() => {
    try {
      const getExpositionsFromApi = async () => {
        const expos = await getAllExpositions();
        if (expos) {
          setExpositions(expos);
          return;
        }
        toast.error("No pudimos obtener las imagenes");
      };
      getExpositionsFromApi();
    } catch (error) {
      console.error(error);
    }
  }, [expositions]);

  return (
    <div className="py-12 px-16 bg-white shadow-md rounded-lg my-8">
      <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">
        Exposiciones recientes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expositions.length > 0 ? (
          expositions?.slice(-3).map((auction, i) => (
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

                <button className="px-4 py-2 bg-gray-800 text-white font-serif rounded hover:bg-gray-900 transition">
                  Ver Subasta
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl font-bold p-2">
            No hay exposiciones disponibles :(
          </p>
        )}
      </div>
    </div>
  );
}
