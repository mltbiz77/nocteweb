import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LinesSection } from './components/LinesSection'
import { CompaniesOrFocus } from './components/CompaniesOrFocus'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LinesSection />
        <CompaniesOrFocus />
      </main>
      <Footer />
    </>
  )
}

export default App
