import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Conversation } from './components/Conversation'
import { Highlights } from './components/Highlights'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Conversation />
        <Highlights />
      </main>
      <Footer />
    </>
  )
}

export default App
