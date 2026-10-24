import '@/styles/page-content.css';
import '@/styles/call-layout.css';
import '@/styles/links.css';

import './SymposiumCallPage.css';

import { useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { BrandBar } from '@/components/ui/BrandBar';
import { CalendarIcon, PeopleIcon, PersonIcon } from '@/components/ui/CallIcons';
import { ABOUT_CONGRESS } from '@/data/about';
import { SYMPOSIA, type SymposiumId } from '@/data/symposia';
import type { SbesTrackId } from '@/data/sbesTracks';
import { SBES_TRACK_CALLS, SYMPOSIUM_CALLS, type CallBlock } from '@/data/symposiumCalls';

const INLINE_MARKUP = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

/** Turns [label](url) into an external link and **text** into bold. */
function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_MARKUP)) {
    parts.push(text.slice(last, match.index));
    parts.push(
      match[3] !== undefined ? (
        <strong key={match.index}>{match[3]}</strong>
      ) : (
        <a key={match.index} href={match[2]} className="wcall-link" target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      ),
    );
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}

function Block({ block }: { block: CallBlock }) {
  const lang = useLang();
  switch (block.kind) {
    case 'p':
      return <p>{renderInline(pick(block.text, lang))}</p>;
    case 'list':
      return (
        <ul className="wcall-list">
          {block.items.map((item) => (
            <li key={item.pt}>{renderInline(pick(item, lang))}</li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <pre className="scall-code">
          <code>{block.code}</code>
        </pre>
      );
  }
}

interface SymposiumCallPageProps {
  id: SymposiumId;
  /** An SBES track with its own call (/sbes/<slug>/chamada). */
  track?: SbesTrackId;
}

/** Call for papers of one co-located symposium (/<symposium>/chamada) or of
 *  one SBES track. */
export function SymposiumCallPage({ id, track }: SymposiumCallPageProps) {
  const { t } = useTranslation();
  const lang = useLang();
  const symposium = SYMPOSIA.find((item) => item.id === id)!;
  const call = track ? SBES_TRACK_CALLS[track] : SYMPOSIUM_CALLS[id];
  const title = track ? t(`headerMenu.sbes.tracks.${track}.title`) : pick(symposium.name, lang);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, track]);

  return (
    <main className="about-page" id={`${id}-chamada`}>
      <section className="about-section wcall-top">
        <div className="container-xl">
          <header className="wcall-intro">
            <p className="about-eyebrow">{t('symposiumCallPage.eyebrow')}</p>
            <p className="wcall-edition">
              <span>
                {pick(symposium.edition, lang)} {symposium.acronym}
              </span>
              <span className="wcall-edition__dot" aria-hidden="true">•</span>
              <span>
                {ABOUT_CONGRESS.city} — {ABOUT_CONGRESS.state}
              </span>
              <span className="wcall-edition__dot" aria-hidden="true">•</span>
              <span>{ABOUT_CONGRESS.year}</span>
            </p>
          </header>

          {!call ? (
            <div className="wcall-main">
              <h1 className="about-h2">
                <BrandBar />
                {title}
              </h1>
              <div className="about-prose wcall-prose">
                <p>
                  {track
                    ? t('symposiumCallPage.trackComingSoon', { track: title, year: ABOUT_CONGRESS.year })
                    : t('symposiumCallPage.comingSoon', {
                      acronym: symposium.acronym,
                      year: ABOUT_CONGRESS.year,
                    })}
                </p>
              </div>
            </div>
          ) : (
            <div className="wcall-layout">
              <div className="wcall-main">
                <h1 className="about-h2">
                  <BrandBar />
                  {title}
                </h1>
                <div className="about-prose wcall-prose">
                  {call.intro.map((paragraph) => (
                    <p key={paragraph.pt}>{pick(paragraph, lang)}</p>
                  ))}
                </div>

                {call.sections.map((section) => (
                  <section key={section.title.pt}>
                    <h2 className="about-h2 wcall-h2">
                      <BrandBar />
                      {pick(section.title, lang)}
                    </h2>
                    <div className="about-prose wcall-prose">
                      {section.blocks.map((block, index) => (
                        <Block key={index} block={block} />
                      ))}
                    </div>
                  </section>
                ))}

                {call.committees.map((committee, committeeIndex) => (
                  <section key={committeeIndex}>
                    <h2 className="about-h2 wcall-h2">
                      <BrandBar />
                      {committee.title ? pick(committee.title, lang) : t('symposiumCallPage.committeeTitle')}
                    </h2>
                    <ul className="scall-committee">
                      {committee.members.map((member, index) => (
                        <li key={index}>
                          <span className="scall-committee__name">{member.name}</span>
                          <span className="scall-committee__affiliation">{member.affiliation}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="wcall-side">
                <aside className="wcall-dates" aria-labelledby="scall-dates-title">
                  <h2 id="scall-dates-title" className="wcall-dates__title">
                    <span className="wcall-dates__title-icon">
                      <CalendarIcon />
                    </span>
                    {t('symposiumCallPage.datesTitle')}
                  </h2>
                  <ol className="wcall-dates__list">
                    {call.milestones.map((milestone) => (
                      <li key={milestone.label.pt} className="wcall-dates__item">
                        <span className="wcall-side__icon">
                          <CalendarIcon />
                        </span>
                        <span className="wcall-dates__body">
                          <span className="wcall-dates__label">{pick(milestone.label, lang)}</span>
                          <span className="wcall-dates__date">
                            {milestone.date ?? t('symposiumCallPage.tbd')}
                          </span>
                          {milestone.hard && (
                            <span className="scall-hard">{t('symposiumCallPage.hardDeadline')}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ol>
                  {call.datesNote && (
                    <p className="scall-dates-note">{pick(call.datesNote, lang)}</p>
                  )}
                </aside>

                {call.chairs.length > 0 && (
                  <aside className="wcall-dates" aria-labelledby="scall-org-title">
                    <h2 id="scall-org-title" className="wcall-dates__title">
                      <span className="wcall-dates__title-icon">
                        <PeopleIcon />
                      </span>
                      {t('symposiumCallPage.organizationTitle')}
                    </h2>
                    <div className="wcall-org">
                      <h3 className="wcall-org__subtitle">{t('symposiumCallPage.chairsTitle')}</h3>
                      <ul className="wcall-org__list">
                        {call.chairs.map((chair, index) => (
                          <li key={index} className="wcall-org__item">
                            <span className="wcall-side__icon">
                              <PersonIcon />
                            </span>
                            <span className="wcall-org__body">
                              <span className="wcall-org__name">{chair.name}</span>
                              <span className="wcall-org__affiliation">{chair.affiliation}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
