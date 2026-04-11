/* v0-generated — DESIGN.md token alignment for MIKATA */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* DESIGN.md Brand Colors */
        mikata: {
          navy: '#1A1A2E',
          'navy-deep': '#16213E',
          surface: '#F8F9FA',
          border: '#E5E7EB',
          'border-mid': '#D1D5DB',
          muted: '#9CA3AF',
          'text-sub': '#4B5563',
          amber: '#F59E0B',
          'amber-dark': '#D97706',
          'amber-bg': '#FEF3C7',
          green: '#22C55E',
          red: '#EF4444',
          'red-dark': '#DC2626',
          ui: '#E8E8F0',
        },
        /* Semantic aliases */
        primary: {
          DEFAULT: '#1A1A2E',
          light: '#16213E',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          foreground: '#1A1A2E',
        },
        sentiment: {
          positive: '#22C55E',
          negative: '#EF4444',
          neutral: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['var(--font-work-sans)', 'Work Sans', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'Newsreader', 'Georgia', 'serif'],
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      fontSize: {
        display: ['36px', { lineHeight: '1.2' }],
        'headline-lg': ['28px', { lineHeight: '1.3' }],
        'headline-md': ['22px', { lineHeight: '1.35' }],
        'body-lg': ['18px', { lineHeight: '1.75' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        label: ['12px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        badge: '4px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.05)',
        'card-hover': '0 4px 6px rgba(0,0,0,0.07)',
      },
      spacing: {
        'card-mobile': '16px',
        'card-desktop': '24px',
      },
    },
  },
  plugins: [],
}

export default config
