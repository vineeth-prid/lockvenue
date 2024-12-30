import React from 'react';
import { MapPin } from 'lucide-react';

interface VenueMapProps {
  latitude?: number;
  longitude?: number;
  address: string;
}

export default function VenueMap({ latitude, longitude, address }: VenueMapProps) {
  const mapUrl = latitude && longitude
    ? `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_KEY&q=${latitude},${longitude}`
    : `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_KEY&q=${encodeURIComponent(address)}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center">
          <MapPin className="w-5 h-5 text-teal-600 mr-2" />
          Location
        </h2>
      </div>
      <div className="aspect-video">
        <iframe
          title="Venue Location"
          width="100%"
          height="100%"
          frameBorder="0"
          src={mapUrl}
          allowFullScreen
        />
      </div>
      <div className="p-4 bg-gray-50">
        <p className="text-gray-600">{address}</p>
      </div>
    </div>
  );
}