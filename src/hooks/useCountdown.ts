import { useEffect, useState } from 'react';

export interface CountdownParts {
  d: string;
  h: string;
  m: string;
  s: string;
}

function compute(deadline: number): CountdownParts {
  const diff = Math.max(0, deadline - Date.now());
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  };
}

/** Ticking countdown to `deadline` (ISO string or epoch ms). */
export function useCountdown(deadline: string | number): CountdownParts {
  const target = typeof deadline === 'number' ? deadline : new Date(deadline).getTime();
  const [parts, setParts] = useState<CountdownParts>(() => compute(target));

  useEffect(() => {
    setParts(compute(target));
    const id = window.setInterval(() => setParts(compute(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return parts;
}
