import { useState, useEffect, useCallback } from "react";
import { X, Tv, Video } from "lucide-react";
import { getActiveService, toLiveUrl, type Service } from "../utils/serviceSchedule";

const DISMISS_KEY = "liveBannerDismissed";

/** Get the primary stream link for the banner CTA. */
function getPrimaryLink(svc: Service): { href: string; isTeams: boolean } | null {
  if (!svc.links || svc.links.length === 0) return null;
  const link = svc.links[0];
  return {
    href: toLiveUrl(link.url),
    isTeams: link.url.includes("teams.microsoft.com"),
  };
}

export default function LiveBanner() {
  const [service, setService] = useState<Service | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  const checkDismissed = useCallback((svc: Service | null): boolean => {
    if (!svc) return false;
    try {
      const raw = sessionStorage.getItem(DISMISS_KEY);
      if (!raw) return false;
      const stored = JSON.parse(raw) as { name: string; session?: string };
      return stored.name === svc.name && stored.session === svc.session;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      const active = getActiveService();
      setService(active);
      if (active && !checkDismissed(active)) {
        setDismissed(false);
        // Delay visibility for slide-in animation
        requestAnimationFrame(() => setVisible(true));
      } else {
        setVisible(false);
      }
    };

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [checkDismissed]);

  // Toggle body class for navbar offset
  useEffect(() => {
    const show = visible && !dismissed && service !== null;
    document.body.classList.toggle("has-live-banner", show);
    return () => document.body.classList.remove("has-live-banner");
  }, [visible, dismissed, service]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    if (service) {
      sessionStorage.setItem(
        DISMISS_KEY,
        JSON.stringify({ name: service.name, session: service.session }),
      );
    }
  };

  if (!service || dismissed) return null;

  const link = getPrimaryLink(service);
  const displayName = service.session
    ? `${service.name} · ${service.session}`
    : service.name;

  return (
    <div className={`live-banner${visible ? " live-banner--visible" : ""}`}>
      <div className="live-banner-inner">
        <div className="live-banner-left">
          <span className="live-banner-pulse" />
          <span className="live-banner-badge">LIVE NOW</span>
          <span className="live-banner-name">{displayName}</span>
        </div>

        <div className="live-banner-right">
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="live-banner-cta"
            >
              {link.isTeams ? <Video size={14} /> : <Tv size={14} />}
              {link.isTeams ? "Join Now" : "Watch Live"}
            </a>
          )}
          <button
            type="button"
            className="live-banner-close"
            onClick={handleDismiss}
            aria-label="Dismiss live banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
