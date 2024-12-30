import React from 'react';
import { Check, Clock, Calendar, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: "Find Your Perfect Venue",
    description: "Browse through our curated selection of venues and find the perfect space for your event."
  },
  {
    icon: Clock,
    title: "Choose Your Time",
    description: "Select your preferred date and time slot. Our real-time availability system ensures accurate booking."
  },
  {
    icon: CreditCard,
    title: "Secure Your Booking",
    description: "Complete your booking with our secure payment system. Instant confirmation guaranteed."
  },
  {
    icon: Check,
    title: "You're All Set!",
    description: "Receive immediate confirmation and access details for your venue. Our support team is always here to help."
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">How It Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Booking your perfect venue is simple and straightforward with our easy-to-follow process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-teal-100" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-teal-500 transition-colors">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-teal-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-teal-800 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-teal-800 mb-2">How do I pay for my booking?</h3>
                <p className="text-gray-600">We accept all major credit cards and secure online payments. Payment is required at the time of booking.</p>
              </div>
              <div>
                <h3 className="font-semibold text-teal-800 mb-2">What's your cancellation policy?</h3>
                <p className="text-gray-600">Free cancellation up to 48 hours before your booking. Please check specific venue policies for details.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-teal-800 mb-2">Can I modify my booking?</h3>
                <p className="text-gray-600">Yes, you can modify your booking up to 24 hours in advance, subject to availability.</p>
              </div>
              <div>
                <h3 className="font-semibold text-teal-800 mb-2">Is there a minimum booking duration?</h3>
                <p className="text-gray-600">Minimum booking duration varies by venue. Most venues require a minimum of 2 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}