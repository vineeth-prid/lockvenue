import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Building2, Calendar, DollarSign, Settings, FileText } from 'lucide-react';

const navItems = [
  { to: '/vendor/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/vendor/dashboard/venues', icon: Building2, label: 'My Venues' },
  { to: '/vendor/dashboard/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/vendor/dashboard/earnings', icon: DollarSign, label: 'Earnings' },
  { to: '/vendor/dashboard/documents', icon: FileText, label: 'Documents' },
  { to: '/vendor/dashboard/settings', icon: Settings, label: 'Settings' }
];

export default function VendorDashboardLayout() {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Vendor Dashboard</h2>
                <nav className="space-y-2">
                  {navItems.map(({ to, icon: Icon, label }) => (
                    <Link
                      key={to}
                      to={to}
                      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                        isActivePath(to)
                          ? 'bg-teal-50 text-teal-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-teal-600'
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="font-medium">{label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}