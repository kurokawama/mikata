import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { z } from 'zod'
import Anthropic from '@anthropic-ai/sdk'
import pLimit from 'p-limit'

// ---------- Zod Schemas ----------

const SourceInput = z.object({
  url: z.string().url(),
  title: z.string().min(1),
  media_name: z.string().min(1),
  country: z.string().min(1),
  country_code: z.string().length(2),
})

const GenerateRequest = z.object({
  sources: z.array(SourceInput).min(1).max(10),
  genre: z.enum(['sports', 'economy', 'gaming']),
  sub_genre: z.string().optional(),
})

type SourceInputType = z.infer<typeof SourceInput>

// ---------- Constants ----------

const RATE_LIMIT = pLimit(2)
const BACKOFF_DELAYS = [30_000, 60_000, 120_000]

// ---------- Helpers ----------

async function computePromptHash(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80) + '-' + Date.now().toString(36)
}

function buildPrompt(sources: SourceInputType[], genre: string): string {
  const sourceList = sources
    .map(
      (s, i) =>
        `${i + 1}. [${s.country}/${s.media_name}] "${s.title}" (${s.url})`
    )
    .join('\n')

  return `あなたはMIKATAの記事生成AIです。以下のソース情報を基に、多国間視点の比較分析記事を日本語で生成してください。

## ジャンル: ${genre}

## ソース一覧:
${sourceList}

## 出力形式（JSON）:
{
  "title": "日本語の記事タイトル（30-60字）",
  "analysis_text": "独自分析テキスト（800-1200字）。各国メディアの論調を比較し、日本の読者向けに解説する。元記事の表現をそのまま再現しない。事実と分析を明確に区別する。",
  "perspectives": [
    {
      "country": "国名",
      "country_code": "XX",
      "media_name": "メディア名",
      "source_url": "URL",
      "summary_80chars": "80字以内の要約。このメディアの論調と主張を簡潔にまとめる",
      "sentiment_label": "positive|negative|neutral"
    }
  ],
  "sentiment_summary": {
    "positive": 0,
    "negative": 0,
    "neutral": 0
  }
}

## ルール:
- perspectives は各ソースに対して1つずつ生成（2-5件）
- sentiment_summary はperspectivesの集計（合計=perspectives数）
- 政治的な主張や評価は含めない
- 元記事の著作権を侵害する表現は使わない
- JSONのみ出力。説明文や装飾は不要`
}

async function callClaudeWithBackoff(
  client: Anthropic,
  prompt: string,
  attempt = 0
): Promise<string> {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text response from Claude')
    }
    return textBlock.text
  } catch (error: unknown) {
    const isRateLimit =
      error instanceof Anthropic.RateLimitError ||
      (error instanceof Error && 'status' in error && (error as { status: number }).status === 429)

    if (isRateLimit && attempt < BACKOFF_DELAYS.length) {
      const delay = BACKOFF_DELAYS[attempt]
      await new Promise((resolve) => setTimeout(resolve, delay))
      return callClaudeWithBackoff(client, prompt, attempt + 1)
    }
    throw error
  }
}

const GeneratedArticle = z.object({
  title: z.string(),
  analysis_text: z.string(),
  perspectives: z.array(
    z.object({
      country: z.string(),
      country_code: z.string(),
      media_name: z.string(),
      source_url: z.string(),
      summary_80chars: z.string(),
      sentiment_label: z.enum(['positive', 'negative', 'neutral']),
    })
  ),
  sentiment_summary: z.object({
    positive: z.number(),
    negative: z.number(),
    neutral: z.number(),
  }),
})

// ---------- POST Handler ----------

export async function POST(request: NextRequest) {
  // Auth: check for admin API key or admin JWT
  const authHeader = request.headers.get('authorization')
  const supabase = createAdminClient()

  // Service key auth (for n8n/internal calls)
  const isServiceAuth =
    authHeader === `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`

  if (!isServiceAuth) {
    // JWT auth: verify user is admin
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const token = authHeader.slice(7)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  // Validate request body
  const body = await request.json().catch(() => null)
  const parsed = GenerateRequest.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { sources, genre, sub_genre } = parsed.data

  // Compute prompt hash for dedup
  const promptInput = JSON.stringify({ sources, genre, sub_genre })
  const promptHash = await computePromptHash(promptInput)

  // Check for duplicate
  const { data: existing } = await supabase
    .from('articles')
    .select('id')
    .eq('ai_prompt_hash', promptHash)
    .limit(1)

  if (existing && existing.length > 0) {
    return NextResponse.json(
      { error: 'Duplicate article already exists', article_id: existing[0].id },
      { status: 409 }
    )
  }

  // Check ANTHROPIC_API_KEY
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured' },
      { status: 500 }
    )
  }

  const anthropic = new Anthropic({ apiKey })

  // Generate article with rate limiting
  const prompt = buildPrompt(sources, genre)

  let generatedText: string
  try {
    generatedText = await RATE_LIMIT(() =>
      callClaudeWithBackoff(anthropic, prompt)
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Claude API call failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }

  // Parse Claude response
  let article: z.infer<typeof GeneratedArticle>
  try {
    // Extract JSON from possible markdown code blocks
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in response')
    article = GeneratedArticle.parse(JSON.parse(jsonMatch[0]))
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to parse response'
    return NextResponse.json(
      { error: 'Failed to parse Claude response', details: message },
      { status: 502 }
    )
  }

  // Build sources JSONB from perspectives
  const sourcesJson = article.perspectives.map((p) => ({
    country: p.country,
    country_code: p.country_code,
    media_name: p.media_name,
    url: p.source_url,
    summary_80chars: p.summary_80chars,
    sentiment: p.sentiment_label,
  }))

  const slug = buildSlug(article.title)

  // Insert article
  const { data: newArticle, error: insertError } = await supabase
    .from('articles')
    .insert({
      slug,
      title: article.title,
      genre,
      sub_genre: sub_genre ?? null,
      analysis_text: article.analysis_text,
      sources: sourcesJson,
      sentiment_summary: article.sentiment_summary,
      status: 'draft',
      ai_model: 'claude-sonnet-4-20250514',
      ai_prompt_hash: promptHash,
    })
    .select('id')
    .single()

  if (insertError || !newArticle) {
    return NextResponse.json(
      { error: 'Failed to insert article', details: insertError?.message },
      { status: 500 }
    )
  }

  // Insert perspectives
  const perspectiveRows = article.perspectives.map((p) => ({
    article_id: newArticle.id,
    country: p.country,
    country_code: p.country_code,
    media_name: p.media_name,
    source_url: p.source_url,
    summary_80chars: p.summary_80chars,
    sentiment_label: p.sentiment_label as 'positive' | 'negative' | 'neutral',
  }))

  const { error: perspError } = await supabase
    .from('article_perspectives')
    .insert(perspectiveRows)

  if (perspError) {
    // Article created but perspectives failed — log but don't fail
    console.error('Failed to insert perspectives:', perspError.message)
  }

  return NextResponse.json({
    success: true,
    article_id: newArticle.id,
    slug,
    title: article.title,
    perspectives_count: article.perspectives.length,
  })
}
