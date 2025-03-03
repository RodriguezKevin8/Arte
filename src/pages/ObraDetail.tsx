// src/pages/ObraAuctionDetail.tsx
import React, { useState, useEffect } from 'react';

const ObraAuctionDetail: React.FC = () => {
  // Datos de ejemplo para la obra en subasta
  const obra = {
    id: 1,
    title: "Obra Maestra en Subasta",
    description:
      "Esta obra representa la fusión de la tradición con la modernidad. Con técnicas mixtas y un enfoque vanguardista, el artista explora el contraste entre la luz y la sombra, evocando emociones profundas y reflexiones sobre la existencia.",
    imageUrl: "https://picsum.photos/id/1020/1200/800",
    artist: "Artista Ejemplo",
    year: "2023",
    dimensions: "100 x 150 cm",
    buyNowPrice: 5000,      // Precio de compra inmediata
    currentBid: 3000,       // Oferta actual de la subasta
    auctionEnd: "2025-03-01T20:00:00Z", // Fecha y hora de finalización de la subasta
  };

  // Estado para el contador de la subasta
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(obra.auctionEnd).getTime();
      const diff = endTime - now;
      if (diff <= 0) {
        setTimeLeft("Finalizada");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [obra.auctionEnd]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Imagen destacada de la obra */}
        <img
          src={obra.imageUrl}
          alt={obra.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          {/* Título y descripción */}
          <h1 className="text-4xl font-serif text-gray-800 mb-4">
            {obra.title}
          </h1>
          <p className="text-gray-600 mb-6">{obra.description}</p>
          {/* Datos adicionales */}
          <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 mb-6">
            <p>
              <span className="font-bold">Artista:</span> {obra.artist}
            </p>
            <p>
              <span className="font-bold">Año:</span> {obra.year}
            </p>
            <p>
              <span className="font-bold">Dimensiones:</span> {obra.dimensions}
            </p>
          </div>
          {/* Sección de subasta */}
          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
              <div className="mb-4 sm:mb-0">
                <p className="text-xl text-gray-800">
                  <span className="font-bold">Comprar Ahora:</span> ${obra.buyNowPrice}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Oferta Actual:</span> ${obra.currentBid}
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Finaliza en:</span> {timeLeft}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Comprar Ahora
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Participar en Subasta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObraAuctionDetail;
