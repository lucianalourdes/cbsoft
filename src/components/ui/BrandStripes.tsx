interface BrandStripesProps {
  className?: string;
}

/** Top-to-bottom stripe order of the CBSoft'27 logo drawing. */
const STRIPES = ['var(--logo-leaf)', 'var(--logo-cyan)', 'var(--logo-purple)', 'var(--logo-pink)'];

/** A tiny slice of the logo's curved, stacked stripes — a discreet brand
 *  mark for section headings. Decorative only. */
export function BrandStripes({ className = '' }: BrandStripesProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 26"
      width="44"
      height="26"
      aria-hidden="true"
      focusable="false"
    >
      {STRIPES.map((color, i) => {
        const y = 6 + i * 5.5;
        return (
          <path
            key={color}
            d={`M3 ${y + 2} Q22 ${y - 5} 41 ${y + 2}`}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
