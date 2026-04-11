'use client'

import { useState, useTransition } from 'react'
import { batchApproveArticles } from './actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  CheckCircle,
  Clock,
  FileText,
  Eye,
  Loader2,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Database,
} from 'lucide-react'
import type { ArticleSource, SentimentSummary, ArticleStatus } from '@/types/database'

interface ArticleRow {
  id: string
  title: string
  genre: string
  sub_genre: string | null
  status: ArticleStatus
  sources: ArticleSource[]
  created_at: string
  analysis_text: string | null
  sentiment_summary: SentimentSummary | null
}

interface Stats {
  draftCount: number
  publishedCount: number
  totalCount: number
  sourceCount: number
}

function SentimentIcon({ label }: { label: string }) {
  if (label === 'positive') return <TrendingUp size={12} className="text-[#22C55E]" />
  if (label === 'negative') return <TrendingDown size={12} className="text-[#EF4444]" />
  return <Minus size={12} className="text-[#9CA3AF]" />
}

function SentimentBar({ summary }: { summary: SentimentSummary | null }) {
  if (!summary) return null
  const total = summary.positive + summary.negative + summary.neutral
  if (total === 0) return null
  return (
    <div className="flex h-1 w-full rounded-full overflow-hidden" role="img" aria-label="論調バー">
      <div className="bg-[#22C55E]" style={{ width: `${(summary.positive / total) * 100}%` }} />
      <div className="bg-[#EF4444]" style={{ width: `${(summary.negative / total) * 100}%` }} />
      <div className="bg-[#9CA3AF]" style={{ width: `${(summary.neutral / total) * 100}%` }} />
    </div>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const genreLabels: Record<string, string> = {
  sports: 'スポーツ',
  economy: '経済',
  gaming: 'ゲーム',
}

export function AdminDashboard({
  drafts,
  stats,
}: {
  drafts: ArticleRow[]
  stats: Stats
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null)

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (selectedIds.size === drafts.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(drafts.map((d) => d.id)))
    }
  }

  function handleBatchApprove() {
    if (selectedIds.size === 0) return

    startTransition(async () => {
      const formData = new FormData()
      formData.set('articleIds', JSON.stringify(Array.from(selectedIds)))
      const res = await batchApproveArticles(formData)
      setResult(res)
      if ('success' in res && res.success) {
        setSelectedIds(new Set())
      }
    })
  }

  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-[#1A1A2E] flex items-center justify-between px-5 shrink-0">
        <h1 className="text-lg font-bold text-white font-[family-name:var(--font-montserrat)]">
          MIKATA Admin
        </h1>
        <div className="flex items-center gap-1.5 text-[11px] text-white/50 font-[family-name:var(--font-work-sans)]">
          <RefreshCw size={11} />
          <span>Content Engine</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-[#F8F9FA]" aria-label="管理画面">
        <div className="max-w-[1200px] mx-auto px-5 py-6">

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6" role="region" aria-label="統計">
            {[
              { label: '下書き', value: stats.draftCount, icon: Clock, color: 'text-[#F59E0B]' },
              { label: '公開済み', value: stats.publishedCount, icon: CheckCircle, color: 'text-[#22C55E]' },
              { label: '記事合計', value: stats.totalCount, icon: FileText, color: 'text-[#1A1A2E]' },
              { label: 'メディアソース', value: stats.sourceCount, icon: Database, color: 'text-[#3B82F6]' },
            ].map((stat) => (
              <Card key={stat.label} className="border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon size={14} className={stat.color} />
                    <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-[family-name:var(--font-work-sans)]">
                      {stat.label}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-[#1A1A2E] font-[family-name:var(--font-newsreader)]">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="mb-6 bg-[#E5E7EB]" />

          {/* Draft approval section */}
          <Card className="border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
                  <CardTitle className="text-[13px] font-bold text-[#1A1A2E] font-[family-name:var(--font-work-sans)]">
                    エディトリアルキュー
                  </CardTitle>
                  <Badge className="bg-[#FEF3C7] text-[#D97706] border-0 text-[10px] font-bold px-1.5 py-0 h-4">
                    {drafts.length} 件待機中
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAll}
                    className="text-xs h-7"
                  >
                    {selectedIds.size === drafts.length ? '全解除' : '全選択'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleBatchApprove}
                    disabled={selectedIds.size === 0 || isPending}
                    className="bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] text-xs h-7 font-bold"
                  >
                    {isPending ? (
                      <Loader2 size={14} className="animate-spin mr-1" />
                    ) : (
                      <CheckCircle size={14} className="mr-1" />
                    )}
                    一括承認 ({selectedIds.size})
                  </Button>
                </div>
              </div>
            </CardHeader>

            {result?.error && (
              <div className="mx-5 mb-3 text-xs text-[#EF4444] bg-red-50 px-3 py-2 rounded">
                {result.error}
              </div>
            )}
            {result?.success && (
              <div className="mx-5 mb-3 text-xs text-[#22C55E] bg-green-50 px-3 py-2 rounded">
                承認完了しました。ページをリロードしてください。
              </div>
            )}

            <CardContent className="p-0">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-3 px-5 py-2.5 bg-[#F8F9FA] border-y border-[#E5E7EB]">
                <div className="col-span-1 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]" />
                <div className="col-span-5 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] font-[family-name:var(--font-work-sans)]">
                  記事タイトル
                </div>
                <div className="col-span-2 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] font-[family-name:var(--font-work-sans)]">
                  ジャンル
                </div>
                <div className="col-span-1 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] font-[family-name:var(--font-work-sans)]">
                  視点数
                </div>
                <div className="col-span-1 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] font-[family-name:var(--font-work-sans)]">
                  論調
                </div>
                <div className="col-span-2 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] font-[family-name:var(--font-work-sans)] text-right">
                  アクション
                </div>
              </div>

              {/* Rows */}
              {drafts.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-[#9CA3AF]">
                  承認待ちの記事はありません
                </div>
              ) : (
                <ul role="list" className="divide-y divide-[#F3F4F6]">
                  {drafts.map((article) => (
                    <li
                      key={article.id}
                      className="grid grid-cols-12 gap-3 px-5 py-3.5 items-center hover:bg-[#F8F9FA] transition-colors"
                    >
                      {/* Checkbox */}
                      <div className="col-span-1">
                        <Checkbox
                          checked={selectedIds.has(article.id)}
                          onCheckedChange={() => toggleSelect(article.id)}
                          aria-label={`${article.title}を選択`}
                        />
                      </div>

                      {/* Title + meta */}
                      <div className="col-span-5 min-w-0">
                        <p className="text-[13px] font-semibold text-[#1A1A2E] truncate font-[family-name:var(--font-work-sans)]">
                          {article.title}
                        </p>
                        <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                          {formatDate(article.created_at)}
                        </p>
                      </div>

                      {/* Genre */}
                      <div className="col-span-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {genreLabels[article.genre] ?? article.genre}
                        </Badge>
                      </div>

                      {/* Perspectives count */}
                      <div className="col-span-1">
                        <span className="text-[12px] text-[#4B5563] font-[family-name:var(--font-work-sans)]">
                          {article.sources?.length ?? 0}
                        </span>
                      </div>

                      {/* Sentiment */}
                      <div className="col-span-1">
                        <SentimentBar summary={article.sentiment_summary} />
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex items-center justify-end gap-1.5">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className="p-1.5 text-[#9CA3AF] hover:text-[#1A1A2E] hover:bg-[#F3F4F6] rounded-md transition-colors"
                              aria-label={`${article.title}をプレビュー`}
                            >
                              <Eye size={14} />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="font-[family-name:var(--font-newsreader)] text-xl">
                                {article.title}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex gap-2">
                                <Badge>{genreLabels[article.genre] ?? article.genre}</Badge>
                                <Badge variant="outline">
                                  {article.sources?.length ?? 0} 視点
                                </Badge>
                              </div>

                              {article.sentiment_summary && (
                                <div className="flex items-center gap-3 text-xs text-[#4B5563]">
                                  <SentimentBar summary={article.sentiment_summary} />
                                  <span className="text-[#22C55E]">+{article.sentiment_summary.positive}</span>
                                  <span className="text-[#EF4444]">-{article.sentiment_summary.negative}</span>
                                  <span className="text-[#9CA3AF]">={article.sentiment_summary.neutral}</span>
                                </div>
                              )}

                              <Separator />

                              <div className="text-sm leading-relaxed text-[#1A1A2E] whitespace-pre-wrap">
                                {article.analysis_text ?? '本文なし'}
                              </div>

                              <Separator />

                              <div>
                                <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
                                  各国視点
                                </h3>
                                <ul className="space-y-2">
                                  {(article.sources ?? []).map((src, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 text-sm border border-[#E5E7EB] rounded-lg p-3"
                                    >
                                      <SentimentIcon label={src.sentiment} />
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-semibold text-[#1A1A2E]">
                                            {src.country}/{src.media_name}
                                          </span>
                                        </div>
                                        <p className="text-[#4B5563] mt-0.5">
                                          {src.summary_80chars}
                                        </p>
                                        <a
                                          href={src.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-[#F59E0B] hover:text-[#D97706] text-xs flex items-center gap-0.5 mt-1"
                                        >
                                          <ExternalLink size={10} />
                                          ソースを開く
                                        </a>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Manual submit link */}
          <div className="mt-6 text-center">
            <a
              href="/admin/manual-submit"
              className="inline-flex items-center gap-1.5 text-sm text-[#F59E0B] hover:text-[#D97706] font-semibold transition-colors"
            >
              <FileText size={14} />
              手動投入フォーム
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
