/* v0-generated — adapted from components/generated/perspectivespage/app/components/countries-grid.tsx */
'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { CountryCard } from './country-card'
import { FEATURED_COUNTRIES, ALL_REGIONS } from './countries-data'
import { Search, SlidersHorizontal } from 'lucide-react'

export function CountriesGrid() {
  const [activeRegion, setActiveRegion] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = FEATURED_COUNTRIES.filter((c) => {
    const matchesSearch =
      searchQuery === '' ||
      c.name.includes(searchQuery) ||
      c.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="countries-heading">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
        <div>
          <p className="text-xs font-medium text-[#F59E0B] uppercase tracking-widest mb-1">グローバル視点</p>
          <h2 id="countries-heading" className="text-2xl sm:text-3xl font-semibold text-[#1A1A2E] text-balance font-serif">
            主要国・地域の視点
          </h2>
          <p className="mt-1.5 text-sm text-[#9CA3AF]">各国メディアの視点から最新ニュースを読み解く</p>
        </div>

        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" aria-hidden="true" />
          <Input
            type="search"
            placeholder="国・地域を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 pr-3 text-sm bg-white border-[#E5E7EB] rounded-lg text-[#1A1A2E] placeholder:text-[#9CA3AF] focus-visible:ring-[#F59E0B] focus-visible:border-[#F59E0B]"
            aria-label="国・地域を検索"
          />
        </div>
      </div>

      <Tabs value={activeRegion} onValueChange={setActiveRegion} className="mb-7">
        <div className="flex items-center justify-between gap-4">
          <TabsList className="h-auto bg-[#F8F9FA] border border-[#E5E7EB] p-1 rounded-xl flex-wrap gap-1" aria-label="地域フィルター">
            {ALL_REGIONS.map((region) => (
              <TabsTrigger
                key={region.id}
                value={region.id}
                className="h-7 px-3.5 text-xs font-medium rounded-lg data-[state=active]:bg-[#1A1A2E] data-[state=active]:text-white data-[state=inactive]:text-[#4B5563] data-[state=inactive]:hover:text-[#1A1A2E] transition-colors"
              >
                {region.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#9CA3AF]">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{filtered.length}カ国表示中</span>
          </div>
        </div>
      </Tabs>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="国別視点カード一覧">
          {filtered.map((country) => (
            <div key={country.id} role="listitem">
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center" role="status" aria-live="polite">
          <p className="text-base text-[#9CA3AF]">
            「{searchQuery}」に一致する国・地域が見つかりませんでした
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-sm text-[#F59E0B] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
          >
            検索をクリア
          </button>
        </div>
      )}
    </section>
  )
}
