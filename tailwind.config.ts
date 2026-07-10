import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        teal: {
          50: '#E1F5EE',
          100: '#9FE1CB',
          400: '#2DD4BF',
          600: '#1D9E75',
          700: '#0F6E56',
          900: '#04342C',
          950: '#042F2E',
        },
        link: '#185FA5',
        danger: '#E24B4A',
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 6vw, 4.75rem)', { lineHeight: '0.98', letterSpacing: '-0.045em' }],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      backgroundImage: {
        'gradient-teal': 'linear-gradient(135deg, #1D9E75 0%, #06B6D4 100%)',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 1px rgba(15, 23, 42, 0.02)',
      },
      animation: {
        'draw-line': 'drawLine 0.6s ease-out forwards',
      },
      keyframes: {
        drawLine: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config
