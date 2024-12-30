import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users } from 'lucide-react';

interface VenueCardProps {
  venue: {
    id: number;
    name: string;
    shortDescription: string;
    image: string;
    location: string;
    capacity: number;
    pricePerHour: number;
    rating: number;
    reviews: number;
  };
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link to={`/venues/${venue.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform group-hover:scale-[1.02]">
        <div className="relative h-48">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-teal-600">
            Featured
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2 text-teal-800">{venue.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{venue.shortDescription}</p>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1 text-teal-600" />
            <span>{venue.location}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-teal-700">{venue.rating}</span>
              <span className="text-gray-600 ml-1">({venue.reviews})</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1 text-teal-600" />
              <span>Up to {venue.capacity}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-teal-600 font-semibold">
              ${venue.pricePerHour}/hour
            </span>
            <button className="px-4 py-2 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}