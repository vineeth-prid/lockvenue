import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { venues } from '../../data/venues';

interface VenueGalleryProps {
  id?: string;
}

export default function VenueGallery({ id }: VenueGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const venue = venues.find(v => v.id === Number(id));

  if (!venue) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === venue.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? venue.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative mb-8">
      {/* Main Image */}
      <div className="relative h-[300px] md:h-[480px] rounded-lg overflow-hidden">
        <img
          src={venue.images[currentImageIndex]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black/30 group hover:bg-black/40">
          <Play className="w-12 h-12 md:w-16 md:h-16 text-white opacity-80 group-hover:opacity-100" />
        </button>
      </div>

      {/* Thumbnails - Hide on mobile */}
      <div className="hidden md:grid grid-cols-6 gap-2 mt-2">
        {venue.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative h-20 rounded-md overflow-hidden ${
              index === currentImageIndex ? 'ring-2 ring-teal-500' : ''
            }`}
          >
            <img
              src={image}
              alt={`${venue.name} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        <div className="relative h-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
          <span className="text-lg font-semibold text-gray-600">+49</span>
        </div>
      </div>

      {/* Mobile Image Counter */}
      <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentImageIndex + 1}/{venue.images.length}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
      </button>
    </div>
  );
}