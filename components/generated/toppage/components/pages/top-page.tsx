"use client";

import { Header } from "./header";
import { Hero } from "./hero";
import { FeaturedGrid } from "./featured-grid";
import { CTASection } from "./cta-section";
import { Footer } from "./footer";

export default function TopPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Featured Grid */}
      <FeaturedGrid />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
