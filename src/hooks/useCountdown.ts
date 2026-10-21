import { useEffect, useState } from 'react';

export interface CountdownParts {
  d: string;
  h: string;
  m: string;
  s: string;
}

function compute(deadline: number): CountdownParts {
  const difference = Math.max(0, deadline - Date.now());

  const pad = (value: number) =>
    String(value).padStart(2, '0');

  return {
    d: pad(Math.floor(difference / 86_400_000)),

    h: pad(
      Math.floor(
        (difference % 86_400_000) / 3_600_000,
      ),
    ),

    m: pad(
      Math.floor(
        (difference % 3_600_000) / 60_000,
      ),
    ),

    s: pad(
      Math.floor(
        (difference % 60_000) / 1_000,
      ),
    ),
  };
}

export function useCountdown(
  deadline: string | number,
): CountdownParts {
  const target =
    typeof deadline === 'number'
      ? deadline
      : new Date(deadline).getTime();

  const [parts, setParts] = useState<CountdownParts>(
    () => compute(target),
  );

  useEffect(() => {
    setParts(compute(target));

    const intervalId = window.setInterval(() => {
      setParts(compute(target));
    }, 1_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [target]);

  return parts;
}