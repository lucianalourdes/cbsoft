import { Reveal } from '@/components/ui/Reveal';
import { SymposiumCarousel } from './SymposiumCarousel';

export function Agenda() {
  return (
    <Reveal id="agenda" className="py-20 md:py-28">
      <div className="container-xl">
        <SymposiumCarousel />
      </div>
    </Reveal>
  );
}
