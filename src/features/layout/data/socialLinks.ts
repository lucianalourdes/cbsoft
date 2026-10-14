/** Official CBSoft channels shown in the footer. */
export interface SocialLink {
  label: string;
  href: string;
  icon:
  | 'email'
  | 'instagram'
  | 'facebook'
  | 'x'
  | 'bluesky'
  | 'linkedin'
  | 'github';
}

// Adicione o e-mail somente quando o contato de 2027 for confirmado.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/congresso.cbsoft',
    icon: 'instagram',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/congresso.cbsoft/',
    icon: 'facebook',
  },
  {
    label: 'X',
    href: 'https://x.com/congressocbsoft',
    icon: 'x',
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/cbsoft.bsky.social',
    icon: 'bluesky',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/congressocbsoft',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/lucianalourdes/cbsoft',
    icon: 'github',
  },
];
