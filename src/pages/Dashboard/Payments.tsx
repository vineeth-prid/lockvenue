import React from 'react';
import { CreditCard, DollarSign } from 'lucide-react';

const transactions = [
  {
    id: 1,
    venue: 'Grand Conference Center',
    date: '2024-03-15',
    amount: 450,
    status: 'completed'
  },
  {
    id: 2,
    venue: 'The Modern Workshop',
    date: '2024-03-10',
    amount: 280,
    status: 'pending'
  }
];

export default function Payments() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-teal-100">Total Spent</p>
              <p className="text-3xl font-bold">$1,280</p>
            </div>
            <DollarSign className="w-8 h-8 text-teal-100" />
          </div>
          <p className="text-sm text-teal-100">Last payment on March 15, 2024</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600">Payment Method</p>
              <p className="text-lg font-medium">Visa ending in 4242</p>
            </div>
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
          <button className="text-teal-600 text-sm font-medium hover:text-teal-700">
            Update payment method
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{transaction.venue}</p>
                <p className="text-sm text-gray-600">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${transaction.amount}</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  transaction.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}