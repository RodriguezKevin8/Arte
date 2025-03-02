import { useState } from "react";
import AddExposition from "../components/modals/AddExposition"; // Asegúrate de importar el componente correctamente

// Componente Obras
export default function Obras() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Acá podrás encontrar las exposiciones sobre tus obras favoritas
      </h1>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Abrir Modal
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-55">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <AddExposition />
          </div>
        </div>
      )}
    </div>
  );
}
