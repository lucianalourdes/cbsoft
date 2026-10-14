import type { Localized } from '@/shared/utils/localized';

export type SymposiumId = 'sbes' | 'sbmf' | 'sbcars' | 'sast';
export type AccentToken = 'purple' | 'cyan' | 'leaf' | 'pink';

export interface Symposium {
  id: SymposiumId;
  acronym: string;
  accent: AccentToken;
  /** Official name, without acronym or edition. Single source for every
   *  page, menu and description that names the symposium. */
  title: Localized;
  /** 2027 edition: roman numeral (pt) and ordinal (en). Confirm with each
   *  steering committee before launch. */
  edition: Localized;
  /** "Official name (ACRONYM)". */
  name: Localized;
}

type SymposiumSource = Omit<Symposium, 'name'>;

const withName = (s: SymposiumSource): Symposium => ({
  ...s,
  name: { pt: `${s.title.pt} (${s.acronym})`, en: `${s.title.en} (${s.acronym})` },
});

/** The four symposia co-located at CBSoft 2027 — the canonical list. */
export const SYMPOSIA: Symposium[] = ([
  {
    id: 'sbes',
    acronym: 'SBES',
    accent: 'purple',
    title: {
      pt: 'Simpósio Brasileiro de Engenharia de Software',
      en: 'Brazilian Symposium on Software Engineering',
    },
    edition: { pt: 'XLI', en: '41st' },
  },
  {
    id: 'sbmf',
    acronym: 'SBMF',
    accent: 'cyan',
    title: {
      pt: 'Simpósio Brasileiro de Métodos Formais',
      en: 'Brazilian Symposium on Formal Methods',
    },
    edition: { pt: 'XXX', en: '30th' },
  },
  {
    id: 'sbcars',
    acronym: 'SBCARS',
    accent: 'leaf',
    title: {
      pt: 'Simpósio Brasileiro de Componentes, Arquiteturas e Reutilização de Software',
      en: 'Brazilian Symposium on Software Components, Architectures, and Reuse',
    },
    edition: { pt: 'XXI', en: '21st' },
  },
  {
    id: 'sast',
    acronym: 'SAST',
    accent: 'pink',
    title: {
      pt: 'Simpósio Brasileiro de Teste de Software Sistemático e Automatizado',
      en: 'Brazilian Symposium on Systematic and Automated Software Testing',
    },
    edition: { pt: 'XII', en: '12th' },
  },
] satisfies SymposiumSource[]).map(withName);
