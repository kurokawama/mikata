'use client';

import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface ArticleHeroProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ArticleHero({ src, alt, caption }: ArticleHeroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-96 bg-muted flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">画像を読み込めません</p>
        </div>
      </div>
    );
  }

  return (
    <figure className="w-full relative">
      {isLoading && <Skeleton className="w-full h-96" />}
      <div className={`relative overflow-hidden ${isLoading ? 'hidden' : 'block'}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-96 object-cover"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      </div>
      {caption && (
        <figcaption className="py-3 px-4 sm:px-6 bg-secondary text-secondary-foreground text-sm border-b border-border">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
