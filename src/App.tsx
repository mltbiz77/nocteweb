import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FocusStrip } from './components/FocusStrip'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FocusStrip />
      </main>
      <Footer />
    </>
  )
}

export default App
