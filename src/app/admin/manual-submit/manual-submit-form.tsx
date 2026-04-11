'use client'

import { useState, useTransition } from 'react'
import { submitManualArticle } from './actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle, AlertCircle, FileText, ExternalLink } from 'lucide-react'

export function ManualSubmitForm() {
  const [isPending, startTransition] = useTransition()
  const [genre, setGenre] = useState('sports')
  const [result, setResult] = useState<{
    success?: boolean
    error?: string
    title?: string
    article_id?: string
  } | null>(null)

  function handleSubmit(formData: FormData) {
    formData.set('genre', genre)
    setResult(null)

    startTransition(async () => {
      const res = await submitManualArticle(formData)
      setResult(res)
    })
  }

  return (
    <Card className="border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[#F59E0B]" />
          <CardTitle className="text-base font-bold text-[#1A1A2E] font-[family-name:var(--font-work-sans)]">
            記事ソースURL入力
          </CardTitle>
        </div>
        <p className="text-xs text-[#9CA3AF] mt-1">
          同一トピックの各国メディア記事URLを入力してください（1行1URL、2-5件推奨）。
          メタデータを自動取得し、Claude APIで多国視点分析記事を生成します。
        </p>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit} className="space-y-5">
          {/* URLs */}
          <div className="space-y-2">
            <Label htmlFor="urls" className="text-xs font-semibold text-[#4B5563]">
              ソースURL（1行1URL）
            </Label>
            <Textarea
              id="urls"
              name="urls"
              placeholder={`https://www.espn.com/article/...\nhttps://www.bbc.co.uk/sport/...\nhttps://www.marca.com/futbol/...`}
              rows={5}
              required
              className="text-sm font-mono"
            />
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-[#4B5563]">
              ジャンル
            </Label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sports">スポーツ</SelectItem>
                <SelectItem value="economy">経済</SelectItem>
                <SelectItem value="gaming">ゲーム</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sub Genre */}
          <div className="space-y-2">
            <Label htmlFor="sub_genre" className="text-xs font-semibold text-[#4B5563]">
              サブジャンル（任意）
            </Label>
            <Input
              id="sub_genre"
              name="sub_genre"
              placeholder="例: soccer, markets, esports"
              className="w-48 text-sm"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] font-bold"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin mr-1.5" />
                生成中... (最大2分)
              </>
            ) : (
              <>
                <ExternalLink size={14} className="mr-1.5" />
                記事を生成
              </>
            )}
          </Button>

          {/* Result */}
          {result?.error && (
            <div className="flex items-start gap-2 text-sm text-[#EF4444] bg-red-50 px-4 py-3 rounded-lg">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{result.error}</span>
            </div>
          )}

          {result?.success && (
            <div className="flex items-start gap-2 text-sm text-[#22C55E] bg-green-50 px-4 py-3 rounded-lg">
              <CheckCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">記事生成完了</p>
                <p className="text-[#4B5563] mt-0.5">{result.title}</p>
                <a
                  href="/admin"
                  className="text-[#F59E0B] hover:text-[#D97706] text-xs mt-1 inline-block"
                >
                  ダッシュボードで承認 &rarr;
                </a>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
