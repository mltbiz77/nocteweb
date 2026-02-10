import { BlurText } from './components/BlurText';
import { Magnet } from './components/Magnet';
import { FollowCursor } from './components/FollowCursor';

const HERO_TEXT =
  'Designing and building B2C and B2B apps and software, and guiding companies on their solutions.';
const CONTACT_MAILTO = 'mailto:hello@nocteventures.com';

export default function App() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col items-center justify-between overflow-hidden">
      <FollowCursor />

      <main className="flex-1 flex items-center justify-center w-full px-6">
        <section className="max-w-3xl w-full text-center space-y-10 py-16">
          <BlurText
            text={HERO_TEXT}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight"
          />

          <div className="flex justify-center">
            <Magnet>
              <a
                href={CONTACT_MAILTO}
                className="inline-flex items-center justify-center px-8 py-3 text-sm sm:text-base font-semibold tracking-[0.25em] uppercase rounded-full bg-accent text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.03] active:scale-95 transition-all duration-200"
              >
                Contact
              </a>
            </Magnet>
          </div>
        </section>
      </main>

      <footer className="w-full pb-6 text-center text-xs text-slate-500">
        Registered in England, Company No. 16579177.
      </footer>
    </div>
  );
}

