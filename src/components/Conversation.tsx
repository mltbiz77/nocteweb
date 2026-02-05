import { useReveal } from '../hooks/useReveal'
import { TypingIndicator } from './TypingIndicator'

type Speaker = 'founder' | 'nocte'

const messages: { speaker: Speaker; text: string }[] = [
  { speaker: 'founder', text: 'We need to ship a product and find the right backers.' },
  { speaker: 'nocte', text: 'We build software products and invest in ventures like yours.' },
  { speaker: 'founder', text: 'What about ongoing strategy and growth?' },
  { speaker: 'nocte', text: 'We advise founders and teams—product, distribution, and capital.' },
]

const showTypingAfterIndex = 1

export function Conversation() {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '-60px 0px' })

  return (
    <section className="conversation" id="conversation" ref={ref}>
      <div className="conversation-inner">
        {messages.map((msg, i) => (
          <div key={i}>
            <div
              className={`conv-message ${msg.speaker} ${isVisible ? 'is-visible' : ''} ${isVisible ? 'pop' : ''}`}
              style={{
                transitionDelay: isVisible ? `${i * 0.12}s` : '0s',
              }}
            >
              <div className="conv-label">
                {msg.speaker === 'founder' ? 'Founder' : 'Nocte'}
              </div>
              <p className="conv-text">{msg.text}</p>
            </div>
            {msg.speaker === 'nocte' && i === showTypingAfterIndex && isVisible && (
              <div className="conv-typing-wrap" aria-hidden>
                <TypingIndicator />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
