import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

/**
 * A multi-page app: one HTML entry point per route, each mounting its own
 * React tree. No router, no client-side navigation — every page is a static
 * document that loads only the JS it needs.
 *
 * Adding a route: create `<route>/index.html` and `src/pages/<route>/main.tsx`,
 * then add the folder name to ROUTES below.
 */
const ROUTES = [
  'portfolio',
  'advisory',
  'about',
  'contact',
  'privacy',
  'terms',
  // Product pages
  'jott',
  'track-my-subs',
  'fridgefox',
  'callback',
]

const entry = (route: string) => {
  const file = path.resolve(__dirname, route, 'index.html')
  if (!fs.existsSync(file)) throw new Error(`Missing entry point: ${route}/index.html`)
  return file
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...Object.fromEntries(ROUTES.map((route) => [route, entry(route)])),
      },
    },
  },
})
