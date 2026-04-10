# MIKATA — Design Handoff

## 世界観画像セットURL
| ツール | 用途 | URL |
|--------|------|-----|
| GPT Image 1.5 | ムードボード | https://hykexcnmzlarsgkyixix.supabase.co/storage/v1/object/public/design-assets/gpt-image-1775667005657.png |
| **Flux.2 Pro v2** | **ヒーロー画像（朝ver — 採用）** | https://v3b.fal.media/files/b/0a957dec/ghrjw-fpOLeLH6bXWciN2_713d213d5e104de09d24e86c6ea50de8.jpg |
| Recraft V4 | ロゴアイコン（プリズム） | https://img.recraft.ai/cv4A9wOOkqk4-4dcx8BTZvImw5ziIyzDl0C6u_LDc7Q/rs:fit:1024:1024:0/raw:1/plain/abs://external/images/7c8df53c-af94-44a8-a41d-b967e324dcf7 |
| Ideogram 3.0 | OGP画像 | https://ideogram.ai/api/images/ephemeral/pRErXsaqR8C_WIZ5c0_0Nw.png |

## Stitchプロジェクト
- Project ID: 3332940441353920537
- Design System: "Mikata Chronicle"
- 生成画面: 5画面（Top, Article Detail, Subscribe, Country Perspectives, Admin Dashboard）

## v0生成コード（V12 再々生成 2026-04-11 — Team plan新キー）
| 画面 | chatId | v0 URL |
|------|--------|--------|
| Top | pX7mULgMnj7 | https://v0.app/chat/pX7mULgMnj7 |
| Article Detail | pvRUaHQeF5W | https://v0.app/chat/pvRUaHQeF5W |
| Subscribe | tBZgOt9wfBB | https://v0.app/chat/tBZgOt9wfBB |
| Perspectives | fMs4xMgWt5Y | https://v0.app/chat/fMs4xMgWt5Y |
| Admin Dashboard | p11ti2LOX0R | https://v0.app/chat/p11ti2LOX0R |

- 方式: Stitchスクリーンショットをv0 API attachmentsで画像直接渡し（stitch-to-v0-direct.mjs）
- 生成後自動git push（V12パイプライン修理済み）
- アクセント色: Amber #F59E0B
- 生成コード: components/generated/{画面名}/

## デザイン採点結果（V12 2層採点）
- Layer 1: Public Must 6/6 + Should 5/6 + Admin Must 3/3 + Should 3/3 = **PASS**
- Layer 2 ROUND 2: 16.1/20点（閾値16）= **PASS**
  - Brand Expression 3.5 / Information Design 3.6 / Emotional Pull 3.0 / Cross-Screen Consistency 3.0 / Polish 3.0
- Gate D2b証拠: `~/.claude/gates/mikata/d2c-scoring-evidence.json`（HMAC有効）

## Critic指摘（CTO実装時の必須修正事項）
| # | 種別 | 内容 |
|---|------|------|
| C-1 | Critical | 5画面間のカラー分裂。全画面をPrimary #1A1A2E / Accent #F59E0Bに統一 |
| C-2 | Critical | Subscribe headerがshadcn Button未使用。置換必須 |
| C-4 | Critical | Perspectivesフィルタがネイキッドbutton。shadcn Button使用 |
| C-5 | Critical | Subscribe PricingCardにtabIndex/onKeyDown追加必須 |
| C-6 | Critical | ArticleHeroがimg直書き。Next.js Imageに置換（CLS対策） |
| W-3 | Warning | --font-work-sansは未定義CSS変数。font-['Work_Sans']に統一 |
| W-5 | Warning | copyright年を全画面© 2025 MIKATAに統一 |

## 統一カラーパレット（DESIGN.md準拠）
| Token | Value | Usage |
|-------|-------|-------|
| Primary | #1A1A2E | Deep Navy — ヘッダー・ナビ・本文 |
| Primary Light | #16213E | サイドバー・補助背景 |
| Accent | #F59E0B | Amber — CTA・ハイライト・アクティブ状態 |
| Accent Hover | #D97706 | ボタンhover |
| Background | #F8F9FA | ページ背景 |
| Sentiment+ | #22C55E | 肯定的論調 |
| Sentiment- | #EF4444 | 批判的論調 |
| Sentiment0 | #9CA3AF | 中立論調 |

## CTO実装時の必須対応
1. **DESIGN.mdのトークンが唯一の正（SSOT）** — tailwind.config.tsに変換
2. 管理画面にもDeep Navy + Amberのブランドカラー適用
3. PWA manifest: v0生成のpublic/manifest.jsonを使用
4. フォント: Newsreader（見出し）+ Work Sans（本文）+ Noto Sans JP（日本語）
5. 論調カラー: 上記Sentiment+/-/0を使用
6. 国別視点ページ: メディア固有カラーボーダー必須（Marca=赤、AS=青 等）
7. ヒーロー画像とUI画面のトーン接続の中間層を設計すること
