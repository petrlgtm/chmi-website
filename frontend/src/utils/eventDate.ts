import type { ChurchEvent } from "../types";

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/**
 * Parse a human-readable date string into a Date.
 * Handles: "February 2026", "21st February 2026", "8th–10th May 2026", etc.
 * Returns the first day mentioned (or 1st if no day found).
 */
export function parseEventDate(dateStr: string): Date | null {
  const lower = dateStr.toLowerCase();

  // Find month name
  let monthNum: number | null = null;
  for (const [name, num] of Object.entries(MONTHS)) {
    if (lower.includes(name)) { monthNum = num; break; }
  }
  if (monthNum === null) return null;

  // Find 4-digit year
  const yearMatch = dateStr.match(/\b(20\d{2})\b/);
  if (!yearMatch) return null;
  const year = parseInt(yearMatch[1], 10);

  // Find first 1-2 digit day number (handles ordinals like 21st, 8th, 9th–15th)
  const dayMatch = dateStr.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/);
  const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;

  return new Date(year, monthNum, day);
}

/** Check if event date is in the future (or current month). */
export function isUpcoming(event: ChurchEvent): boolean {
  const d = parseEventDate(event.date);
  if (!d) return true; // if unparseable, keep it
  const now = new Date();
  const eventEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
  return eventEnd >= now;
}

/** Check if event is upcoming AND within the next N days (default 60 = ~2 months). */
export function isComingSoon(event: ChurchEvent, withinDays = 60): boolean {
  if (!isUpcoming(event)) return false;
  const d = parseEventDate(event.date);
  if (!d) return false;
  const now = new Date();
  const diffDays = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= withinDays;
}

/** Get upcoming events sorted by date (soonest first). */
export function getUpcomingEvents(events: ChurchEvent[]): ChurchEvent[] {
  return events
    .filter(isUpcoming)
    .sort((a, b) => {
      const da = parseEventDate(a.date);
      const db = parseEventDate(b.date);
      if (!da || !db) return 0;
      return da.getTime() - db.getTime();
    });
}

/** Get the nearest upcoming event that's within 2 months. */
export function getPromoEvent(events: ChurchEvent[]): ChurchEvent | null {
  const upcoming = getUpcomingEvents(events);
  return upcoming.find((e) => isComingSoon(e, 60)) ?? null;
}

/** Format a human-readable countdown string. */
export function getCountdownText(event: ChurchEvent): string {
  if (!isUpcoming(event)) return "";
  const d = parseEventDate(event.date);
  if (!d) return "";
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Happening this month!";
  if (days === 1) return "Starts tomorrow!";
  if (days <= 7) return `Starts in ${days} days!`;
  const weeks = Math.floor(days / 7);
  if (weeks <= 4) return `${weeks} week${weeks > 1 ? "s" : ""} away`;
  const months = Math.round(days / 30);
  return `${months} month${months > 1 ? "s" : ""} away`;
}
