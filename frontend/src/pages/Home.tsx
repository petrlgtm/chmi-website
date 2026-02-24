import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Users, BookOpen, Clock, Headphones,
  Church, Globe, Star, ArrowRight, Flame, Play, Calendar
} from "lucide-react";
import { useYouTubeVideos } from "../hooks/useYouTubeVideos";
import { useSanityEvents } from "../hooks/useSanityEvents";
import { useSanityLeadership } from "../hooks/useSanityLeadership";
import { getUpcomingEvents, getCountdownText } from "../utils/eventDate";
import { IMAGES, ALL_IMAGES } from "../utils/imageFallbacks";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useCursorGlow } from "../hooks/useCursorGlow";
import { useSiteImages } from "../context/SiteImagesContext";
import ParticleField from "../components/ParticleField";
import CountdownTimer from "../components/CountdownTimer";
import TestimonialCarousel from "../components/TestimonialCarousel";
import TypingText from "../components/TypingText";
import SectionNav from "../components/SectionNav";
import OptimizedImage from "../components/OptimizedImage";

function AnimatedSection({ children, className = "" }: {
  children: React.ReactNode; className?: string;
}) {
  const ref = useScrollAnimation<HTMLDivElement>();
  return (
    <div ref={ref} className={`animate-on-scroll ${className}`}>
      {children}
    </div>
  );
}

const sections = [
  { id: "hero", label: "Hero" },
  { id: "leadership", label: "Leadership" },
  { id: "services", label: "Services" },
  { id: "events", label: "Events" },
  { id: "latest-sermon", label: "Sermon" },
  { id: "testimonials", label: "Testimonials" },
  { id: "cta", label: "Join Us" },
];

function formatSermonDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch { return ""; }
}

const SERVICES_DATA = [
  // Row 1: Featured (left, wide) + small (right)
  {
    icon: Church,
    title: "Sunday Services",
    id: "sunday-services",
    desc: "7am, 9am (Teen's Service), 11am and 4pm. Please check for variations with your local branch.",
    bgImg: ALL_IMAGES[0],
    featured: true,
  },
  {
    icon: BookOpen,
    title: "Discipleship Class",
    id: "discipleship-class",
    desc: "Deep dive into God's word with interactive discipleship sessions and home cell fellowships.",
    bgImg: ALL_IMAGES[2],
    featured: false,
  },
  // Row 2: small (left) + Featured (right, wide)
  {
    icon: Headphones,
    title: "Lunch Hour Services",
    id: "lunch-hour-services",
    desc: "Mid-day refreshing. Kampala branch: 12:45pm – 1:45pm.",
    bgImg: ALL_IMAGES[6],
    featured: false,
  },
  {
    icon: Star,
    title: "Overnight Prayers",
    id: "overnight-prayers",
    desc: "Powerful all-night prayer sessions for breakthrough and divine encounters.",
    bgImg: ALL_IMAGES[4],
    featured: true,
  },
  // Row 3: two equal small cards
  {
    icon: Users,
    title: "Home Cells",
    id: "home-cells",
    desc: "Small group fellowships in homes for deeper connection and spiritual growth.",
    bgImg: ALL_IMAGES[3],
    featured: false,
  },
  {
    icon: Flame,
    title: "Night Services",
    id: "night-services",
    desc: "Special evening worship gatherings for spiritual empowerment.",
    bgImg: ALL_IMAGES[5],
    featured: false,
  },
];

export default function Home() {
  const leadershipRef = useScrollAnimation<HTMLDivElement>();
  const servicesRef = useScrollAnimation<HTMLDivElement>();
  const ctaRef = useScrollAnimation<HTMLDivElement>();
  const cursorGlowRef = useCursorGlow();
  const [playing, setPlaying] = useState(false);
  const { sermons, loading } = useYouTubeVideos();
  const latestSermon = sermons[0] ?? null;
  const { data: events } = useSanityEvents();
  const { data: leadership } = useSanityLeadership();
  const siteImages = useSiteImages();

  const heroHomeBg = siteImages?.heroHome || `${import.meta.env.BASE_URL}images/hero-bg.jpg`;

  // Merge CMS service card images into static service data
  const serviceCardMap = new Map(
    (siteImages?.serviceCards ?? []).map((c) => [c.label, c.url]),
  );
  const servicesData = SERVICES_DATA.map((s) => ({
    ...s,
    bgImg: serviceCardMap.get(s.title) || s.bgImg,
  }));

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = heroHomeBg;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [heroHomeBg]);

  const upcomingEvents = getUpcomingEvents(events);

  return (
    <>
      <SectionNav sections={sections} />

      {/* Hero */}
      <section className="hero cursor-glow" id="hero" ref={cursorGlowRef} style={{ backgroundImage: `url(${heroHomeBg})` }}>
        <div className="hero-gradient-overlay" />
        <ParticleField />
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="hero-decor hero-decor-3" />
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-label hero-animate hero-animate-delay-1">
              <Flame size={16} />
              <TypingText
                texts={[
                  "We Are Raising An Apostolic Generation",
                  "Branches Worldwide",
                  "Transforming Lives Since 2007",
                ]}
                speed={50}
                pause={3000}
              />
            </div>
            <h1 className="hero-animate hero-animate-delay-2">
              Christ's Heart
              <span>Ministries International</span>
            </h1>
            <p className="hero-animate hero-animate-delay-3">
              Founded in 2007, Christ's Heart Ministries stands as a beacon of transformative
              spirituality in Uganda and throughout Africa, with a broad international presence.
            </p>
            <div className="hero-buttons hero-animate hero-animate-delay-4">
              <Link to="/branches" className="btn btn-gold">
                <MapPin size={18} /> Find a Church
              </Link>
              <Link to="/about" className="btn btn-white">
                Learn More <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-animate hero-animate-delay-4" style={{ marginTop: "2rem" }}>
              <CountdownTimer events={events} />
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card hero-animate hero-animate-delay-3">
              <h3>Services & Meetings</h3>
              <div className="service-item">
                <div className="service-icon"><Church size={18} /></div>
                <div>
                  <h4>Sunday Services</h4>
                  <p>7am, 9am (Teen's), 11am & 4pm</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-icon"><Clock size={18} /></div>
                <div>
                  <h4>Lunch Hour Services</h4>
                  <p>Kampala: 12:45pm – 1:45pm</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-icon"><Star size={18} /></div>
                <div>
                  <h4>Night Services</h4>
                  <p>Special evening gatherings</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-icon"><BookOpen size={18} /></div>
                <div>
                  <h4>Discipleship Class & Home Cells</h4>
                  <p>Mid-week fellowship groups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="mission-section" id="leadership">
        <div className="container">
          <div className="mission-grid animate-on-scroll" ref={leadershipRef}>
            <div className="mission-image image-reveal">
              <OptimizedImage
                src={leadership.image || IMAGES.leadership}
                alt={leadership.heading || "Apostle Isaiah & Rev. Deborah Mbuga"}
                loading="eager"
                aspectRatio="4/3"
              />
            </div>
            <div className="mission-text">
              <span className="section-label">Leadership</span>
              <h2>{leadership.heading || "Apostle Isaiah & Rev. Deborah Mbuga"}</h2>
              <p style={{ fontStyle: "italic", color: "var(--text-light)", marginBottom: "1rem", fontWeight: 500 }}>
                {leadership.subtitle || "General Overseers, Christ's Heart Ministries International"}
              </p>
              <p>
                A father and mentor to many, Apostle Isaiah is passionate about teaching and preaching
                the word of God for the salvation and restoration of men and women, with a great emphasis
                on the tangible manifestation of God's power at work in and for the lives of His people.
              </p>
              <p>
                Apostle Isaiah holds a master's degree in Journalism from the City University of London
                and has lectured before joining full-time ministry. He is also known as a gospel music
                writer and singer, raising a generation that walks in divine authority, power, and purpose.
              </p>
              <div className="mission-features">
                <div className="mission-feature">
                  <div className="feature-icon"><Globe size={20} /></div>
                  <span>Branches Across the World</span>
                </div>
                <div className="mission-feature">
                  <div className="feature-icon"><Users size={20} /></div>
                  <span>Dynamic Community of Believers</span>
                </div>
                <div className="mission-feature">
                  <div className="feature-icon"><Flame size={20} /></div>
                  <span>Apostolic Power &amp; Teaching</span>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: "1.5rem", width: "fit-content", display: "inline-flex" }}>
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Gatherings — Staggered image-forward layout */}
      <section className="services-section section" id="services">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2>Services &amp; Gatherings</h2>
              <p>Join us for transformative worship experiences throughout the week</p>
            </div>
          </AnimatedSection>
          <div className="services-grid-v2 animate-on-scroll" ref={servicesRef}>
            {servicesData.map((service) => (
              <Link
                key={service.title}
                to={`/services/${service.id}`}
                className={`svc-card-link${service.featured ? " svc-card-link--featured" : ""}`}
              >
                <div
                  className="svc-card"
                  style={{ "--svc-bg": `url(${service.bgImg})` } as React.CSSProperties}
                >
                  <div className="svc-card-zoom" />
                  <div className="svc-card-overlay" />
                  <div className="svc-card-content">
                    <div className="svc-card-icon">
                      <service.icon size={service.featured ? 26 : 20} />
                    </div>
                    <h3 className="svc-card-title">{service.title}</h3>
                    <div className="svc-card-rule" />
                    <p className="svc-card-desc">{service.desc}</p>
                    <span className="svc-card-cta">
                      Learn More <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scheduled Events – Horizontal Marquee */}
      <section className="featured-events section" id="events">
        <div className="container">
          <AnimatedSection>
            <div className="section-header events-section-header">
              <div className="events-label-row">
                <span className="events-label-rule" />
                <span className="section-label">Spiritual Calendar</span>
                <span className="events-label-rule" />
              </div>
              <h2 className="events-heading">
                Scheduled{" "}
                <span className="events-heading-accent">Events</span>
              </h2>
              <p>Mark your calendar — don't miss these powerful moments</p>
            </div>
          </AnimatedSection>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="events-marquee">
            <div className="events-marquee-track">
              {[...upcomingEvents, ...upcomingEvents].map((event, i) => {
                const countdown = getCountdownText(event);
                return (
                  <Link
                    to={`/events/${event.id}`}
                    key={`${event.id}-${i}`}
                    className="event-marquee-card"
                  >
                    <div className="event-marquee-img">
                      <img src={event.image || ALL_IMAGES[i % ALL_IMAGES.length]} alt={event.name} loading="lazy" />
                      <div className="event-marquee-overlay" />
                      <span className="event-marquee-date">{event.date}</span>
                    </div>
                    <div className="event-marquee-body">
                      <span className="event-marquee-cat">{event.category}</span>
                      <h4>{event.name}</h4>
                      <p>{event.tagline}</p>
                      {countdown && (
                        <span style={{
                          display: "inline-block", marginTop: "0.6rem",
                          fontSize: "0.7rem", fontWeight: 700,
                          color: "var(--gold-500)", fontFamily: "var(--font-mono)",
                          textTransform: "uppercase", letterSpacing: "0.05em"
                        }}>
                          ⏳ {countdown}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="container" style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-light)" }}>
            <p>Check back soon for upcoming events.</p>
          </div>
        )}

        <div className="container" style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/events" className="btn btn-primary">
            View All Events <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Latest Sermon */}
      <section className="home-sermon-preview section" id="latest-sermon">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Latest Message</span>
              <h2>Stream This Week's Sermon</h2>
              <p>Watch our most recent message from Christ's Heart Ministries</p>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="ls-skeleton">
              <div className="ls-skeleton-player" />
              <div className="ls-skeleton-info">
                <div className="ls-skel-line ls-skel-title" />
                <div className="ls-skel-line ls-skel-sub" />
                <div className="ls-skel-line ls-skel-sub ls-skel-short" />
              </div>
            </div>
          ) : latestSermon ? (
            <div className="ls-grid">
              {/* Player */}
              <div className="ls-player">
                {playing ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${latestSermon.videoId}?autoplay=1`}
                    title={latestSermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    className="ls-thumb-wrap"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play: ${latestSermon.title}`}
                  >
                    <img
                      src={(latestSermon as unknown as Record<string, string>).thumbnailHigh || latestSermon.thumbnail}
                      alt={latestSermon.title}
                    />
                    <div className="ls-play-overlay">
                      <div className="ls-play-btn">
                        <Play size={30} fill="currentColor" />
                      </div>
                      <span>Watch Now</span>
                    </div>
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="ls-info">
                <span className="ls-label">Latest Sermon</span>
                <h3>{latestSermon.title}</h3>
                {latestSermon.date && (
                  <p className="ls-date">
                    <Calendar size={13} />
                    {formatSermonDate(latestSermon.date)}
                  </p>
                )}
                {latestSermon.description && (
                  <p className="ls-desc">{latestSermon.description}</p>
                )}
                <div className="ls-actions">
                  {!playing && (
                    <button className="btn btn-gold" onClick={() => setPlaying(true)}>
                      <Play size={15} fill="currentColor" /> Stream Now
                    </button>
                  )}
                  <Link to="/sermons" className="btn btn-outline">
                    All Sermons <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section id="testimonials">
        <TestimonialCarousel />
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <ParticleField />
        <div className="container animate-on-scroll" ref={ctaRef}>
          <h2>Join Us This Sunday</h2>
          <p>
            Experience the love of God and the warmth of our community. There's a Christ's Heart
            branch near you waiting with open arms.
          </p>
          <div className="cta-buttons">
            <Link to="/branches" className="btn btn-gold">
              <MapPin size={18} /> Find a Branch
            </Link>
            <Link to="/contact" className="btn btn-white">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
