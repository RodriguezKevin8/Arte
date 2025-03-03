import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddExposition from "../components/modals/AddExposition";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { getAllExpositions } from "../api/ExpositionsApi";
import { Exposition } from "../types";
import { toast } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa"; // Icono de advertencia

export default function Obras() {
  const navigate = useNavigate();
  const [expositions, setExpositions] = useState<Exposition[]>([]);
  const { user } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full px-[100px] py-6 relative bg-gray-200 min-h-[92vh]">
      {isModalOpen && (
        <AddExposition
          setExpositions={setExpositions}
          closeModal={closeModal}
        />
      )}

      <div className="py-12 ">
        <header className="flex w-full">
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
          <h2 className="w-[75%] text-3xl font-serif text-gray-800 text-center mb-8">
            Exposiciones
          </h2>
        </header>

        <div className="grid grid-cols-3 gap-[60px] mt-5">
          {expositions.length > 0 ? (
            expositions.map((expo, i) => (
              <div
                key={expo.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                onClick={() => navigate(`/expo/${expo.id}`)}
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
                  <div className="flex flex-col text-gray-500">
                    <small>Fecha de apertura: {expo.fechaInauguracion}</small>
                    <small>Fecha de cierre: {expo.fechaClausura}</small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-10 p-8 bg-gray-100 rounded-lg shadow-md">
              <FaExclamationTriangle className="text-gray-500 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700">
                No hay exposiciones disponibles
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Actualmente no hay exposiciones activas. ¡Vuelve más tarde para
                descubrir nuevas obras!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
