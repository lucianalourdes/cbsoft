interface WordmarkProps {
  className?: string;
}

/** The three-colour "CBSOFT'27" lockup used in the header, hero and footer. */
export function Wordmark({ className = '' }: WordmarkProps) {
  return (
    <span className={className}>
      <span style={{ color: 'var(--logo-purple)' }}>CB</span>
      <span style={{ color: 'var(--logo-pink)' }}>SOFT</span>
      <span style={{ color: 'var(--logo-cyan)' }}>&rsquo;27</span>
    </span>
  );
}
