'use client';

import { PageHeader } from '@/components/page-header';
import { PageFooter } from '@/components/page-footer';
import { ArticleHeader } from '@/components/article-header';
import { ArticleHero } from '@/components/article-hero';
import { ArticleBody } from '@/components/article-body';
import { ArticleStats } from '@/components/article-stats';
import { RelatedArticles } from '@/components/related-articles';
import { Separator } from '@/components/ui/separator';

export default function ArticleDetail() {
  const heroImage = '/placeholder.svg?height=400&width=800';

  const articleStats = [
    { label: 'ホームラン数', value: '50本', highlight: true },
    { label: '達成日', value: '2024年9月28日' },
    { label: '今シーズン打率', value: '.289' },
    { label: 'RBI', value: '130' },
  ];

  const relatedArticles = [
    {
      id: '1',
      title: 'メジャーリーグの歴史的な記録達成',
      category: 'スポーツ',
      image: '/placeholder.svg?height=160&width=300',
      date: '2024年9月30日',
    },
    {
      id: '2',
      title: 'シーズン最後の試合を振り返る',
      category: 'スポーツ',
      image: '/placeholder.svg?height=160&width=300',
      date: '2024年10月1日',
    },
    {
      id: '3',
      title: 'ロサンゼルス・ドジャースの優勝決定',
      category: 'スポーツ',
      image: '/placeholder.svg?height=160&width=300',
      date: '2024年10月2日',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader />

      <main className="flex-1">
        {/* Article Header */}
        <ArticleHeader
          title="大谷翔平、今季50本塁打達成"
          subtitle="メジャーリーグの歴史を刻む瞬間—50ホームランという快挙の背景にあるもの"
          category="野球"
          date="2024年9月28日"
          author="スポーツニュース編集部"
          readTime="読了時間：8分"
        />

        {/* Hero Image */}
        <ArticleHero
          src={heroImage}
          alt="大谷翔平の試合風景"
          caption="ロサンゼルス・ドジャースのスタジアムで50本塁打を達成した大谷翔平選手"
        />

        {/* Article Body */}
        <ArticleBody
          content="ロサンゼルス・ドジャースの大谷翔平選手が2024年シーズンで50本塁打を達成し、メジャーリーグの歴史に新たなマイルストーンを刻みました。この偉業は、日本から渡米した選手による初めての50本塁打達成となり、国際野球の発展を象徴する瞬間となっています。

大谷選手は今シーズン全試合で活躍し、その卓越したバッティング技術と努力が実を結びました。監督やチームメイトからも称賛の言葉が寄せられており、このシーズンの成功は個人の成長を示すだけでなく、チーム全体のパフォーマンス向上にも貢献しています。"
        />

        {/* Stats Section */}
        <ArticleStats title="今シーズンの成績" stats={articleStats} />

        <Separator className="max-w-4xl mx-auto my-8" />

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />
      </main>

      <PageFooter />
    </div>
  );
}
