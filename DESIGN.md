# MIKATA Design System

## Brand Identity
- **Name**: MIKATA (ミカタ)
- **Tagline**: 世界のミカタ
- **Product Type**: news-app / dashboard

## Color Tokens

### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| --color-primary | #1A1A2E | Headers, navigation, primary actions (Deep Navy) |
| --color-primary-light | #16213E | Secondary navigation, sidebar backgrounds |
| --color-primary-container | #E8E8F0 | Card backgrounds, subtle highlights |
| --color-on-primary | #FFFFFF | Text on primary backgrounds |
| --color-accent | #F59E0B | Accent elements, CTAs, highlights (Amber) |
| --color-accent-hover | #D97706 | Hover state for accent elements |
| --color-accent-container | #FEF3C7 | Accent background, notification badges |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| --color-sentiment-positive | #22C55E | Positive sentiment indicator |
| --color-sentiment-negative | #EF4444 | Negative sentiment indicator |
| --color-sentiment-neutral | #9CA3AF | Neutral sentiment indicator |
| --color-background | #F8F9FA | Page background (Light Gray) |
| --color-surface | #FFFFFF | Card backgrounds |
| --color-surface-variant | #E5E7EB | Dividers, secondary surfaces |
| --color-on-surface | #1A1A2E | Primary text (matches brand navy) |
| --color-on-surface-variant | #4B5563 | Secondary text |
| --color-outline | #D1D5DB | Borders |
| --color-error | #DC2626 | Error states |

## Typography

### Font Families
| Token | Value | Usage |
|-------|-------|-------|
| --font-headline | 'Newsreader', serif | Article headlines, page titles |
| --font-body | 'Work Sans', sans-serif | Body text, UI elements |
| --font-label | 'Work Sans', sans-serif | Labels, badges, meta info |
| --font-logo | 'Montserrat', sans-serif | MIKATA logo only |

### Font Sizes
| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| --text-display | 36px | 1.2 | Hero headline |
| --text-headline-lg | 28px | 1.3 | Page titles |
| --text-headline-md | 22px | 1.35 | Section titles |
| --text-body-lg | 18px | 1.75 | Article body |
| --text-body-md | 16px | 1.6 | Default body |
| --text-body-sm | 14px | 1.5 | Meta info, captions |
| --text-label | 12px | 1.4 | Badges, tags |

## Spacing
| Token | Value | Usage |
|-------|-------|-------|
| --space-xs | 4px | Tight gaps |
| --space-sm | 8px | Element gaps |
| --space-md | 12px | Card internal gaps |
| --space-lg | 16px | Section internal padding |
| --space-xl | 24px | Section gaps (mobile) |
| --space-2xl | 32px | Section gaps (desktop) |

## Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| --radius-sm | 4px | Badges, tags |
| --radius-md | 8px | Buttons, inputs |
| --radius-lg | 12px | Cards |
| --radius-full | 9999px | Pill badges, avatars |

## Shadows
| Token | Value | Usage |
|-------|-------|-------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | Cards (default) |
| --shadow-md | 0 4px 6px rgba(0,0,0,0.07) | Cards (hover) |
| --shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | Modals, dropdowns |

## Components

### Article Card
- Background: --color-surface
- Border radius: --radius-lg
- Shadow: --shadow-sm → --shadow-md on hover
- Thumbnail: 16:9 aspect ratio
- Title: --font-headline, --text-headline-md
- Meta: --font-label, --text-body-sm, --color-on-surface-variant
- Sentiment mini-bar: 4px height, colored segments
- Country flags: 24x24px inline, max 5 with "+N" overflow

### Source Card (in article detail)
- Background: --color-background
- Left border: 4px solid sentiment color
- Country flag: 32x32px
- Media name: --font-body bold
- Summary: --text-body-sm, max 80 chars, 2-line clamp
- Link button: --color-accent

### Sentiment Bar
- Height: 4px (mini) / 8px (full)
- Segments: green / red / gray proportional to counts
- Icons: ↑ (positive) / ↓ (negative) / → (neutral) for accessibility

### Bottom Navigation (Mobile)
- Height: 64px
- Items: Home / Search / Notifications / My Page
- Active: --color-accent with icon fill
- Inactive: --color-on-surface-variant

### Genre Tabs
- Active tab: --color-primary bottom border 3px
- Inactive: --color-on-surface-variant
- Scroll: horizontal on mobile
- Font: --font-body, --text-body-md, semibold

## Responsive Breakpoints
| Token | Value | Layout |
|-------|-------|--------|
| --breakpoint-sm | 640px | Single column |
| --breakpoint-md | 768px | Two columns |
| --breakpoint-lg | 1024px | Max content width |
| --breakpoint-xl | 1280px | Sidebar + content |

## Dark Mode (Future)
Reserved tokens with `-dark` suffix. Not implemented in MVP.

## Stitch Project
- Project ID: 3332940441353920537
- Design System: "Mikata Chronicle"
- Generated screens: 5 (Top, Article Detail, Subscription, Country Perspective, Admin Dashboard)
