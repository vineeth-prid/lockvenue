import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Building2, Plus, Edit, Trash2, MapPin, Users } from 'lucide-react';
import AddVenueModal from '../components/AddVenueModal';

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchVenues = async () => {
    const { data, error } = await supabase
      .from('venues')
      .select('*');
    
    if (!error && data) {
      setVenues(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Venue Management</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Venue</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading venues...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue: any) => (
            <div key={venue.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-teal-500 transition-colors">
              <div className="h-48 bg-gray-200 relative">
                {venue.image_url ? (
                  <img 
                    src={venue.image_url} 
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-4 right-4 space-x-2">
                  <button className="p-1.5 bg-white rounded-full text-teal-600 hover:text-teal-800 shadow-lg">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 bg-white rounded-full text-red-600 hover:text-red-800 shadow-lg">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{venue.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-teal-600" />
                    <span>{venue.city}, {venue.state}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-teal-600" />
                    <span>Capacity: {venue.capacity}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-teal-600 font-semibold">
                      ${venue.price_per_hour}/hour
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddVenueModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchVenues}
      />
    </div>
  );
}