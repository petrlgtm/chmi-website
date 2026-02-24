import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { SITE_IMAGES_QUERY } from "../lib/queries";

export interface SiteImages {
  heroHome: string | null;
  heroAbout: string | null;
  heroBlog: string | null;
  heroEvents: string | null;
  heroSermons: string | null;
  heroGive: string | null;
  heroResources: string | null;
  heroContact: string | null;
  heroBranches: string | null;
  serviceCards: { url: string; label: string; alt: string }[] | null;
  aboutHistoryImage: string | null;
  aboutStoryImage: string | null;
  aboutGallery: { url: string; alt: string }[] | null;
  giveImpact: { url: string; alt: string }[] | null;
}

const EMPTY: SiteImages = {
  heroHome: null,
  heroAbout: null,
  heroBlog: null,
  heroEvents: null,
  heroSermons: null,
  heroGive: null,
  heroResources: null,
  heroContact: null,
  heroBranches: null,
  serviceCards: null,
  aboutHistoryImage: null,
  aboutStoryImage: null,
  aboutGallery: null,
  giveImpact: null,
};

export function useSanitySiteImages() {
  const [data, setData] = useState<SiteImages>(EMPTY);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await sanityClient.fetch<Partial<SiteImages> | null>(SITE_IMAGES_QUERY);
        if (cancelled || !result) return;
        setData({ ...EMPTY, ...result });
      } catch (err) {
        console.warn("Site images fetch failed, using CSS defaults:", err);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return data;
}
