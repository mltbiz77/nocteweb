import { useState, useCallback } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { OrbitStrip } from './components/OrbitStrip'
import { FocusStrip } from './components/FocusStrip'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  const [heroVerbIndex, setHeroVerbIndex] = useState<number | null>(null)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleVerbChange = useCallback((index: number) => {
    setHeroVerbIndex(index)
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero onVerbChange={handleVerbChange} />
        <OrbitStrip
          activeVerbIndex={reduceMotion ? null : heroVerbIndex}
          reduceMotion={reduceMotion}
        />
        <FocusStrip />
      </main>
      <Footer />
    </>
  )
}

export default App
