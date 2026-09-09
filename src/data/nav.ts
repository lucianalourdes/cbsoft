/** Primary navigation — anchors into the single page. `key` indexes
 *  the `nav.*` block in the i18n dictionary. */
export interface NavItem {
  href: string;
  key: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '#cbsoft', key: 'nav.cbsoft' },
  { href: '#sbes', key: 'nav.sbes' },
  { href: '#sblp', key: 'nav.sblp' },
  { href: '#sbcars', key: 'nav.sbcars' },
  { href: '#sast', key: 'nav.sast' },
  { href: '#workshops', key: 'nav.workshops' },
  { href: '#mais', key: 'nav.more' },
];