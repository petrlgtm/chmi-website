import { Heart, BookOpen, Globe, Users, Flame } from "lucide-react";
import { useSanityFaith } from "../hooks/useSanityFaith";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useHeroStyle } from "../context/SiteImagesContext";
import OptimizedImage from "../components/OptimizedImage";
import { IMAGES, ALL_IMAGES } from "../utils/imageFallbacks";

const galleryImages = [
  { src: IMAGES.gallery[0], alt: "Church worship service" },
  { src: IMAGES.gallery[1], alt: "Community gathering" },
  { src: IMAGES.gallery[2], alt: "Church celebration" },
  { src: IMAGES.gallery[3], alt: "Youth fellowship" },
  { src: IMAGES.gallery[4], alt: "Family in church" },
  { src: IMAGES.gallery[5], alt: "Church outreach" },
  { src: IMAGES.gallery[6], alt: "Choir worship" },
];

const timelineEvents = [
  { year: "2007", text: "Christ's Heart Ministries founded by Apostle Isaiah and Rev. Deborah Mbuga in Mukono, Uganda." },
  { year: "2010", text: "Grew from a small gathering into a congregation that established the first satellite branches." },
  { year: "2014", text: "Expanded presence across Uganda with a focus on youth and community outreach." },
  { year: "2018", text: "International expansion begins with branches in Kenya, Tanzania, and South Sudan." },
  { year: "2022", text: "Continued international growth with major community impact programs launched." },
  { year: "2025", text: "Ongoing growth and development, including plans for a new worship center for the CHMI family." },
];

export default function About() {
  const { data: statementOfFaith } = useSanityFaith();
  const historyRef = useScrollAnimation<HTMLDivElement>();
  const ourStoryRef = useScrollAnimation<HTMLDivElement>();
  const purposeRef = useScrollAnimation<HTMLDivElement>();
  const faithRef = useScrollAnimation<HTMLDivElement>();
  const galleryRef = useScrollAnimation<HTMLDivElement>();
  const timelineRef = useScrollAnimation<HTMLDivElement>();
  const heroStyle = useHeroStyle("heroAbout");

  return (
    <>
      <section className="page-hero-xl hero-about" style={heroStyle}>
        <div className="container">
          <div className="hero-tag hero-animate hero-animate-delay-1">
            <Globe size={14} /> Since 2007
          </div>
          <h1 className="hero-animate hero-animate-delay-2">About Christ's Heart</h1>
          <p className="hero-animate hero-animate-delay-3">
            A beacon of transformative spirituality in Uganda and throughout Africa,
            raising an Apostolic Generation that walks in divine authority.
          </p>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#0a0a0a" />
        </svg>
      </div>

      {/* Timeline Section - Dark */}
      <section className="about-timeline-section">
        <div className="container" style={{ maxWidth: "700px" }}>
          <div className="section-header">
            <span className="section-label" style={{ color: "var(--gold-400)" }}>Our Journey</span>
            <h2 style={{ color: "var(--text-inverse)" }}>A Timeline of Growth</h2>
          </div>
          <div className="animate-on-scroll" ref={timelineRef}>
            <div className="timeline">
              {timelineEvents.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-text">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History — 5-image editorial mosaic */}
      <section className="section history-section">
        <div className="container">
          <div className="animate-on-scroll" ref={historyRef}>

            {/* Text header */}
            <div className="history-story-header">
              <span className="badge badge-purple">Our History</span>
              <h3>From Humble Beginnings</h3>
              <p>
                Founded in 2007 by Apostle Isaiah and Rev. Deborah Mbuga, Christ's Heart Ministries
                International stands as a beacon of transformative spirituality in Uganda and throughout
                Africa. With its roots firmly planted in Mukono, Uganda, the ministry has grown into a
                lasting global presence.
              </p>
              <p>
                What began as a humble gathering has transformed into a thriving, vibrant ministry — its
                impact felt through powerful worship, dynamic discipleship, engaging fellowships, and
                impactful outreach programs across the world.
              </p>
            </div>

            {/* 5-image mosaic — unequal sizes, story flow */}
            <div className="history-mosaic">

              {/* Cell 1 — tall feature left (rows 1–2) */}
              <div className="history-mosaic-img history-mosaic-1">
                <img src={IMAGES.history} alt="Apostle Isaiah leading worship, Mukono 2007" loading="eager" />
                <div className="history-mosaic-caption">2007 · Mukono, Uganda</div>
              </div>

              {/* Cell 2 — top center */}
              <div className="history-mosaic-img history-mosaic-2">
                <img src={IMAGES.gallery[0]} alt="Early congregation gathering" loading="lazy" />
              </div>

              {/* Cell 3 — top right */}
              <div className="history-mosaic-img history-mosaic-3">
                <img src={IMAGES.gallery[1]} alt="Community fellowship" loading="lazy" />
              </div>

              {/* Cell 4 — wide center-right (spans 2 cols) */}
              <div className="history-mosaic-img history-mosaic-4">
                <img src={IMAGES.gallery[2]} alt="Church celebration and growth" loading="lazy" />
                <div className="history-mosaic-caption">Expanding Across Uganda</div>
              </div>

              {/* Cell 5 — full-width panoramic base */}
              <div className="history-mosaic-img history-mosaic-5">
                <img src={IMAGES.gallery[3]} alt="Christ's Heart Ministries worldwide" loading="lazy" />
                <div className="history-mosaic-caption">Today · A Global Ministry</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Church Life</span>
            <h2>Our Community</h2>
            <p>Moments of worship, fellowship, and transformation</p>
          </div>
          <div className="photo-gallery animate-on-scroll" ref={galleryRef}>
            {galleryImages.map((img, i) => (
              <div key={i} className="photo-gallery-item">
                <OptimizedImage src={img.src} alt={img.alt} loading="lazy" aspectRatio="4/3" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story - replaces Leadership slot */}
      <section className="section">
        <div className="container">
          <div className="animate-on-scroll" ref={ourStoryRef}>
            <div className="feature-row reverse">
              <div className="feature-row-image image-reveal">
                <OptimizedImage
                  src={ALL_IMAGES[11]}
                  alt="Christ's Heart Ministries community"
                  loading="lazy"
                  aspectRatio="4/3"
                />
              </div>
              <div className="feature-row-text">
                <span className="badge badge-gold" style={{ marginBottom: "1rem" }}>Our Story</span>
                <h3>We Are Raising An Apostolic Generation</h3>
                <p>
                  Christ's Heart Ministries International is one of the fastest growing ministries
                  country-wide and all over Africa. Based and Headquartered in Mukono, Uganda, Apostle
                  Isaiah Mbuga is the General Overseer of Christ's Heart Ministries International.
                  Together with his wife Rev. Deborah Mbuga, they have labored tirelessly in obedience
                  to God.
                </p>
                <p>
                  Apostle Isaiah is passionate about teaching and preaching the word of God for the
                  salvation and restoration of men and women, with a great emphasis on the tangible
                  manifestation of God's power at work in and for the lives of His people.
                </p>
                <p>
                  The ministry spans a period of 18 years with notable successes in every sphere. What
                  was once a small church of less than 10 people has currently evolved into a Mega
                  celebration in attendance every week — for the various Bible studies, Fellowships,
                  and outreaches.
                </p>
                <div className="about-story-pills">
                  {[
                    { icon: Globe, label: "World Branches" },
                    { icon: Users, label: "Dynamic Community" },
                    { icon: Flame, label: "Apostolic Fire" },
                  ].map((v) => (
                    <div key={v.label} className="about-story-pill">
                      <v.icon size={14} /> {v.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission — Vision first */}
      <section className="section about-purpose-section">
        <div className="container">
          <div ref={purposeRef} className="animate-on-scroll about-purpose-wrap">
            <span className="section-label">Our Purpose</span>
            <h2 className="gradient-text about-purpose-heading">Vision &amp; Mission</h2>
            <div className="responsive-2col-grid">
              <div className="about-vm-card">
                <div className="about-vm-card-header">
                  <div className="about-vm-icon">
                    <BookOpen size={22} />
                  </div>
                  <h3 className="about-vm-title">Our Vision</h3>
                </div>
                <p className="about-vm-text">
                  Raising an Apostolic Generation that walks in divine authority, power, and purpose,
                  impacting nations through the tangible manifestation of God's power.
                </p>
              </div>
              <div className="about-vm-card">
                <div className="about-vm-card-header">
                  <div className="about-vm-icon">
                    <Heart size={22} />
                  </div>
                  <h3 className="about-vm-title">Our Mission</h3>
                </div>
                <p className="about-vm-text">
                  To seek and save all who are lost in sin, building the Body of Christ through
                  transformative worship, teaching, and community outreach across Uganda and the world.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="about-core-values">
              {[
                { icon: Flame, label: "Apostolic Fire" },
                { icon: Heart, label: "Love & Grace" },
                { icon: Users, label: "Community" },
                { icon: Globe, label: "Global Impact" },
              ].map((v) => (
                <div key={v.label} className="about-core-pill">
                  <v.icon size={16} /> {v.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="about-timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Believe</span>
            <h2>Statement of Faith</h2>
            <p>The foundational beliefs that guide our ministry and community</p>
          </div>
          <div ref={faithRef} className="animate-on-scroll about-faith-wrap">
            <div className="faith-list">
              {statementOfFaith.map((item, i) => (
                <div key={i} className="faith-item">
                  <div className="faith-number">{i + 1}</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
