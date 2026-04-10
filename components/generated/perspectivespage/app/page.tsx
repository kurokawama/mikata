'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Loader2 } from 'lucide-react';

interface Country {
  id: string;
  name: string;
  nameJa: string;
  flag: string;
  articles: number;
  region: string;
}

const COUNTRIES: Country[] = [
  { id: 'jp', name: 'Japan', nameJa: '日本', flag: '🇯🇵', articles: 2847, region: 'Asia' },
  { id: 'us', name: 'United States', nameJa: 'アメリカ合衆国', flag: '🇺🇸', articles: 5234, region: 'Americas' },
  { id: 'de', name: 'Germany', nameJa: 'ドイツ', flag: '🇩🇪', articles: 1923, region: 'Europe' },
  { id: 'fr', name: 'France', nameJa: 'フランス', flag: '🇫🇷', articles: 1654, region: 'Europe' },
  { id: 'br', name: 'Brazil', nameJa: 'ブラジル', flag: '🇧🇷', articles: 1432, region: 'Americas' },
  { id: 'in', name: 'India', nameJa: 'インド', flag: '🇮🇳', articles: 2156, region: 'Asia' },
  { id: 'uk', name: 'United Kingdom', nameJa: 'イギリス', flag: '🇬🇧', articles: 1876, region: 'Europe' },
  { id: 'au', name: 'Australia', nameJa: 'オーストラリア', flag: '🇦🇺', articles: 1234, region: 'Oceania' },
  { id: 'ca', name: 'Canada', nameJa: 'カナダ', flag: '🇨🇦', articles: 987, region: 'Americas' },
];

const REGIONS = ['すべて', 'アジア', 'ヨーロッパ', 'アメリカ大陸', 'オセアニア'];

export default function PerspectivesPage() {
  const [selectedRegion, setSelectedRegion] = useState('すべて');
  const [loadingCountry, setLoadingCountry] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('grid');

  const filteredCountries = selectedRegion === 'すべて' 
    ? COUNTRIES 
    : COUNTRIES.filter(c => {
        const regionMap: Record<string, string> = {
          'アジア': 'Asia',
          'ヨーロッパ': 'Europe',
          'アメリカ大陸': 'Americas',
          'オセアニア': 'Oceania'
        };
        return c.region === regionMap[selectedRegion];
      });

  const handleExplore = (countryId: string) => {
    setLoadingCountry(countryId);
    // Simulate API call
    setTimeout(() => {
      setLoadingCountry(null);
      // In a real app, navigate to country detail page
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500 flex items-center justify-center">
                <span className="text-lg sm:text-xl font-bold text-neutral-900">🌍</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-amber-400 uppercase tracking-widest">ニュースプラットフォーム</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-50 mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'var(--font-newsreader)' }}>
              国別の視点でニュースを
              <br className="hidden sm:block" />
              探索
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg text-neutral-400 max-w-2xl leading-relaxed">
              世界中の異なる視点から最新のニュースを探索します。各国の独自の報道視点を理解し、グローバルな情報リテラシーを高めましょう。
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Region Filter */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-50">地域別に検索</h2>
              <span className="text-xs sm:text-sm text-neutral-500">{filteredCountries.length}件</span>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                    selectedRegion === region
                      ? 'bg-amber-500 text-neutral-900 shadow-lg shadow-amber-500/20'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <Separator className="mb-8 sm:mb-12 bg-neutral-800" />

          {/* View Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-neutral-800 border border-neutral-700">
              <TabsTrigger value="grid">グリッド表示</TabsTrigger>
              <TabsTrigger value="list">リスト表示</TabsTrigger>
            </TabsList>

            {/* Grid View */}
            <TabsContent value="grid" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <CountryCard
                      key={country.id}
                      country={country}
                      isLoading={loadingCountry === country.id}
                      onExplore={handleExplore}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-neutral-400 text-base sm:text-lg">検索結果がありません</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* List View */}
            <TabsContent value="list" className="mt-8">
              <div className="space-y-3 sm:space-y-4">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <div
                      key={country.id}
                      className="flex items-center justify-between p-4 sm:p-5 bg-neutral-800/50 hover:bg-neutral-800 rounded-lg border border-neutral-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <span className="text-2xl sm:text-3xl flex-shrink-0">{country.flag}</span>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-neutral-50 text-sm sm:text-base truncate">{country.nameJa}</h3>
                          <p className="text-xs sm:text-sm text-neutral-400">{country.articles}件の記事</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleExplore(country.id)}
                        disabled={loadingCountry === country.id}
                        className="bg-amber-500 hover:bg-amber-600 text-neutral-900 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 flex-shrink-0"
                      >
                        {loadingCountry === country.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'これを見る'
                        )}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-neutral-400 text-base sm:text-lg">検索結果がありません</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Premium Section */}
      <section className="relative mt-12 sm:mt-20">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold">
              プレミアム機能
            </Badge>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-50 mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-newsreader)' }}>
              MIKATAプレミアムで全ての視点に
              <br className="hidden sm:block" />
              アクセス
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-400 mb-8 sm:mb-12 leading-relaxed">
              制限なくすべての国のニュース、深掘り分析、AI要約機能にアクセスして、より豊かな情報を手に入れましょう。今なら最初の3ヶ月は50%オフです。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button className="bg-amber-500 hover:bg-amber-600 text-neutral-900 font-bold px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg rounded-lg">
                プレミアムで始める
              </Button>
              <Button variant="outline" className="border-neutral-700 text-neutral-50 hover:bg-neutral-800 px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg rounded-lg">
                詳細を見る
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-neutral-50 text-sm mb-4">プロダクト</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
                <li><a href="#" className="hover:text-neutral-200 transition">特徴</a></li>
                <li><a href="#" className="hover:text-neutral-200 transition">料金</a></li>
                <li><a href="#" className="hover:text-neutral-200 transition">ブログ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-50 text-sm mb-4">会社</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
                <li><a href="#" className="hover:text-neutral-200 transition">について</a></li>
                <li><a href="#" className="hover:text-neutral-200 transition">キャリア</a></li>
                <li><a href="#" className="hover:text-neutral-200 transition">お問い合わせ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-50 text-sm mb-4">リソース</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
                <li><a href="#" className="hover:text-neutral-200 transition">ドキュメント</a></li>
                <li><a href="#" className="hover:text-neutral-200 transition">API</a></li>
                <li><a href="#" className="hover:text-neutral-200 transition">サポート</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-50 text-sm mb-4">法務</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
                <li><a href="#" className="hover:text-neutral-200 transition">プライバシー</a></li>
                <li><a href="#" className="hover:text-neutral-200 transition">利用規約</a></li>
                <li><a href="#" className="hover:text-neutral-200 transition">クッキー</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-neutral-800 mb-6 sm:mb-8" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-neutral-500">
            <p>&copy; 2024 MIKATA. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-neutral-300 transition">Twitter</a>
              <a href="#" className="hover:text-neutral-300 transition">GitHub</a>
              <a href="#" className="hover:text-neutral-300 transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface CountryCardProps {
  country: Country;
  isLoading: boolean;
  onExplore: (countryId: string) => void;
}

function CountryCard({ country, isLoading, onExplore }: CountryCardProps) {
  return (
    <Card className="group bg-neutral-800/50 border border-neutral-700 hover:border-amber-500/50 hover:bg-neutral-800 transition-all duration-300 overflow-hidden">
      <div className="p-5 sm:p-6">
        {/* Flag and Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl sm:text-5xl">{country.flag}</span>
          <Badge variant="secondary" className="bg-neutral-700 text-neutral-300 text-xs">
            {country.region}
          </Badge>
        </div>
        
        {/* Country Name */}
        <h3 className="text-lg sm:text-xl font-bold text-neutral-50 mb-1">{country.nameJa}</h3>
        <p className="text-xs sm:text-sm text-neutral-500 mb-4">{country.name}</p>
        
        {/* Stats */}
        <div className="bg-neutral-700/30 rounded-lg p-3 sm:p-4 mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-amber-400">{country.articles.toLocaleString()}</span>
            <span className="text-xs sm:text-sm text-neutral-400">件の記事</span>
          </div>
        </div>
        
        {/* Button */}
        <Button
          onClick={() => onExplore(country.id)}
          disabled={isLoading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900 font-bold py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-all group-hover:shadow-lg group-hover:shadow-amber-500/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              読み込み中...
            </>
          ) : (
            <>
              これを見る
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
