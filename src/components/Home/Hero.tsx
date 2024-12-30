import React from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[85vh] bg-gradient-to-r from-teal-600 to-blue-500">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80"
          alt="Modern Venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-blue-900/80"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold text-white mb-6">
            Find Your Perfect Venue
            <span className="block text-4xl mt-2 text-coral-300">For Every Occasion</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Book unique venues for meetings, conferences, celebrations, and more. 
            Join thousands of happy customers who trust us.
          </p>
          
          <div className="bg-white rounded-lg p-4 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center border rounded-md p-3 focus-within:border-teal-500">
                  <MapPin className="h-5 w-5 text-teal-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Where do you need a venue?"
                    className="w-full outline-none text-gray-800"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center border rounded-md p-3 focus-within:border-teal-500">
                  <Calendar className="h-5 w-5 text-teal-500 mr-2" />
                  <input
                    type="date"
                    className="w-full outline-none text-gray-800"
                  />
                </div>
              </div>
              <button className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}