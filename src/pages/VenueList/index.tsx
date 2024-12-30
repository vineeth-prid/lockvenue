import React from 'react';
import VenueCard from './VenueCard';
import { venues } from '../../data/venues';

export default function VenueList() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Available Venues</h1>
          <p className="text-gray-600 mt-2">Find and book the perfect venue for your next event</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}