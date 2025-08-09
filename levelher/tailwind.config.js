/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        anime: {
          pink: '#FFB6C1',
          purple: '#DDA0DD',
          blue: '#87CEEB',
          mint: '#98FB98',
          peach: '#FFCCCB',
          lavender: '#E6E6FA',
          gold: '#FFD700',
          coral: '#FF7F7F',
        },
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
      },
      fontFamily: {
        'anime': ['Inter', 'sans-serif'],
      },
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'level-up': 'levelUp 1s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(236, 72, 153, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.8)' },
        },
        levelUp: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-anime': 'linear-gradient(135deg, #FFB6C1 0%, #DDA0DD 50%, #87CEEB 100%)',
        'gradient-card': 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}