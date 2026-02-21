import { useState, useEffect } from "react";
import { MapPin, Wifi } from "lucide-react";

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
  links?: ServiceLink[]; // clickable platform links (online services)
}

const SERVICES: Service[] = [
  // ── Daily Early Morning ───────────────────────────────────────────
  {
    name: "Discipleship Class",
    days: [1, 2, 3, 4, 5],
    startHour: 5, startMinute: 0,
    endHour: 6, endMinute: 0,
    location: "All Locations",
  },
  // ── Sunday Services ───────────────────────────────────────────────
  {
    name: "Sunday Service",
    session: "7am",
    days: [0],
    startHour: 7, startMinute: 0,
    endHour: 8, endMinute: 30,
    location: "All Branches",
  },
  {
    name: "Sunday Service",
    session: "9am · Teen's",
    days: [0],
    startHour: 9, startMinute: 0,
    endHour: 10, endMinute: 30,
    location: "All Branches",
  },
  {
    name: "Sunday Service",
    session: "11am",
    days: [0],
    startHour: 11, startMinute: 0,
    endHour: 12, endMinute: 30,
    location: "All Branches",
  },
  {
    name: "Sunday Service",
    session: "4pm",
    days: [0],
    startHour: 16, startMinute: 0,
    endHour: 17, endMinute: 30,
    location: "All Branches",
  },
  // ── Lunch Hour (Weekdays, Kampala only) ───────────────────────────
  {
    name: "Lunch Hour Service",
    days: [1, 2, 3, 4, 5],
    startHour: 12, startMinute: 45,
    endHour: 13, endMinute: 45,
    location: "Kampala Branch",
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
  // ── Overnight Prayer — Fri 10pm → Sat 5am ────────────────────────
  {
    name: "Overnight Prayer",
    days: [5], // Friday start
    startHour: 22, startMinute: 0,
    endHour: 5, endMinute: 0,   // ends Saturday morning
    location: "All Branches",
    overnight: true,
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
      if (svc.days.includes(day) && totalMin >= startMin) return svc;
      if (svc.days.includes(prevDay) && totalMin < endMin) return svc;
    } else {
      if (!svc.days.includes(day)) continue;
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
  for (let offset = 0; offset < 8; offset++) {
    const check = new Date(now);
    check.setDate(check.getDate() + offset);
    const dayOfWeek = check.getDay();
    let earliest: { time: Date; service: Service } | null = null;

    for (const svc of SERVICES) {
      if (!svc.days.includes(dayOfWeek)) continue;
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

export default function CountdownTimer() {
  const [active, setActive] = useState<Service | null>(null);
  const [next, setNext] = useState(() => getNextService());
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const activeSvc = getActiveService();
      setActive(activeSvc);
      if (!activeSvc) {
        const nxt = getNextService();
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
  }, []);

  /* ── LIVE state ─────────────────────────────────────────────────── */
  if (active) {
    return (
      <div className="countdown-timer countdown-live">
        <div className="live-indicator">
          <span className="live-dot" />
          <span className="live-badge">LIVE NOW</span>
        </div>
        <div className="live-service-name">
          {active.name}
          {active.session && <span className="live-session"> · {active.session}</span>}
        </div>
        <LocationDisplay svc={active} className="live-location" />
        <p className="live-tagline">Service is ON — Join us now!</p>
      </div>
    );
  }

  /* ── Countdown state ─────────────────────────────────────────────── */
  return (
    <div className="countdown-timer">
      <div className="countdown-next-label">Next Service</div>
      <div className="countdown-service-info">
        <span className="countdown-service-name">
          {next.service.name}
          {next.service.session && (
            <span className="countdown-session"> · {next.service.session}</span>
          )}
        </span>
        <LocationDisplay svc={next.service} className="countdown-location" />
      </div>
      <div className="countdown-units">
        {[
          { val: time.days,    label: "Days"  },
          { val: time.hours,   label: "Hours" },
          { val: time.minutes, label: "Min"   },
          { val: time.seconds, label: "Sec"   },
        ].map((unit) => (
          <div key={unit.label} className="countdown-unit">
            <span className="countdown-value">{String(unit.val).padStart(2, "0")}</span>
            <span className="countdown-unit-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
