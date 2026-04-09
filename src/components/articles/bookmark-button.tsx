"use client";

import { useActionState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleBookmark } from "@/app/article/actions";

interface BookmarkButtonProps {
  articleId: string;
  initialBookmarked: boolean;
}

export function BookmarkButton({ articleId, initialBookmarked }: BookmarkButtonProps) {
  const [state, formAction, isPending] = useActionState(toggleBookmark, {
    bookmarked: initialBookmarked,
  });

  const isBookmarked = state?.bookmarked ?? initialBookmarked;

  return (
    <form action={formAction}>
      <input type="hidden" name="articleId" value={articleId} />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        disabled={isPending}
        className={isBookmarked ? "text-amber-600 border-amber-300" : ""}
      >
        {isBookmarked ? (
          <BookmarkCheck className="mr-1 h-4 w-4" />
        ) : (
          <Bookmark className="mr-1 h-4 w-4" />
        )}
        {isBookmarked ? "保存済み" : "保存"}
      </Button>
    </form>
  );
}
