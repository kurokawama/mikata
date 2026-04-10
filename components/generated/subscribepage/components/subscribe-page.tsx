'use client';

import { useState } from 'react';
import Header from './sections/header';
import PricingSection from './sections/pricing-section';
import FeaturesSection from './sections/features-section';
import BrandSection from './sections/brand-section';
import Footer from './sections/footer';

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PricingSection selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
      <FeaturesSection />
      <BrandSection />
      <Footer />
    </main>
  );
}
