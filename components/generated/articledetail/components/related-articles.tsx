'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface RelatedArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  title?: string;
}

export function RelatedArticles({
  articles,
  title = '関連記事',
}: RelatedArticlesProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-border">
      <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-foreground mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="relative w-full h-40 bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg?height=160&width=300';
                  }}
                />
              </div>
              <div className="p-4">
                <Badge variant="secondary" className="mb-3 bg-secondary text-secondary-foreground">
                  {article.category}
                </Badge>
                <h3 className="font-newsreader font-bold text-foreground mb-2 line-clamp-2 text-sm sm:text-base">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {article.date}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
