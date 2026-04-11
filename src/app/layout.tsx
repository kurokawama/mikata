import type { Metadata, Viewport } from 'next'
import { Work_Sans, Newsreader, Montserrat, Noto_Sans_JP } from 'next/font/google'
import { OrganizationJsonLd } from '@/components/seo/json-ld'
import './globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['600', '700'],
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'MIKATA — 世界のミカタ | 多視点ニュース',
    template: '%s — MIKATA',
  },
  description:
    'AIが各国メディアの論調を分析し、独自解説+ソースリンクで多視点ニュースを日本語提供。同一ニュースを各国メディア視点で比較する日本初のサービス。',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName: 'MIKATA',
    locale: 'ja_JP',
    images: [{ url: '/images/logo.svg', width: 1200, height: 630, alt: 'MIKATA' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  themeColor: '#1A1A2E',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ja"
      className={`${workSans.variable} ${newsreader.variable} ${montserrat.variable} ${notoSansJP.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <OrganizationJsonLd />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`,
          }}
        />
      </body>
    </html>
  )
}
