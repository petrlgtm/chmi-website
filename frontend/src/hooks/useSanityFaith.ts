import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { FAITH_STATEMENTS_QUERY } from "../lib/queries";
import { statementOfFaith as fallbackFaith } from "../data/faith";

interface SanityFaithStatement {
  _id: string;
  order: number;
  text: string;
  category: string;
  scriptureReference: string;
}

export function useSanityFaith() {
  const [data, setData] = useState<string[]>(fallbackFaith);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const statements = await sanityClient.fetch<SanityFaithStatement[]>(FAITH_STATEMENTS_QUERY);
        if (cancelled || !statements?.length) return;

        setData(statements.map((s) => s.text));
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("Sanity faith statements fetch failed, using fallback:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
