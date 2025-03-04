import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import SubastasSeccion from "../components/SubastasSeccion";

interface Artwork {
  id: number;
  titulo: string;
  estilo: string;
  precioSalida: number;
  imagenUrl: string;
  exposicion: number | null;
  fechaCreacion: string; // Fecha en formato ISO
}

const HomePage: React.FC = () => {
  const heroImage = "https://picsum.photos/id/1018/1600/900";
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch("http://localhost:8080/api/obras")
      .then((response) => response.json())
      .then((data: Artwork[]) => {
        const filteredArtworks = data.filter((art) => art.exposicion !== null);
        setArtworks(filteredArtworks);
      })
      .catch((error) => console.error("Error fetching artworks:", error));
  }, []);

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

      <div className="py-12 px-16">
        <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">
          Obras Destacadas
        </h2>
        <Carousel artworks={featuredArtworks.slice(0, 3)} />
      </div>

      <SubastasSeccion />

      <div className="py-12 px-16">
        <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">
          Más Obras
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <ArtworkCard key={art.id} art={art} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ArtworkCard: React.FC<{ art: Artwork; navigate: any }> = ({
  art,
  navigate,
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const fechaCreacion = new Date(art.fechaCreacion);
      const fechaCierre = new Date(fechaCreacion.getTime() + 2 * 60 * 1000); // Sumar 2 minutos
      const ahora = new Date();
      const diferencia = fechaCierre.getTime() - ahora.getTime();

      if (diferencia > 0) {
        const minutos = Math.floor(diferencia / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        setTimeLeft(`${minutos}:${segundos < 10 ? "0" : ""}${segundos}`);
      } else {
        setTimeLeft("Subasta finalizada");
      }
    };

    updateCountdown(); // Llamado inicial
    const interval = setInterval(updateCountdown, 1000); // Actualizar cada segundo

    return () => clearInterval(interval);
  }, [art.fechaCreacion]);

  return (
    <div
      key={art.id}
      className="bg-white shadow-lg rounded-lg overflow-hidden m-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={() => navigate(`/obra/${art.id}`)}
    >
      <img
        src={art.imagenUrl}
        alt={art.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-serif text-xl text-gray-800 mb-2">{art.titulo}</h3>
        <p className="text-gray-600 text-sm">{art.estilo}</p>
        <p className="text-gray-800 font-bold">${art.precioSalida}</p>
        <p
          className={`mt-2 text-lg font-bold ${
            timeLeft === "Subasta finalizada"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {timeLeft}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
