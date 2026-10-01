import { asset } from '@/data/config';

interface BrandStripesProps {
  className?: string;
}

/** Small copy (168px) of the official CBSoft'27 symbol, grafismo.png. */
const ICON_SRC = asset('assets/images/grafismo-icon.png');

/** The official CBSoft'27 symbol (the curved stripes of the Edifício
 *  Niemeyer) as a discreet brand mark for section headings. Decorative only. */
export function BrandStripes({ className = '' }: BrandStripesProps) {
  return (
    <img
      className={`brand-stripes ${className}`.trim()}
      src={ICON_SRC}
      width={168}
      height={149}
      alt=""
      aria-hidden="true"
    />
  );
}
