import type { ChurchEvent } from "../types";

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  // Abbreviations
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5,
  jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * Parse a human-readable date string into a Date (start date).
 * Handles: "February 2026", "21st February 2026", "8th–10th May 2026", etc.
 * Returns the first day mentioned (or 1st if no day found).
 */
export function parseEventDate(dateStr: string): Date | null {
  const lower = dateStr.toLowerCase();

  // Find month name — match longest first so "february" beats "feb"
  let monthNum: number | null = null;
  const sortedMonths = Object.entries(MONTHS).sort(
    (a, b) => b[0].length - a[0].length,
  );
  for (const [name, num] of sortedMonths) {
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

/**
 * Parse the end date from a range date string.
 * Handles same-month ("8th–10th May 2026") and cross-month ("28th May – 2nd June 2026").
 * If no range, returns the same date as parseEventDate.
 */
export function parseEventEndDate(dateStr: string): Date | null {
  const startDate = parseEventDate(dateStr);
  if (!startDate) return null;

  // Match range pattern: "8th–10th", "8th-10th", "8–10", "28th May – 2nd June"
  const rangeMatch = dateStr.match(
    /\b\d{1,2}(?:st|nd|rd|th)?\s*(?:\w+\s+)?\s*[–\-]\s*(\d{1,2})(?:st|nd|rd|th)?\s*(.*)/i,
  );

  if (rangeMatch) {
    const endDay = parseInt(rangeMatch[1], 10);
    const afterEnd = rangeMatch[2] || "";

    // Check if there's a different month name after the dash (cross-month range)
    const lower = afterEnd.toLowerCase();
    const sortedMonths = Object.entries(MONTHS).sort(
      (a, b) => b[0].length - a[0].length,
    );
    let endMonth = startDate.getMonth();
    for (const [name, num] of sortedMonths) {
      if (lower.includes(name)) { endMonth = num; break; }
    }

    // If end month is before start month, it wraps to next year
    let endYear = startDate.getFullYear();
    if (endMonth < startDate.getMonth()) {
      endYear += 1;
    }

    return new Date(endYear, endMonth, endDay);
  }

  // No range — end date is same as start date
  return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
}

/**
 * Parse the start time from a time string like "9:00 AM – 4:00 PM".
 * Returns { hour, minute } in 24h format, or null if unparseable.
 */
export function parseEventStartTime(
  timeStr: string,
): { hour: number; minute: number } | null {
  // Match first time: "9:00 AM", "10:30 PM", "14:00"
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return null;

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const ampm = match[3]?.toUpperCase();

  if (ampm === "PM" && hour < 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;

  return { hour, minute };
}

/**
 * Parse the end time from a time string like "9:00 AM – 4:00 PM".
 * Returns { hour, minute } in 24h format, or null if unparseable.
 */
function parseEventEndTime(
  timeStr: string,
): { hour: number; minute: number } | null {
  // Match second time after a separator (–, -, to)
  const match = timeStr.match(
    /\d{1,2}:\d{2}\s*(?:AM|PM)?\s*[–\-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)?/i,
  );
  if (!match) return null;

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const ampm = match[3]?.toUpperCase();

  if (ampm === "PM" && hour < 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;

  return { hour, minute };
}

/** Check if event date is in the future (including the event's last day). */
export function isUpcoming(event: ChurchEvent): boolean {
  const endDate = parseEventEndDate(event.date);
  if (!endDate) return false; // unparseable dates are excluded
  // Event stays visible through end-of-day on its last day
  const eventEnd = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
    23, 59, 59,
  );
  return eventEnd >= new Date();
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

/**
 * Format a human-readable countdown string.
 * Handles multi-day events ("Happening now!" while between start and end date).
 */
export function getCountdownText(event: ChurchEvent): string {
  if (!isUpcoming(event)) return "";
  const startDate = parseEventDate(event.date);
  const endDate = parseEventEndDate(event.date);
  if (!startDate) return "";

  const now = new Date();

  // Normalize to midnight for calendar-day comparison
  const todayMidnight = new Date(
    now.getFullYear(), now.getMonth(), now.getDate(),
  );
  const startMidnight = new Date(
    startDate.getFullYear(), startDate.getMonth(), startDate.getDate(),
  );

  // Multi-day event: check if we're currently within the event range
  if (endDate) {
    const endMidnight = new Date(
      endDate.getFullYear(), endDate.getMonth(), endDate.getDate(),
    );
    if (todayMidnight >= startMidnight && todayMidnight <= endMidnight) {
      if (todayMidnight.getTime() === startMidnight.getTime()) {
        return "Happening today!";
      }
      return "Happening now!";
    }
  }

  // Calendar-day diff (rounded to avoid DST edge cases)
  const days = Math.round(
    (startMidnight.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (days <= 0) return "Happening today!";
  if (days === 1) return "Starts tomorrow!";
  if (days <= 7) return `Starts in ${days} days!`;
  const weeks = Math.floor(days / 7);
  if (weeks <= 4) return `${weeks} week${weeks > 1 ? "s" : ""} away`;
  const months = Math.round(days / 30);
  return `${months} month${months > 1 ? "s" : ""} away`;
}

/**
 * Get the next upcoming event with a precise DateTime (date + time parsed).
 * Returns the event and its computed start DateTime, or null if none.
 */
export function getNextUpcomingEvent(
  events: ChurchEvent[],
): { event: ChurchEvent; time: Date } | null {
  const now = new Date();
  let nearest: { event: ChurchEvent; time: Date } | null = null;

  for (const ev of events) {
    const startDate = parseEventDate(ev.date);
    if (!startDate) continue;

    // Combine date + time for precision
    const startTime = parseEventStartTime(ev.time);
    const eventStart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startTime?.hour ?? 0,
      startTime?.minute ?? 0,
      0,
    );

    // Must be in the future
    if (eventStart <= now) continue;
    if (!nearest || eventStart < nearest.time) {
      nearest = { event: ev, time: eventStart };
    }
  }

  return nearest;
}

/**
 * Check if any event is currently happening right now (for LIVE state).
 * Considers date range + time window for precision.
 */
export function getActiveEvent(
  events: ChurchEvent[],
): ChurchEvent | null {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  for (const ev of events) {
    const startDate = parseEventDate(ev.date);
    const endDate = parseEventEndDate(ev.date);
    if (!startDate || !endDate) continue;

    const startMidnight = new Date(
      startDate.getFullYear(), startDate.getMonth(), startDate.getDate(),
    );
    const endMidnight = new Date(
      endDate.getFullYear(), endDate.getMonth(), endDate.getDate(),
    );

    // Today must be within the event's date range
    if (today < startMidnight || today > endMidnight) continue;

    // If event has time info, check time window
    const startTime = parseEventStartTime(ev.time);
    const endTime = parseEventEndTime(ev.time);

    if (startTime && endTime) {
      const totalMin = now.getHours() * 60 + now.getMinutes();
      const sMin = startTime.hour * 60 + startTime.minute;
      const eMin = endTime.hour * 60 + endTime.minute;

      // Single-day event: must be within time window
      if (startMidnight.getTime() === endMidnight.getTime()) {
        if (totalMin >= sMin && totalMin < eMin) return ev;
        continue;
      }

      // Multi-day event: first day after start time, last day before end time,
      // middle days always active
      if (today.getTime() === startMidnight.getTime() && totalMin >= sMin) return ev;
      if (today.getTime() === endMidnight.getTime() && totalMin < eMin) return ev;
      if (today > startMidnight && today < endMidnight) return ev;
    } else {
      // No time info — any time during the date range counts as active
      return ev;
    }
  }

  return null;
}
