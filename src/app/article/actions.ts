"use server";

import { createClient, getUser } from "@/lib/supabase/server";
import { z } from "zod";

const articleIdSchema = z.string().uuid("無効な記事IDです");

export async function toggleBookmark(
  _state: { bookmarked: boolean; error?: string } | null,
  formData: FormData
) {
  const user = await getUser();
  if (!user) {
    return { bookmarked: false, error: "ログインが必要です" };
  }

  const articleId = formData.get("articleId");
  const parsed = articleIdSchema.safeParse(articleId);
  if (!parsed.success) {
    return { bookmarked: false, error: "無効な記事IDです" };
  }

  const supabase = await createClient();

  // Check if already bookmarked
  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("article_id", parsed.data)
    .single();

  if (existing) {
    await supabase.from("bookmarks").delete().eq("id", existing.id);
    return { bookmarked: false };
  }

  const { error } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    article_id: parsed.data,
  });

  if (error) {
    return { bookmarked: false, error: "ブックマークに失敗しました" };
  }

  return { bookmarked: true };
}
