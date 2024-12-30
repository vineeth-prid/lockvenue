import React, { useState } from 'react';
import { Bell, Save } from 'lucide-react';
import { useVendorNotifications } from '../../../hooks/useVendorNotifications';

export default function NotificationSettings() {
  const { settings, updateSettings, loading } = useVendorNotifications();
  const [notifications, setNotifications] = useState(settings || {
    email: {
      bookings: true,
      payouts: true,
      reviews: true,
      updates: false
    },
    push: {
      bookings: true,
      payouts: true,
      reviews: false,
      updates: false
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(notifications);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
            <div className="space-y-4">
              {Object.entries(notifications.email).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{key}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      email: { ...notifications.email, [key]: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
            <div className="space-y-4">
              {Object.entries(notifications.push).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{key}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      push: { ...notifications.push, [key]: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </button>
      </div>
    </form>
  );
}