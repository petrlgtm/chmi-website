import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { LEADERSHIP_QUERY } from "../lib/queries";

export interface LeadershipData {
  heading: string | null;
  subtitle: string | null;
  bio: unknown[] | null;
  image: string | null;
  leaders: {
    _key: string;
    name: string;
    title: string;
    role: string;
    bio: unknown[] | null;
    image: string | null;
  }[] | null;
}

const EMPTY: LeadershipData = {
  heading: null,
  subtitle: null,
  bio: null,
  image: null,
  leaders: null,
};

export function useSanityLeadership() {
  const [data, setData] = useState<LeadershipData>(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await sanityClient.fetch<LeadershipData | null>(LEADERSHIP_QUERY);
        if (cancelled || !result) return;
        setData({ ...EMPTY, ...result });
      } catch (err) {
        console.warn("Leadership fetch failed, using fallback:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}
