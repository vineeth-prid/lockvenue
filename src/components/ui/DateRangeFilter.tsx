import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
  className?: string;
}

export default function DateRangeFilter({ startDate, endDate, onDateChange, className = '' }: DateRangeFilterProps) {
  return (
    <div className={`flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-2 ${className}`}>
      <Calendar className="w-4 h-4 text-teal-600" />
      <input
        type="date"
        value={startDate ? startDate.toISOString().split('T')[0] : ''}
        onChange={(e) => onDateChange(e.target.value ? new Date(e.target.value) : null, endDate)}
        className="border-0 text-sm focus:ring-0 text-gray-600 bg-transparent"
        placeholder="Start date"
      />
      <span className="text-gray-400">to</span>
      <input
        type="date"
        value={endDate ? endDate.toISOString().split('T')[0] : ''}
        onChange={(e) => onDateChange(startDate, e.target.value ? new Date(e.target.value) : null)}
        className="border-0 text-sm focus:ring-0 text-gray-600 bg-transparent"
        placeholder="End date"
      />
    </div>
  );
}