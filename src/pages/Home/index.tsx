import React from 'react';
import Hero from '../../components/Home/Hero';
import PopularVenues from '../../components/Home/PopularVenues';
import Features from '../../components/Home/Features';
import BookingSteps from '../../components/Home/BookingSteps';
import Partnership from '../../components/Home/Partnership';
import ContactSection from '../../components/Home/ContactSection';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <PopularVenues />
      <Features />
      <BookingSteps />
      <Partnership />
      <ContactSection />
      <Footer />
    </div>
  );
}