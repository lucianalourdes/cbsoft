/** Primary navigation — anchors into the single page. `key` indexes
 *  the `nav.*` block in the i18n dictionary. */
export interface NavItem {
  href: string;
  key: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '#sobre', key: 'nav.about' },
  { href: '#eventos', key: 'nav.events' },
  { href: '#cfp', key: 'nav.cfp' },
  // { href: '#palestrantes', key: 'nav.keynotes' },
  { href: '#convidados', key: 'nav.guests' },
  { href: '#inscricoes', key: 'nav.registration' },
  { href: '#local', key: 'nav.location' },
  { href: '#comite', key: 'nav.committee' },
  { href: '#patrocinio', key: 'nav.sponsorship' },
];
