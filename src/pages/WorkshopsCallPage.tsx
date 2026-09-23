import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { BrandStripes } from '@/components/ui/BrandStripes';
import { ABOUT_CONGRESS, ABOUT_SYMPOSIA } from '@/data/about';
import { SYMPOSIA, type SymposiumId } from '@/data/symposia';
import {
  SBC_AUTHOR_CONDUCT_URL,
  WORKSHOP_CHAIRS,
  WORKSHOP_MILESTONES,
  WORKSHOP_SUBMISSION_URL,
} from '@/data/workshopsCall';

interface SubmissionItem {
  text: string;
  sub?: string[];
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Small line icon per symposium, drawn in its accent colour. */
const SYMPOSIUM_ICONS: Record<SymposiumId, ReactNode> = {
  // Software Engineering: stacked layers.
  sbes: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M12 3 3 8l9 5 9-5z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  ),
  // Programming Languages: code brackets.
  sblp: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  ),
  // Components & Architecture: connected blocks.
  sbcars: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
    </svg>
  ),
  // Software Testing: check mark in a circle.
  sast: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  ),
};

/** Minimal line icons for the side cards. */
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);
const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <circle cx="17" cy="9.5" r="2.3" />
    <path d="M16 14.2c2.6.2 4.5 2 4.5 4.8" />
  </svg>
);
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
  </svg>
);

/** Bulleted list with optional nested items, as in the official call. */
function ItemList({ items }: { items: SubmissionItem[] }) {
  return (
    <ul className="wcall-list">
      {items.map((item) => (
        <li key={item.text}>
          {item.text}
          {item.sub && (
            <ul className="wcall-list wcall-list--sub">
              {item.sub.map((subItem) => (
                <li key={subItem}>{subItem}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/** JEMS link, or a "to be announced" note while the 2027 call is closed. */
function SubmissionLink() {
  const { t } = useTranslation();
  if (!WORKSHOP_SUBMISSION_URL) {
    return <em>{t('workshopsCallPage.submissionLinkTbd')}</em>;
  }
  return (
    <a
      href={WORKSHOP_SUBMISSION_URL}
      className="wcall-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {WORKSHOP_SUBMISSION_URL}
    </a>
  );
}

export function WorkshopsCallPage() {
  const { t } = useTranslation();
  const lang = useLang();

  useEffect(() => {
    const previous = document.title;
    document.title = t('workshopsCallPage.metaTitle');
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, [t]);

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
                {ABOUT_CONGRESS.city} — {ABOUT_CONGRESS.state}
              </span>
              <span className="wcall-edition__dot" aria-hidden="true">•</span>
              <span>{ABOUT_CONGRESS.year}</span>
            </p>
          </header>

          <div className="wcall-layout">
            <div className="wcall-main">
              <h1 className="about-h2">
                <BrandStripes className="wcall-mark" />
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
                        {SYMPOSIUM_ICONS[symposium.id as SymposiumId]}
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
                <BrandStripes className="wcall-mark" />
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
                <BrandStripes className="wcall-mark" />
                {t('workshopsCallPage.submissionTitle')}
              </h2>
              <div className="about-prose wcall-prose">
                <p>{t('workshopsCallPage.submissionPreApproved')}</p>
                <p>
                  {t('workshopsCallPage.submissionWhere')} <SubmissionLink />
                </p>
                <p>{t('workshopsCallPage.submissionMustInclude')}</p>
                <ItemList items={submissionItems} />
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandStripes className="wcall-mark" />
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
                  {t('workshopsCallPage.preApprovedWhere')} <SubmissionLink />
                </p>
                <p>{t('workshopsCallPage.preApprovedMustInclude')}</p>
                <ItemList items={preApprovedItems} />
                <p>{t('workshopsCallPage.preApprovedOutcome')}</p>
              </div>

              <h2 className="about-h2 wcall-h2">
                <BrandStripes className="wcall-mark" />
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

          <Link to="/" className="about-back">
            <span aria-hidden="true">&larr;</span>
            {t('workshopsCallPage.backHome')}
          </Link>
        </div>
      </section>
    </main>
  );
}
