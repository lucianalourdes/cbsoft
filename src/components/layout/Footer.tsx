import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IMAGES, SOCIAL_LINKS, type SocialLink } from '@/data/config';
import { SYMPOSIA } from '@/data/symposia';
import { Wordmark } from '@/components/ui/Wordmark';

const QUICK_LINKS: { href: string; key: string }[] = [
  { href: '#cfp', key: 'footer.linkCfp' },
  { href: '#inscricoes', key: 'footer.linkRegistration' },
  { href: '#comite', key: 'footer.linkCommittee' },
  { href: '#patrocinio', key: 'footer.linkProspectus' },
];

const SOCIAL_ICONS: Record<SocialLink['icon'], ReactNode> = {
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  ),
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.6l-5.2-6.8L5.4 22H2.3l8.1-9.3L1.7 2h6.9l4.7 6.2L18.9 2Zm-1.2 18h1.7L7.4 4H5.6l12.1 16Z" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  ),
};

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--brand-ink)', color: '#C6B7D9' }}>
      <div className="container-xl py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <span className="flex items-center gap-2.5">
            <img src={IMAGES.logo} alt="" aria-hidden="true" className="h-8 w-auto shrink-0" />
            <Wordmark className="font-display text-lg font-bold" />
          </span>
          <p className="text-sm mt-4 leading-relaxed max-w-[220px]">{t('footer.promotedBy')}</p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[.12em] text-white mb-4">
            {t('footer.quickLinks')}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white">
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[.12em] text-white mb-4">
            {t('footer.relatedEvents')}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {SYMPOSIA.map((s) => (
              <li key={s.id}>{s.acronym}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[.12em] text-white mb-4">
            {t('footer.follow')}
          </h4>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.icon}
                href={link.href}
                aria-label={link.label}
                className="w-9 h-9 rounded-full border flex items-center justify-center hover:border-white hover:text-white transition-colors"
                style={{ borderColor: 'rgba(255,255,255,.25)' }}
              >
                {SOCIAL_ICONS[link.icon]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="rule" style={{ borderColor: 'rgba(255,255,255,.12)' }}>
        <div
          className="container-xl py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs"
          style={{ color: '#8A7A9E' }}
        >
          <p>
            &copy; {year} {t('footer.rights')}
          </p>
          <p className="font-mono">{t('footer.location')}</p>
        </div>
      </div>
    </footer>
  );
}
