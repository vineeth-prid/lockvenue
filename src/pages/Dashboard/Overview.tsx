import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import BookingsList from './BookingsList';

export default function Overview() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, {user?.email}</h1>
      <BookingsList />
    </div>
  );
}