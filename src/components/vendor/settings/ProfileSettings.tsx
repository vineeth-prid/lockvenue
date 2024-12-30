import React, { useState } from 'react';
import { Save, Building } from 'lucide-react';
import { useVendorProfile } from '../../../hooks/useVendorProfile';

export default function ProfileSettings() {
  const { profile, updateProfile, loading } = useVendorProfile();
  const [formData, setFormData] = useState(profile || {
    businessName: '',
    contactPerson: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person
            </label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          {/* Add other profile fields */}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </form>
  );
}