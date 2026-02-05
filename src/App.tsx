import { Header } from './components/Header'
import { HeroPath } from './components/HeroPath'
import { FocusSection } from './components/FocusSection'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroPath />
        <FocusSection />
      </main>
      <Footer />
    </>
  )
}

export default App
