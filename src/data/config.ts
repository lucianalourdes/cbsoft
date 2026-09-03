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
  logo: asset('images/logo-cbsoft-transparent.png'),
  heroPhoto: asset('images/praca-liberdade.webp'),
} as const;
