/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#E9DEC9',
          400: '#D9C8A7',
        },
        ivory: {
          light: '#FFFFF8',
          DEFAULT: '#FBF9F3',
          dark: '#F3EFE6',
        },
        maroon: {
          950: '#2A080C',
          900: '#3D0C11',
          800: '#5C141C',
          700: '#7B1D28',
          600: '#9B2C3B',
          500: '#B83A4B',
          100: '#F7E6E8',
          50: '#FAF0F2',
        },
        gold: {
          light: '#F5E6B8',
          DEFAULT: '#C5A869',
          metallic: '#D4AF37',
          dark: '#9A7B38',
          muted: '#AB9360',
          antique: '#8B6F3E',
          shimmer: '#E8D196',
        },
        sage: {
          50: '#F5F7F4',
          100: '#E6ECE5',
          200: '#CDD9CB',
          300: '#B2C4AF',
          600: '#586E56',
          700: '#445742',
          800: '#324031',
        },
        ink: {
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
          600: '#57534E',
          500: '#78716C',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sanskrit: ['"Rozha One"', '"Cinzel"', 'serif'],
      },
      backgroundImage: {
        'paper-texture': "radial-gradient(#C5A86915 1px, transparent 1px), radial-gradient(#C5A86910 1px, #FAF6EE 1px)",
        'gold-gradient': 'linear-gradient(135deg, #F5E6B8 0%, #C5A869 45%, #9A7B38 80%, #D4AF37 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #5C141C 0%, #3D0C11 100%)',
        'soft-glow': 'radial-gradient(circle at 50% 50%, rgba(197, 168, 105, 0.12) 0%, rgba(250, 246, 238, 0) 70%)',
      },
      boxShadow: {
        'gold-soft': '0 4px 20px -2px rgba(197, 168, 105, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'luxury': '0 20px 40px -15px rgba(61, 12, 17, 0.08), 0 0 1px 1px rgba(197, 168, 105, 0.2)',
        'card-lift': '0 12px 30px -8px rgba(61, 12, 17, 0.12)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
