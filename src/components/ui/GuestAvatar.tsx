import { useState } from 'react';
import type { GuestTone } from '@/data/guests';

/** Gradient stops per brand hue — fixed values, like the CTA gradient,
 *  so the fallback discs read the same in light and dark. */
const TONE_STOPS: Record<GuestTone, [string, string]> = {
  purple: ['#8e4fb0', '#4b1f66'],
  cyan: ['#3cc6f5', '#0089c4'],
  leaf: ['#93c95c', '#5c9528'],
  pink: ['#f24aa6', '#b80a6c'],
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

/** Round guest portrait. Falls back to initials on a brand-hue disc if
 *  the image is missing. */
export function GuestAvatar({
  name,
  tone,
  photo,
}: {
  name: string;
  tone: GuestTone;
  photo?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [from, to] = TONE_STOPS[tone];

  if (photo && !failed) {
    return (
      <img
        className="guest-avatar"
        src={photo}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className="guest-avatar"
      aria-hidden="true"
      style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}
    >
      <span>{initials(name)}</span>
    </div>
  );
}
