import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Pillars } from './components/Pillars'
import { Approach } from './components/Approach'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <Approach />
      </main>
      <Footer />
    </>
  )
}

export default App
