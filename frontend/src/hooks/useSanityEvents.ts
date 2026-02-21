import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { EVENTS_QUERY } from "../lib/queries";
import { events as fallbackEvents } from "../data/events";
import type { ChurchEvent } from "../types";

interface SanityEvent {
  _id: string;
  name: string;
  slug: string;
  dateStart: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  tagline: string;
  category: string;
  isMajor: boolean;
}

export function useSanityEvents() {
  const [data, setData] = useState<ChurchEvent[]>(fallbackEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const sanityEvents = await sanityClient.fetch<SanityEvent[]>(EVENTS_QUERY);
        if (cancelled || !sanityEvents?.length) return;

        const mapped: ChurchEvent[] = sanityEvents.map((e) => ({
          id: e.slug,
          name: e.name,
          date: e.date || "",
          time: e.time || "",
          location: e.location || "",
          description: e.description || "",
          image: e.image || "",
          tagline: e.tagline || "",
          category: e.category || "",
          isMajor: e.isMajor ?? false,
        }));

        setData(mapped);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("Sanity events fetch failed, using fallback:", err);
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
