/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every route's HTML entry point plus all of src.
  content: ['./index.html', './*/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-sunk': 'var(--paper-sunk)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        'ink-faint': 'var(--ink-faint)',
        accent: 'var(--accent)',
        'accent-deep': 'var(--accent-deep)',
        rule: 'var(--rule)',
        'rule-soft': 'var(--rule-soft)',
        night: 'var(--night)',
        'night-sunk': 'var(--night-sunk)',
        'night-ink': 'var(--night-ink)',
        'night-muted': 'var(--night-muted)',
        'night-rule': 'var(--night-rule)',
        'night-accent': 'var(--night-accent)',
      },
      borderColor: {
        DEFAULT: 'var(--rule)',
      },
      fontFamily: {
        // Structure, headings, UI.
        sans: ['Switzer', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // Reading text — paragraphs, legal, long prose.
        text: ['Erode', 'Iowan Old Style', 'Georgia', 'serif'],
      },
      letterSpacing: {
        masthead: '-0.035em',
        // Small caps labels and buttons. Wide enough to read as considered
        // rather than shouted.
        label: '0.16em',
      },
      maxWidth: {
        measure: '62ch',
      },
    },
  },
  plugins: [],
};
