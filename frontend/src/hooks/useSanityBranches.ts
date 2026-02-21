import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { BRANCHES_QUERY, PASTORS_QUERY } from "../lib/queries";
import { branches as fallbackBranches } from "../data/branches";
import type { Branch } from "../types";

interface SanityPastor {
  _id: string;
  name: string;
  role: string;
  image: string | null;
  branchSlug: string;
}

interface SanityBranch {
  _id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  lat: number;
  lng: number;
  status: string;
  services: string;
  images: string[];
}

export function useSanityBranches() {
  const [data, setData] = useState<Branch[]>(fallbackBranches);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [sanityBranches, sanityPastors] = await Promise.all([
          sanityClient.fetch<SanityBranch[]>(BRANCHES_QUERY),
          sanityClient.fetch<SanityPastor[]>(PASTORS_QUERY),
        ]);

        if (cancelled || !sanityBranches?.length) return;

        const pastorsByBranch = new Map<string, SanityPastor[]>();
        for (const p of sanityPastors) {
          if (!p.branchSlug) continue;
          const list = pastorsByBranch.get(p.branchSlug) ?? [];
          list.push(p);
          pastorsByBranch.set(p.branchSlug, list);
        }

        const mapped: Branch[] = sanityBranches.map((b) => ({
          id: b.slug,
          name: b.name,
          address: b.address || "",
          phone: b.phone || "",
          email: b.email || "",
          city: b.city || "",
          lat: b.lat || 0,
          lng: b.lng || 0,
          pastors: (pastorsByBranch.get(b.slug) ?? []).map((p) => ({
            name: p.name,
            role: p.role || "Branch Pastor",
            image: p.image,
          })),
          testimonials: [],
          images: b.images || [],
          services: b.services || "",
        }));

        setData(mapped);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("Sanity branches fetch failed, using fallback:", err);
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
