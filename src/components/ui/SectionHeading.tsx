import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Kept for call sites; the eyebrow line is currently not rendered. */
  number?: string;
  /** Kept for call sites; the eyebrow line is currently not rendered. */
  eyebrow?: string;
  title: ReactNode;
  /** Optional lead paragraph under the title. */
  intro?: ReactNode;
  /** `onDark` recolours the title for the dark keynote band. */
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
        className={`font-display font-semibold leading-tight ${titleClassName}`}
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
