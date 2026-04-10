import { Header } from "./components/header"
import { PerspectivesHero } from "./components/perspectives-hero"
import { CountriesGrid } from "./components/countries-grid"
import { PremiumCTA } from "./components/premium-cta"
import { Footer } from "./components/footer"

export default function PerspectivesPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F9FA" }}>
      <Header />
      <main id="main-content" className="flex-1">
        <PerspectivesHero />
        <CountriesGrid />
        <PremiumCTA />
      </main>
      <Footer />
    </div>
  )
}
