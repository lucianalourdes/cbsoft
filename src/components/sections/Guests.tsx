import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GuestsCarousel } from './GuestsCarousel';

export function Guests() {
  const { t } = useTranslation();

  return (
    <Reveal id="convidados" className="py-20 md:py-28" style={{ background: 'var(--surface-alt)' }}>
      <div className="container-xl">
        <SectionHeading
          eyebrow={t('guests.eyebrow')}
          title={t('guests.title')}
          intro={t('guests.intro')}
        />
        <GuestsCarousel />
      </div>
    </Reveal>
  );
}
