import type { Localized } from '@/lib/localized';

export type SymposiumId = 'sbes' | 'sbmf' | 'sbcars' | 'sast';
export type AccentToken = 'purple' | 'cyan' | 'leaf' | 'pink';

export interface Symposium {
  id: SymposiumId;
  acronym: string;
  /** MOD.01 … MOD.04 tag shown on the cards. */
  mod: string;
  accent: AccentToken;
  name: Localized;
  blurb: Localized;
}

export const SYMPOSIA: Symposium[] = [
  {
    id: 'sbes',
    acronym: 'SBES',
    mod: '01',
    accent: 'purple',
    name: {
      pt: 'Simpósio Brasileiro de Engenharia de Software (SBES)',
      en: 'Brazilian Symposium on Software Engineering (SBES)',
    },
    blurb: {
      pt: 'Simpósio Brasileiro de Engenharia de Software — trilha científica principal do congresso.',
      en: 'Brazilian Symposium on Software Engineering — the flagship scientific track.',
    },
  },
  {
    id: 'sbmf',
    acronym: 'SBMF',
    mod: '02',
    accent: 'cyan',
    name: {
      pt: 'Simpósio Brasileiro de Métodos Formais (SBMF)',
      en: 'Brazilian Symposium on Formal Methods (SBMF)',
    },
    blurb: {
      pt: 'Simpósio Brasileiro de Métodos Formais — especificação, verificação e correção de software.',
      en: 'Brazilian Symposium on Formal Methods — specification, verification and correctness.',
    },
  },
  {
    id: 'sbcars',
    acronym: 'SBCARS',
    mod: '03',
    accent: 'leaf',
    name: {
      pt: 'Simpósio Brasileiro de Componentes, Arquiteturas e Reutilização de Software (SBCARS)',
      en: 'Brazilian Symposium on Components, Architectures and Reuse Systems (SBCARS)',
    },
    blurb: {
      pt: 'Simpósio Brasileiro de Componentes, Arquiteturas e Reutilização de Software.',
      en: 'Brazilian Symposium on Components, Architectures and Reuse Systems.',
    },
  },
  {
    id: 'sast',
    acronym: 'SAST',
    mod: '04',
    accent: 'pink',
    name: {
      pt: 'Simpósio Brasileiro de Testes Sistemático e Automatizado de Software (SAST)',
      en: 'Brazilian Symposium on Systematic and Automated Software Testing (SAST)',
    },
    blurb: {
      pt: 'Simpósio Brasileiro de Testes Sistemático e Automatizado de Software.',
      en: 'Brazilian Symposium on Systematic and Automated Software Testing.',
    },
  },
];

export const COMPLEMENTARY_TRACKS: Localized[] = [
  { pt: 'Trilha de Indústria', en: 'Industry Track' },
  { pt: 'Sessão de Ferramentas', en: 'Tools Session' },
  { pt: 'Cursos / Tutoriais', en: 'Courses & Tutorials' },
  { pt: 'Concurso de Teses e Dissertações', en: 'Thesis & Dissertation Contest' },
];

/** Maps an accent token to the matching CSS custom properties. */
export const ACCENT_VARS: Record<AccentToken, { border: string; text: string }> = {
  purple: { border: 'var(--purple)', text: 'var(--purple)' },
  cyan: { border: 'var(--cyan)', text: 'var(--cyan-deep)' },
  leaf: { border: 'var(--leaf)', text: 'var(--leaf-deep)' },
  pink: { border: 'var(--pink)', text: 'var(--pink-deep)' },
};
