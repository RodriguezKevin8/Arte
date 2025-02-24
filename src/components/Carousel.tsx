// src/components/Carousel.tsx
import React, { useState, useEffect } from 'react';

interface Artwork {
  id: number;
  title: string;
  imageUrl: string;
}

interface CarouselProps {
  artworks: Artwork[];
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ artworks, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % artworks.length);
    }, interval);
    return () => clearInterval(timer);
  }, [artworks, interval]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-lg h-80">
        {artworks.map((art, index) => (
          <div
            key={art.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={art.imageUrl}
              alt={art.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              {art.title}
            </div>
          </div>
        ))}
      </div>
      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
