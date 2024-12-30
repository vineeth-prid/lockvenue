import React from 'react';
import { MessageSquare, Phone, Mail, MessageCircle } from 'lucide-react';

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: '2 Mins Reply',
    action: 'Chat Now',
    color: 'text-teal-600'
  },
  {
    icon: MessageCircle,
    title: 'Chat on WhatsApp',
    description: '2 Mins Reply',
    action: 'WhatsApp',
    color: 'text-teal-600'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get in touch',
    action: 'Send Email',
    color: 'text-teal-600'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: '+1 (555) 123-4567',
    action: 'Call Now',
    color: 'text-teal-600'
  }
];

export default function ContactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-teal-800">Need help? Let's connect</h2>
          <p className="text-gray-600">If you have any queries, feel free to contact us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-teal-100"
              >
                <div className="flex items-center space-x-4">
                  <div className={method.color}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal-800">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}