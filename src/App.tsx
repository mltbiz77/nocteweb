import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Pillars } from './components/Pillars'
import { FlowLine } from './components/FlowLine'
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
        <FlowLine />
        <Approach />
      </main>
      <Footer />
    </>
  )
}

export default App
