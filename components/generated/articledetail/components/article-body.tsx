'use client';

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="prose prose-sm sm:prose max-w-none">
        <div className="text-foreground space-y-6">
          <p className="text-base sm:text-lg leading-relaxed text-pretty">
            {content}
          </p>
        </div>
      </div>
    </article>
  );
}
