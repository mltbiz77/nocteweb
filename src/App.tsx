import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MessageMarquee } from './components/MessageMarquee'
import { CapabilitiesStream } from './components/CapabilitiesStream'
import { Highlights } from './components/Highlights'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MessageMarquee />
        <CapabilitiesStream />
        <Highlights />
      </main>
      <Footer />
    </>
  )
}

export default App
