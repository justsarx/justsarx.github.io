/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0c0e12',
          light: '#f7f6f2',
          dark: '#0c0e12',
        },
        surface: {
          DEFAULT: '#12151b',
          light: '#ffffff',
          dark: '#12151b',
        },
        surfaceMuted: {
          DEFAULT: '#171b23',
          light: '#eeece4',
          dark: '#171b23',
        },
        card: {
          DEFAULT: '#161a22',
          dark: '#161a22',
          light: '#ffffff',
        },
        borderBase: {
          light: 'rgba(0, 0, 0, 0.09)',
          dark: 'rgba(255, 255, 255, 0.09)',
        },
        ink: {
          primary: '#101318',
          muted: '#5c6475',
          subtle: '#8c95a6',
        },
        textMuted: '#8b94a5',
        textSubtle: '#626b7c',
        textPrimary: '#f0f3f8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Cabinet Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.04em',
        widest: '0.12em',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      }
    },
  },
  plugins: [],
}
