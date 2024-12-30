import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserCircle, Mail, Phone, Save } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
      
      <div className="max-w-2xl">
        <div className="mb-8 flex items-center">
          <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mr-6">
            <UserCircle className="w-12 h-12 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user?.email}</h3>
            <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}