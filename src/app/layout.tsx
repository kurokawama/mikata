import type { Metadata, Viewport } from "next";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { Newsreader, Work_Sans, Noto_Sans_JP } from "next/font/google";
import { ServiceWorkerRegister } from "@/components/pwa/sw-register";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "MIKATA - 多視点ニュース",
    template: "%s | MIKATA",
  },
  description:
    "AIが各国メディアの論調を分析し、多視点で日本語ニュースを提供するサービス",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1B2A4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${workSans.variable} ${newsreader.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <OrganizationJsonLd siteUrl={process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikata.news"} />
        {children}
        <ServiceWorkerRegister />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
