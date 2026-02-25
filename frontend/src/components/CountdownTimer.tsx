import { useState, useEffect } from "react";
import { MapPin, Wifi, Calendar, Tv, Video } from "lucide-react";
import type { ChurchEvent } from "../types";
import { getActiveEvent, getNextUpcomingEvent } from "../utils/eventDate";
import {
  getActiveService,
  getNextService,
  toLiveUrl,
  type Service,
} from "../utils/serviceSchedule";

type ActiveItem =
  | { kind: "service"; service: Service }
  | { kind: "event"; event: ChurchEvent };

type NextItem =
  | { kind: "service"; time: Date; service: Service }
  | { kind: "event"; time: Date; event: ChurchEvent };

/**
 * Determine what's currently active: event wins ties over service.
 */
function getActiveItem(events: ChurchEvent[]): ActiveItem | null {
  const activeEvent = getActiveEvent(events);
  if (activeEvent) return { kind: "event", event: activeEvent };

  const activeSvc = getActiveService();
  if (activeSvc) return { kind: "service", service: activeSvc };

  return null;
}

/**
 * Determine what comes next: compare next service vs next event.
 * Event wins on tie (<=).
 */
function getNextItem(events: ChurchEvent[]): NextItem {
  const nextSvc = getNextService();
  const nextEvt = getNextUpcomingEvent(events);

  if (nextEvt && nextEvt.time <= nextSvc.time) {
    return { kind: "event", time: nextEvt.time, event: nextEvt.event };
  }

  return { kind: "service", time: nextSvc.time, service: nextSvc.service };
}

/** Renders the location — plain text or clickable platform links. */
function LocationDisplay({ svc, className }: { svc: Service; className: string }) {
  const icon = svc.platform === "online" ? <Wifi size={11} /> : <MapPin size={11} />;

  if (svc.links && svc.links.length > 0) {
    return (
      <div className={className}>
        {icon}
        {svc.links.map((lnk, i) => (
          <span key={lnk.url}>
            <a
              href={lnk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="countdown-platform-link"
            >
              {lnk.label}
            </a>
            {i < svc.links!.length - 1 && <span style={{ opacity: 0.5 }}> &amp; </span>}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {icon}
      <span>{svc.location}</span>
    </div>
  );
}

interface CountdownTimerProps {
  events?: ChurchEvent[];
}

export default function CountdownTimer({ events = [] }: CountdownTimerProps) {
  const [active, setActive] = useState<ActiveItem | null>(null);
  const [next, setNext] = useState<NextItem>(() => getNextItem(events));
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const activeItem = getActiveItem(events);
      setActive(activeItem);
      if (!activeItem) {
        const nxt = getNextItem(events);
        setNext(nxt);
        const diff = Math.max(0, nxt.time.getTime() - Date.now());
        setTime({
          days:    Math.floor(diff / 86400000),
          hours:   Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [events]);

  /* ── LIVE state ─────────────────────────────────────────────────── */
  if (active) {
    if (active.kind === "event") {
      return (
        <div className="cd cd--live">
          <div className="cd-top">
            <span className="cd-live-pulse" />
            <span className="cd-badge cd-badge--live">Event Live</span>
          </div>
          <h3 className="cd-name">{active.event.name}</h3>
          <div className="cd-meta">
            <MapPin size={12} />
            <span>{active.event.location}</span>
          </div>
          <p className="cd-tagline">Happening now — join us!</p>
        </div>
      );
    }

    const hasStream = active.service.links && active.service.links.length > 0;

    return (
      <div className="cd cd--live">
        <div className="cd-top">
          <span className="cd-live-pulse" />
          <span className="cd-badge cd-badge--live">Live Now</span>
        </div>
        <h3 className="cd-name">
          {active.service.name}
          {active.service.session && <span className="cd-session"> · {active.service.session}</span>}
        </h3>
        <LocationDisplay svc={active.service} className="cd-meta" />
        {hasStream ? (
          <div className="cd-actions">
            {active.service.links!.map((lnk) => {
              const isTeams = lnk.url.includes("teams.microsoft.com");
              const href = toLiveUrl(lnk.url);
              return (
                <a
                  key={lnk.url}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`cd-action-btn${isTeams ? " cd-action-btn--teams" : ""}`}
                >
                  {isTeams ? <Video size={14} /> : <Tv size={14} />}
                  {isTeams ? "Join Now" : "Watch Live"}
                </a>
              );
            })}
          </div>
        ) : (
          <p className="cd-tagline">Service is ON — join us!</p>
        )}
      </div>
    );
  }

  /* ── Countdown state ─────────────────────────────────────────────── */
  const isEvent = next.kind === "event";
  const label = isEvent ? "Next Event" : "Next Service";
  const name = isEvent ? next.event.name : next.service.name;
  const session = isEvent ? null : next.service.session;

  return (
    <div className="cd">
      <div className="cd-top">
        <span className="cd-badge">{label}</span>
      </div>
      <h3 className="cd-name">
        {name}
        {session && <span className="cd-session"> · {session}</span>}
      </h3>
      <div className="cd-meta">
        {isEvent ? <Calendar size={12} /> : null}
        {isEvent ? (
          <span>{next.event.location}</span>
        ) : (
          <LocationDisplay svc={next.service} className="cd-meta-loc" />
        )}
      </div>
      <div className="cd-digits">
        {[
          { val: time.days,    lbl: "d" },
          { val: time.hours,   lbl: "h" },
          { val: time.minutes, lbl: "m" },
          { val: time.seconds, lbl: "s" },
        ].map((u) => (
          <div key={u.lbl} className="cd-digit">
            <span className="cd-digit-val">{String(u.val).padStart(2, "0")}</span>
            <span className="cd-digit-lbl">{u.lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
