import { useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import {
  ABOUT_ACTIVITIES,
  ABOUT_CONGRESS,
  ABOUT_SYMPOSIA,
  type ActivityIcon,
} from '@/data/about';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ACTIVITY_ICONS: Record<ActivityIcon, ReactNode> = {
  paper: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  ),
  talk: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4M9 21h6" />
    </svg>
  ),
  panel: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <circle cx="8" cy="9" r="2.4" />
      <circle cx="16" cy="9" r="2.4" />
      <path d="M4 19c0-2.4 1.8-4 4-4s4 1.6 4 4M12 19c0-2.4 1.8-4 4-4s4 1.6 4 4" />
    </svg>
  ),
  workshop: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M14 7l3-3 3 3-3 3z" />
      <path d="M13 8 4 17a2 2 0 0 0 3 3l9-9" />
      <path d="M9 5 5 9M15 15l4 4" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" />
    </svg>
  ),
};

export function AboutPage() {
  const { t } = useTranslation();
  const lang = useLang();

  useEffect(() => {
    const previous = document.title;
    document.title = t('aboutPage.metaTitle');
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, [t]);

  const facts = [
    { value: ABOUT_CONGRESS.editionOrdinal, label: t('aboutPage.statEditionLabel'), accent: true },
    { value: t('aboutPage.tbd'), label: t('aboutPage.statDatesLabel') },
    { value: ABOUT_CONGRESS.city, label: ABOUT_CONGRESS.stateName },
    { value: String(ABOUT_CONGRESS.symposiaCount), label: t('aboutPage.statSymposiaLabel') },
  ];

  return (
    <main className="about-page" id="sobre-cbsoft">
      {/* 1 — Page header */}
      <section className="about-section about-header">
        <div className="container-xl">
          <p className="about-eyebrow">{t('aboutPage.eyebrow')}</p>
          <h1 className="about-title">{t('aboutPage.title')}</h1>
          <p className="about-lead">{t('aboutPage.p1')}</p>
        </div>
      </section>

      {/* 2 — Quick facts strip */}
      <section className="about-section about-section--alt">
        <div className="container-xl">
          <dl className="about-facts">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className={`about-fact${fact.accent ? ' about-fact--accent' : ''}`}
              >
                <dt className="about-fact__value">{fact.value}</dt>
                <dd className="about-fact__label">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 — Institutional, two columns */}
      <section className="about-section">
        <div className="container-xl">
          <div className="about-split">
            <div className="about-split__aside">
              <span className="about-split__index">01</span>
              <h2 className="about-h2">{t('aboutPage.institutionalTitle')}</h2>
              <span className="about-split__rule" aria-hidden="true" />
            </div>
            <div className="about-prose">
              <p>{t('aboutPage.p2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — CBSoft 2027 highlight band */}
      <section className="about-section about-section--alt">
        <div className="container-xl">
          <section className="about-highlight" aria-label={t('aboutPage.highlightName')}>
            <p className="about-highlight__name">{t('aboutPage.highlightName')}</p>
            <h2 className="about-highlight__edition">
              <em>{t('aboutPage.highlightEditionEmphasis')}</em>{' '}
              {t('aboutPage.highlightEditionRest')}
            </h2>
            <p className="about-highlight__roman">{t('aboutPage.highlightEditionRoman')}</p>

            <dl className="about-highlight__grid">
              <div>
                <dt className="about-highlight__k">{t('aboutPage.labelDates')}</dt>
                <dd className="about-highlight__v">{t('aboutPage.tbd')}</dd>
              </div>
              <div>
                <dt className="about-highlight__k">{t('aboutPage.labelLocation')}</dt>
                <dd className="about-highlight__v">{t('aboutPage.location')}</dd>
              </div>
              <div>
                <dt className="about-highlight__k">{t('aboutPage.statSymposiaLabel')}</dt>
                <dd className="about-highlight__v">{ABOUT_CONGRESS.symposiaCount}</dd>
              </div>
            </dl>
          </section>
        </div>
      </section>

      {/* 5 — Symposia, 2x2 card grid */}
      <section className="about-section">
        <div className="container-xl">
          <p className="about-eyebrow">02</p>
          <h2 className="about-h2" style={{ marginTop: '0.75rem' }}>
            {t('aboutPage.symposiaTitle')}
          </h2>
          <div className="about-grid about-grid--2">
            {ABOUT_SYMPOSIA.map((symposium, index) => (
              <article key={symposium.id} className="about-card">
                <span className="about-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="about-card__accent" aria-hidden="true" />
                <h3 className="about-card__title">{pick(symposium.name, lang)}</h3>
                <p className="about-card__text">{`${pick(symposium.description, lang)}.`}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Program & activities */}
      <section className="about-section about-section--alt">
        <div className="container-xl">
          <p className="about-eyebrow">03</p>
          <h2 className="about-h2" style={{ marginTop: '0.75rem' }}>
            {t('aboutPage.activitiesTitle')}
          </h2>
          <p className="about-prose" style={{ marginTop: '1.25rem' }}>
            {t('aboutPage.activitiesLead')}
          </p>

          <div className="about-grid about-grid--3">
            {ABOUT_ACTIVITIES.map((activity) => {
              const text = pick(activity.text, lang);
              return (
                <article key={activity.id} className="about-actcard">
                  <span className="about-actcard__icon">{ACTIVITY_ICONS[activity.icon]}</span>
                  <h3 className="about-actcard__title">{pick(activity.title, lang)}</h3>
                  {text && <p className="about-actcard__text">{text}</p>}
                </article>
              );
            })}
          </div>

          <p className="about-closing">{t('aboutPage.activitiesClosing')}</p>

          <Link to="/" className="about-back">
            <span aria-hidden="true">&larr;</span>
            {t('aboutPage.backHome')}
          </Link>
        </div>
      </section>
    </main>
  );
}
