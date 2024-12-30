import React from 'react';
import { Star, Share2, Heart } from 'lucide-react';
import { venues } from '../../data/venues';

interface VenueBookingProps {
  id?: string;
}

export default function VenueBooking({ id }: VenueBookingProps) {
  const venue = venues.find(v => v.id === Number(id));

  if (!venue) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:sticky lg:top-24">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-xl md:text-2xl font-bold text-teal-600">
            ${venue.pricePerHour}
            <span className="text-sm md:text-base font-normal text-gray-600">/hour</span>
          </div>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 mr-1" />
            <span className="font-medium">{venue.rating}</span>
            <span className="text-gray-600 ml-1">({venue.reviews} reviews)</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full">
            <Share2 className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
          <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full">
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            className="w-full p-2.5 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              className="w-full p-2.5 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              className="w-full p-2.5 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <button className="w-full bg-teal-600 text-white py-2.5 md:py-3 rounded-lg hover:bg-teal-700 transition-colors mb-4">
        Book Now
      </button>

      <div className="text-center text-xs md:text-sm text-gray-600">
        212 students viewed this property in last 24 hours
      </div>
    </div>
  );
}