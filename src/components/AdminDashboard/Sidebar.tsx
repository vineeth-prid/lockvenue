import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Calendar, 
  Settings,
  LayoutDashboard,
  FileText,
  DollarSign,
  Bell,
  Store
} from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/vendors', icon: Store, label: 'Vendors' },
  { to: '/admin/venues', icon: Building2, label: 'Venues' },
  { to: '/admin/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/admin/revenue', icon: DollarSign, label: 'Revenue' },
  { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' }
];

export default function Sidebar() {
  return (
    <aside className="bg-teal-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-teal-100 hover:bg-teal-600/50 hover:text-white'
                }`
              }
            >
              <Icon strokeWidth={2} className="w-5 h-5 shrink-0" />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}