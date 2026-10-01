import type { Localized } from '@/lib/localized';

/**
 * Facts for the standalone "Sobre o CBSoft" page (/sobre).
 *
 * Only officially available information is kept here. The 2026 congress was
 * the XVII edition, so 2027 is the XVIII (18ª). Dates and the host venue are
 * NOT confirmed yet — the page must show "A definir" and must not name an
 * institution. The per-symposium roman numerals follow each steering
 * committee's own count (2026 → 2027) and should be confirmed before launch.
 */
export const ABOUT_CONGRESS = {
  /** Roman-numeral form, e.g. used as "XVIII edição do CBSoft". */
  editionRoman: 'XVIII',
  /** Ordinal form, e.g. used as "18ª edição do CBSoft". */
  editionOrdinal: '18ª',
  year: 2027,
  city: 'Belo Horizonte',
  state: 'MG',
  stateName: 'Minas Gerais',
  symposiaCount: 4,
} as const;

/** One coalocated symposium as shown in the "integrando quatro eventos" list. */
export interface AboutSymposium {
  id: string;
  /** Roman-numeral edition + full name, per language. */
  name: Localized;
  /** Trailing clause describing the symposium's scope. */
  description: Localized;
}

export const ABOUT_SYMPOSIA: AboutSymposium[] = [
  {
    id: 'sbes',
    name: {
      pt: 'XLI Simpósio Brasileiro de Engenharia de Software',
      en: '41st Brazilian Symposium on Software Engineering',
    },
    description: {
      pt: 'o principal evento de Engenharia de Software na América Latina',
      en: 'the leading Software Engineering event in Latin America',
    },
  },
  {
    id: 'sblp',
    name: {
      pt: 'XXXI Simpósio Brasileiro de Linguagens de Programação',
      en: '31st Brazilian Symposium on Programming Languages',
    },
    description: {
      pt: 'que possui enfoque no estudo teórico e prático de linguagens de programação',
      en: 'focused on the theoretical and practical study of programming languages',
    },
  },
  {
    id: 'sbcars',
    name: {
      pt: 'XXI Simpósio Brasileiro de Componentes, Arquiteturas e Reutilização de Software',
      en: '21st Brazilian Symposium on Components, Architectures and Reuse Systems',
    },
    description: {
      pt: 'que agrega tópicos como linhas de produto de software, desenvolvimento de software baseado em componentes, arquiteturas de software e reutilização',
      en: 'covering topics such as software product lines, component-based software development, software architectures and reuse',
    },
  },
  {
    id: 'sast',
    name: {
      pt: 'XII Simpósio Brasileiro de Teste de Software Sistemático e Automatizado',
      en: '12th Brazilian Symposium on Systematic and Automated Software Testing',
    },
    description: {
      pt: 'que versa sobre questões relacionadas à sistematização e automação da atividade de teste de software',
      en: 'addressing the systematisation and automation of software testing',
    },
  },
];

/** Links in the "Sobre a SBC" section. The 2026 site pointed to a misspelt
 *  /comissoes-especiasis/ URL (404); this is the working address. */
export const SBC_SPECIAL_COMMITTEES_URL = 'https://www.sbc.org.br/comissoes-especiais/';
export const SBC_MEMBERSHIP_URL = 'https://centraldesistemas.sbc.org.br/mom';
