import { useTranslation } from 'react-i18next';
import { CONGRESS, SOCIAL_LINKS } from '@/data/config';
import { SocialIcon } from '@/components/ui/SocialIcon';

export function Footer() {
  const { t } = useTranslation();
  const year = CONGRESS.start.slice(0, 4);

  const channels = SOCIAL_LINKS.filter((link) => {
    try {
      const destination = new URL(link.href);

      return link.icon === 'email'
        ? destination.protocol === 'mailto:' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destination.pathname)
        : destination.protocol === 'https:' &&
        destination.pathname !== '/';
    } catch {
      return false;
    }
  });

  return (
    <footer className="site-footer">
      <div className="container-xl site-footer__inner">
        <p className="site-footer__copyright">
          &copy; CBSoft {year}{' '}
          <span aria-hidden="true">|</span>{' '}
          {t('footer.rights')}
        </p>

        <nav aria-label={t('footer.channels')}>
          <ul className="site-footer__channels">
            {channels.map((link) => (
              <li key={link.icon}>
                <a
                  href={link.href}
                  aria-label={
                    link.icon === 'email'
                      ? t('footer.emailLabel')
                      : t('footer.channelLabel', {
                        channel: t('footer.channelNames.' + link.icon),
                      })
                  }
                  className="site-footer__link"
                  target={link.icon === 'email' ? undefined : '_blank'}
                  rel={
                    link.icon === 'email'
                      ? undefined
                      : 'noopener noreferrer'
                  }
                >
                  <SocialIcon name={link.icon} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}