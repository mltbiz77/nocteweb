import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { RibbonCapabilities } from './components/RibbonCapabilities'
import { FlowSection } from './components/FlowSection'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RibbonCapabilities />
        <FlowSection />
      </main>
      <Footer />
    </>
  )
}

export default App
