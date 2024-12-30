import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Calendar, Search } from 'lucide-react';
import DateRangeFilter from '../../ui/DateRangeFilter';
import { useDateRange } from '../../../hooks/useDateRange';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { startDate, endDate, handleDateChange } = useDateRange();

  useEffect(() => {
    const fetchBookings = async () => {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          venues (name),
          users (email)
        `);

      // Only apply date filters if dates are selected
      if (startDate) {
        query = query.gte('booking_date', startDate.toISOString());
      }
      if (endDate) {
        query = query.lte('booking_date', endDate.toISOString());
      }
      
      const { data, error } = await query;
      
      if (!error && data) {
        setBookings(data);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [startDate, endDate]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
        <div className="flex items-center space-x-4">
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
}