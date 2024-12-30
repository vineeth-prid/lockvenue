import React from 'react';
import { MapPin } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-teal-800';
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <MapPin className={`w-6 h-6 ${variant === 'light' ? 'text-white' : 'text-teal-600'}`} />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full" />
      </div>
      <span className={`ml-2 text-xl font-bold ${textColor}`}>
        Lock<span className="text-teal-600">Venue</span>
      </span>
    </div>
  );
}