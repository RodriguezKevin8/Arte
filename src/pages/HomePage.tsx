// src/pages/HomePage.tsx
import React from "react";
import Carousel from "../components/Carousel";
import SubastasSeccion from "../components/SubastasSeccion";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  const heroImage = "https://picsum.photos/id/1018/1600/900";

  const featuredArtworks = [
    {
      id: 1,
      title: "Obra Maestra 1",
      imageUrl: "https://picsum.photos/id/1025/800/600",
    },
    {
      id: 2,
      title: "Obra Maestra 2",
      imageUrl: "https://picsum.photos/id/1035/800/600",
    },
    {
      id: 3,
      title: "Obra Maestra 3",
      imageUrl: "https://picsum.photos/id/1043/800/600",
    },
  ];

  const moreArtworks = [
    {
      id: 4,
      title: "Obra Maestra 4",
      imageUrl: "https://picsum.photos/id/1050/800/600",
    },
    {
      id: 5,
      title: "Obra Maestra 5",
      imageUrl: "https://picsum.photos/id/1060/800/600",
    },
    {
      id: 6,
      title: "Obra Maestra 6",
      imageUrl: "https://picsum.photos/id/1070/800/600",
    },
    {
      id: 7,
      title: "Obra Maestra 7",
      imageUrl: "https://picsum.photos/id/1080/800/600",
    },
    {
      id: 8,
      title: "Obra Maestra 8",
      imageUrl: "https://picsum.photos/id/1090/800/600",
    },
    {
      id: 9,
      title: "Obra Maestra 9",
      imageUrl: "https://picsum.photos/id/110/800/600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Sección Hero */}
      <div
        className="bg-cover bg-center h-96 flex items-center justify-center mb-4"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded">
          <h1 className="text-5xl font-serif text-white mb-4 text-center">
            Bienvenido a Galería de Arte
          </h1>
          <p className="text-xl text-gray-200 text-center">
            Descubre obras maestras y piezas únicas
          </p>
        </div>
      </div>

      {/* Sección de Obras Destacadas: Carousel */}
      <div className="py-12 px-16">
        <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">
          Obras Destacadas
        </h2>
        <Carousel artworks={featuredArtworks} />
      </div>

      {/* Sección de Próximas Subastas */}
      <SubastasSeccion />

      {/* Sección en Grid de Obras */}
      <div className="py-12 px-16">
        <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">
          Más Obras
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moreArtworks.map((art) => (
            <div
              key={art.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden m-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-serif text-xl text-gray-800 mb-2">
                  {art.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  Una descripción breve de la obra que resalta sus
                  características.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
