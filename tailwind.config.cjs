/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every route's HTML entry point plus all of src. New route → the glob already covers it.
  content: ['./index.html', './*/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#05060B',
        'night-deep': '#030409',
        ink: '#F2F3F7',
        'ink-muted': '#9BA1B4',
        'ink-faint': 'rgba(155,161,180,0.78)',
        moonlight: '#C9D4EE',
        star: '#E7ECF7',
        line: 'rgba(148,163,199,0.10)',
        'line-hover': 'rgba(148,163,199,0.22)',
        card: 'rgba(148,163,199,0.03)',
        'card-hover': 'rgba(148,163,199,0.05)',
      },
      fontFamily: {
        sans: ['Switzer', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['Zodiak', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
