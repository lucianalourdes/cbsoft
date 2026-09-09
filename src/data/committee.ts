import type { Localized } from '@/lib/localized';

export interface CommitteePerson {
  name: Localized;
  detail: Localized;
}

/** Coordenação Geral — name + affiliation, still to be confirmed. */
export const GENERAL_CHAIRS: CommitteePerson[] = [
  {
    name: { pt: 'Nome a confirmar', en: 'Name to be confirmed' },
    detail: { pt: 'Instituição local organizadora', en: 'Local organizing institution' },
  },
  {
    name: { pt: 'Nome a confirmar', en: 'Name to be confirmed' },
    detail: { pt: 'SBC', en: 'SBC' },
  },
];

/** Program-committee chairs, one line per symposium (chair TBC). */
export const PC_CHAIR_SYMPOSIA = ['SBES', 'SBLP', 'SBCARS', 'SAST'] as const;

/** Comitê Local — role names; the "to be confirmed" tail is added in the UI. */
export const LOCAL_COMMITTEE_ROLES: Localized[] = [
  { pt: 'Infraestrutura', en: 'Infrastructure' },
  { pt: 'Divulgação', en: 'Communication' },
  { pt: 'Patrocínio', en: 'Sponsorship' },
];
