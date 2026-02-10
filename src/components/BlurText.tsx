import { useEffect, useState } from 'react';

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function BlurText({ text, className = '', delay = 0 }: BlurTextProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), delay);
    return () => window.clearTimeout(id);
  }, [delay]);

  return (
    <p className={className}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split('').map((char, charIndex) => {
            const index = wordIndex * 10 + charIndex;
            return (
              <span
                key={index}
                className={`inline-block transition-all duration-700 ease-out ${
                  mounted ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-3'
                }`}
                style={{ transitionDelay: `${index * 18}ms` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}

