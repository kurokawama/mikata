import type { ArticleWithSource } from "@/types/database";

interface OrganizationJsonLdProps {
  siteUrl: string;
}

export function OrganizationJsonLd({ siteUrl }: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MIKATA",
    url: siteUrl,
    description:
      "AIが各国メディアの論調を分析し、多視点で日本語ニュースを提供するサービス",
    logo: `${siteUrl}/icons/icon-512x512.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface NewsArticleJsonLdProps {
  article: ArticleWithSource;
  siteUrl: string;
}

export function NewsArticleJsonLd({ article, siteUrl }: NewsArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    datePublished: article.published_at,
    dateModified: article.published_at,
    author: {
      "@type": "Organization",
      name: "MIKATA",
    },
    publisher: {
      "@type": "Organization",
      name: "MIKATA",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icons/icon-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/article/${article.id}`,
    },
    ...(article.image_url && { image: article.image_url }),
    isAccessibleForFree: false,
    hasPart: {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".article-content",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
