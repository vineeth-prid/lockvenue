import React from 'react';
import { Users, Building2, Calendar, DollarSign } from 'lucide-react';
import DateRangeFilter from '../../ui/DateRangeFilter';
import { useDateRange } from '../../../hooks/useDateRange';

const stats = [
  { label: 'Total Users', value: '2,345', icon: Users, color: 'bg-blue-500' },
  { label: 'Active Venues', value: '128', icon: Building2, color: 'bg-green-500' },
  { label: 'Bookings', value: '1,205', icon: Calendar, color: 'bg-purple-500' },
  { label: 'Revenue', value: '$45,678', icon: DollarSign, color: 'bg-amber-500' },
];

export default function Overview() {
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
      
      {/* Rest of the component remains the same */}
    </div>
  );
}