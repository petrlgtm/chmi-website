import { useState, useEffect } from "react";
import { MapPin, Wifi, Calendar, Tv, Video } from "lucide-react";
import type { ChurchEvent } from "../types";
import { getActiveEvent, getNextUpcomingEvent } from "../utils/eventDate";

interface ServiceLink {
  label: string;
  url: string;
}

interface Service {
  name: string;
  session?: string;
  days: number[]; // 0=Sun, 1=Mon … 6=Sat
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  location: string;
  platform?: "online";
  overnight?: boolean; // service spans midnight into next day
  lastFridayOnly?: boolean; // only on the last Friday of the month
  links?: ServiceLink[]; // clickable platform links (online services)
}

/** Check if a given date falls on the last Friday of its month. */
function isLastFridayOfMonth(date: Date): boolean {
  if (date.getDay() !== 5) return false;
  const nextFriday = new Date(date);
  nextFriday.setDate(nextFriday.getDate() + 7);
  return nextFriday.getMonth() !== date.getMonth();
}

type ActiveItem =
  | { kind: "service"; service: Service }
  | { kind: "event"; event: ChurchEvent };

type NextItem =
  | { kind: "service"; time: Date; service: Service }
  | { kind: "event"; time: Date; event: ChurchEvent };

const SERVICES: Service[] = [
  // ── Daily Early Morning ───────────────────────────────────────────
  {
    name: "Discipleship Class",
    days: [1, 2, 3, 4, 5],
    startHour: 5, startMinute: 0,
    endHour: 6, endMinute: 0,
    location: "Microsoft Teams",
    platform: "online",
    links: [
      { label: "Teams", url: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_Yjc2Y2U1YjQtNzIwZS00OGFjLWI1NzQtMGQ1MGVjMjliYjcz%40thread.v2/0?context=%7b%22Tid%22%3a%228777e3a2-49f7-4829-9006-72c50d1737ec%22%2c%22Oid%22%3a%22f5c44872-87c9-4947-917b-650a53c15b45%22%7d" },
    ],
  },
  // ── Sunday Services ───────────────────────────────────────────────
  {
    name: "Sunday Service",
    session: "7am",
    days: [0],
    startHour: 7, startMinute: 0,
    endHour: 8, endMinute: 30,
    location: "All Branches",
    links: [
      { label: "ChristHeartTV", url: "https://www.youtube.com/@ChristsHeart" },
    ],
  },
  {
    name: "Sunday Service",
    session: "9am · Teen's",
    days: [0],
    startHour: 9, startMinute: 0,
    endHour: 10, endMinute: 30,
    location: "All Branches",
    links: [
      { label: "ChristHeartTV", url: "https://www.youtube.com/@ChristsHeart" },
    ],
  },
  {
    name: "Sunday Service",
    session: "11am",
    days: [0],
    startHour: 11, startMinute: 0,
    endHour: 12, endMinute: 30,
    location: "All Branches",
    links: [
      { label: "ChristHeartTV", url: "https://www.youtube.com/@ChristsHeart" },
    ],
  },
  {
    name: "Sunday Service",
    session: "4pm",
    days: [0],
    startHour: 16, startMinute: 0,
    endHour: 17, endMinute: 30,
    location: "All Branches",
    links: [
      { label: "ChristHeartTV", url: "https://www.youtube.com/@ChristsHeart" },
    ],
  },
  // ── Lunch Hour (Weekdays, Kampala only) ───────────────────────────
  {
    name: "Lunch Hour Service",
    days: [1, 2, 3, 4, 5],
    startHour: 12, startMinute: 45,
    endHour: 13, endMinute: 45,
    location: "Kampala Branch",
    links: [
      { label: "ChristHeartTV", url: "https://www.youtube.com/@ChristsHeart" },
    ],
  },
  // ── Home Cells (Monday only) ──────────────────────────────────────
  {
    name: "Home Cell Meeting",
    days: [1],
    startHour: 17, startMinute: 0,
    endHour: 19, endMinute: 30,
    location: "All Locations",
  },
  // ── Night Service — Apostle live online (Weekdays) ────────────────
  {
    name: "Apostle Live — Night Service",
    days: [1, 2, 3, 4, 5],
    startHour: 21, startMinute: 0,
    endHour: 22, endMinute: 30,
    location: "ChristHeartTV & TikTok",
    platform: "online",
    links: [
      { label: "ChristHeartTV", url: "https://www.youtube.com/@ChristsHeart" },
      { label: "TikTok", url: "https://www.tiktok.com/@christsheartmin" },
    ],
  },
  // ── Overnight Prayer — Last Friday 6pm → Sat 5am (All branches → Mukono) ──
  {
    name: "Convergence Overnight Prayer",
    days: [5], // Friday start
    startHour: 18, startMinute: 0,
    endHour: 5, endMinute: 0,   // ends Saturday morning
    location: "Christ's Heart Mukono (All Branches)",
    overnight: true,
    lastFridayOnly: true,
    links: [
      { label: "ChristHeartTV", url: "https://www.youtube.com/@ChristsHeart" },
    ],
  },
];

/** Returns the service currently in progress, or null if none. */
function getActiveService(): Service | null {
  const now = new Date();
  const day = now.getDay();
  const totalMin = now.getHours() * 60 + now.getMinutes();

  for (const svc of SERVICES) {
    if (svc.overnight) {
      const startMin = svc.startHour * 60 + svc.startMinute;
      const endMin = svc.endHour * 60 + svc.endMinute;
      const prevDay = (day + 6) % 7;
      // Started tonight
      if (svc.days.includes(day) && totalMin >= startMin) {
        if (svc.lastFridayOnly && !isLastFridayOfMonth(now)) continue;
        return svc;
      }
      // Carried over from last night
      if (svc.days.includes(prevDay) && totalMin < endMin) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (svc.lastFridayOnly && !isLastFridayOfMonth(yesterday)) continue;
        return svc;
      }
    } else {
      if (!svc.days.includes(day)) continue;
      if (svc.lastFridayOnly && !isLastFridayOfMonth(now)) continue;
      const startMin = svc.startHour * 60 + svc.startMinute;
      const endMin = svc.endHour * 60 + svc.endMinute;
      if (totalMin >= startMin && totalMin < endMin) return svc;
    }
  }
  return null;
}

/** Returns the next upcoming service and its start time. */
function getNextService(): { time: Date; service: Service } {
  const now = new Date();
  // Look up to 35 days ahead to find the next last-Friday service
  for (let offset = 0; offset < 35; offset++) {
    const check = new Date(now);
    check.setDate(check.getDate() + offset);
    const dayOfWeek = check.getDay();
    let earliest: { time: Date; service: Service } | null = null;

    for (const svc of SERVICES) {
      if (!svc.days.includes(dayOfWeek)) continue;
      if (svc.lastFridayOnly && !isLastFridayOfMonth(check)) continue;
      const t = new Date(check);
      t.setHours(svc.startHour, svc.startMinute, 0, 0);
      if (t > now && (!earliest || t < earliest.time)) {
        earliest = { time: t, service: svc };
      }
    }
    if (earliest) return earliest;
  }
  const fb = new Date();
  fb.setDate(fb.getDate() + 7);
  fb.setHours(9, 0, 0, 0);
  return { time: fb, service: SERVICES[2] };
}

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

/** When a service is LIVE, convert YouTube channel URLs to /live so viewers land on the actual broadcast. */
function toLiveUrl(url: string): string {
  // Match youtube.com/@handle or youtube.com/channel/ID (no trailing path)
  const ytChannel = /^https?:\/\/(www\.)?youtube\.com\/(@[\w-]+|channel\/[\w-]+)\/?$/i;
  if (ytChannel.test(url)) return url.replace(/\/?$/, "/live");
  return url;
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
