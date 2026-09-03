import type { Localized } from '@/lib/localized';

export interface RegistrationRow {
  category: Localized;
  earlyBird: number;
  regular: number;
  onSite: number;
}

export const REGISTRATION_ROWS: RegistrationRow[] = [
  {
    category: {
      pt: 'Estudante de Graduação (sócio SBC)',
      en: 'Undergraduate student (SBC member)',
    },
    earlyBird: 450,
    regular: 600,
    onSite: 750,
  },
  {
    category: {
      pt: 'Estudante de Pós-Graduação (sócio SBC)',
      en: 'Graduate student (SBC member)',
    },
    earlyBird: 600,
    regular: 780,
    onSite: 950,
  },
  {
    category: { pt: 'Profissional (sócio SBC)', en: 'Professional (SBC member)' },
    earlyBird: 950,
    regular: 1200,
    onSite: 1450,
  },
  {
    category: { pt: 'Profissional (não sócio)', en: 'Professional (non-member)' },
    earlyBird: 1250,
    regular: 1550,
    onSite: 1850,
  },
];

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

/** "R$ 450" / "R$ 1.200" — always BRL, as in the original site. */
export function formatFee(value: number): string {
  return BRL.format(value).replace(/\s/g, ' ');
}
