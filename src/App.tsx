import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ComparisonSection } from './components/ComparisonSection'
import { ProductsSection } from './components/ProductsSection'
import { FAQSection } from './components/FAQSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'
import './styles/global.css'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ComparisonSection />
        <ProductsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
