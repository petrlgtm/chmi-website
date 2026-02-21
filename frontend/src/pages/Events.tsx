import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight, Calendar, Sparkles, Tag, Download, Star, Filter } from "lucide-react";
import { useSanityEvents } from "../hooks/useSanityEvents";
import { useHeroStyle } from "../context/SiteImagesContext";
import { getUpcomingEvents, getCountdownText, parseEventDate } from "../utils/eventDate";
import type { ChurchEvent } from "../types";

const MONTHS = [
  "All Months", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const CATEGORIES = [
  "All Categories",
  "Major Events",
  "Branch Anniversary",
  "Interbranch Overnight",
  "Prayer Night",
  "Conference",
  "Guest Speaker",
  "Marriage & Family",
  "Women's Conference",
  "Women's Ministry",
  "Men's Conference",
  "Family",
  "Youth",
  "Leadership",
  "Special Service",
  "Celebration",
  "Anniversary",
];

function formatICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadCalendar(events: ChurchEvent[]) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Christ's Heart Ministries International//CHMI Events 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:CHMI Events 2026",
    "X-WR-TIMEZONE:Africa/Kampala",
  ];

  for (const event of events) {
    const d = parseEventDate(event.date);
    if (!d) continue;

    const ymd = (dt: Date) =>
      `${dt.getFullYear()}${String(dt.getMonth() + 1).padStart(2, "0")}${String(dt.getDate()).padStart(2, "0")}`;

    const endDate = new Date(d);
    endDate.setDate(endDate.getDate() + 1);

    const desc = event.description.replace(/,/g, "\\,").replace(/\n/g, "\\n").slice(0, 300);
    const now = formatICSDate(new Date());

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${event.id}-2026@christsheart.org`);
    lines.push(`DTSTART;VALUE=DATE:${ymd(d)}`);
    lines.push(`DTEND;VALUE=DATE:${ymd(endDate)}`);
    lines.push(`SUMMARY:${event.name}`);
    lines.push(`DESCRIPTION:${desc}`);
    lines.push(`LOCATION:${event.location}`);
    lines.push(`CATEGORIES:${event.category}`);
    lines.push(`DTSTAMP:${now}`);
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "CHMI-Events-2026.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Events() {
  const { data: events } = useSanityEvents();
  const allUpcoming = useMemo(() => getUpcomingEvents(events), [events]);
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const heroStyle = useHeroStyle("heroEvents");

  const filteredEvents = useMemo(() => {
    let filtered = allUpcoming;

    if (selectedMonth !== "All Months") {
      const monthIndex = MONTHS.indexOf(selectedMonth) - 1;
      filtered = filtered.filter((e) => {
        const d = parseEventDate(e.date);
        return d ? d.getMonth() === monthIndex : false;
      });
    }

    if (selectedCategory === "Major Events") {
      filtered = filtered.filter((e) => e.isMajor);
    } else if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }

    return filtered;
  }, [allUpcoming, selectedMonth, selectedCategory]);

  // Group events by month for display
  const groupedEvents = useMemo(() => {
    const groups: { month: string; events: typeof filteredEvents }[] = [];
    let currentMonth = "";

    for (const event of filteredEvents) {
      const d = parseEventDate(event.date);
      const monthName = d
        ? d.toLocaleString("en-US", { month: "long", year: "numeric" })
        : "Date TBC";

      if (monthName !== currentMonth) {
        currentMonth = monthName;
        groups.push({ month: monthName, events: [] });
      }
      groups[groups.length - 1].events.push(event);
    }

    return groups;
  }, [filteredEvents]);

  // Get categories that actually have events
  const activeCategories = useMemo(() => {
    const cats = new Set(allUpcoming.map((e) => e.category));
    const hasMajor = allUpcoming.some((e) => e.isMajor);
    return CATEGORIES.filter(
      (c) => c === "All Categories" || (c === "Major Events" ? hasMajor : cats.has(c))
    );
  }, [allUpcoming]);

  return (
    <>
      <section className="page-hero-xl hero-events" style={heroStyle}>
        <div className="container">
          <div className="hero-tag hero-animate hero-animate-delay-1">
            <Sparkles size={14} /> CHMI Calendar 2026
          </div>
          <h1 className="hero-animate hero-animate-delay-2">Events &amp; Gatherings</h1>
          <p className="hero-animate hero-animate-delay-3">
            Join us for powerful events that will transform your life and strengthen your faith.
            Every gathering is an opportunity for divine encounter.
          </p>
          <div className="hero-animate hero-animate-delay-3" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
            <span className="badge badge-gold" style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}>
              <Calendar size={14} /> {allUpcoming.length} Upcoming Events
            </span>
            <span className="badge badge-purple" style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}>
              <Star size={14} /> {allUpcoming.filter(e => e.isMajor).length} Major Events
            </span>
          </div>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#0a0a0a" />
        </svg>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header" style={{ position: "relative" }}>
            <span className="section-label">Upcoming Events</span>
            <h2>CHMI Calendar 2026</h2>
            <p>Browse all events — filter by month or category to find what you're looking for</p>
            <button
              onClick={() => downloadCalendar(events)}
              className="btn btn-secondary"
              style={{
                position: "absolute", right: 0, top: 0,
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontSize: "0.85rem", padding: "0.6rem 1.2rem"
              }}
            >
              <Download size={15} /> Download Calendar (.ics)
            </button>
          </div>

          {/* Filters */}
          <div className="events-filters">
            <div className="events-filter-group">
              <Filter size={16} style={{ color: "var(--purple-400)", flexShrink: 0 }} />
              <div className="events-filter-pills">
                {MONTHS.map((month) => (
                  <button
                    key={month}
                    className={`events-filter-pill${selectedMonth === month ? " active" : ""}`}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month === "All Months" ? "All" : month.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div className="events-filter-group">
              <Tag size={16} style={{ color: "var(--purple-400)", flexShrink: 0 }} />
              <select
                className="events-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {activeCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <span style={{ fontSize: "0.82rem", color: "var(--text-light)", marginLeft: "auto" }}>
                <strong style={{ color: "var(--primary)" }}>{filteredEvents.length}</strong> event{filteredEvents.length !== 1 ? "s" : ""}
                {(selectedMonth !== "All Months" || selectedCategory !== "All Categories") && (
                  <button
                    onClick={() => { setSelectedMonth("All Months"); setSelectedCategory("All Categories"); }}
                    style={{
                      marginLeft: "0.5rem", background: "none", border: "none",
                      color: "var(--gold-500)", cursor: "pointer", fontSize: "0.82rem",
                      textDecoration: "underline",
                    }}
                  >
                    Clear
                  </button>
                )}
              </span>
            </div>
          </div>

          {/* Events grouped by month — compact grid cards */}
          <div className="events-grid-wrapper">
            {filteredEvents.length === 0 && (
              <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)", gridColumn: "1 / -1" }}>
                <Calendar size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                <p>No events match your filters. Try a different month or category.</p>
              </div>
            )}

            {groupedEvents.map((group) => (
              <div key={group.month} className="events-month-group">
                <div className="events-month-header">
                  <Calendar size={16} />
                  <h3>{group.month}</h3>
                  <span className="events-month-count">{group.events.length}</span>
                </div>

                <div className="events-compact-grid">
                  {group.events.map((event, i) => {
                    const countdown = getCountdownText(event);
                    return (
                      <Link key={event.id} to={`/events/${event.id}`} className="evt-card-link">
                        <article className={`evt-card${event.isMajor ? " evt-card--major" : ""}`}>
                          {/* Thumbnail */}
                          <div className="evt-card-thumb">
                            <img
                              src={event.image}
                              alt={event.name}
                              loading={i < 4 ? "eager" : "lazy"}
                              decoding="async"
                            />
                            <div className="evt-card-thumb-overlay" />
                            {event.isMajor && (
                              <span className="evt-card-star">
                                <Star size={10} />
                              </span>
                            )}
                            {countdown && (
                              <span className="evt-card-countdown">
                                <Clock size={10} /> {countdown}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="evt-card-body">
                            <div className="evt-card-tags">
                              <span className="evt-tag evt-tag--date">
                                <Calendar size={10} /> {event.date}
                              </span>
                              <span className="evt-tag evt-tag--cat">
                                {event.category}
                              </span>
                            </div>
                            <h4 className="evt-card-title">{event.name}</h4>
                            <p className="evt-card-tagline">{event.tagline}</p>
                            <div className="evt-card-meta">
                              <span><Clock size={12} /> {event.time}</span>
                              <span><MapPin size={12} /> {event.location}</span>
                            </div>
                            <span className="evt-card-cta">
                              View Details <ArrowRight size={13} />
                            </span>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: "linear-gradient(135deg, var(--black) 0%, var(--purple-950) 40%, var(--black-900) 100%)",
        padding: "5rem 1.5rem", textAlign: "center", color: "var(--text-inverse)",
        position: "relative", overflow: "hidden"
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ color: "var(--text-inverse)", marginBottom: "1rem" }}>Have an Event Idea?</h2>
          <p style={{ opacity: 0.8, maxWidth: "550px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
            We love hearing from our community. If you have an idea for an event or gathering,
            let us know and we'll make it happen together.
          </p>
          <Link to="/contact" className="btn btn-gold">
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
