import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'accent' | 'outline' | 'plain';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

const VARIANT_CLASS: Record<Variant, string> = {
  accent: 'btn-accent',
  outline: 'btn-outline',
  plain: '',
};

/** Anchor styled as the site's pill button (`.btn` + variant). */
export function Button({ variant = 'plain', className = '', children, ...rest }: ButtonProps) {
  return (
    <a className={`btn ${VARIANT_CLASS[variant]} ${className}`.trim()} {...rest}>
      {children}
    </a>
  );
}
