import React from 'react';
import { DollarSign, TrendingUp, CreditCard, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DateRangeFilter from '../../../components/ui/DateRangeFilter';
import { useDateRange } from '../../../hooks/useDateRange';
import EarningsSummary from '../../../components/vendor/EarningsSummary';
import PayoutHistory from '../../../components/vendor/PayoutHistory';

export default function VendorEarnings() {
  const { startDate, endDate, handleDateChange } = useDateRange();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Earnings Overview</h2>
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />
      </div>

      <EarningsSummary />
      
      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Earnings Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#0D9488" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <PayoutHistory />
    </div>
  );
}