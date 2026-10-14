import type { Localized } from '@/lib/localized';
import { SYMPOSIA, type SymposiumId } from './symposia';

/**
 * Facts for the standalone "Sobre o CBSoft" page (/sobre).
 *
 * Only officially available information is kept here. The 2026 congress was
 * the XVII edition, so 2027 is the XVIII (18ª). Dates and the host venue are
 * NOT confirmed yet (see PUBLICATION) — the page must show "A definir" and
 * must not name an institution.
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
  symposiaCount: SYMPOSIA.length,
} as const;

/** One coalocated symposium as shown in the "integrando quatro eventos" list. */
export interface AboutSymposium {
  id: string;
  /** Edition + official name, per language (from SYMPOSIA). */
  name: Localized;
  /** Trailing clause describing the symposium's scope. */
  description: Localized;
}

const DESCRIPTIONS: Record<SymposiumId, Localized> = {
  sbes: {
    pt: 'o principal evento de Engenharia de Software na América Latina',
    en: 'the leading Software Engineering event in Latin America',
  },
  sbmf: {
    pt: 'que reúne pesquisadores e profissionais interessados no desenvolvimento e na aplicação de métodos formais na construção de software e sistemas',
    en: 'bringing together researchers and practitioners interested in developing and applying formal methods to build software and systems',
  },
  sbcars: {
    pt: 'que agrega tópicos como linhas de produto de software, desenvolvimento de software baseado em componentes, arquiteturas de software e reutilização',
    en: 'covering topics such as software product lines, component-based software development, software architectures and reuse',
  },
  sast: {
    pt: 'que versa sobre questões relacionadas à sistematização e automação da atividade de teste de software',
    en: 'addressing the systematisation and automation of software testing',
  },
};

/** Names come from the canonical SYMPOSIA list, so they never drift. */
export const ABOUT_SYMPOSIA: AboutSymposium[] = SYMPOSIA.map((s) => ({
  id: s.id,
  name: {
    pt: `${s.edition.pt} ${s.title.pt}`,
    en: `${s.edition.en} ${s.title.en}`,
  },
  description: DESCRIPTIONS[s.id],
}));

/** Links in the "Sobre a SBC" section. The 2026 site pointed to a misspelt
 *  /comissoes-especiasis/ URL (404); this is the working address. */
export const SBC_SPECIAL_COMMITTEES_URL = 'https://www.sbc.org.br/comissoes-especiais/';
export const SBC_MEMBERSHIP_URL = 'https://centraldesistemas.sbc.org.br/mom';
