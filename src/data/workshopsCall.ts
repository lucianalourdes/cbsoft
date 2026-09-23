/** Key dates for the workshop call (/workshops/chamada). The 2026 call used
 *  26 Feb / 9 Mar / 10 Aug; 2027 dates are still to be announced, so every
 *  `date` stays `null` (rendered as "A definir") until confirmed. */
export interface WorkshopMilestone {
  /** Suffix of `workshopsCallPage.milestones.*` in common.json. */
  key: 'proposals' | 'notification' | 'finalVersion';
  date: string | null;
}

export const WORKSHOP_MILESTONES: WorkshopMilestone[] = [
  { key: 'proposals', date: null },
  { key: 'notification', date: null },
  { key: 'finalVersion', date: null },
];

/** JEMS submission link for workshop proposals. The 2026 call used
 *  https://jems3.sbc.org.br/cbsoftworkshops2026; set the 2027 URL here once
 *  it is open (`null` renders "link a ser divulgado"). */
export const WORKSHOP_SUBMISSION_URL: string | null = null;

/** SBC code of conduct for authors, linked from "Ética e Conduta na Publicação". */
export const SBC_AUTHOR_CONDUCT_URL = 'https://sol.sbc.org.br/index.php/indice/conduta';

export interface WorkshopChair {
  name: string;
  affiliation: string;
  email: string;
}

/** Workshops Committee chairs. Placeholders ("xxxxx") until the 2027 chairs
 *  are confirmed; the 2026 call listed Genaína Nunes Rodrigues (UnB) and
 *  Nabor das Chagas Mendonça (UNIFOR). */
export const WORKSHOP_CHAIRS: WorkshopChair[] = [
  { name: 'xxxxx', affiliation: 'xxxxx', email: 'xxxxx' },
  { name: 'xxxxx', affiliation: 'xxxxx', email: 'xxxxx' },
];
