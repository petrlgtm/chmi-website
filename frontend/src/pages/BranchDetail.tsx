import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowLeft, Quote, Church, Users } from "lucide-react";
import { useSanityBranches } from "../hooks/useSanityBranches";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import OptimizedImage from "../components/OptimizedImage";

import { IMAGES } from "../utils/imageFallbacks";

const LocationMap = lazy(() => import("../components/LocationMap"));

export default function BranchDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: branches } = useSanityBranches();
  const branch = branches.find((b) => b.id === id);
  const contentRef = useScrollAnimation<HTMLDivElement>();

  if (!branch) {
    return (
      <section className="section" style={{ paddingTop: "8rem", textAlign: "center" }}>
        <div className="container">
          <h2>Branch Not Found</h2>
          <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>
            The branch you're looking for doesn't exist.
          </p>
          <Link to="/branches" className="btn btn-primary" style={{ marginTop: "2rem" }}>
            <ArrowLeft size={18} /> Back to Branches
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero-xl hero-branches">
        <div className="container">
          <div className="breadcrumb hero-animate hero-animate-delay-1">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/branches">Branches</Link>
            <span className="breadcrumb-sep">/</span>
            <span style={{ color: "var(--gold-400)" }}>{branch.name}</span>
          </div>
          <h1 className="hero-animate hero-animate-delay-2">{branch.name}</h1>
          <div className="branch-hero-info hero-animate hero-animate-delay-3">
            <span><MapPin size={16} /> {branch.city}</span>
            <span><Church size={16} /> Christ's Heart Branch</span>
            <span><Users size={16} /> Active Community</span>
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
          {/* Branch Gallery */}
          <div className="branch-gallery" style={{ marginBottom: "2.5rem" }}>
            {(branch.images?.length > 0 ? branch.images : IMAGES.branches).map((img, i) => (
              <div key={i} className="branch-gallery-item">
                <OptimizedImage src={img} alt={`${branch.name} - Photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} aspectRatio="16/9" />
              </div>
            ))}
          </div>

          <div className="branch-info-grid animate-on-scroll" ref={contentRef}>
            <div>
              {/* Pastors */}
              <div className="branch-info-card" style={{ marginBottom: "1.5rem" }}>
                <h3>Pastoral Team</h3>
                {branch.pastors.length > 0 ? (
                  branch.pastors.map((pastor, i) => (
                    <div key={i} className="pastor-card">
                      <div className="pastor-avatar">
                        <img
                          src={pastor.image || IMAGES.pastorDefault}
                          alt={pastor.name}
                          className="pastor-avatar-img"
                        />
                      </div>
                      <div className="pastor-info">
                        <h4>{pastor.name}</h4>
                        <p>{pastor.role}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "var(--text-light)" }}>Pastor information coming soon.</p>
                )}
              </div>

              {/* Testimonials */}
              {branch.testimonials.length > 0 && (
                <div className="branch-info-card" style={{ marginBottom: "1.5rem" }}>
                  <h3>Testimonials</h3>
                  {branch.testimonials.map((t, i) => (
                    <div key={i} className="testimonial-card">
                      <Quote size={20} style={{ color: "var(--purple-300)", marginBottom: "0.5rem" }} />
                      <p>"{t.text}"</p>
                      <span className="testimonial-author">— {t.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Services */}
              <div className="branch-info-card">
                <h3>Service Times</h3>
                <div className="branch-service-box">
                  <Clock size={20} />
                  <p>{branch.services}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="branch-info-card" style={{ marginBottom: "1.5rem" }}>
                <h3>Contact Information</h3>
                <div className="branch-contact-list">
                  <div className="branch-contact-row">
                    <div className="branch-contact-icon">
                      <MapPin size={16} />
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address !== "Online" ? `${branch.name}, ${branch.address}, ${branch.city}` : branch.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="branch-contact-link"
                    >
                      {branch.address}
                    </a>
                  </div>
                  <div className="branch-contact-row">
                    <div className="branch-contact-icon">
                      <Phone size={16} />
                    </div>
                    <a href={`tel:${branch.phone}`} className="branch-contact-link">{branch.phone}</a>
                  </div>
                  <div className="branch-contact-row">
                    <div className="branch-contact-icon">
                      <Mail size={16} />
                    </div>
                    <a href={`mailto:${branch.email}`} className="branch-contact-link">{branch.email}</a>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="branch-info-card">
                <h3>Location</h3>
                <Suspense fallback={<div className="branch-map-placeholder" style={{ height: "250px" }}>Loading map...</div>}>
                  <LocationMap
                    address={`${branch.address}, ${branch.city}`}
                    label={branch.name}
                    lat={branch.lat}
                    lng={branch.lng}
                    height="250px"
                    zoom={15}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
