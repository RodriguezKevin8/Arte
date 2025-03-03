import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getObrasByExposicion } from "../api/ExpositionsApi";
import { ObraDTO } from "../types";

export default function ObrasDeExpo() {
  const { id } = useParams<{ id: string }>();
  const [obras, setObras] = useState<ObraDTO[]>([]);

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const expositionData = await getObrasByExposicion(Number(id));
        if (expositionData) {
          console.log(expositionData);
          setObras(expositionData);
          return;
        }
      } catch (error) {
        console.error("Error al obtener las obras", error);
      }
    };
    fetchObras();
  }, [id]);

  return (
    <div className="w-full px-[100px] py-6 relative">
      <div className="absolute top-6 right-6">
        <button className="bg-blue-950 text-white px-4 py-2 rounded-md text-lg hover:bg-green-600 transition duration-300">
          Agregar tu obra de arte
        </button>
      </div>

      <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">
        Obras de la Exposición
      </h2>

      <div className="grid grid-cols-3 gap-[60px] mt-5">
        {obras.map((obra, i) => (
          <div
            key={obra.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={
                obra.imagenUrl || `https://picsum.photos/536/354?random=${i}`
              }
              alt="imagen"
            />
            <div className="p-4">
              <h3 className="font-serif text-xl text-gray-800 mb-2">
                {obra.titulo}
              </h3>
              <p className="text-gray-700 text-sm">Estilo: {obra.estilo}</p>
              <p className="text-gray-700 text-sm">
                Precio de salida: ${obra.precioSalida}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
