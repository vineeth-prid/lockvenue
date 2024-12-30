import React from 'react';
import { Bell, Settings, Mail, Calendar, AlertCircle } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'booking',
    title: 'New Booking Request',
    message: 'New booking request for Grand Conference Center',
    time: '5 minutes ago',
    icon: Calendar,
    read: false
  },
  {
    id: 2,
    type: 'system',
    title: 'System Update',
    message: 'System maintenance scheduled for tonight',
    time: '1 hour ago',
    icon: Settings,
    read: false
  },
  {
    id: 3,
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from John Doe',
    time: '2 hours ago',
    icon: Mail,
    read: true
  },
  {
    id: 4,
    type: 'alert',
    title: 'Payment Failed',
    message: 'Payment failed for booking #12345',
    time: '3 hours ago',
    icon: AlertCircle,
    read: true
  }
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <button className="text-teal-600 hover:text-teal-700 font-medium">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`bg-white p-4 rounded-lg border ${
                notification.read ? 'border-gray-200' : 'border-teal-500 bg-teal-50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full ${
                  notification.read ? 'bg-gray-100' : 'bg-teal-100'
                } flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${
                    notification.read ? 'text-gray-600' : 'text-teal-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-semibold ${
                        notification.read ? 'text-gray-900' : 'text-teal-900'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className={`text-sm ${
                        notification.read ? 'text-gray-600' : 'text-teal-600'
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}