import React, { useState } from 'react';
import { Plus, Building2, MapPin, Users } from 'lucide-react';
import AddVenueModal from '../../../components/vendor/AddVenueModal';

export default function VendorVenues() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Venues</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Venue</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Venue Cards */}
        {[1, 2, 3].map((venue) => (
          <div key={venue} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-teal-500 transition-colors">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Conference Hall {venue}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-teal-600" />
                  <span>Capacity: 100</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-teal-600 font-semibold">$200/hour</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddVenueModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false);
          // Refresh venues list
        }}
      />
    </div>
  );
}