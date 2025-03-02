// src/pages/Obras.tsx
import { useState } from "react";
import AddExposition from "../components/modals/AddExposition"; // Asegúrate de importar el componente correctamente

interface Exposition {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default function Obras() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Datos de ejemplo para las exposiciones (6 elementos)
  const expositions: Exposition[] = [
    {
      id: 1,
      title: "Exposición Moderna",
      description: "Descubre lo último en arte moderno.",
      imageUrl: "https://picsum.photos/id/1011/400/300",
    },
    {
      id: 2,
      title: "Clásicos del Renacimiento",
      description: "Una colección de obras maestras del Renacimiento.",
      imageUrl: "https://picsum.photos/id/1020/400/300",
    },
    {
      id: 3,
      title: "Arte Contemporáneo",
      description: "Exposición de artistas emergentes y contemporáneos.",
      imageUrl: "https://picsum.photos/id/1035/400/300",
    },
    {
      id: 4,
      title: "Fotografía en Blanco y Negro",
      description: "Capturando la esencia en contraste.",
      imageUrl: "https://picsum.photos/id/1043/400/300",
    },
    {
      id: 5,
      title: "Exposición Abstracta",
      description: "Explora el mundo abstracto.",
      imageUrl: "https://picsum.photos/id/1055/400/300",
    },
    {
      id: 6,
      title: "Exposición Minimalista",
      description: "Menos es más en esta exposición.",
      imageUrl: "https://picsum.photos/id/1065/400/300",
    },
  ];

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-80">
          <div className="bg-white p-8 rounded-lg shadow-2xl relative w-full max-w-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <AddExposition />
          </div>
        </div>
      )}

      {/* Sección para mostrar todas las exposiciones */}
      <div className="py-12">
        <header className="flex w-full ">

        <div className="w-auto flex justify-center py-2" >
        <button
          onClick={openModal}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors shadow-md"
        >
          Agregar Exposiciones
        </button>
      </div>
        <h2 className="w-[75%]  text-3xl font-serif text-gray-800 text-center mb-8">
          Exposiciones
        </h2>

        </header>
      
        {/* Se establece grid con 3 columnas y gap de 10px */}
        <div className="grid grid-cols-3 gap-[60px] mt-5">
          {expositions.map((expo) => (
            <div
              key={expo.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={expo.imageUrl}
                alt={expo.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-serif text-xl text-gray-800 mb-2">
                  {expo.title}
                </h3>
                <p className="text-gray-600 text-sm">{expo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
