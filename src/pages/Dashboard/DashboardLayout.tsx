import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Calendar, Settings, CreditCard, UserCircle } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: UserCircle, label: 'Profile', path: '/dashboard/profile' },
  { icon: CreditCard, label: 'Payments', path: '/dashboard/payments' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-teal-700 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-white font-semibold text-xl mb-6">Dashboard</h2>
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = isActivePath(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-teal-600 text-white'
                            : 'text-teal-100 hover:bg-teal-600/50 hover:text-white'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {user?.is_admin && (
                  <div className="mt-6 pt-6 border-t border-teal-600">
                    <Link
                      to="/admin"
                      className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-teal-100 hover:bg-teal-600/50 hover:text-white transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}