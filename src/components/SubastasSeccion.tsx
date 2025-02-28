import React from 'react';

const upcomingAuctions = [
  {
    id: 1,
    title: 'Subasta de "Obra Maestra A"',
    imageUrl: 'https://picsum.photos/id/112/800/600',
    startTime: '2025-03-01T15:00:00Z', // Fecha y hora de inicio en formato ISO
  },
  {
    id: 2,
    title: 'Subasta de "Obra Maestra B"',
    imageUrl: 'https://picsum.photos/id/113/800/600',
    startTime: '2025-03-05T18:00:00Z',
  },
  {
    id: 3,
    title: 'Subasta de "Obra Maestra C"',
    imageUrl: 'https://picsum.photos/id/114/800/600',
    startTime: '2025-03-10T20:00:00Z',
  },
];

export default function UpcomingAuctions() {
  // Función para calcular el tiempo restante
  const getCountdown = (startTime: string) => {
    const now = new Date().getTime();
    const start = new Date(startTime).getTime();
    const diff = start - now;
    if (diff <= 0) return 'En vivo';
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="py-12 px-16 bg-white shadow-md rounded-lg my-8">
      <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">
        Próximas Subastas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {upcomingAuctions.map((auction) => (
          <div key={auction.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <img
              src={auction.imageUrl}
              alt={auction.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-serif text-xl text-gray-800 mb-2">
                {auction.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                Comienza en: {getCountdown(auction.startTime)}
              </p>
              <button className="px-4 py-2 bg-gray-800 text-white font-serif rounded hover:bg-gray-900 transition">
                Ver Subasta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
