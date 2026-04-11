import type { Article } from '@/types/database'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mikata.media'

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'MIKATA',
    alternateName: '世界のミカタ',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description:
      'AIが各国メディアの論調を分析し、独自解説+ソースリンクで多視点ニュースを日本語提供。同一ニュースを各国メディア視点で比較する日本初のサービス。',
    foundingDate: '2026',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${SITE_URL}/about`,
      availableLanguage: ['Japanese'],
    },
    publishingPrinciples: `${SITE_URL}/legal/editorial-policy`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function NewsArticleJsonLd({ article }: { article: Article }) {
  const genre = article.genre
  const subGenre = article.sub_genre ?? 'general'
  const articleUrl = `${SITE_URL}/${genre}/${subGenre}/${article.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.analysis_text
      ? article.analysis_text.slice(0, 160)
      : undefined,
    url: articleUrl,
    datePublished: article.published_at,
    dateModified: article.updated_at ?? article.published_at,
    author: {
      '@type': 'Organization',
      name: 'MIKATA',
      url: SITE_URL,
      description: 'AI分析による独自記事',
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'MIKATA',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    isAccessibleForFree: true,
    inLanguage: 'ja',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
