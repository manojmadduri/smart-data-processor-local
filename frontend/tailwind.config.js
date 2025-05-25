/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Light theme
        lightBg:     '#F0FDF4',  // green-50
        lightCard:   '#FFFFFF',
        lightPrimary:'#10B981',  // emerald-500
        lightAccent: '#F59E0B',  // amber-500

        // Dark theme
        darkBg:      '#064E3B',  // emerald-900
        darkCard:    '#065F46',  // emerald-800
        darkPrimary: '#6EE7B7',  // emerald-300
        darkAccent:  '#FBBF24',  // amber-400
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        // preserve built-in "spin", "ping", etc., and add our custom
        'fade-in': 'fadeIn 0.5s ease-out both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // beautiful prose styling
    require('@tailwindcss/forms'),      // clean form inputs
  ],
};
