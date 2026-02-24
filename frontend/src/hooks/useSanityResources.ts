import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { RESOURCES_QUERY, MEDIA_CHANNELS_QUERY } from "../lib/queries";

export interface ResourceItem {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  price: number;
  orderUrl?: string;
}

export interface MediaChannel {
  label: string;
  url: string;
  desc: string;
  color: string;
}

// Fallback data (current hardcoded values)
const fallbackResources: ResourceItem[] = [];
const fallbackMedia: MediaChannel[] = [];

export function useSanityResources() {
  const [resources, setResources] = useState<ResourceItem[]>(fallbackResources);
  const [mediaChannels, setMediaChannels] = useState<MediaChannel[]>(fallbackMedia);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [rawResources, rawMedia] = await Promise.all([
          sanityClient.fetch<Array<{
            _id: string; title: string; id: string; author: string;
            description: string; image: string; price: number; orderUrl?: string;
          }>>(RESOURCES_QUERY),
          sanityClient.fetch<Array<{
            _id: string; label: string; url: string; description: string; color: string;
          }>>(MEDIA_CHANNELS_QUERY),
        ]);

        if (cancelled) return;

        if (rawResources?.length) {
          setResources(rawResources.map((r) => ({
            id: r.id || r._id,
            title: r.title || "",
            author: r.author || "",
            description: r.description || "",
            image: r.image || "",
            price: r.price || 0,
            orderUrl: r.orderUrl,
          })));
        }

        if (rawMedia?.length) {
          setMediaChannels(rawMedia.map((m) => ({
            label: m.label || "",
            url: m.url || "",
            desc: m.description || "",
            color: m.color || "var(--primary)",
          })));
        }

        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("Sanity resources fetch failed, using fallback:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { resources, mediaChannels, loading, error };
}
