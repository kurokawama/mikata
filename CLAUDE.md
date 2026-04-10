# MIKATA（ミカタ）— Project CLAUDE.md

## Project Overview
AIが各国メディアの論調を分析し、独自解説+ソースリンクで多視点ニュースを日本語提供するPWA。
「同一ニュースを各国メディア視点で比較する」日本初のサービス。
タグライン: 「世界のミカタ」

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI**: shadcn/ui + Tailwind CSS v4
- **DB/Auth**: Supabase (PostgreSQL + Auth)
- **Payment**: Stripe (Checkout + Customer Portal)
- **Hosting**: Vercel
- **AI Content**: Claude API (Sonnet) — 記事生成
- **Source Crawl**: n8n (Lightsail N) — 15分間隔
- **Language**: TypeScript (strict)

## Design Tokens (DESIGN.md準拠)

### Brand Colors
```
Primary (Deep Navy):    #1A1A2E  — headers, nav, primary actions
Primary Light:          #16213E  — secondary nav, sidebar
Accent (Amber):         #F59E0B  — CTAs, highlights
Accent Hover:           #D97706
Sentiment Positive:     #22C55E  (green)
Sentiment Negative:     #EF4444  (red)
Sentiment Neutral:      #9CA3AF  (gray)
Background:             #F8F9FA
Surface:                #FFFFFF
On-Surface:             #1A1A2E
On-Surface Variant:     #4B5563
Outline:                #D1D5DB
```

### Typography
- Headline: `Newsreader` serif (記事見出し・ページタイトル)
- Body/Label: `Work Sans` sans-serif (本文・UI)
- Logo: `Montserrat` sans-serif (MIKATAロゴのみ)
- Japanese: `Noto Sans JP`

### Spacing / Radius
- Card padding: 16px (mobile), 24px (desktop)
- Card radius: 12px, Button radius: 8px, Badge radius: 4px
- Shadow: `0 1px 2px rgba(0,0,0,0.05)` → hover `0 4px 6px rgba(0,0,0,0.07)`

## User Roles
```
visitor        → 未登録。トップ・記事一覧閲覧可
free_user      → メール登録済み。3ヶ月無料→以降1日1記事
premium_user   → 月額課金。全記事読み放題+広告非表示+先行配信
admin          → 黒川CEO。記事承認・広告承認・設定管理
```

## Page Structure
```
/                        → トップ（ヒーロー記事+3ジャンルタブ+カードリスト）
/sports/                 → スポーツハブ
/sports/soccer/[slug]    → 記事詳細
/economy/                → 経済・マーケットハブ
/economy/[sub]/[slug]    → 記事詳細
/gaming/                 → ゲーム・eスポーツハブ
/gaming/[sub]/[slug]     → 記事詳細
/perspectives/           → 国別視点ブラウズ
/perspectives/[country]/ → 国別メディア視点まとめ
/sources/                → 引用メディア一覧
/sources/[media-slug]/   → メディア解説ページ
/subscribe               → 課金ページ（要ログイン）
/settings                → 設定（通知・ジャンル、要ログイン）
/about                   → サービス紹介・運営者情報
/legal/terms             → 利用規約
/legal/privacy           → プライバシーポリシー
/legal/tokushoho         → 特商法表記
/legal/editorial-policy  → 編集方針（AI生成の透明性）
/admin                   → 管理画面（admin only）
```

## Key Business Logic

### Freemium Model
- 登録後3ヶ月間: 全記事無料
- 3ヶ月後: 月額980円 or 年額9,800円
- 非課金ユーザー: 1日1記事+各国視点リンクは常時無料+広告表示
- 有料記事は70%地点でブラー+課金CTA

### Content Model (B+Cハイブリッド)
- 独自分析800-1200字（AI生成・著作権法上の「主」）
- 各国視点リンク集（80字要約+リンク・著作権法上の「従」）
- 論調ラベル: positive/negative/neutral

### Article Sentiment Bar
- 4px mini / 8px full
- green/red/gray の比率で表示
- アクセシビリティ: ↑↓→ アイコン併用

## Supabase Tables
articles, media_sources, users/profiles, subscriptions, ad_placements

## Stitch/v0 Design Assets
- **Stitch Project**: 3332940441353920537
- **GitHub**: kurokawama/mikata

| Screen | v0 chatId | Stitch screenId |
|--------|-----------|-----------------|
| Top | v7mkHYU8vx5 | 2042febcfd654bf39f141dceb04dcf4b |
| Article Detail | k8vERAGH81G | 6738ca97e2d548618c7a7151ac9f3e93 |
| Subscribe | pI98r1KgKYm | 3d15380fbe1842c0ad7c824dbad34101 |
| Perspectives | cCegf3Uwy5g | 35695e93b3434073a4aeccd96faeb4c1 |
| Admin Dashboard | dSEBspsO3nb | edf1380e4ea34c5b82db97f23a3985e1 |

## Coding Rules

### File Naming
- Components: PascalCase (e.g., `ArticleCard.tsx`)
- Actions: camelCase (e.g., `articles.ts`)
- Types: PascalCase (e.g., `types/article.ts`)
- Routes: kebab-case directories

### Component Rules
- Server Components by default, `"use client"` only when needed
- Use shadcn/ui components from `@/components/ui/`
- App-level shared components in `@/components/shared/`
- No direct DB queries in components — always through Server Actions

### Security
- Supabase RLS on all tables
- Never expose service_role key to client
- Validate user role in middleware
- Sanitize all user inputs in Server Actions

## Important Notes
- **政治ニュースは扱わない**（CEO方針）
- `preview_screenshot` is BANNED — use `preview_snapshot` / `preview_eval`
- Lint: `npm run lint` (NOT `npx next lint`)
- Windows environment: use `cmd /c` pattern for preview_start

## Quality Test
```bash
# Playwright テスト実行
CI=true BASE_URL=http://localhost:3000 npx playwright test

# ビルド確認
npm run build && npm run lint
```
