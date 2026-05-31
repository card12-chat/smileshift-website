/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  safelist: [
    'absolute', 'relative', 'fixed', 'inset-0', 'flex', 'grid', 'hidden', 'block'
  ],
  theme: {
      extend: {
          fontFamily: {
              sans: ['Inter', 'sans-serif'],
              mono: ['JetBrains Mono', 'monospace'],
              display: ['Space Grotesk', 'sans-serif'],
          },
          colors: {
              stone: {
                  50: '#fafaf9',
                  100: '#f5f5f4',
                  200: '#e7e5e4',
                  300: '#d6d3d1',
                  400: '#a8a29e',
                  500: '#78716c',
                  600: '#57534e',
                  700: '#44403c',
                  800: '#292524',
                  900: '#1c1917',
              },
              smile: {
                  base: '#FFFFFF',
                  bg: '#F5F6FA',
                  text: '#111827',
                  purple: {
                      main: '#5A2C8C',
                      vivid: '#7B3FC7',
                      light: '#A875D6',
                      glow: '#E4D6F5'
                  },
                  blue: {
                      tech: '#1E5CC6',
                      glow: '#D1E0FA'
                  },
                  neutral: '#6B7280',
                  success: '#16A34A',
                  successLight: '#22C55E'
              }
          },
          backgroundImage: {
              'brand-gradient': 'linear-gradient(135deg, #5A2C8C 0%, #7B3FC7 35%, #4A56C9 65%, #1E5CC6 100%)',
          },
          animation: {
              'pulse-glow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              'scroll-line': 'scrollLine 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
              'float': 'floatImage 6s ease-in-out infinite',
          },
          keyframes: {
              floatImage: {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-15px)' },
              },
              pulseGlow: {
                  '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                  '50%': { opacity: '0.8', transform: 'scale(1.05)' },
              },
              scrollLine: {
                  '0%': { transform: 'translateY(-100%)' },
                  '100%': { transform: 'translateY(200%)' },
              }
          }
      }
  },
  plugins: [],
}
