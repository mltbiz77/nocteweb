import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { StatementRow } from './components/StatementRow'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatementRow />
      </main>
      <Footer />
    </>
  )
}

export default App
