import React from 'react';
import { Building2, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import DateRangeFilter from '../../../components/ui/DateRangeFilter';
import { useDateRange } from '../../../hooks/useDateRange';

const stats = [
  { label: 'Active Venues', value: '5', icon: Building2, color: 'bg-blue-500' },
  { label: 'Total Bookings', value: '128', icon: Calendar, color: 'bg-green-500' },
  { label: 'Revenue', value: '$12,450', icon: DollarSign, color: 'bg-purple-500' },
  { label: 'Commission Rate', value: '10%', icon: TrendingUp, color: 'bg-amber-500' },
];

export default function VendorOverview() {
  const { startDate, endDate, handleDateChange } = useDateRange();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 mr-4`}>
                  <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-medium text-gray-900">New booking received</p>
                <p className="text-sm text-gray-600">Conference Hall A - March 15, 2024</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Confirmed
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}