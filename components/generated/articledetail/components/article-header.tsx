'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface ArticleHeaderProps {
  title: string;
  subtitle: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

export function ArticleHeader({
  title,
  subtitle,
  category,
  date,
  author,
  readTime,
}: ArticleHeaderProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="w-full bg-white border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Category Badge */}
        <div className="mb-4">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {category}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="font-newsreader text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4 leading-tight text-balance">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed text-balance">
          {subtitle}
        </p>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div>{author}</div>
            <div className="flex gap-3">
              <span>{date}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? 'text-red-500' : ''}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? 'text-accent' : ''}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
