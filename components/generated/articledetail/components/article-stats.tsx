'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ArticleStatsProps {
  title: string;
  stats: StatItem[];
}

export function ArticleStats({ title, stats }: ArticleStatsProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-foreground mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-4 sm:p-6 border border-border bg-white hover:shadow-sm transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-montserrat font-semibold text-foreground">
                  {stat.label}
                </p>
                {stat.highlight && (
                  <Badge className="bg-accent text-accent-foreground">
                    注目
                  </Badge>
                )}
              </div>
              <p className="font-newsreader text-2xl sm:text-3xl font-bold text-primary">
                {stat.value}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
