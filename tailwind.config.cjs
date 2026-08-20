/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './*/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
        surface: 'var(--surface)',
        'surface-hi': 'var(--surface-hi)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        'ink-dim': 'var(--ink-dim)',
        'ink-faint': 'var(--ink-faint)',
        accent: 'var(--accent)',
        'accent-hi': 'var(--accent-hi)',
        blue: 'rgb(var(--blue-rgb) / <alpha-value>)',
        'blue-ink': 'rgb(255 255 255 / <alpha-value>)',
        'blue-dim': 'var(--blue-dim)',
        'blue-rule': 'var(--blue-rule)',
        rule: 'var(--rule)',
        'rule-soft': 'var(--rule-soft)',
      },
      borderColor: { DEFAULT: 'var(--rule)' },
      fontFamily: {
        // One family for the whole site; weight does the work.
        sans: ['Satoshi', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Satoshi', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: { label: '0.16em' },
    },
  },
  plugins: [],
};
