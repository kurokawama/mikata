# MIKATA（ミカタ）— Implementation Instructions

## サービス概要

### 基本情報
- **サービス名**: MIKATA（ミカタ）
- **タグライン**: 「世界のミカタ」
- **ロゴ**: ローマ字「MIKATA」（Iをレンズ/プリズムアイコンに）
- **法人**: MKアセットマネジメント
- **運営体制**: 黒川CEO 1人 + AIチーム（外注なし）
- **ドメイン候補**: mikata.news / mikata.media / getmikata.com

### コンセプト
AIが各国メディアの論調を分析し、独自解説＋ソースリンクで多視点ニュースを日本語提供するPWA。
「同一ニュースを各国メディア視点で比較する」日本初のサービス。

### ジャンル（3カテゴリ同時展開）
1. **スポーツ**: サッカー（欧州リーグ+日本代表）、MLB、F1、テニス、五輪
2. **経済・マーケット**: 企業決算の各国反応、中央銀行動向、テック企業、暗号資産、為替
3. **ゲーム・eスポーツ**: 新作レビュー比較、規制動向、eスポーツ大会、メタスコア分析

**政治ニュースは扱わない（CEO方針）**

---

## actors（登場人物）

### ユーザーロール
| ロール | 説明 | 認証 |
|--------|------|------|
| visitor | 未登録ユーザー。トップページ・記事一覧を閲覧可能 | 不要 |
| free_user | メール登録済み。3ヶ月間全記事無料→以降1日1記事 | メール+パスワード |
| premium_user | 月額課金ユーザー。全記事読み放題+広告非表示+先行配信 | メール+パスワード+Stripe |
| admin | 黒川CEO。記事承認・広告承認・設定管理 | メール+パスワード+TOTP |

### authFlows
| フロー | 説明 |
|--------|------|
| email_signup | メール+パスワードで登録。3ヶ月無料期間開始 |
| email_login | メール+パスワードでログイン |
| password_reset | パスワードリセット（メールリンク） |
| stripe_checkout | 有料プラン申込。Stripe Checkout Session |
| stripe_portal | プラン変更・解約。Stripe Customer Portal |

---

## ビジネスロジック

### コンテンツモデル（B+Cハイブリッド）

```
記事構造:
┌─────────────────────────────────────┐
│ [独自分析] 800-1200字（AI生成）         │
│  = 著作権法上の「主」                    │
│  - 各国メディアの論調を独自に分析・解説     │
│  - 元記事の表現は使わない                 │
│  - 事実と論調の傾向を自分の言葉で書く      │
├─────────────────────────────────────┤
│ [各国視点リンク集] = 著作権法上の「従」     │
│  🇪🇸 Marca — 一行要約(80字以内) ＋ リンク │
│  🇬🇧 BBC Sport — 一行要約 ＋ リンク      │
│  🇫🇷 L'Équipe — 一行要約 ＋ リンク       │
│  🇯🇵 スポーツ報知 — 一行要約 ＋ リンク     │
│                                     │
│  各ソースに論調ラベル表示:               │
│  🟢 肯定的 / 🔴 批判的 / ⚪ 中立         │
└─────────────────────────────────────┘
```

### AI記事生成パイプライン

```
1. ソース巡回（n8n スケジューラ 15分間隔）
   └── RSS/API → 各国メディアの新着記事メタデータ取得
       ※取得するのはメタデータのみ: タイトル・著者・URL・公開日・数値データ
       ※記事本文はAIコンテキストに入力しない（著作権法27条対策）

2. トピックマッチング（AI）
   └── 同一ニュースを3カ国以上が報じている場合 → 記事生成候補

3. 論調ラベル抽出（AI）
   └── 各ソースのタイトル・見出し・メディア属性から
       論調方向性（positive/negative/neutral）を推定
       ※記事本文の翻訳・要約は行わない

4. 独自分析記事生成（Claude API）
   └── 入力: メタデータ + 論調ラベル + 数値データ
   └── 出力: 800-1200字の日本語独自分析
   └── プロンプト制約: 「元記事の表現を再現しない」「論調の傾向と事実のみで構成」

5. 品質チェック（AI）
   └── 著作権リスクチェック: 元記事の表現を含んでいないか
   └── 事実誤認チェック: 数値・日付の整合性
   └── バイアスチェック: 特定の論調に偏っていないか

6. 公開キュー → admin承認 → 自動公開
   └── 1日10-15記事が自動生成 → 黒川CEOが朝5分で承認
```

### フリーミアム設計（3ヶ月無料→課金）

```
Phase 1: 完全無料期間（登録後3ヶ月間）
  ├── 全記事読み放題（制限なし）
  ├── メール登録のみ必須（課金情報は不要）
  ├── 毎朝8時プッシュ通知で習慣化
  ├── 「あなたは今月XX記事読みました」の実績表示
  ├── Month 2終了時から「無料期間あとXX日」カウントダウン表示
  └── 残14日・残7日・残3日・残1日でメール通知

Phase 2: 有料化移行（3ヶ月目末）
  ├── 月額980円（税込）
  ├── 年額9,800円（税込・月817円相当）← 年額を推奨表示
  ├── 7日間無料トライアルは不要（既に3ヶ月無料済み）
  ├── 「解約はいつでも即可能」を大きく表示
  └── Stripe Customer Portalで自己管理

Phase 3: 無料期間終了後の非課金ユーザー
  ├── 1日1記事は無料で閲覧可能（完全遮断しない）
  ├── 各国視点リンク集は常時無料閲覧可能
  ├── 広告表示あり
  └── 有料記事は70%地点でブラー+課金CTA

有料会員特典:
  ├── 全記事読み放題
  ├── 広告非表示
  ├── 先行配信（有料: 朝7時、無料: 朝10時）
  └── 週次「今週の激論ハイライト」メール
```

### 広告モデル

```
Phase 1（MVP〜PV10万）: AdSenseのみ
  ├── カード4枚ごとにネイティブ広告1枚（「PR」ラベル必須）
  ├── 記事詳細: 独自分析と各国視点の間に1枚のみ
  ├── ファーストビュー・フローティング広告・本文内広告は禁止
  └── 有料会員には広告非表示

Phase 2（PV10万超）: 直接広告AI自動運用を追加
  ├── サイト「広告掲載について」ページにフォーム設置
  ├── Ad Operations Agent が自動審査（ブランドセーフティ）
  ├── CEO LINE承認（5秒）→ Stripe決済 → 自動配信
  ├── Performance Analyst が週次レポートを広告主に自動送信
  ├── 禁止カテゴリ: 金融投資勧誘・医薬品効能訴求・アダルト・ギャンブル
  └── 全広告に「PR」「広告」表記必須（ステマ規制2023年10月〜）
```

---

## 技術スタック

| レイヤー | 技術 | 理由 |
|---------|------|------|
| Framework | Next.js 15 (App Router) | PWA対応・SEO最適・既存知見 |
| UI | shadcn/ui + Tailwind CSS v4 | 高速開発・一貫性 |
| DB/Auth | Supabase (PostgreSQL + Auth) | RLS・リアルタイム |
| 決済 | Stripe (Checkout + Customer Portal) | セルフサービス課金管理 |
| Hosting | Vercel | 自動デプロイ・Edge |
| 記事生成AI | Claude API (Sonnet) | コスト効率・日本語品質 |
| ソース巡回 | n8n (Lightsail N) | 既存インフラ活用 |
| 広告 | Google AdSense + 自社直接広告 | 段階的拡大 |
| CS | Lightsail D (LINE Bot + FAQ自動応答) | 有人対応月10件未満 |
| マーケ | Lightsail C (CMO + 9Agent) | SEO・SNS自動運用 |
| Push通知 | Web Push API (Service Worker) | PWAネイティブ |
| TypeScript | strict mode | 型安全 |

---

## データベース設計（主要テーブル）

### articles（記事）
```sql
id, slug, title, genre (sports/economy/gaming), sub_genre,
analysis_text (独自分析本文), sources (JSONB: [{country, media_name, url, summary_80chars, sentiment}]),
sentiment_summary (JSONB: {positive: N, negative: N, neutral: N}),
status (draft/queued/published/archived),
published_at, free_until (無料公開期限),
ai_model, ai_prompt_hash, created_at, updated_at
```

### media_sources（メディアソースDB — 裏側リソース）
```sql
id, country, country_code, name, genre, sub_genre,
feed_url, feed_type (rss/api/playwright), language,
reliability (A/B/C), check_interval_minutes,
commercial_use_allowed (boolean), terms_url,
active, last_checked_at, created_at
```

### users / profiles
```sql
id, email, display_name, role (visitor/free_user/premium_user/admin),
free_trial_started_at, free_trial_ends_at,
stripe_customer_id, subscription_status,
preferred_genres (JSONB), push_enabled,
articles_read_count, created_at
```

### subscriptions（Stripe連携）
```sql
id, user_id, stripe_subscription_id, plan (monthly/yearly),
amount, status (active/canceled/past_due),
current_period_start, current_period_end,
cancel_at_period_end, created_at
```

### ad_placements（直接広告 — Phase 2）
```sql
id, advertiser_name, advertiser_email,
genre_target, budget_monthly, duration_months,
creative_url, creative_text, status (pending/approved/active/completed),
approved_by, approved_at, stripe_payment_id,
impressions, clicks, created_at
```

---

## ページ構成・URL設計

| URL | ページ | 認証 |
|-----|--------|------|
| / | トップ（ヒーロー記事+3ジャンルタブ+カードリスト） | 不要 |
| /sports/ | スポーツハブ | 不要 |
| /sports/soccer/ | サッカーハブ | 不要 |
| /sports/soccer/[slug] | 記事詳細 | 無料枠 or 課金 |
| /economy/ | 経済・マーケットハブ | 不要 |
| /economy/[sub]/[slug] | 記事詳細 | 無料枠 or 課金 |
| /gaming/ | ゲーム・eスポーツハブ | 不要 |
| /gaming/[sub]/[slug] | 記事詳細 | 無料枠 or 課金 |
| /perspectives/ | 国別視点ブラウズ | 不要 |
| /perspectives/[country]/ | 国別メディア視点まとめ | 不要 |
| /sources/ | 引用メディア一覧 | 不要 |
| /sources/[media-slug]/ | メディア解説ページ | 不要 |
| /subscribe | 課金ページ | 要ログイン |
| /settings | 設定（通知・ジャンル） | 要ログイン |
| /about | サービス紹介・運営者情報 | 不要 |
| /legal/terms | 利用規約 | 不要 |
| /legal/privacy | プライバシーポリシー | 不要 |
| /legal/tokushoho | 特商法表記 | 不要 |
| /legal/editorial-policy | 編集方針（AI生成の透明性） | 不要 |
| /admin | 管理画面（記事承認・広告承認） | admin only |

---

## seoStrategy

### ターゲットキーワード
- **スポーツ**: 「大谷翔平 海外の反応」「プレミアリーグ 移籍 海外の反応」「F1 海外メディア」
- **経済**: 「FRB 海外の反応」「米国株 海外アナリスト」「ドル円 海外の見方」
- **ゲーム**: 「ゲーム 海外の反応」「海外ゲーム レビュー」「eスポーツ 海外大会」

### URL構造方針
- 日本語スラッグ回避（URLエンコード問題）
- `{topic}-{subtopic}-reactions` パターン
- 日付はURLに含めない（常緑化対応）

### AI被引用設計（AEO）
- 全AIクローラー許可（GPTBot/PerplexityBot/ClaudeBot）
- robots.ts に明示許可
- llms.txt をpublic/に配置（サイト構造・カバレッジ・引用可能データの説明）
- 各記事にNewsArticle + citation JSON-LD
- サイトルートにNewsMediaOrganization JSON-LD
- /sources/ ページ群でAI検索エンジンにソース透明性をアピール

### E-E-A-T戦略
- Experience: AI分析プロセスの透明化（/about/editorial-policy）
- Expertise: ジャンル別専門ページ + 監修者（黒川CEO）
- Authority: NewsMediaOrganization スキーマ + 被リンク獲得
- Trust: 全記事に更新日・出典明示・訂正ポリシー

---

## legalRequirements

### コンテンツ生成
- **AI入力制限**: 元記事の本文テキストをAIコンテキストに直接入力しない。タイトル・著者・URL・公開日・数値データのみ
- **外国語処理**: 論調方向性（positive/negative/neutral）のラベルのみ抽出。翻訳・要約は行わない
- **AI開示**: 各記事にAI生成コンテンツである旨を表示
- **出所明示**: 媒体名・著者名・原文URL・公開日を全記事に表示
- **一行要約**: 80字以内（元記事の1/10以内）

### 法務ページ（必須）
- 特商法表記（販売者情報・返金規定・解約方法・6項目最終確認画面）
- プライバシーポリシー（個人情報保護法・電気通信事業法外部送信規律対応）
- 利用規約（AI生成免責・消費者契約法適合）
- Cookie同意バナー（機能性Cookie以外はOpt-in）
- 編集方針（AI利用の透明性開示）

### 広告法務
- 全広告にPR表記自動挿入（ステマ規制対応）
- 景表法: No.1表現は根拠資料提出を広告主に義務付け
- 禁止カテゴリ: 金融投資勧誘・医薬品効能訴求・アダルト・ギャンブル
- 審査ログ保存（措置命令時の証拠）

### 顧問弁護士確認推奨事項
- RSS/APIの商用利用許諾範囲
- B+Cハイブリッドモデルの引用適法性
- AI生成記事の著作権帰属

---

## CS設計（止まらない仕組み）

### 3層フィルタリング
```
Layer 1: LINE Bot 自動応答（Lightsail D）
  ├── コマンド: 「解約」「支払い」「パスワード」「バグ報告」
  ├── 解約 → Stripe Customer Portal URL を即返信
  ├── 支払い → Stripe請求履歴 URL を即返信
  └── 96%の問い合わせをここで吸収

Layer 2: FAQ自動応答（サイト内 + LINE Bot）
  ├── 上位10問の自動回答
  │   1. 課金の開始・停止方法
  │   2. 無料期間の残り日数確認
  │   3. 記事が読めない（キャッシュクリア誘導）
  │   4. プッシュ通知の設定方法
  │   5. アカウント削除方法
  │   6. 領収書の発行
  │   7. AI記事の正確性について
  │   8. ソースメディアへのリンクが切れている
  │   9. 広告掲載について
  │   10. その他のお問い合わせ
  └── 3%をここで吸収

Layer 3: 人間対応（黒川CEO）
  ├── Layer 1-2 で解決しない場合のみ
  ├── LINE Bot がエスカレーション通知を CEO に送信
  ├── 目標: 月10件未満
  └── 24時間以内に返信
```

---

## インフラ配置

```
Lightsail A (開発)     → CTO Agent が開発・テスト
Lightsail B (本社)     → COO/CTO/CMO/CFO/監査役
Lightsail N (n8n)      → ソース巡回WF・記事生成WF・配信WF
Lightsail C (マーケ)   → CMO + 9Agent: SEOキーワード生成・SNS投稿・競合分析
Lightsail D (CS)       → LINE Bot + FAQ自動応答 + エスカレーション
Vercel                 → PWAホスティング
Supabase               → DB・Auth・Storage（記事画像）
Stripe                 → 課金管理
```

---

## KPI（月次追跡）

| KPI | 目標（12ヶ月後） | 計測方法 |
|-----|----------------|---------|
| 月間PV | 120,000 | Vercel Analytics |
| 課金転換率 | 10-15%（3ヶ月無料終了者の） | Stripe + Supabase |
| MRR | ¥240,000（500人×¥480平均） | Stripe |
| チャーン率 | 4%未満 | Stripe |
| AdSense RPM | ¥150以上 | AdSense |

---

## 感情設計（鈴木陽子の設計を統合）

### ユーザー感情ジャーニー
1. **発見**: 「また日本目線か…でもこれは違う？」→ 見出しに具体的な海外メディア名を露出
2. **初記事**: 「え、現地ではこんな見方？知らなかった」→ 認識ギャップが価値実感の核
3. **習慣化**: 3ヶ月無料で毎朝の習慣に → 「これないと朝が物足りない」
4. **課金移行**: 「今まで無料で読めてたものが読めなくなる」→ 損失回避で転換
5. **継続**: 「賢くなった気がする」→ アイデンティティ変容

### 「なるほど！」モーメント
「日本では絶賛されているのに、現地では酷評されている」記事を読んだ瞬間が最強の体験。

### SNSシェア設計
- トリガー: 「自分が知っていて相手が知らない情報を共有する優越感」
- CTA文言: 「この視点、日本語では読めない」
- シェアされやすい記事: 日本報道と海外報道の乖離が大きいもの

### AI不安解消の3層
1. ソース透明性: 全記事に参照メディア一覧をリンク付き表示
2. 限界の明示: 「AIによる分析のため、ニュアンスが異なる場合があります」
3. 運営者の顔: 「なぜ作ったか」の物語を/aboutに掲載

---

## ポジショニング（4名討論で合意）

**「速報ではなく、翌日の多視点深掘り」**

- 速さでSmartNews/Yahoo!ニュースと勝負しない
- 「昨日の出来事を、世界はどう見たか」という翌日分析ポジション
- 記事公開: 毎朝7時（有料）/ 10時（無料）
- プッシュ通知: 朝8時に1本のみ（複数通知はアンインストール率を上げる）
