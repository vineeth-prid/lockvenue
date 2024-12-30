import React from 'react';
import { Link } from 'react-router-dom';

export default function Partnership() {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-teal-100">
            <h3 className="text-2xl font-bold mb-3 text-teal-800">Partner With Us</h3>
            <p className="text-gray-600 mb-6">
              At LockVenue, we offer a seamless booking process and robust sales support.
            </p>
            <Link
              to="/partner"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Partner With Us
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-teal-100">
            <h3 className="text-2xl font-bold mb-3 text-teal-800">List With Us</h3>
            <p className="text-gray-600 mb-6">
              List your properties efficiently with LockVenue and reach more customers.
            </p>
            <Link
              to="/list-property"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              List Properties
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}