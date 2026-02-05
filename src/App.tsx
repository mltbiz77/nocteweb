import { Header } from './components/Header'
import { HeroHalo } from './components/HeroHalo'
import { FocusSection } from './components/FocusSection'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroHalo />
        <FocusSection />
      </main>
      <Footer />
    </>
  )
}

export default App
