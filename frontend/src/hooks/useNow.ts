import { useState, useEffect } from "react";

/**
 * Returns a timestamp that updates every `intervalMs` (default 60 s).
 * Use as a dependency to force re-evaluation of time-sensitive computations.
 */
export function useNow(intervalMs = 60_000): number {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
