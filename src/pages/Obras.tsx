// src/pages/Obras.tsx
import { useEffect, useState } from "react";
import AddExposition from "../components/modals/AddExposition"; // Asegúrate de importar el componente correctamente
import { useGlobalContext } from "../hooks/useGlobalContext";
import { getAllExpositions } from "../api/ExpositionsApi";
import { Exposition } from "../types";
import { toast } from "react-toastify";

export default function Obras() {
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

  const { user } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    // Usamos w-full y px-[30px] para tener un margen fijo de 30px en ambos lados
    <div className="w-full px-[100px] py-6 relative">
      {/* Botón fijo para Agregar Exposiciones */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 opacity-80">
          <div className="bg-white p-8 rounded-lg shadow-2xl relative w-full max-w-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <AddExposition setExpositions={setExpositions} />
          </div>
        </div>
      )}

      {/* Sección para mostrar todas las exposiciones */}
      <div className="py-12">
        <header className="flex w-full ">
          {user.id !== 0 && (
            <div className="w-auto flex justify-center py-2">
              <button
                onClick={openModal}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors shadow-md"
              >
                Agregar Exposiciones
              </button>
            </div>
          )}

          <h2 className="w-[75%]  text-3xl font-serif text-gray-800 text-center mb-8">
            Exposiciones
          </h2>
        </header>

        {/* Se establece grid con 3 columnas y gap de 10px */}
        <div className="grid grid-cols-3 gap-[60px] mt-5">
          {expositions.map((expo, i) => (
            <div
              key={expo.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={`https://picsum.photos/536/354?random=${i}`}
                alt="imagen"
              />
              <div className="p-4">
                <h3 className="font-serif text-xl text-gray-800 mb-2">
                  {expo.titulo}
                </h3>
                <p className="text-gray-700 text-sm">{expo.descripcion}</p>
                <div className="flex flex-col text-gray-500 ">
                  <small>Fecha de apertura: {expo.fechaInauguracion}</small>
                  <small>Fecha de cierre: {expo.fechaClausura}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
