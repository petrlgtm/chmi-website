import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowLeft, CheckCircle, Users, ArrowRight, Sparkles, Timer, Images } from "lucide-react";
import { useSanityEvents } from "../hooks/useSanityEvents";
import { useSanityBranches } from "../hooks/useSanityBranches";
import { getCountdownText } from "../utils/eventDate";
import { submitFormspree } from "../lib/formspree";
import { eventFallbackImage, eventGalleryFallback } from "../utils/imageFallbacks";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: events } = useSanityEvents();
  const { data: branches } = useSanityBranches();
  const event = events.find((e) => e.id === id);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [extraImages, setExtraImages] = useState<string[]>([]);

  useEffect(() => {
    if (!event) return;
    const manifestUrl = `${import.meta.env.BASE_URL}events/${event.id}/manifest.json`;
    fetch(manifestUrl)
      .then((r) => {
        if (!r.ok) throw new Error("no manifest");
        return r.json();
      })
      .then((files: string[]) => {
        if (files && files.length > 1) {
          // index 0 is reserved for main poster; rest are gallery
          const urls = files.slice(1, 5).map((f) => `${import.meta.env.BASE_URL}events/${event.id}/${f}`);
          setExtraImages(urls);
        }
      })
      .catch(() => {/* keep defaults */});
  }, [event]);

  if (!event) {
    return (
      <section className="section section--not-found">
        <div className="container">
          <h2>Event Not Found</h2>
          <Link to="/events" className="btn btn-primary" style={{ marginTop: "2rem" }}>
            <ArrowLeft size={18} /> Back to Events
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    await submitFormspree("eventReg", {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      branch: formData.get("branch") as string,
      guests: formData.get("guests") as string,
      event: event?.name ?? "",
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  // Gallery images: CMS gallery first, then manifest extras, then fallbacks
  const galleryImages = event?.gallery?.length
    ? event.gallery.slice(0, 6)
    : extraImages.length >= 4
      ? extraImages
      : eventGalleryFallback(event.category);

  return (
    <>
      <section className="page-hero-xl hero-events">
        <div className="container">
          <div className="breadcrumb hero-animate hero-animate-delay-1">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/events">Events</Link>
            <span className="breadcrumb-sep">/</span>
            <span style={{ color: "var(--gold-400)" }}>{event.name}</span>
          </div>
          <h1 className="hero-animate hero-animate-delay-2">{event.name}</h1>
          <div className="event-detail-hero-stats hero-animate hero-animate-delay-3">
            <div className="event-detail-stat">
              <Calendar size={18} />
              <span className="label">{event.date}</span>
            </div>
            <div className="event-detail-stat">
              <Clock size={18} />
              <span className="label">{event.time}</span>
            </div>
            <div className="event-detail-stat">
              <MapPin size={18} />
              <span className="label">{event.location}</span>
            </div>
            <div className="event-detail-stat">
              <Users size={18} />
              <span className="label">Open to All</span>
            </div>
            {getCountdownText(event) && (
              <div className="event-detail-stat" style={{ background: "var(--gold-500)", color: "var(--black)", borderRadius: "var(--radius-full)", padding: "0.4rem 1.2rem", fontWeight: 700 }}>
                <Timer size={18} />
                <span className="label">{getCountdownText(event)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#0a0a0a" />
        </svg>
      </div>

      <section className="section">
        <div className="container container--narrow">

          {/* Poster Image — full-width, cinematic ratio */}
          <div className="detail-hero-image mb-section-sm" style={{ background: "var(--black-900)" }}>
            <img
              src={event.image || eventFallbackImage(event.category)}
              alt={`${event.name} poster`}
              style={{ objectFit: "contain" }}
              loading="eager"
              decoding="async"
            />
          </div>

          {/* About This Event */}
          <div className="branch-info-card mb-section-sm">
            <div className="card-heading-row">
              <Sparkles size={18} style={{ color: "var(--primary)" }} />
              <h3>About This Event</h3>
            </div>
            <p style={{ color: "var(--gray-600)", lineHeight: 1.9, fontSize: "1.05rem" }}>
              {event.description}
            </p>
            <p style={{ marginTop: "1rem", fontStyle: "italic", color: "var(--primary)", fontWeight: 600, fontSize: "1rem" }}>
              "{event.tagline}"
            </p>
          </div>

          {/* Photo Gallery — 4 images in 2x2 grid */}
          <div className="mb-section-sm">
            <div className="card-heading-row">
              <Images size={18} style={{ color: "var(--primary)" }} />
              <h3>Event Gallery</h3>
            </div>
            <div className="event-gallery-grid">
              {galleryImages.map((img, i) => (
                <div key={i} className="event-gallery-item">
                  <img
                    src={img}
                    alt={`${event.name} gallery ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div className="registration-form">
            <h3>Register for {event.name}</h3>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <CheckCircle size={48} style={{ color: "var(--primary)", marginBottom: "1rem" }} />
                <h3 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>Registration Successful!</h3>
                <p style={{ color: "var(--gray-600)" }}>Thank you for registering. We'll send you more details soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row" style={{ marginBottom: "1rem" }}>
                  <div className="form-group">
                    <label htmlFor="reg-name">Full Name</label>
                    <input id="reg-name" name="name" type="text" placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-email">Email Address</label>
                    <input id="reg-email" name="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-row" style={{ marginBottom: "1rem" }}>
                  <div className="form-group">
                    <label htmlFor="reg-phone">Phone Number</label>
                    <input id="reg-phone" name="phone" type="tel" placeholder="+256 700 000 000" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-branch">Branch</label>
                    <select id="reg-branch" name="branch" required>
                      <option value="">Select your branch</option>
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label htmlFor="reg-guests">Number of Attendees</label>
                  <select id="reg-guests" name="guests">
                    <option value="1">Just me</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5+">5 or more</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }} disabled={submitting}>
                  {submitting ? "Registering..." : "Register Now"} <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
