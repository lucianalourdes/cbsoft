import type { HTMLAttributes } from 'react';
import { useInView } from '@/hooks/useInView';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** Rendered element — every reveal target in the original is a <section>. */
  as?: 'section' | 'div';
}

/** Wrapper that fades its content in on first scroll into view
 *  (ports the IntersectionObserver reveal from js/main.js). */
export function Reveal({ as = 'section', className = '', children, ...rest }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? 'in' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
