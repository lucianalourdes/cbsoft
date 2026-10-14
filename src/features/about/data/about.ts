import type { Localized } from '@/shared/utils/localized';
import { SYMPOSIA, type SymposiumId } from '@/features/symposia/data/symposia';

/** Content of the standalone "Sobre o CBSoft" page (/sobre). Congress-wide
 *  facts (edition, city, year) live in shared/constants/congress.ts. */

/** One coalocated symposium as shown in the "integrando quatro eventos" list. */
export interface AboutSymposium {
  id: SymposiumId;
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
