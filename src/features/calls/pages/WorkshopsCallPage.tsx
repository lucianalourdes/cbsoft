import { useEffect, type CSSProperties } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLang } from '@/shared/hooks/useLang';
import { pick } from '@/shared/utils/localized';
import { BrandBar } from '@/shared/components/brand/BrandBar';
import { ABOUT_SYMPOSIA } from '@/features/about/data/about';
import { CONGRESS } from '@/shared/constants/congress';
import { SYMPOSIA } from '@/features/symposia/data/symposia';
import { SymposiumIcon } from '@/features/symposia/components/SymposiumIcon';
import { CallLink } from '@/features/calls/components/CallLink';
import { SubmissionItemList, type SubmissionItem } from '@/features/calls/components/SubmissionItemList';
import { CalendarIcon, PeopleIcon, PersonIcon } from '@/shared/components/icons/lineIcons';
import {
  SBC_AUTHOR_CONDUCT_URL,
  WORKSHOP_CHAIRS,
  WORKSHOP_MILESTONES,
  WORKSHOP_SUBMISSION_URL,
} from '@/features/calls/data/workshopsCall';
import { ROUTES } from '@/shared/constants/routes';

export function WorkshopsCallPage() {
  const { t } = useTranslation();
  const lang = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submissionLink = (
    <CallLink
      href={WORKSHOP_SUBMISSION_URL}
      pendingLabel={t('workshopsCallPage.submissionLinkTbd')}
    />
  );
  const criteria = t('workshopsCallPage.criteria', { returnObjects: true }) as string[];
  const submissionItems = t('workshopsCallPage.submissionItems', {
    returnObjects: true,
  }) as SubmissionItem[];
  const preApprovedCriteria = t('workshopsCallPage.preApprovedCriteria', {
    returnObjects: true,
  }) as string[];
  const preApprovedItems = t('workshopsCallPage.preApprovedItems', {
    returnObjects: true,
  }) as SubmissionItem[];

  return (
    <main className="about-page" id="workshops-chamada">
      <section className="about-section wcall-top">
        <div className="container-xl">
          <header className="wcall-intro">
            <p className="about-eyebrow">{t('workshopsCallPage.introEyebrow')}</p>
            <p className="wcall-intro__tagline">{t('workshopsCallPage.introTagline')}</p>
            <p className="wcall-edition" aria-label={t('workshopsCallPage.editionAria')}>
              <span>{t('workshopsCallPage.edition')}</span>
              <span className="wcall-edition__dot" aria-hidden="true">•</span>
              <span>
                {CONGRESS.city} — {CONGRESS.state}
              </span>
              <span className="wcall-edition__dot" aria-hidden="true">•</span>
              <span>{CONGRESS.year}</span>
            </p>
          </header>

          <div className="wcall-layout">
            <div className="wcall-main">
              <h1 className="about-h2">
                <BrandBar className="wcall-bar" />
                {t('workshopsCallPage.contextTitle')}
              </h1>
              <div className="about-prose wcall-prose">
                <p>{t('workshopsCallPage.contextP1')}</p>
                <p>{t('workshopsCallPage.contextP2')}</p>
              </div>
              <ul className="wcall-symposia">
                {ABOUT_SYMPOSIA.map((symposium) => {
                  const meta = SYMPOSIA.find((item) => item.id === symposium.id);
                  // "XLI Simpósio …" → edition "XLI" + full name "Simpósio …".
                  const [edition, ...rest] = pick(symposium.name, lang).split(' ');
                  return (
                    <li
                      key={symposium.id}
                      className="wcall-symposium"
                      style={{ '--accent': `var(--${meta?.accent ?? 'purple'})` } as CSSProperties}
                    >
                      <span className="wcall-symposium__icon">
                        <SymposiumIcon id={symposium.id} />
                      </span>
                      <span className="wcall-symposium__acronym">
                        {edition} {meta?.acronym}
                      </span>
                      <span className="wcall-symposium__name">{rest.join(' ')}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="about-prose wcall-prose">
                <p>{t('workshopsCallPage.contextP3')}</p>
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandBar className="wcall-bar" />
                {t('workshopsCallPage.generalTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <p>{t('workshopsCallPage.generalIntro')}</p>
                <ul className="wcall-list">
                  {criteria.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  <Trans i18nKey="workshopsCallPage.duration" components={{ b: <strong /> }} />
                </p>
                <p>{t('workshopsCallPage.schedule')}</p>
                <p>{t('workshopsCallPage.preferredDate')}</p>
                <blockquote className="wcall-note">
                  <strong>{t('workshopsCallPage.importantLabel')}</strong>{' '}
                  {t('workshopsCallPage.important')}
                </blockquote>
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandBar className="wcall-bar" />
                {t('workshopsCallPage.submissionTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <p>{t('workshopsCallPage.submissionPreApproved')}</p>
                <p>
                  {t('workshopsCallPage.submissionWhere')} {submissionLink}
                </p>
                <p>{t('workshopsCallPage.submissionMustInclude')}</p>
                <SubmissionItemList items={submissionItems} />
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandBar className="wcall-bar" />
                {t('workshopsCallPage.preApprovedTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <p>
                  <Trans i18nKey="workshopsCallPage.preApprovedIntro" components={{ i: <em /> }} />
                </p>
                <ul className="wcall-list">
                  {preApprovedCriteria.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  {t('workshopsCallPage.preApprovedWhere')} {submissionLink}
                </p>
                <p>{t('workshopsCallPage.preApprovedMustInclude')}</p>
                <SubmissionItemList items={preApprovedItems} />
                <p>{t('workshopsCallPage.preApprovedOutcome')}</p>
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandBar className="wcall-bar" />
                {t('workshopsCallPage.ethicsTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <p>
                  <Trans
                    i18nKey="workshopsCallPage.ethics"
                    components={{
                      a: (
                        <a
                          href={SBC_AUTHOR_CONDUCT_URL}
                          className="wcall-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  />
                </p>
              </div>
            </div>

            <div className="wcall-side">
              <aside className="wcall-dates" aria-labelledby="wcall-dates-title">
                <h2 id="wcall-dates-title" className="wcall-dates__title">
                  <span className="wcall-dates__title-icon">
                    <CalendarIcon />
                  </span>
                  {t('workshopsCallPage.datesTitle')}
                </h2>
                <ol className="wcall-dates__list">
                  {WORKSHOP_MILESTONES.map((m) => (
                    <li key={m.key} className="wcall-dates__item">
                      <span className="wcall-side__icon">
                        <CalendarIcon />
                      </span>
                      <span className="wcall-dates__body">
                        <span className="wcall-dates__label">
                          {t(`workshopsCallPage.milestones.${m.key}`)}
                        </span>
                        <span className="wcall-dates__date">
                          {m.date ?? t('workshopsCallPage.tbd')}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </aside>

              <aside className="wcall-dates" aria-labelledby="wcall-org-title">
                <h2 id="wcall-org-title" className="wcall-dates__title">
                  <span className="wcall-dates__title-icon">
                    <PeopleIcon />
                  </span>
                  {t('workshopsCallPage.organizationTitle')}
                </h2>
                <div className="wcall-org">
                  <h3 className="wcall-org__subtitle">{t('workshopsCallPage.chairsTitle')}</h3>
                  <ul className="wcall-org__list">
                    {WORKSHOP_CHAIRS.map((chair, index) => (
                      <li key={index} className="wcall-org__item">
                        <span className="wcall-side__icon">
                          <PersonIcon />
                        </span>
                        <span className="wcall-org__body">
                          <span className="wcall-org__name">
                            {chair.name} <span>— {chair.affiliation}</span>
                          </span>
                          {/* Only real addresses become mailto links, not placeholders. */}
                          {chair.email.includes('@') ? (
                            <a href={`mailto:${chair.email}`} className="wcall-link">
                              {chair.email}
                            </a>
                          ) : (
                            <span className="wcall-org__email">{chair.email}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>

          <Link to={ROUTES.home} className="about-back">
            <span aria-hidden="true">&larr;</span>
            {t('workshopsCallPage.backHome')}
          </Link>
        </div>
      </section>
    </main>
  );
}
