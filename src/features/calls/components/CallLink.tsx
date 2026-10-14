interface CallLinkProps {
  /** Form or submission system URL; `null` while the call is not open. */
  href: string | null;
  /** Shown instead of the link until the URL is published. */
  pendingLabel: string;
}

/** A call's external link (JEMS, Google Forms…), or a "to be announced"
 *  note while the 2027 call is still closed. */
export function CallLink({ href, pendingLabel }: CallLinkProps) {
  if (!href) return <em>{pendingLabel}</em>;
  return (
    <a href={href} className="wcall-link" target="_blank" rel="noopener noreferrer">
      {href}
    </a>
  );
}
