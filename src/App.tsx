import { Header } from './components/Header'
import { HeroLine } from './components/HeroLine'
import { FocusSection } from './components/FocusSection'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroLine />
        <FocusSection />
      </main>
      <Footer />
    </>
  )
}

export default App
