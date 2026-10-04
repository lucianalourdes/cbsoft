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
  /** Public path to the logo, e.g. /assets/images/sbc.png. */
  logo: string;
  url?: string;
}

/** Organização — host institutions.
 *
 *  PUC Minas brand manual (2025): use the new brasão in its institutional
 *  colours (assinatura principal, exported from the manual), and place
 *  partner brands external to the university to its left — so UFMG first. */
export const ORGANIZERS: OrgEntry[] = [
  {
    id: 'ufmg',
    name: 'UFMG',
    // Cropped to the mark itself, so it can sit on the PUC Minas baseline.
    logo: '/assets/images/ufmg-logo-trim.png',
    url: 'https://ufmg.br/',
  },
  {
    id: 'puc-minas',
    name: 'PUC Minas',
    logo: '/assets/images/puc-minas-brasao.png',
    url: 'https://www.pucminas.br/',
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
