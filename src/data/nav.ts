import type { HeaderMenuId } from './headerMenu';

/** `id` selects the menu; `key` selects only its translated label. */
export interface NavItem {
  id: HeaderMenuId;
  href: string;
  key: `nav.${HeaderMenuId}`;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'cbsoft', href: '#sobre', key: 'nav.cbsoft' },
  { id: 'sbes', href: '#sbes', key: 'nav.sbes' },
  { id: 'sblp', href: '#sblp', key: 'nav.sblp' },
  { id: 'sbcars', href: '#sbcars', key: 'nav.sbcars' },
  { id: 'sast', href: '#sast', key: 'nav.sast' },
  // { id: 'workshops', href: '#workshops', key: 'nav.workshops' },
  // { id: 'more', href: '#mais', key: 'nav.more' },
];
