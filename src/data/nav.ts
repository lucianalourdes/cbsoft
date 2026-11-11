import { HEADER_MENUS, type HeaderMenuId } from './headerMenu';

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
  { id: 'workshops', href: '#workshops', key: 'nav.workshops' },
  // { id: 'more', href: '#mais', key: 'nav.more' },
];

export function getCurrentHeaderMenu(pathname: string): HeaderMenuId | null {
  const section = pathname.split('/')[1];
  const symposium = NAV_ITEMS.find((item) => item.id !== 'cbsoft' && item.id === section);
  if (symposium) return symposium.id;

  const isCongressPage = pathname === '/' || HEADER_MENUS.cbsoft.columns.some((sections) =>
    sections.some(({ links }) => links.some((link) => link.href.split('#')[0] === pathname)),
  );
  return isCongressPage ? 'cbsoft' : null;
}
