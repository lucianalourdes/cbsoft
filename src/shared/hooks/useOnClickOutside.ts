import { useEffect } from 'react';

/**
 * Calls `handler` on a pointer-down or Escape outside `ref`. Used to
 * dismiss the "add to calendar" menu, matching the document listeners
 * in the old js/main.js.
 */
export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  active = true,
): void {
  useEffect(() => {
    if (!active) return;
    const onClick = (e: MouseEvent) => {
      const node = ref.current;
      if (node && !node.contains(e.target as Node)) handler();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler();
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, handler, active]);
}
