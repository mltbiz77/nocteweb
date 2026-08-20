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
  // Per-app legal pages. App Store Connect requires a *hosted* privacy policy
  // URL per app — the copy inside each app is not enough on its own, and App
  // Review reads the page. FridgeFox's two are generated from the markdown that
  // ships inside the app (`scripts/build-fridgefox-legal.mjs`) so the hosted and
  // in-app texts cannot drift apart.
  'callback/privacy',
  'callback/terms',
  'fridgefox/privacy',
  'fridgefox/terms',
  'track-my-subs/privacy',
  'track-my-subs/terms',
  'jott/privacy',
  'jott/terms',
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
        ...Object.fromEntries(
          ROUTES.map((route) => [route.replace(/\//g, '-'), entry(route)]),
        ),
      },
    },
  },
})
