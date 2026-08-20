/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './*/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-hi': 'var(--surface-hi)',
        ink: 'var(--ink)',
        'ink-dim': 'var(--ink-dim)',
        'ink-faint': 'var(--ink-faint)',
        accent: 'var(--accent)',
        'accent-hi': 'var(--accent-hi)',
        rule: 'var(--rule)',
        'rule-soft': 'var(--rule-soft)',
      },
      borderColor: { DEFAULT: 'var(--rule)' },
      fontFamily: {
        // Display only — huge, tight, lowercase.
        display: ['Cabinet Grotesk', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // Everything else.
        sans: ['Switzer', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: { label: '0.16em' },
    },
  },
  plugins: [],
};
