import './styles/global.css'
import { CircleWavesBackground } from './components/CircleWavesBackground'
import { Hero } from './components/Hero'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="page">
      <CircleWavesBackground />
      <Hero />
      <Footer />
    </div>
  )
}
