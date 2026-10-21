import type { Localized } from '@/lib/localized';

export type SymposiumId = 'sbes' | 'sblp' | 'sbcars' | 'sast';
export type AccentToken = 'purple' | 'cyan' | 'leaf' | 'pink';

export interface Symposium {
  id: SymposiumId;
  acronym: string;
  /** MOD.01 … MOD.04 tag shown on the cards. */
  mod: string;
  accent: AccentToken;
  /** Official name, without acronym or edition. Single source for every
   *  page, menu and description that names the symposium. */
  title: Localized;
  /** 2027 edition: roman numeral (pt) and ordinal (en). Confirm with each
   *  steering committee before launch. */
  edition: Localized;
  /** "Official name (ACRONYM)". */
  name: Localized;
  blurb: Localized;
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
    mod: '01',
    accent: 'purple',
    title: {
      pt: 'Simpósio Brasileiro de Engenharia de Software',
      en: 'Brazilian Symposium on Software Engineering',
    },
    edition: { pt: 'XLI', en: '41st' },
    blurb: {
      pt: 'O principal evento de Engenharia de Software na América Latina.',
      en: 'The leading Software Engineering event in Latin America.',
    },
  },
  {
    id: 'sblp',
    acronym: 'SBLP',
    mod: '02',
    accent: 'cyan',
    title: {
      pt: 'Simpósio Brasileiro de Linguagens de Programação',
      en: 'Brazilian Symposium on Programming Languages',
    },
    edition: { pt: 'XXXI', en: '31st' },
    blurb: {
      pt: 'Projeto, implementação, semântica e análise de linguagens de programação.',
      en: 'Design, implementation, semantics and analysis of programming languages.',
    },
  },
  {
    id: 'sbcars',
    acronym: 'SBCARS',
    mod: '03',
    accent: 'leaf',
    title: {
      pt: 'Simpósio Brasileiro de Componentes, Arquiteturas e Reutilização de Software',
      en: 'Brazilian Symposium on Software Components, Architectures, and Reuse',
    },
    edition: { pt: 'XXI', en: '21st' },
    blurb: {
      pt: 'Linhas de produto, componentes, arquiteturas de software e reutilização.',
      en: 'Product lines, components, software architectures and reuse.',
    },
  },
  {
    id: 'sast',
    acronym: 'SAST',
    mod: '04',
    accent: 'pink',
    title: {
      pt: 'Simpósio Brasileiro de Teste de Software Sistemático e Automatizado',
      en: 'Brazilian Symposium on Systematic and Automated Software Testing',
    },
    edition: { pt: 'XII', en: '12th' },
    blurb: {
      pt: 'Sistematização e automação da atividade de teste de software.',
      en: 'Systematisation and automation of software testing.',
    },
  },
] satisfies SymposiumSource[]).map(withName);

export const COMPLEMENTARY_TRACKS: Localized[] = [
  { pt: 'Trilha de Indústria', en: 'Industry Track' },
  { pt: 'Sessão de Ferramentas', en: 'Tools Session' },
  { pt: 'Concurso de Teses e Dissertações', en: 'Thesis & Dissertation Contest' },
];

/** Maps an accent token to the matching CSS custom properties. */
export const ACCENT_VARS: Record<AccentToken, { border: string; text: string }> = {
  purple: { border: 'var(--purple)', text: 'var(--purple)' },
  cyan: { border: 'var(--cyan)', text: 'var(--cyan-deep)' },
  leaf: { border: 'var(--leaf)', text: 'var(--leaf-deep)' },
  pink: { border: 'var(--pink)', text: 'var(--pink-deep)' },
};
