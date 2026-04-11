'use server'

import { getUser } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { z } from 'zod'

const ManualSubmitSchema = z.object({
  urls: z.array(z.string().url()).min(1).max(10),
  genre: z.enum(['sports', 'economy', 'gaming']),
  sub_genre: z.string().optional(),
})

interface MetaResult {
  url: string
  title: string
  media_name: string
  country: string
  country_code: string
}

async function extractMetadata(url: string): Promise<MetaResult> {
  const hostname = new URL(url).hostname

  // Known media mappings
  const mediaMap: Record<string, { name: string; country: string; code: string }> = {
    'espn.com': { name: 'ESPN', country: 'United States', code: 'US' },
    'www.espn.com': { name: 'ESPN', country: 'United States', code: 'US' },
    'bbc.co.uk': { name: 'BBC Sport', country: 'United Kingdom', code: 'GB' },
    'www.bbc.co.uk': { name: 'BBC Sport', country: 'United Kingdom', code: 'GB' },
    'bbc.com': { name: 'BBC Sport', country: 'United Kingdom', code: 'GB' },
    'www.bbc.com': { name: 'BBC Sport', country: 'United Kingdom', code: 'GB' },
    'marca.com': { name: 'Marca', country: 'Spain', code: 'ES' },
    'www.marca.com': { name: 'Marca', country: 'Spain', code: 'ES' },
    'bloomberg.com': { name: 'Bloomberg', country: 'United States', code: 'US' },
    'www.bloomberg.com': { name: 'Bloomberg', country: 'United States', code: 'US' },
    'reuters.com': { name: 'Reuters', country: 'United Kingdom', code: 'GB' },
    'www.reuters.com': { name: 'Reuters', country: 'United Kingdom', code: 'GB' },
    'asia.nikkei.com': { name: 'Nikkei Asia', country: 'Japan', code: 'JP' },
    'www.nikkei.com': { name: 'Nikkei', country: 'Japan', code: 'JP' },
    'ign.com': { name: 'IGN', country: 'United States', code: 'US' },
    'www.ign.com': { name: 'IGN', country: 'United States', code: 'US' },
    'kotaku.com': { name: 'Kotaku', country: 'United States', code: 'US' },
    'www.4gamer.net': { name: '4Gamer', country: 'Japan', code: 'JP' },
    'lequipe.fr': { name: "L'Equipe", country: 'France', code: 'FR' },
    'www.lequipe.fr': { name: "L'Equipe", country: 'France', code: 'FR' },
    'kicker.de': { name: 'Kicker', country: 'Germany', code: 'DE' },
    'www.kicker.de': { name: 'Kicker', country: 'Germany', code: 'DE' },
  }

  const media = mediaMap[hostname] ?? { name: hostname, country: 'Unknown', code: 'XX' }

  // Try to fetch the page title
  let title = url
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'MIKATA-Bot/1.0 (news aggregator)' },
    })
    clearTimeout(timeoutId)

    if (response.ok) {
      const html = await response.text()
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      if (titleMatch) {
        title = titleMatch[1].trim()
      }
    }
  } catch {
    // Failed to fetch, use URL as title
  }

  return {
    url,
    title,
    media_name: media.name,
    country: media.country,
    country_code: media.code,
  }
}

export async function submitManualArticle(formData: FormData) {
  const user = await getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = createAdminClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return { error: 'Forbidden: admin role required' }
  }

  const rawUrls = formData.get('urls')
  const rawGenre = formData.get('genre')
  const rawSubGenre = formData.get('sub_genre')

  if (typeof rawUrls !== 'string' || typeof rawGenre !== 'string') {
    return { error: 'Missing required fields' }
  }

  const urls = rawUrls
    .split('\n')
    .map((u) => u.trim())
    .filter((u) => u.length > 0)

  const parsed = ManualSubmitSchema.safeParse({
    urls,
    genre: rawGenre,
    sub_genre: typeof rawSubGenre === 'string' && rawSubGenre ? rawSubGenre : undefined,
  })

  if (!parsed.success) {
    return { error: 'Invalid input', details: parsed.error.flatten() }
  }

  // Extract metadata from each URL
  const sources = await Promise.all(parsed.data.urls.map(extractMetadata))

  // Call the generate API
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const response = await fetch(`${siteUrl}/api/articles/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({
      sources,
      genre: parsed.data.genre,
      sub_genre: parsed.data.sub_genre,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Unknown error' }))
    return { error: err.error ?? `API returned ${response.status}` }
  }

  const result = await response.json()
  return {
    success: true,
    article_id: result.article_id,
    title: result.title,
    slug: result.slug,
  }
}
