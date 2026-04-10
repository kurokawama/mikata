import { SubscribeNav } from "./components/subscribe-nav";
import { PricingCards } from "./components/pricing-cards";
import { TrustSection } from "./components/trust-section";
import { SubscribeFooter } from "./components/subscribe-footer";

export default function SubscribePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      {/* Navigation */}
      <SubscribeNav />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="w-full py-16 sm:py-20 text-center"
          aria-label="サブスクリプション"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            {/* Alert banner */}
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded text-sm"
              style={{
                backgroundColor: "#FEF3C7",
                borderLeft: "3px solid #F59E0B",
              }}
            >
              <span style={{ color: "#EF4444", fontSize: "18px" }}>▶</span>
              <span
                className="text-[#1A1A2E]"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                あなたは月に24回以上の記事を購読されました
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A2E] leading-tight mb-4 text-balance"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              世界のミカタを、もっと深く
            </h1>
          </div>
        </section>

        {/* Pricing Cards */}
        <PricingCards />

        {/* Guarantee quote */}
        <section
          className="w-full py-10 text-center"
          aria-label="解約保証"
        >
          <div className="mx-auto max-w-xl px-4">
            <blockquote
              className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] text-balance"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              「いつでも即解約可能」
            </blockquote>
          </div>
        </section>

        {/* Trust section */}
        <TrustSection />

        {/* Big watermark section */}
        <section
          className="w-full py-12 overflow-hidden"
          aria-hidden="true"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div
              className="relative flex items-center justify-center rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#E8E8F0",
                minHeight: "140px",
              }}
            >
              <span
                className="select-none text-[clamp(48px,12vw,140px)] font-bold tracking-widest text-[#D1D5DB] leading-none py-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                JOURNALISM
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SubscribeFooter />
    </div>
  );
}
