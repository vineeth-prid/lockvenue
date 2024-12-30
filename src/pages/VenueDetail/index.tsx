import React from 'react';
import { useParams } from 'react-router-dom';
import VenueInfo from './VenueInfo';
import VenueGallery from './VenueGallery';
import VenueBooking from './VenueBooking';

export default function VenueDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <VenueGallery id={id} />
          <VenueInfo id={id} />
        </div>
        <div>
          <VenueBooking id={id} />
        </div>
      </div>
    </div>
  );
}