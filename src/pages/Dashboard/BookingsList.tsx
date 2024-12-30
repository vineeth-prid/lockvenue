import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Calendar } from 'lucide-react';

interface Booking {
  id: string;
  venue: {
    name: string;
  };
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
}

export default function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          booking_date,
          start_time,
          end_time,
          status,
          venue:venues(name)
        `)
        .order('booking_date', { ascending: false });

      if (!error && data) {
        setBookings(data);
      }
      setLoading(false);
    }

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No bookings yet</h3>
        <p className="text-gray-500 mt-2">When you book venues, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{booking.venue.name}</h3>
              <p className="text-gray-500">
                {new Date(booking.booking_date).toLocaleDateString()}
              </p>
              <p className="text-gray-500">
                {booking.start_time} - {booking.end_time}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking.status === 'confirmed' 
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {booking.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}