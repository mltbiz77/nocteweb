import { Header } from './components/Header'
import { HeroGlass } from './components/HeroGlass'
import { FocusSection } from './components/FocusSection'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroGlass />
        <FocusSection />
      </main>
      <Footer />
    </>
  )
}

export default App
