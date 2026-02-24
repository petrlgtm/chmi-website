import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Calendar, MapPin, ArrowRight, Bell } from "lucide-react";
import { useSanityEvents } from "../hooks/useSanityEvents";
import { getPromoEvent, getCountdownText } from "../utils/eventDate";
import { ALL_IMAGES } from "../utils/imageFallbacks";

const DISMISS_KEY = "eventPromoDismissed";

export default function EventPromoPopup() {
  const { data: events } = useSanityEvents();
  const [visible, setVisible] = useState(false);
  const promoEvent = getPromoEvent(events);

  useEffect(() => {
    if (!promoEvent) return;

    // Don't show if user dismissed this event already today
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      try {
        const { eventId, timestamp } = JSON.parse(dismissed);
        const hoursSince = (Date.now() - timestamp) / (1000 * 60 * 60);
        if (eventId === promoEvent.id && hoursSince < 24) return;
      } catch { /* corrupted storage — re-show popup */ }
    }

    // Show after 15 seconds as a gentle reminder
    const timer = setTimeout(() => setVisible(true), 15000);
    return () => clearTimeout(timer);
  }, [promoEvent]);

  if (!promoEvent || !visible) return null;

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(
      DISMISS_KEY,
      JSON.stringify({ eventId: promoEvent.id, timestamp: Date.now() })
    );
  };

  const countdown = getCountdownText(promoEvent);

  return (
    <div className="event-reminder-backdrop" onClick={dismiss}>
      <div className="event-reminder" onClick={(e) => e.stopPropagation()}>
        <button className="event-reminder-close" onClick={dismiss} aria-label="Close">
          <X size={15} />
        </button>

        <div className="event-reminder-header">
          <Bell size={13} />
          <span>Event Reminder</span>
          {countdown && <span className="event-reminder-countdown">{countdown}</span>}
        </div>

        {(promoEvent.image || ALL_IMAGES[0]) && (
          <div className="event-reminder-poster">
            <img
              src={promoEvent.image || ALL_IMAGES[0]}
              alt={promoEvent.name}
            />
          </div>
        )}

        <div className="event-reminder-body">
          <span className="event-reminder-category">{promoEvent.category}</span>
          <h4>{promoEvent.name}</h4>
          <div className="event-reminder-meta">
            <span><Calendar size={12} /> {promoEvent.date}</span>
            <span><MapPin size={12} /> {promoEvent.location}</span>
          </div>
        </div>

        <div className="event-reminder-footer">
          <Link
            to={`/events/${promoEvent.id}`}
            className="event-reminder-btn"
            onClick={dismiss}
          >
            See Details <ArrowRight size={12} />
          </Link>
          <button className="event-reminder-dismiss" onClick={dismiss}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
