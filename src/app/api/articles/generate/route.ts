import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { SentimentLabel } from "@/types/database";

function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface SourceItem {
  title: string;
  url: string;
  media_name: string;
  country: string;
  country_code: string;
  genre: string;
}

interface GenerateRequest {
  sources: SourceItem[];
  genre: string;
}

export async function POST(request: NextRequest) {
  // Auth check - only n8n with service role key can call this
  const authHeader = request.headers.get("Authorization");
  const expectedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: GenerateRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { sources, genre } = body;
  if (!sources || sources.length < 2) {
    return NextResponse.json({ error: "At least 2 sources required" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Look up media_source IDs by name
  const mediaNames = [...new Set(sources.map((s) => s.media_name))];
  const { data: mediaSources } = await supabase
    .from("media_sources")
    .select("id, name")
    .in("name", mediaNames);

  const mediaMap = new Map((mediaSources ?? []).map((m) => [m.name, m.id]));

  // Fallback: get first active source_id if none matched
  let fallbackSourceId: string | null = null;
  if (mediaMap.size === 0) {
    const { data: fallback } = await supabase
      .from("media_sources")
      .select("id")
      .eq("is_active", true)
      .limit(1)
      .single();
    fallbackSourceId = fallback?.id ?? null;
  }

  const primarySourceId =
    mediaMap.get(sources[0].media_name) ?? fallbackSourceId ?? (mediaSources?.[0]?.id ?? null);

  if (!primarySourceId) {
    return NextResponse.json({ error: "No media source found" }, { status: 400 });
  }

  // Build Claude prompt with quality checks
  const sourcesSummary = sources
    .map((s) => `- [${s.media_name} (${s.country})] "${s.title}" URL: ${s.url}`)
    .join("\n");

  const prompt = `あなたはニュース分析の専門家です。以下の${sources.length}つのニュースソースを分析し、多視点で比較した日本語記事を生成してください。

## ニュースソース（ジャンル: ${genre}）
${sourcesSummary}

## 品質要件
- 著作権: 原文をコピーしない。引用は要約のみ
- 事実誤認: 推測には「〜とみられる」「〜と報じられている」を使用
- バイアス: 特定の立場を擁護しない中立的な記述

## 生成形式（JSON）
{
  title: 各国の視点を反映した見出し（40文字以内）,
  summary: 全体の要旨（100文字以内）,
  content: 各ソースの視点を比較しながら解説（400-600文字）,
  sentiment_score: 0.0,
  sentiment_label: neutral,
  perspectives: [
    {
      perspective_label: 国名,
      summary: この視点の要約（60文字以内）,
      sentiment_score: 0.0,
      sentiment_label: neutral,
      source_url: URL,
      source_index: 0
    }
  ]
}

sentiment_scoreは-1.0（非常に否定的）〜1.0（非常に肯定的）。JSONのみ返してください。`;

  let articleData: {
    title: string;
    summary: string;
    content: string;
    sentiment_score: number;
    sentiment_label: SentimentLabel;
    perspectives: Array<{
      perspective_label: string;
      summary: string;
      sentiment_score: number;
      sentiment_label: SentimentLabel;
      source_url: string;
      source_index: number;
    }>;
  };

  try {
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    articleData = JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("[articles/generate] AI error:", err);
    return NextResponse.json(
      { error: "AI generation failed", details: String(err) },
      { status: 500 }
    );
  }

  // Insert article (status: draft for admin review)
  const { data: article, error: articleError } = await supabase
    .from("articles")
    .insert({
      title: articleData.title,
      summary: articleData.summary,
      content: articleData.content,
      sentiment_score: articleData.sentiment_score,
      sentiment_label: articleData.sentiment_label,
      source_id: primarySourceId,
      country_code: sources[0].country_code,
      published_at: new Date().toISOString(),
      status: "draft",
      image_url: null,
    })
    .select()
    .single();

  if (articleError || !article) {
    console.error("[articles/generate] DB insert error:", articleError);
    return NextResponse.json(
      { error: "DB insert failed", details: articleError?.message },
      { status: 500 }
    );
  }

  // Insert perspectives
  const perspectives = (articleData.perspectives ?? []).map((p) => {
    const srcIndex = p.source_index ?? 0;
    const src = sources[srcIndex];
    return {
      article_id: article.id,
      source_id: (src ? mediaMap.get(src.media_name) : null) ?? null,
      perspective_label: p.perspective_label,
      summary: p.summary,
      sentiment_score: p.sentiment_score,
      sentiment_label: p.sentiment_label,
      source_url: p.source_url ?? src?.url ?? null,
    };
  });

  if (perspectives.length > 0) {
    const { error: perspError } = await supabase
      .from("article_perspectives")
      .insert(perspectives);
    if (perspError) {
      console.warn("[articles/generate] Perspectives insert warning:", perspError);
    }
  }

  console.log(`[articles/generate] Created article ${article.id} (genre: ${genre})`);
  return NextResponse.json({
    success: true,
    article_id: article.id,
    genre,
    perspectives_count: perspectives.length,
  });
}
