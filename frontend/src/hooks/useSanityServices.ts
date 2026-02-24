import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { SERVICES_QUERY } from "../lib/queries";
import { services as fallbackServices } from "../data/services";
import type { ServiceInfo } from "../data/services";

interface SanityService {
  _id: string;
  title: string;
  id: string;
  shortDesc: string;
  description: string[];
  heroImage: string;
  schedules: { day: string; time: string; details: string }[];
  branchSchedules: { branchId: string; branchName: string; city: string; times: string }[];
  isOnline?: boolean;
  onlineDetails?: { host: string; platforms: { label: string; url: string }[] };
  cellLocations?: { area: string; city: string; day: string; time: string; leader: string; contact: string }[];
  highlights: { title: string; text: string }[];
  scripture: { text: string; ref: string };
}

export function useSanityServices() {
  const [data, setData] = useState<ServiceInfo[]>(fallbackServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const sanityServices = await sanityClient.fetch<SanityService[]>(SERVICES_QUERY);
        if (cancelled || !sanityServices?.length) return;

        const mapped: ServiceInfo[] = sanityServices.map((s) => ({
          id: s.id,
          title: s.title,
          shortDesc: s.shortDesc || "",
          heroImage: s.heroImage || "",
          description: s.description || [],
          schedule: (s.schedules || []).map((item) => ({
            day: item.day || "",
            time: item.time || "",
            details: item.details || "",
          })),
          branchSchedules: (s.branchSchedules || []).map((bs) => ({
            branchId: bs.branchId || "",
            branchName: bs.branchName || "",
            city: bs.city || "",
            times: bs.times || "",
          })),
          isOnline: s.isOnline || false,
          onlineDetails: s.onlineDetails ? {
            host: s.onlineDetails.host || "",
            platforms: (s.onlineDetails.platforms || []).map((p) => ({
              label: p.label || "",
              url: p.url || "",
            })),
          } : undefined,
          cellLocations: s.cellLocations?.map((cl) => ({
            area: cl.area || "",
            city: cl.city || "",
            day: cl.day || "",
            time: cl.time || "",
            leader: cl.leader || "",
            contact: cl.contact || "",
          })),
          highlights: (s.highlights || []).map((h) => ({
            title: h.title || "",
            text: h.text || "",
          })),
          scripture: s.scripture || { text: "", ref: "" },
        }));

        // Merge: Sanity overrides matching fallback services (by id), keeps
        // fallback entries that don't exist in Sanity, and appends new Sanity-only entries.
        const merged = [
          ...fallbackServices.map((fb) => mapped.find((s) => s.id === fb.id) || fb),
          ...mapped.filter((s) => !fallbackServices.some((fb) => fb.id === s.id)),
        ];
        setData(merged);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("Sanity services fetch failed, using fallback:", err);
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
