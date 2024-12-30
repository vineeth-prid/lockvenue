import React from 'react';
import { MapPin, Users, Clock, Wifi, Tv, DoorClosed, Calendar } from 'lucide-react';
import { venues } from '../../data/venues';
import VenueMap from './VenueMap';

interface VenueInfoProps {
  id?: string;
}

export default function VenueInfo({ id }: VenueInfoProps) {
  const venue = venues.find(v => v.id === Number(id));

  if (!venue) return null;

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{venue.name}</h1>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 text-teal-600 mr-2" />
          <span>{venue.location}</span>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <Users className="w-6 h-6 text-teal-600 mr-3" />
          <div>
            <div className="text-sm text-gray-600">Capacity</div>
            <div className="font-medium">{venue.capacity} people</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <Clock className="w-6 h-6 text-teal-600 mr-3" />
          <div>
            <div className="text-sm text-gray-600">Duration</div>
            <div className="font-medium">Minimum 2 hours</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <Calendar className="w-6 h-6 text-teal-600 mr-3" />
          <div>
            <div className="text-sm text-gray-600">Availability</div>
            <div className="font-medium">24/7</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <DoorClosed className="w-6 h-6 text-teal-600 mr-3" />
          <div>
            <div className="text-sm text-gray-600">Access</div>
            <div className="font-medium">Keycard</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-4">About this venue</h2>
        <p className="text-gray-600 leading-relaxed">{venue.description}</p>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Venue Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(venue.features).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {venue.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                {index % 2 === 0 ? (
                  <Wifi className="w-4 h-4 text-teal-600" />
                ) : (
                  <Tv className="w-4 h-4 text-teal-600" />
                )}
              </div>
              <span className="text-gray-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <VenueMap 
        address={`${venue.location}`}
      />
    </div>
  );
}