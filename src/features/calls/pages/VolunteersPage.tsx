import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BrandStripes } from '@/shared/components/brand/BrandStripes';
import {
  VOLUNTEER_APPLICATION_FORM_URL,
  VOLUNTEER_COORDINATORS,
  VOLUNTEER_MILESTONES,
  VOLUNTEER_RECOMMENDATION_FORM_URL,
} from '@/features/calls/data/volunteers';
import { CallLink } from '@/features/calls/components/CallLink';
import { CalendarIcon } from '@/shared/components/icons/lineIcons';

/** Call for volunteers — same two-column shell as the workshops call. */
export function VolunteersPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const list = (key: string) => t(`volunteersPage.${key}`, { returnObjects: true }) as string[];
  const benefits = list('benefits');
  const responsibilities = list('responsibilities');
  const requirements = list('requirements');

  return (
    <main className="about-page" id="voluntarios">
      <section className="about-section about-top" aria-labelledby="voluntarios-titulo">
        <div className="container-xl">
          <h1 id="voluntarios-titulo" className="about-title">
            {t('volunteersPage.title')}
          </h1>

          <div className="wcall-layout volunteers-layout">
            <div className="wcall-main">
              <h2 className="about-h2">
                <BrandStripes className="wcall-mark" />
                {t('volunteersPage.presentationTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <p>{t('volunteersPage.p1')}</p>
                <p>{t('volunteersPage.p2')}</p>
                <p>{t('volunteersPage.p3')}</p>
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandStripes className="wcall-mark" />
                {t('volunteersPage.benefitsTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <ul className="wcall-list">
                  {benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandStripes className="wcall-mark" />
                {t('volunteersPage.responsibilitiesTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <p>{t('volunteersPage.preparation')}</p>
                <p>{t('volunteersPage.duringIntro')}</p>
                <ul className="wcall-list">
                  {responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>{t('volunteersPage.socialMedia')}</p>
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandStripes className="wcall-mark" />
                {t('volunteersPage.requirementsTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <ul className="wcall-list">
                  {requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandStripes className="wcall-mark" />
                {t('volunteersPage.procedureTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <p>{t('volunteersPage.procedureIntro')}</p>
                <ol className="wcall-list wcall-list--ordered">
                  <li>
                    <Trans i18nKey="volunteersPage.applicationForm" components={{ b: <strong /> }} />{' '}
                    <CallLink href={VOLUNTEER_APPLICATION_FORM_URL} pendingLabel={t('volunteersPage.linkTbd')} />
                  </li>
                  <li>
                    <Trans i18nKey="volunteersPage.recommendationForm" components={{ b: <strong /> }} />{' '}
                    <CallLink href={VOLUNTEER_RECOMMENDATION_FORM_URL} pendingLabel={t('volunteersPage.linkTbd')} />.{' '}
                    {t('volunteersPage.recommendationNote')}
                  </li>
                </ol>
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandStripes className="wcall-mark" />
                {t('volunteersPage.datesSectionTitle')}
              </h2>
              <dl className="volunteers-dates">
                {VOLUNTEER_MILESTONES.map((m) => (
                  <div key={m.key} className="volunteers-dates__row">
                    <dt>{t(`volunteersPage.milestonesLong.${m.key}`)}</dt>
                    <dd>{m.date ?? t('volunteersPage.tbd')}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="about-h2 wcall-h2">
                <BrandStripes className="wcall-mark" />
                {t('volunteersPage.coordinationTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                {VOLUNTEER_COORDINATORS.map((person, index) => (
                  <p key={index}>
                    {person.name} — {person.affiliation}{' '}
                    {/* Only real addresses become mailto links, not placeholders. */}
                    {person.email.includes('@') ? (
                      <>
                        &lt;
                        <a href={`mailto:${person.email}`} className="wcall-link">
                          {person.email}
                        </a>
                        &gt;
                      </>
                    ) : (
                      <span>&lt;{person.email}&gt;</span>
                    )}
                  </p>
                ))}
                <p className="volunteers-closing">{t('volunteersPage.questions')}</p>
                <p>{t('volunteersPage.closing')}</p>
              </div>
            </div>

            <div className="wcall-side">
              <aside className="wcall-dates" aria-labelledby="voluntarios-datas">
                <h2 id="voluntarios-datas" className="wcall-dates__title">
                  <span className="wcall-dates__title-icon">
                    <CalendarIcon />
                  </span>
                  {t('volunteersPage.datesTitle')}
                </h2>
                <ol className="wcall-dates__list">
                  {VOLUNTEER_MILESTONES.map((m) => (
                    <li key={m.key} className="wcall-dates__item">
                      <span className="wcall-side__icon">
                        <CalendarIcon />
                      </span>
                      <span className="wcall-dates__body">
                        <span className="wcall-dates__label">
                          {t(`volunteersPage.milestones.${m.key}`)}
                        </span>
                        <span className="wcall-dates__date">
                          {m.date ?? t('volunteersPage.tbd')}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
