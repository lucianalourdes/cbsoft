export type SponsorTierId = 'diamond' | 'gold' | 'silver' | 'bronze' | 'institutional';

export interface SponsorTier {
  id: SponsorTierId;
  /** CSS custom property for the tier label colour. */
  colorVar: string;
  slots: number;
  /** Tailwind grid-cols-* utility for the slot row. */
  gridCols: string;
  /** Tailwind height utility for each slot tile. */
  tileHeight: string;
  /** Smaller type on the denser rows. */
  compact?: boolean;
}

export const SPONSOR_TIERS: SponsorTier[] = [
  { id: 'diamond', colorVar: 'var(--tier-diamond)', slots: 1, gridCols: 'grid-cols-1', tileHeight: 'h-20' },
  { id: 'gold', colorVar: 'var(--tier-gold)', slots: 2, gridCols: 'grid-cols-2', tileHeight: 'h-16' },
  { id: 'silver', colorVar: 'var(--tier-silver)', slots: 3, gridCols: 'grid-cols-3', tileHeight: 'h-14' },
  {
    id: 'bronze',
    colorVar: 'var(--tier-bronze)',
    slots: 4,
    gridCols: 'grid-cols-4',
    tileHeight: 'h-12',
    compact: true,
  },
  {
    id: 'institutional',
    colorVar: 'var(--slate-soft)',
    slots: 4,
    gridCols: 'grid-cols-4',
    tileHeight: 'h-12',
    compact: true,
  },
];
