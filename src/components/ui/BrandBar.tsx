import './BrandBar.css';

interface BrandBarProps {
  className?: string;
}

/** The event's four-colour bar (green, cyan, purple, magenta in equal parts,
 *  the logo's stripe order) used as a supporting mark above call headings.
 *  Purely decorative, so screen readers skip it. */
export function BrandBar({ className = '' }: BrandBarProps) {
  return <span className={`brand-bar ${className}`.trim()} aria-hidden="true" />;
}
