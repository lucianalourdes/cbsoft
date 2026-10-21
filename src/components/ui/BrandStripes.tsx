import { IMAGES } from '@/data/config';

interface BrandStripesProps {
  className?: string;
}

/** The official CBSoft'27 symbol (the curved stripes of the Edifício
 *  Niemeyer) as a discreet brand mark for section headings. Decorative only. */
export function BrandStripes({ className = '' }: BrandStripesProps) {
  return (
    <img
      className={`brand-stripes ${className}`.trim()}
      src={IMAGES.grafismo_icon}
      width={168}
      height={149}
      alt=""
      aria-hidden="true"
    />
  );
}
