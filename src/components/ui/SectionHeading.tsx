import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Two-digit section index shown after the `//` (omit for the Agenda). */
  number?: string;
  /** Upper-case label in the eyebrow. */
  eyebrow: string;
  title: ReactNode;
  /** Optional lead paragraph under the title. */
  intro?: ReactNode;
  /** `onDark` recolours the eyebrow/title for the dark keynote band. */
  tone?: 'default' | 'onDark';
  titleClassName?: string;
  introClassName?: string;
  className?: string;
}

export function SectionHeading({
  title,
  intro,
  tone = 'default',
  titleClassName = 'text-3xl md:text-4xl',
  introClassName = 'mt-4 max-w-2xl leading-relaxed',
  className = '',
}: SectionHeadingProps) {
  const onDark = tone === 'onDark';
  return (
    <div className={className}>
      <h2
        className={`font-display font-semibold mt-3 leading-tight ${titleClassName}`}
        style={{ color: onDark ? '#fff' : 'var(--ink)' }}
      >
        {title}
      </h2>
      {intro != null && (
        <p
          className={introClassName}
          style={{ color: onDark ? '#C6B7D9' : 'var(--slate)' }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
