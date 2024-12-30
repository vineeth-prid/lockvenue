import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

const STATUS_STYLES = {
  completed: {
    icon: Check,
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Completed'
  },
  pending: {
    icon: Clock,
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'Pending'
  },
  failed: {
    icon: AlertCircle,
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Failed'
  }
};

export default function PayoutHistory() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Payout History</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {[
          { amount: 2500, date: '2024-03-01', status: 'completed' },
          { amount: 1800, date: '2024-02-15', status: 'completed' },
          { amount: 3200, date: '2024-02-01', status: 'completed' }
        ].map((payout, index) => {
          const status = STATUS_STYLES[payout.status as keyof typeof STATUS_STYLES];
          const StatusIcon = status.icon;
          
          return (
            <div key={index} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">${payout.amount}</p>
                <p className="text-sm text-gray-600">
                  {new Date(payout.date).toLocaleDateString()}
                </p>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full ${status.bg} ${status.text}`}>
                <StatusIcon className="w-4 h-4 mr-1.5" />
                <span className="text-sm font-medium">{status.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}