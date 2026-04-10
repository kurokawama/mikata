"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "../../components/ui/badge";

const standardFeatures = [
  "アーカイブへのフルアクセス",
  "AI要約レポート",
  "週刊ニュースレター",
  "エキスパート・ブリーフィング",
];

const premiumFeatures = [
  "アーカイブへのフルアクセス",
  "AI解析レポート",
  "優先ニュースレター",
  "エキスパート・ブリーフィング",
  "独自取材レポート",
  "限定ポッドキャスト",
];

interface PlanCardProps {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  isPremium?: boolean;
  badge?: string;
}

function PlanCard({
  title,
  subtitle,
  price,
  period,
  features,
  ctaLabel,
  ctaHref,
  isPremium = false,
  badge,
}: PlanCardProps) {
  const [hovered, setHovered] = useState(false);

  if (isPremium) {
    return (
      <div
        className="relative rounded-xl overflow-hidden flex flex-col"
        style={{ backgroundColor: "#16213E" }}
      >
        {badge && (
          <div
            className="absolute top-0 right-0 text-xs font-semibold px-3 py-1 rounded-bl-xl tracking-wide"
            style={{
              backgroundColor: "#F59E0B",
              color: "#1A1A2E",
              fontFamily: "'Work Sans', sans-serif",
            }}
          >
            {badge}
          </div>
        )}
        <div className="p-6 pb-0 flex-1">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "#F59E0B", fontFamily: "'Work Sans', sans-serif" }}
          >
            {subtitle}
          </p>
          <h3
            className="text-xl font-bold mb-3 text-white"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            {title}
          </h3>
          <div className="flex items-baseline gap-1 mb-5">
            <span
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              {price}
            </span>
            <span
              className="text-sm text-[#9CA3AF]"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {period}
            </span>
          </div>
          <ul className="space-y-2.5 mb-6">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check
                  size={15}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "#F59E0B" }}
                />
                <span
                  className="text-sm leading-relaxed text-[#E8E8F0]"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 pt-0">
          <a
            href={ctaHref}
            className="block w-full text-center py-3 rounded-lg text-sm font-semibold transition-colors"
            style={{
              backgroundColor: hovered ? "#D97706" : "#F59E0B",
              color: "#1A1A2E",
              fontFamily: "'Work Sans', sans-serif",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.location.href = ctaHref;
              }
            }}
            role="link"
            aria-label={ctaLabel}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-xl flex flex-col"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        border: "1px solid #E5E7EB",
      }}
    >
      <div className="p-6 pb-0 flex-1">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: "#9CA3AF", fontFamily: "'Work Sans', sans-serif" }}
        >
          {subtitle}
        </p>
        <h3
          className="text-xl font-bold mb-3 text-[#1A1A2E]"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          {title}
        </h3>
        <div className="flex items-baseline gap-1 mb-5">
          <span
            className="text-4xl font-bold text-[#1A1A2E]"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            {price}
          </span>
          <span
            className="text-sm text-[#9CA3AF]"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            {period}
          </span>
        </div>
        <ul className="space-y-2.5 mb-6">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check
                size={15}
                className="mt-0.5 flex-shrink-0 text-[#22C55E]"
              />
              <span
                className="text-sm leading-relaxed text-[#4B5563]"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0">
        <a
          href={ctaHref}
          className="block w-full text-center py-3 rounded-lg text-sm font-semibold border transition-all"
          style={{
            backgroundColor: "transparent",
            color: "#1A1A2E",
            borderColor: "#1A1A2E",
            fontFamily: "'Work Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A1A2E";
            (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A2E";
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.location.href = ctaHref;
            }
          }}
          role="link"
          aria-label={ctaLabel}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}

export function PricingCards() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PlanCard
          subtitle="スタンダード"
          title="月額プラン"
          price="980"
          period="円 / 月"
          features={standardFeatures}
          ctaLabel="プランを始める"
          ctaHref="#"
        />
        <PlanCard
          subtitle="プレミアム"
          title="年額プラン"
          price="9,800"
          period="円 / 年"
          features={premiumFeatures}
          ctaLabel="今すぐ登録する"
          ctaHref="#"
          isPremium
          badge="おすすめ"
        />
      </div>
    </section>
  );
}
