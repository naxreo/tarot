import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B0B2A',
        mystic: '#2D1B69',
        gold: '#D4AF37',
        moonlight: '#F5F1E8',
        lavender: '#9B7EBD',
        cosmic: '#E8B4D8',
        starlight: '#FFD700',
        teal: '#1B998B',
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        body: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
        script: ['var(--font-italianno)', 'cursive'],
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(20px, -20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 24px rgba(212, 175, 55, 0.9)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        drift: 'drift 30s linear infinite alternate',
        glow: 'glow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
