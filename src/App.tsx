import { GLSLHills } from '@/components/ui/glsl-hills';
import { DecryptedText } from '@/components/ui/decrypted-text';
import { Magnet } from './components/Magnet';

const CONTACT_MAILTO = 'mailto:hello@nocteventures.com';
const INSTAGRAM_URL = 'https://www.instagram.com/nocteventures/';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    number: '01',
    title: 'Venture Development',
    description:
      'We build digital ventures, products, and business models from idea to execution.',
  },
  {
    number: '02',
    title: 'Growth',
    description:
      'We help digital businesses improve traction, sharpen positioning, and scale with focus.',
  },
  {
    number: '03',
    title: 'Strategic Advisory',
    description:
      'We advise founders and companies on product direction, business models, monetization, and execution.',
  },
  {
    number: '04',
    title: 'Investment & Transactions',
    description:
      'We invest in selected digital ventures and support commercial growth, partnerships, and exit-ready positioning.',
  },
];

const PORTFOLIO = [
  {
    number: '01',
    name: 'Jott',
    tagline: 'A minimalist to-do list',
    description:
      'A premium minimalist to-do list for iOS and iPadOS. The philosophy: a digital sticky note — write it down, it stays until you tick it off. No deadlines, no categories, just a beautiful tactile list.',
    platform: 'iOS · iPadOS',
    status: 'Live',
  },
  {
    number: '02',
    name: 'Track My Subs',
    tagline: 'Take control of recurring spend',
    description:
      'A beautifully designed iOS app that helps users take control of their recurring subscription expenses. See your true monthly cost in one place and get smart reminders before renewals.',
    platform: 'iOS',
    status: 'Live',
  },
];

const LogoMark = ({ className = 'h-7' }: { className?: string }) => (
  <img
    src="/nocte-logo-cropped.png"
    alt="Nocte"
    className={`${className} w-auto select-none`}
    style={{
      filter: 'invert(1) brightness(2) contrast(2)',
      mixBlendMode: 'lighten',
    }}
    draggable={false}
  />
);

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 bg-[#050505]/60 backdrop-blur-md border-b border-white/5">
        <a href="#" className="block" aria-label="Nocte Ventures — Home">
          <LogoMark className="h-6 sm:h-7" />
        </a>
        <div className="hidden sm:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ─── Hero Section with GLSL Hills ─── */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <GLSLHills />
        <div className="pointer-events-none z-10 text-center absolute space-y-8 px-6">
          <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-pre-wrap leading-[1.05] tracking-tight">
            <DecryptedText
              text="Nocte Ventures"
              animateOn="view"
              speed={50}
              maxIterations={12}
              sequential={true}
              revealDirection="center"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              className="text-white"
              encryptedClassName="text-white/30"
              parentClassName="cursor-default"
              idleFlicker={true}
            />
          </h1>
          <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto leading-relaxed">
            We develop, grow, advise, sell, and invest in digital ventures and business models.
          </p>
          <div className="pointer-events-auto">
            <Magnet>
              <a
                href={CONTACT_MAILTO}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wide rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                Get in touch
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </Magnet>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <svg
            className="w-4 h-4 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section id="services" className="relative py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-white/30 block mb-4">
              What we do
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/10">
            {SERVICES.map((service) => (
              <div
                key={service.number}
                className="group p-8 sm:p-10 border-b border-white/10 md:odd:border-r md:odd:border-white/10 hover:bg-white/[0.02] transition-colors duration-500"
              >
                <span className="text-xs text-white/20 font-mono block mb-6">
                  {service.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-white/40 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Portfolio Section ─── */}
      <section id="portfolio" className="relative py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-white/30 block mb-4">
                Selected work
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                Portfolio
              </h2>
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              A selection of digital products we have built and brought to market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO.map((project) => (
              <article
                key={project.name}
                className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 sm:p-10 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-xs text-white/20 font-mono">
                    {project.number}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                    {project.status}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2 group-hover:text-white transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-white/50 mb-6">{project.tagline}</p>
                <p className="text-sm sm:text-base text-white/40 leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-white/30">
                    {project.platform}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-white/30">
                    Nocte Ventures
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" className="relative py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-white/30 block mb-4">
                About us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-8">
                Building digital ventures
                <br />
                <span className="text-white/40">with commercial focus.</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                Nocte Ventures develops, grows, advises, sells, and invests in
                digital ventures and business models.
              </p>
              <p className="text-white/50 leading-relaxed">
                We work across strategy, execution, and opportunity development
                to turn strong ideas into scalable digital businesses.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '01', label: 'Develop' },
                { value: '02', label: 'Grow' },
                { value: '03', label: 'Advise' },
                { value: '04', label: 'Invest' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 sm:p-8 text-center hover:border-white/10 transition-colors duration-500"
                >
                  <div className="text-2xl sm:text-3xl font-semibold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact CTA Section ─── */}
      <section id="contact" className="relative py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-white/30 block mb-4">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Let&apos;s talk about your
            <br />
            next venture.
          </h2>
          <p className="text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you are building a new digital business, refining a model,
            or exploring strategic growth, we are open to the right opportunities.
          </p>
          <Magnet>
            <a
              href={CONTACT_MAILTO}
              className="inline-flex items-center gap-3 px-10 py-4 text-base font-medium tracking-wide rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-[0_0_60px_rgba(255,255,255,0.08)]"
            >
              hello@nocteventures.com
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </Magnet>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-10 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoMark className="h-5" />
            <span className="text-xs text-white/30 hidden sm:inline">
              Ventures
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center">
            <span className="text-xs text-white/30">
              Registered in England, Company No. 16579177.
            </span>
            <span className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nocte Ventures on Instagram"
            className="text-white/40 hover:text-white transition-colors duration-200"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
