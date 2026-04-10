# SEO/AEO戦略 — 多視点ニュースサービス

## 調査日: 2026-04-09

## ターゲットキーワード（優先順）
### スポーツ
- 「大谷翔平 海外の反応」（最重要）
- 「プレミアリーグ 移籍 海外の反応」（ロングテール主力）
- 「F1 海外メディア」
- 「チャンピオンズリーグ 海外の反応」

### 経済
- 「FRB 海外の反応」（狙い目）
- 「米国株 海外アナリスト」（差別化）
- 「暗号資産 海外規制 最新」
- 「ドル円 海外の見方」

### ゲーム
- 「ゲーム 海外の反応」
- 「海外ゲーム レビュー」（メタスコア比較）
- 「eスポーツ 海外大会」

## URL構造
/sports/soccer/premier-league/[slug]/
/economy/us-stocks/[slug]/
/gaming/reviews/[slug]/
/perspectives/{country}/ — 国別視点ページ（AEO強化）
/sources/{media-name}/ — 引用メディア解説ページ

## AEO設計
- 多視点比較構造 = Perplexityの引用スタイルと同一 → 被引用率が高い
- llms.txt: AIクローラー向けサイト構造説明を配置
- JSON-LD: NewsArticle + citation + NewsMediaOrganization
- 「海外の反応」系との差別化: 単なるコピーでなく複数メディアの論調比較+記者名付き引用

## E-E-A-T戦略
- Experience: AI分析プロセスの透明化
- Expertise: ジャンル別専門ページ + 監修者（黒川CEO）
- Authority: NewsMediaOrganization スキーマ
- Trust: 全記事に更新日・出典明示・訂正ポリシー
