import React from 'react';
import { DollarSign, TrendingUp, CreditCard, Calendar } from 'lucide-react';

const stats = [
  {
    title: "Total Earnings",
    value: "$12,450",
    change: "+20.1%",
    icon: DollarSign
  },
  {
    title: "Available Balance",
    value: "$3,890",
    change: null,
    icon: CreditCard
  },
  {
    title: "Next Payout",
    value: "$2,500",
    date: "Mar 15, 2024",
    icon: Calendar
  },
  {
    title: "Commission Rate",
    value: "10%",
    info: "Standard rate",
    icon: TrendingUp
  }
];

export default function EarningsSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-teal-600" />
              </div>
            </div>
            {stat.change && (
              <div className="mt-2">
                <span className="text-sm text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-600"> vs last month</span>
              </div>
            )}
            {stat.date && (
              <div className="mt-2 text-sm text-gray-600">
                Expected on {stat.date}
              </div>
            )}
            {stat.info && (
              <div className="mt-2 text-sm text-gray-600">
                {stat.info}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}