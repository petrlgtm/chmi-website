import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { GIVE_CATEGORIES_QUERY } from "../lib/queries";

export interface GiveCategory {
  name: string;
  description: string;
  icon: string;
  order: number;
}

export const fallbackGiveCategories: GiveCategory[] = [
  {
    name: "Tithe",
    description: "Honour the Lord with the first fruits of your increase. The tithe is holy unto the Lord.",
    icon: "Heart",
    order: 1,
  },
  {
    name: "Offertory",
    description: "Give cheerfully as the Lord has blessed you. Every offering is a seed of faith.",
    icon: "Gift",
    order: 2,
  },
  {
    name: "Partnership",
    description: "Partner with CHMI to advance the Kingdom through missions, media, and ministry.",
    icon: "HandCoins",
    order: 3,
  },
  {
    name: "Seed",
    description: "Sow a seed of faith for a specific breakthrough, project, or divine promise.",
    icon: "Sprout",
    order: 4,
  },
];

interface SanityGiveCategory {
  _id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export function useSanityGiveCategories() {
  const [data, setData] = useState<GiveCategory[]>(fallbackGiveCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const categories = await sanityClient.fetch<SanityGiveCategory[]>(GIVE_CATEGORIES_QUERY);
        if (cancelled || !categories?.length) return;

        setData(
          categories.map((c) => ({
            name: c.name,
            description: c.description || "",
            icon: c.icon || "Heart",
            order: c.order ?? 0,
          })),
        );
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("Sanity give categories fetch failed, using fallback:", err);
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
