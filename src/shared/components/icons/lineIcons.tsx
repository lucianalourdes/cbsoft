import type { SVGProps } from 'react';

/** Shared look of the site's thin line icons: 24px grid, 1.6 stroke,
 *  current text colour. Icons are decorative, so screen readers skip them. */
export const LINE_ICON_PROPS = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} satisfies SVGProps<SVGSVGElement>;

export function CalendarIcon() {
  return (
    <svg {...LINE_ICON_PROPS}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function PeopleIcon() {
  return (
    <svg {...LINE_ICON_PROPS}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="17" cy="9.5" r="2.3" />
      <path d="M16 14.2c2.6.2 4.5 2 4.5 4.8" />
    </svg>
  );
}

export function PersonIcon() {
  return (
    <svg {...LINE_ICON_PROPS}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg {...LINE_ICON_PROPS}>
      <path d="M12 21s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg {...LINE_ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.5h.01" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg {...LINE_ICON_PROPS} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
