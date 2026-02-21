import { createContext, useContext } from "react";
import { useSanitySiteImages, type SiteImages } from "../hooks/useSanitySiteImages";

const SiteImagesContext = createContext<SiteImages | null>(null);

export function SiteImagesProvider({ children }: { children: React.ReactNode }) {
  const images = useSanitySiteImages();
  return (
    <SiteImagesContext.Provider value={images}>
      {children}
    </SiteImagesContext.Provider>
  );
}

export function useSiteImages(): SiteImages | null {
  return useContext(SiteImagesContext);
}

/**
 * Returns inline style for a page hero section.
 * If a Sanity image is set, it overrides the CSS default via --hero-bg.
 */
export function useHeroStyle(
  key: keyof SiteImages,
): React.CSSProperties | undefined {
  const images = useContext(SiteImagesContext);
  const url = images?.[key];
  if (typeof url === "string" && url) {
    return { "--hero-bg": `url(${url})` } as React.CSSProperties;
  }
  return undefined;
}
