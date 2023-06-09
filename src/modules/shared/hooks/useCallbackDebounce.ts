import { useCallback, useRef } from 'react';

export function useCallbackDebounce(
  callback: () => void,
  delay: number
): () => void {
  const timeoutRef = useRef<number | undefined>();

  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
}
