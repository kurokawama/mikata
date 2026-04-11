/* v0-generated — adapted from components/generated/perspectivespage/app/data/countries.ts */
export type SentimentType = 'positive' | 'negative' | 'neutral'

export interface CountryData {
  id: string
  flag: string
  name: string
  nameEn: string
  articleCount: number
  sourceCount: number
  topTopics: string[]
  sentiment: SentimentType
  sentimentLabel: string
  isPopular?: boolean
}

export const FEATURED_COUNTRIES: CountryData[] = [
  {
    id: 'japan',
    flag: '\u{1F1EF}\u{1F1F5}',
    name: '日本',
    nameEn: 'Japan',
    articleCount: 1842,
    sourceCount: 24,
    topTopics: ['経済政策', '安全保障', '環境問題'],
    sentiment: 'neutral',
    sentimentLabel: '中立',
    isPopular: true,
  },
  {
    id: 'usa',
    flag: '\u{1F1FA}\u{1F1F8}',
    name: 'アメリカ',
    nameEn: 'United States',
    articleCount: 3540,
    sourceCount: 48,
    topTopics: ['外交政策', 'テクノロジー', '選挙'],
    sentiment: 'negative',
    sentimentLabel: '否定的',
    isPopular: true,
  },
  {
    id: 'south-korea',
    flag: '\u{1F1F0}\u{1F1F7}',
    name: '韓国',
    nameEn: 'South Korea',
    articleCount: 962,
    sourceCount: 16,
    topTopics: ['半導体産業', '北朝鮮問題', '文化外交'],
    sentiment: 'positive',
    sentimentLabel: '肯定的',
  },
  {
    id: 'china',
    flag: '\u{1F1E8}\u{1F1F3}',
    name: '中国',
    nameEn: 'China',
    articleCount: 2781,
    sourceCount: 19,
    topTopics: ['経済成長', '台湾問題', '一帯一路'],
    sentiment: 'negative',
    sentimentLabel: '否定的',
    isPopular: true,
  },
  {
    id: 'uk',
    flag: '\u{1F1EC}\u{1F1E7}',
    name: 'イギリス',
    nameEn: 'United Kingdom',
    articleCount: 1107,
    sourceCount: 21,
    topTopics: ['ブレグジット後', 'NATO', '金融市場'],
    sentiment: 'neutral',
    sentimentLabel: '中立',
  },
  {
    id: 'france',
    flag: '\u{1F1EB}\u{1F1F7}',
    name: 'フランス',
    nameEn: 'France',
    articleCount: 834,
    sourceCount: 14,
    topTopics: ['EU政策', '移民問題', '気候変動'],
    sentiment: 'positive',
    sentimentLabel: '肯定的',
  },
  {
    id: 'germany',
    flag: '\u{1F1E9}\u{1F1EA}',
    name: 'ドイツ',
    nameEn: 'Germany',
    articleCount: 945,
    sourceCount: 17,
    topTopics: ['エネルギー政策', '製造業', 'EU議長国'],
    sentiment: 'neutral',
    sentimentLabel: '中立',
  },
  {
    id: 'spain',
    flag: '\u{1F1EA}\u{1F1F8}',
    name: 'スペイン',
    nameEn: 'Spain',
    articleCount: 521,
    sourceCount: 11,
    topTopics: ['観光経済', '地域独立問題', '再生可能エネルギー'],
    sentiment: 'positive',
    sentimentLabel: '肯定的',
  },
  {
    id: 'brazil',
    flag: '\u{1F1E7}\u{1F1F7}',
    name: 'ブラジル',
    nameEn: 'Brazil',
    articleCount: 673,
    sourceCount: 13,
    topTopics: ['アマゾン保護', 'BRICS', '農業輸出'],
    sentiment: 'positive',
    sentimentLabel: '肯定的',
  },
]

export const ALL_REGIONS = [
  { id: 'all', label: 'すべて' },
  { id: 'asia', label: 'アジア' },
  { id: 'europe', label: 'ヨーロッパ' },
  { id: 'americas', label: '南北アメリカ' },
  { id: 'middleeast', label: '中東・アフリカ' },
  { id: 'oceania', label: 'オセアニア' },
]
