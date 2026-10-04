import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { SEARCH_ENTRIES } from '@/data/search';

/** Lowercase and strip accents, so "inscricao" matches "Inscrição". */
const normalize = (text: string) =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

const isMac = typeof navigator !== 'undefined' && /Mac|iP(hone|ad)/.test(navigator.platform);

/** "Não encontrou o que procurava?" — searches the site's pages and sections. */
export function SiteSearch() {
  const { t } = useTranslation();
  const lang = useLang();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsId = useId();

  // ⌘K / Ctrl+K focuses the field from anywhere on the page.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return SEARCH_ENTRIES.filter((entry) => {
      const haystack = normalize(
        [entry.title.pt, entry.title.en, entry.description.pt, entry.description.en, ...entry.keywords].join(' '),
      );
      return terms.every((term) => haystack.includes(term));
    });
  }, [query]);

  const searching = query.trim() !== '';

  return (
    <Reveal id="busca" className="site-search py-20 md:py-28">
      <div className="container-xl">
        <div className="site-search__intro">
          <h2 className="site-search__title">{t('search.title')}</h2>
          <p className="site-search__text">{t('search.text')}</p>
        </div>

        <div className="site-search__box">
          <label className="site-search__field">
            <svg className="site-search__icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" />
            </svg>
            <span className="sr-only">{t('search.label')}</span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('search.placeholder')}
              aria-controls={resultsId}
              autoComplete="off"
            />
            <span className="site-search__keys" aria-hidden="true">
              <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
              <kbd>K</kbd>
            </span>
          </label>

          <div id={resultsId} aria-live="polite">
            {searching &&
              (results.length > 0 ? (
                <ul className="site-search__results">
                  {results.map((entry) => {
                    const label = (
                      <>
                        <strong>{pick(entry.title, lang)}</strong>
                        <span>{pick(entry.description, lang)}</span>
                      </>
                    );
                    return (
                      <li key={entry.href}>
                        {entry.href.startsWith('/') ? (
                          <Link to={entry.href}>{label}</Link>
                        ) : (
                          <a href={entry.href}>{label}</a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="site-search__empty">{t('search.empty', { query: query.trim() })}</p>
              ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
