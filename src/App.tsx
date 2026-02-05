import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Pillars } from './components/Pillars'
import { FocusAreas } from './components/FocusAreas'
import { Footer } from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <FocusAreas />
      </main>
      <Footer />
    </>
  )
}

export default App
