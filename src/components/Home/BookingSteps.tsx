import React from 'react';
import { Compass, FileCheck, Home } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Compass,
    title: 'Discover and Finalize',
    description: 'Choose from a plethora of verified venues for your next event'
  },
  {
    number: 2,
    icon: FileCheck,
    title: 'Get your paperwork done',
    description: "Paperwork's on us, no need to fuss"
  },
  {
    number: 3,
    icon: Home,
    title: 'Venue Booked!',
    description: 'Relax and focus on your event planning'
  }
];

export default function BookingSteps() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-teal-800">Book Your Place In 3 Easy Steps</h2>
          <p className="text-gray-600">Book venues in major cities across the globe</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-teal-100 -translate-y-1/2" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-blue-500 text-white flex items-center justify-center mb-4 relative z-10">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-teal-800">{step.title}</h3>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}