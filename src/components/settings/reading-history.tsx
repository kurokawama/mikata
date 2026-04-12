import Link from "next/link";
import { BookOpen } from "lucide-react";

interface ReadingHistoryItem {
  article_id: string;
  read_at: string;
  articles: {
    title: string;
    genre: string | null;
  } | null;
}

export function ReadingHistory({ items }: { items: ReadingHistoryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        まだ記事を読んでいません
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {items.map((item) => (
        <li key={item.article_id} className="py-3">
          <Link
            href={`/article/${item.article_id}`}
            className="flex items-start gap-3 group"
          >
            <BookOpen className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary truncate transition-colors">
                {item.articles?.title ?? "（削除済み記事）"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {new Date(item.read_at).toLocaleDateString("ja-JP", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {item.articles?.genre && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs">
                    {item.articles.genre}
                  </span>
                )}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
