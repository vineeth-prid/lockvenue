import React from 'react';
import { Shield, Clock, Award, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your payments and personal information are always protected'
  },
  {
    icon: Clock,
    title: 'Instant Confirmation',
    description: 'Get immediate confirmation for your venue booking'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'All venues are personally verified for quality standards'
  },
  {
    icon: HeartHandshake,
    title: '24/7 Support',
    description: 'Our support team is always here to help you'
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-800">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-4">
                  <Icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-teal-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}