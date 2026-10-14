import type { ReactNode } from 'react';
import { LINE_ICON_PROPS } from '@/shared/components/icons/lineIcons';
import type { SymposiumId } from '@/features/symposia/data/symposia';

const GLYPHS: Record<SymposiumId, ReactNode> = {
  // Software Engineering: stacked layers.
  sbes: (
    <>
      <path d="M12 3 3 8l9 5 9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  // Formal Methods: the "for all" quantifier.
  sbmf: <path d="m5 4 7 16 7-16M8.1 11h7.8" />,
  // Components & Architecture: connected blocks.
  sbcars: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
    </>
  ),
  // Software Testing: check mark in a circle.
  sast: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
};

/** Small line icon for a symposium; inherits its accent colour from CSS. */
export function SymposiumIcon({ id }: { id: SymposiumId }) {
  return <svg {...LINE_ICON_PROPS}>{GLYPHS[id]}</svg>;
}
