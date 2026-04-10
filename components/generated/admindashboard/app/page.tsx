'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminHeader } from '@/components/admin-header';
import { StatsCard } from '@/components/stats-card';
import { ActivityList } from '@/components/activity-list';
import { ContentCard } from '@/components/content-card';
import { FilterTabs } from '@/components/filter-tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MoreVertical, Filter } from 'lucide-react';

// Mock data
const statsData = [
  { label: '総閲覧数', value: '128', unit: 'k', trend: { direction: 'up' as const, percentage: '+5.2%' } },
  { label: '総エンゲージメント', value: '1.2', unit: 'M', trend: { direction: 'up' as const, percentage: '+3.1%' } },
  { label: '総コンテンツ', value: '24,502', unit: '', trend: { direction: 'up' as const, percentage: '+12.5%' } },
  { label: '収益', value: '2400', unit: '円', trend: { direction: 'down' as const, percentage: '-2.3%' } },
];

const activityItems = [
  {
    id: '1',
    title: 'エディトリアルストーリー',
    description: 'AIが生成した記事がシステムで承認待ちです。',
    status: 'warning' as const,
    timestamp: '2時間前',
    actionLabel: '見る',
    actionColor: 'amber' as const
  },
  {
    id: '2',
    title: 'ユーザー登録完了',
    description: '新規ユーザー「田中太郎」が登録されました。',
    status: 'success' as const,
    timestamp: '4時間前'
  },
  {
    id: '3',
    title: 'システムメンテナンス',
    description: 'サーバーのメンテナンスがスケジュールされています。',
    status: 'pending' as const,
    timestamp: '1日前',
    actionLabel: '詳細',
    actionColor: 'amber' as const
  },
  {
    id: '4',
    title: '異常なアクセス検出',
    description: '異常なアクセスパターンがIPアドレス192.168.1.1から検出されました。',
    status: 'alert' as const,
    timestamp: '3日前',
    actionLabel: 'ブロック',
    actionColor: 'red' as const
  },
];

const contentItems = [
  {
    id: '1',
    title: 'AIが生成したダッシュボード',
    description: 'リアルタイム分析とデータ可視化機能を備えた次世代ダッシュボード',
    imageUrl: '/placeholder.svg?height=160&width=300',
    status: 'pending' as const,
    lastUpdated: '2024年4月10日 14:32'
  },
  {
    id: '2',
    title: 'クラウド統合プラットフォーム',
    description: '複数のクラウドサービスを一元管理できる統合プラットフォーム',
    imageUrl: '/placeholder.svg?height=160&width=300',
    status: 'active' as const,
    lastUpdated: '2024年4月9日 09:15'
  },
];

const filterTabs = [
  { id: 'all', label: '全て', count: 4 },
  { id: 'editorial', label: 'エディトリアル', count: 2 },
  { id: 'review', label: 'レビュー待ち', count: 1 },
];

const contentFilterTabs = [
  { id: 'all', label: '全て', count: 2 },
  { id: 'pending', label: '保留中', count: 1 },
  { id: 'active', label: 'アクティブ', count: 1 },
];

export default function AdminDashboard() {
  const [activeActivityTab, setActiveActivityTab] = useState('all');
  const [activeContentTab, setActiveContentTab] = useState('all');

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <AdminSidebar />
      <div className="md:ml-64">
        <AdminHeader />

        {/* Main Content */}
        <main className="p-4 md:p-6">
          {/* Stats Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                label={stat.label}
                value={stat.value}
                unit={stat.unit}
                trend={stat.trend}
                color={index === 0 ? 'blue' : index === 1 ? 'amber' : 'green'}
              />
            ))}
          </section>

          {/* Content Review Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1A1A2E]">コンテンツレビュー</h3>
              <Button variant="outline" size="sm" className="border-[#E5E7EB] text-[#4B5563] hover:bg-[#F8F9FA]">
                <Filter size={16} className="mr-2" />
                フィルター
              </Button>
            </div>

            <FilterTabs tabs={contentFilterTabs} onTabChange={setActiveContentTab} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {contentItems.map((item) => (
                <ContentCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  status={item.status}
                  lastUpdated={item.lastUpdated}
                  onApprove={() => console.log('Approved:', item.id)}
                  onReject={() => console.log('Rejected:', item.id)}
                />
              ))}
            </div>
          </section>

          <Separator className="bg-[#E5E7EB] my-8" />

          {/* Activity Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1A1A2E]">エディトリアルストーリー</h3>
              <Button variant="ghost" size="sm">
                <MoreVertical size={20} className="text-[#9CA3AF]" />
              </Button>
            </div>

            <FilterTabs tabs={filterTabs} onTabChange={setActiveActivityTab} />

            <Card className="bg-white border-[#E5E7EB] p-6 mt-6">
              <ActivityList
                items={activityItems}
                isLoading={false}
                isEmpty={false}
              />
            </Card>
          </section>

          {/* Footer */}
          <footer className="mt-12 py-6 border-t border-[#E5E7EB] text-center text-xs text-[#9CA3AF]">
            <p>Copyright © 2024 Mikayas Admin. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
