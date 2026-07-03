import { useEffect, useRef } from 'react';

export default function useGameLoop(callback: (delta: number) => void, enabled = true) {
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return undefined;
    lastTimeRef.current = 0;
    accumulatedRef.current = 0;

    const targetFrameTime = 1000 / 20;

    const loop = (timestamp: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      accumulatedRef.current += elapsed;

      if (accumulatedRef.current >= targetFrameTime) {
        const delta = Math.min(accumulatedRef.current, 100);
        accumulatedRef.current -= targetFrameTime;
        callbackRef.current(delta);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);
}
