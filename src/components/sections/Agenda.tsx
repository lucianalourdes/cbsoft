import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SymposiumCarousel } from './SymposiumCarousel';

export function Agenda() {
  const { t } = useTranslation();

  return (
    <Reveal id="agenda" className="py-20 md:py-28">
      <div className="container-xl">
        <SectionHeading
          eyebrow={t('agenda.eyebrow')}
          title={t('agenda.title')}
          titleClassName="text-3xl md:text-4xl max-w-2xl"
          intro={t('agenda.intro')}
        />
        <SymposiumCarousel />
      </div>
    </Reveal>
  );
}
