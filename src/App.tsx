import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { OrbitCapabilities } from './components/OrbitCapabilities'
import { TransitionBand } from './components/TransitionBand'
import { FocusAreas } from './components/FocusAreas'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OrbitCapabilities />
        <TransitionBand />
        <FocusAreas />
      </main>
      <Footer />
    </>
  )
}

export default App
