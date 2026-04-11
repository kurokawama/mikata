'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { getUser } from '@/lib/supabase/server'
import { z } from 'zod'

const BatchApproveSchema = z.object({
  articleIds: z.array(z.string().uuid()).min(1).max(50),
})

export async function batchApproveArticles(formData: FormData) {
  const user = await getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const supabase = createAdminClient()

  // Verify admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return { error: 'Forbidden: admin role required' }
  }

  const rawIds = formData.get('articleIds')
  if (typeof rawIds !== 'string') {
    return { error: 'Missing articleIds' }
  }

  const parsed = BatchApproveSchema.safeParse({
    articleIds: JSON.parse(rawIds) as unknown,
  })

  if (!parsed.success) {
    return { error: 'Invalid input', details: parsed.error.flatten() }
  }

  const { articleIds } = parsed.data

  const { error } = await supabase
    .from('articles')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
    })
    .in('id', articleIds)
    .eq('status', 'draft')

  if (error) {
    return { error: 'Failed to approve articles', details: error.message }
  }

  return { success: true, count: articleIds.length }
}

export async function getAdminStats() {
  const user = await getUser()
  if (!user) return null

  const supabase = createAdminClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return null

  const [drafts, published, total, sources] = await Promise.all([
    supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'draft'),
    supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published'),
    supabase
      .from('articles')
      .select('id', { count: 'exact', head: true }),
    supabase
      .from('media_sources')
      .select('id', { count: 'exact', head: true })
      .eq('active', true),
  ])

  return {
    draftCount: drafts.count ?? 0,
    publishedCount: published.count ?? 0,
    totalCount: total.count ?? 0,
    sourceCount: sources.count ?? 0,
  }
}

export async function getDraftArticles() {
  const user = await getUser()
  if (!user) return []

  const supabase = createAdminClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return []

  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, genre, sub_genre, status, sources, created_at, analysis_text, sentiment_summary')
    .in('status', ['draft', 'queued'])
    .order('created_at', { ascending: false })
    .limit(50)

  return articles ?? []
}

export async function getAllArticles() {
  const user = await getUser()
  if (!user) return []

  const supabase = createAdminClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return []

  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, genre, sub_genre, status, sources, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(100)

  return articles ?? []
}
