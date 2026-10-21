import type { Localized } from '@/lib/localized';

export interface CfpMilestone {
  milestone: Localized;
  /** Short PT-style date label, or `null` while it is still to be
   *  announced (rendered as "a definir"). */
  date: string | null;
  /** The closing "Conference" row is emphasised. */
  strong?: boolean;
}

export const CFP_MILESTONES: CfpMilestone[] = [
  {
    milestone: { pt: 'Submissão de artigos completos', en: 'Full paper submission' },
    date: null,
  },
  {
    milestone: { pt: 'Período de resposta aos revisores', en: 'Rebuttal period' },
    date: null,
  },
  {
    milestone: { pt: 'Notificação de aceite', en: 'Acceptance notification' },
    date: null,
  },
  {
    milestone: { pt: 'Versão camera-ready', en: 'Camera-ready version' },
    date: null,
  },
  {
    milestone: {
      pt: 'Prazo de inscrição com desconto (early-bird)',
      en: 'Early-bird registration deadline',
    },
    date: null,
  },
  {
    milestone: { pt: 'Congresso', en: 'Conference' },
    date: null,
    strong: true,
  },
];
