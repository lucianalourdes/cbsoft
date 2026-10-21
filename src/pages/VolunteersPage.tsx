import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BrandStripes } from '@/components/ui/BrandStripes';
import {
  VOLUNTEER_APPLICATION_FORM_URL,
  VOLUNTEER_COORDINATORS,
  VOLUNTEER_MILESTONES,
  VOLUNTEER_RECOMMENDATION_FORM_URL,
} from '@/data/volunteers';

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

/** Google Forms link, or a "to be announced" note while the 2027 call is closed. */
function FormLink({ href }: { href: string | null }) {
  const { t } = useTranslation();
  if (!href) {
    return <em>{t('volunteersPage.linkTbd')}</em>;
  }
  return (
    <a href={href} className="wcall-link" target="_blank" rel="noopener noreferrer">
      {href}
    </a>
  );
}

/** Call for volunteers — same two-column shell as the workshops call. */
export function VolunteersPage() {
  const { t } = useTranslation();

  useEffect(() => {
    const previous = document.title;
    document.title = t('volunteersPage.metaTitle');
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, [t]);

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
                    <FormLink href={VOLUNTEER_APPLICATION_FORM_URL} />
                  </li>
                  <li>
                    <Trans i18nKey="volunteersPage.recommendationForm" components={{ b: <strong /> }} />{' '}
                    <FormLink href={VOLUNTEER_RECOMMENDATION_FORM_URL} />.{' '}
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
