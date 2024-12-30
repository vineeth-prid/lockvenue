import React from 'react';
import { Star, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const venues = [
  {
    id: 1,
    name: 'Grand Conference Center',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80',
    location: 'New York City',
    rating: 4.8,
    capacity: 500,
    price: 200
  },
  {
    id: 2,
    name: 'The Modern Workshop',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    location: 'San Francisco',
    rating: 4.9,
    capacity: 100,
    price: 150
  },
  {
    id: 3,
    name: 'Skyline Event Space',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
    location: 'Chicago',
    rating: 4.7,
    capacity: 300,
    price: 180
  }
];

export default function PopularVenues() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-teal-800">Popular Venues</h2>
          <Link to="/venues" className="text-teal-600 hover:text-teal-700">
            View all venues →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <Link key={venue.id} to={`/venues/${venue.id}`} className="group">
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
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1 text-teal-600" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-teal-700">{venue.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1 text-teal-600" />
                      <span>Up to {venue.capacity}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-teal-600 font-semibold">
                      ${venue.price}/hour
                    </span>
                    <button className="px-4 py-2 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}