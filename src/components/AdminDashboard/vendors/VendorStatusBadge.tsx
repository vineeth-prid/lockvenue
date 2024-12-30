import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

const STATUS_STYLES = {
  active: {
    icon: Check,
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Active'
  },
  pending: {
    icon: Clock,
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'Pending'
  },
  suspended: {
    icon: AlertCircle,
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Suspended'
  }
};

interface VendorStatusBadgeProps {
  status: keyof typeof STATUS_STYLES;
}

export default function VendorStatusBadge({ status }: VendorStatusBadgeProps) {
  const style = STATUS_STYLES[status];
  const Icon = style.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <Icon className="w-3 h-3 mr-1" />
      {style.label}
    </span>
  );
}