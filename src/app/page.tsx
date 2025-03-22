"use client";

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PropertySearch from '@/components/PropertySearch';
import FeaturedProperties from '@/components/FeaturedProperties';
import CommercialProperties from '@/components/CommercialProperties';
import Services from '@/components/Services';
import SoldProperties from '@/components/SoldProperties';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <PropertySearch />
      <FeaturedProperties />
      <CommercialProperties />
      <Services />
      <SoldProperties />
      <Testimonials />
      <Footer />
    </main>
  );
}
