import { Header } from '../components/header'
import { HeroSection } from '../components/hero-section'
import { ArticlesGrid } from '../components/articles-grid'
import { CtaSection } from '../components/cta-section'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ArticlesGrid />
      <CtaSection />
      <Footer />
    </div>
  )
}
