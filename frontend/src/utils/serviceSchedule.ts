export interface ServiceLink {
  label: string;
  url: string;
}

export interface Service {
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

export const SERVICES: Service[] = [
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
  // ── Home Cells (Monday only, 5pm–7:30pm) ─────────────────────────
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
export function getActiveService(): Service | null {
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
export function getNextService(): { time: Date; service: Service } {
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

/** When a service is LIVE, convert YouTube channel URLs to /live so viewers land on the actual broadcast. */
export function toLiveUrl(url: string): string {
  // Match youtube.com/@handle or youtube.com/channel/ID (no trailing path)
  const ytChannel = /^https?:\/\/(www\.)?youtube\.com\/(@[\w-]+|channel\/[\w-]+)\/?$/i;
  if (ytChannel.test(url)) return url.replace(/\/?$/, "/live");
  return url;
}
