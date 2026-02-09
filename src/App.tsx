import { Layout } from './components/Layout'
import { Hero } from './components/Hero'
import { BuildSection } from './components/BuildSection'
import { BackSection } from './components/BackSection'
import { AdviseSection } from './components/AdviseSection'
import { SignalsSection } from './components/SignalsSection'
import { Footer } from './components/Footer'
import './styles/global.css'

function App() {
  return (
    <Layout>
      <Hero />
      <BuildSection />
      <BackSection />
      <AdviseSection />
      <SignalsSection />
      <Footer />
    </Layout>
  )
}

export default App
