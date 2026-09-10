/**
 * "Quem está contribuindo" section.
 *
 * 2027 is organised by PUC Minas and UFMG and promoted (realização) by the
 * SBC. There are no sponsors or supporters confirmed yet, so the sponsorship
 * tiers are replaced by a call-to-action inviting companies to join.
 *
 * Each entry falls back to its short label if the logo file is missing.
 */
export interface OrgEntry {
  id: string;
  name: string;
  /** Public path to the logo, e.g. /assets/images/ufmg-logo.png. */
  logo: string;
  url?: string;
}

/** Organização — host institutions. */
export const ORGANIZERS: OrgEntry[] = [
  {
    id: 'puc-minas',
    name: 'PUC Minas',
    logo: '/assets/images/puc-minas-logo.png',
    url: 'https://www.pucminas.br/',
  },
  {
    id: 'ufmg',
    name: 'UFMG',
    logo: '/assets/images/ufmg-logo.png',
    url: 'https://ufmg.br/',
  },
];

/** Realização — promoting society. */
export const REALIZATION: OrgEntry[] = [
  {
    id: 'sbc',
    name: 'SBC — Sociedade Brasileira de Computação',
    logo: '/assets/images/sbc.png',
    url: 'https://www.sbc.org.br/',
  },
];
