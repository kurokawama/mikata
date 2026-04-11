/* v0-generated — settings form */
'use client'

import { useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { updatePreferences } from './actions'

const GENRES = [
  { id: 'sports', label: 'スポーツ' },
  { id: 'economy', label: '経済・マーケット' },
  { id: 'gaming', label: 'ゲーム・eスポーツ' },
]

interface SettingsFormProps {
  profile: {
    display_name: string | null
    preferred_genres: string[]
    push_enabled: boolean
    role: string
    subscription_status: string | null
    free_trial_ends_at: string | null
  }
}

export function SettingsForm({ profile }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [pushEnabled, setPushEnabled] = useState(profile.push_enabled)

  function handleSubmit(formData: FormData) {
    if (pushEnabled) {
      formData.set('push_enabled', 'on')
    }
    startTransition(async () => {
      await updatePreferences(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <Card className="border-[#D1D5DB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="text-[#1A1A2E] font-serif">プロフィール</CardTitle>
          <CardDescription className="text-[#4B5563]">表示名やアカウント情報</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="display_name" className="text-[#1A1A2E]">表示名</Label>
            <Input
              id="display_name"
              name="display_name"
              defaultValue={profile.display_name ?? ''}
              placeholder="ニックネーム"
              className="mt-1 border-[#D1D5DB]"
              maxLength={50}
            />
          </div>
          <div className="text-sm text-[#4B5563]">
            ステータス:{' '}
            <span className="font-medium text-[#1A1A2E]">
              {profile.subscription_status === 'active'
                ? 'プレミアム会員'
                : profile.free_trial_ends_at
                  ? `無料トライアル中（${new Date(profile.free_trial_ends_at).toLocaleDateString('ja-JP')}まで）`
                  : 'フリープラン'}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#D1D5DB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="text-[#1A1A2E] font-serif">興味のあるジャンル</CardTitle>
          <CardDescription className="text-[#4B5563]">フィード表示の優先順位に反映されます</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {GENRES.map((genre) => (
            <label key={genre.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="genres"
                value={genre.id}
                defaultChecked={profile.preferred_genres.includes(genre.id)}
                className="h-4 w-4 rounded border-[#D1D5DB] text-[#F59E0B] focus:ring-[#F59E0B]"
              />
              <span className="text-[#1A1A2E]">{genre.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      <Card className="border-[#D1D5DB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="text-[#1A1A2E] font-serif">通知設定</CardTitle>
          <CardDescription className="text-[#4B5563]">プッシュ通知の受信を管理します</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="push_enabled" className="text-[#1A1A2E]">プッシュ通知</Label>
            <Switch
              id="push_enabled"
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold"
        >
          {isPending ? '保存中...' : '設定を保存'}
        </Button>
        {saved && (
          <span className="text-sm text-[#22C55E] font-medium">保存しました</span>
        )}
      </div>
    </form>
  )
}
