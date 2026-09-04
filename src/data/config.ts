/** Full-paper submission deadline the hero countdown targets (js/main.js). */
export const COUNTDOWN_DEADLINE = '2027-03-15T23:59:59-03:00';

export const CONGRESS = {
  edition: 29,
  city: 'Belo Horizonte',
  state: 'Minas Gerais',
  start: '2027-09-27',
  end: '2027-10-01',
} as const;

export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'x' | 'linkedin';
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'X / Twitter', href: '#', icon: 'x' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
];

/** Resolve a file under public/ against Vite's configured base. */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}

export const IMAGES = {
  grafismo: asset('assets/images/grafismo.png'),
  grafismo_2: asset('assets/images/grafismo-2.png'),
  grafismo_3: asset('assets/images/grafismo-3.png'),
  grafismo_4: asset('assets/images/grafismo-4.png'),
  grafismo_5: asset('assets/images/grafismo-5.png'),
  grafismo_6: asset('assets/images/grafismo-6.png'),
  logo_horiziontal: asset('assets/images/logo-horizontal.png'),
  logo_horizontal_white: asset('assets/images/logo-horizontal-white.png'),
  logo_horizontal_black: asset('assets/images/logo-horizontal-black.png'),
  logo_horizontal_mono: asset('assets/images/logo-horizontal-mono.png'),
  logo_vertical: asset('assets/images/logo-horizontal.png'),
  logo_vertical_white: asset('assets/images/logo-horizontal-white.png'),
  logo_vertical_black: asset('assets/images/logo-vertical-black.png'),
  logo_vertical_mono: asset('assets/images/logo-vertical-mono.png'),
  logo_text: asset('assets/images/logo-text.png'),
  logo_text_white: asset('assets/images/logo-text-white.png'),
  logo_text_black: asset('assets/images/logo-text-black.png'),
  logo_text_mono: asset('assets/images/logo-text-mono.png'),
  praca: asset('assets/images/praca-liberdade.webp'),
} as const;
