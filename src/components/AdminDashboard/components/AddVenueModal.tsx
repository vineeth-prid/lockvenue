import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface AddVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddVenueModal({ isOpen, onClose, onSuccess }: AddVenueModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: '',
    capacity: '',
    pricePerHour: '',
    minimumHours: '2',
    imageUrl: '',
    images: ['', '', ''], // Additional images
    amenities: [] as string[],
    features: {
      totalArea: '',
      ceilingHeight: '',
      parking: '',
      catering: '',
      accessibility: '',
      setupTime: '',
      cleanupTime: '',
      noiseRestrictions: '',
      insurance: '',
      wifi: '',
      audioVisual: '',
      kitchen: '',
      restrooms: '',
      stage: '',
      outdoorSpace: '',
      powerOutlets: '',
      lighting: '',
      climateControl: '',
      storage: ''
    },
    policies: {
      cancellation: '',
      payment: '',
      security: '',
      cleaning: '',
      noise: '',
      smoking: '',
      decorations: '',
      catering: '',
      insurance: ''
    },
    availability: {
      monday: { start: '', end: '' },
      tuesday: { start: '', end: '' },
      wednesday: { start: '', end: '' },
      thursday: { start: '', end: '' },
      friday: { start: '', end: '' },
      saturday: { start: '', end: '' },
      sunday: { start: '', end: '' }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('venues')
        .insert([{
          name: formData.name,
          description: formData.description,
          short_description: formData.shortDescription,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          capacity: parseInt(formData.capacity),
          price_per_hour: parseFloat(formData.pricePerHour),
          minimum_hours: parseInt(formData.minimumHours),
          image_url: formData.imageUrl,
          images: formData.images,
          amenities: formData.amenities,
          features: formData.features,
          policies: formData.policies,
          availability: formData.availability
        }]);

      if (error) throw error;
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding venue:', error);
    }
  };

  const amenityOptions = [
    'WiFi', 'Parking', 'Kitchen', 'AV Equipment', 'Stage', 'Outdoor Space',
    'Catering Kitchen', 'Sound System', 'Dance Floor', 'VIP Lounge',
    'Dressing Room', 'Green Room', 'Loading Dock', 'Elevator',
    'Wheelchair Accessible', 'Security System', 'Climate Control'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Venue</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-4">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-4">Location</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Capacity and Pricing */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-4">Capacity and Pricing</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  required
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Hour ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Hours
                </label>
                <input
                  type="number"
                  required
                  value={formData.minimumHours}
                  onChange={(e) => setFormData({ ...formData, minimumHours: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-4">Images</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              {formData.images.map((url, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Image URL {index + 1}
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      const newImages = [...formData.images];
                      newImages[index] = e.target.value;
                      setFormData({ ...formData, images: newImages });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-4">Amenities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenityOptions.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={(e) => {
                      const newAmenities = e.target.checked
                        ? [...formData.amenities, amenity]
                        : formData.amenities.filter(a => a !== amenity);
                      setFormData({ ...formData, amenities: newAmenities });
                    }}
                    className="rounded border-gray-300 text-teal-600"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Add Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}