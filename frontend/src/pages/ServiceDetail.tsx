import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen, ArrowRight, Sparkles, MapPin, Church, Phone, Search, Users } from "lucide-react";
import { useSanityServices } from "../hooks/useSanityServices";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { ALL_IMAGES } from "../utils/imageFallbacks";


export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: services } = useSanityServices();
  const service = services.find((s) => s.id === id);
  const contentRef = useScrollAnimation<HTMLDivElement>();
  const scheduleRef = useScrollAnimation<HTMLDivElement>();
  const highlightsRef = useScrollAnimation<HTMLDivElement>();
  const branchRef = useScrollAnimation<HTMLDivElement>();
  const cellRef = useScrollAnimation<HTMLDivElement>();

  const [branchSearch, setBranchSearch] = useState("");
  const [cellSearch, setCellSearch] = useState("");

  if (!service) {
    return (
      <section className="section" style={{ paddingTop: "8rem", textAlign: "center" }}>
        <div className="container">
          <h2>Service Not Found</h2>
          <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>
            The service you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: "2rem" }}>
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </section>
    );
  }

  const currentIndex = services.findIndex((s) => s.id === id);
  const prev = currentIndex > 0 ? services[currentIndex - 1] : null;
  const next = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  const filteredBranches = service.branchSchedules.filter((b) =>
    !branchSearch ||
    b.branchName.toLowerCase().includes(branchSearch.toLowerCase()) ||
    b.city.toLowerCase().includes(branchSearch.toLowerCase())
  );

  const filteredCells = service.cellLocations?.filter((c) =>
    !cellSearch ||
    c.area.toLowerCase().includes(cellSearch.toLowerCase()) ||
    c.city.toLowerCase().includes(cellSearch.toLowerCase()) ||
    c.leader.toLowerCase().includes(cellSearch.toLowerCase())
  );

  return (
    <>
      <section className="page-hero-xl hero-about">
        <div className="container">
          <div className="breadcrumb hero-animate hero-animate-delay-1">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span style={{ color: "var(--gold-400)" }}>{service.title}</span>
          </div>
          <h1 className="hero-animate hero-animate-delay-2">{service.title}</h1>
          <p className="hero-animate hero-animate-delay-3">{service.shortDesc}</p>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#0a0a0a" />
        </svg>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: "950px" }}>
          {/* Hero Image */}
          <div className="animate-on-scroll" ref={contentRef}>
            <div style={{
              borderRadius: "var(--radius-2xl)", overflow: "hidden",
              marginBottom: "3rem", boxShadow: "var(--shadow-2xl)"
            }}>
              <img
                src={service.heroImage || ALL_IMAGES[0]}
                alt={service.title}
                style={{ width: "100%", height: "auto", display: "block" }}
                loading="lazy"
              />
            </div>

            {/* Description */}
            <div className="branch-info-card" style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Sparkles size={18} style={{ color: "var(--gold-500)" }} />
                <h3 style={{ margin: 0 }}>About {service.title}</h3>
              </div>
              {service.description.map((p, i) => (
                <p key={i} style={{ color: "var(--gray-600)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: i < service.description.length - 1 ? "1.25rem" : 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* General Schedule */}
          <div className="animate-on-scroll" ref={scheduleRef}>
            <div className="branch-info-card" style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <Clock size={18} style={{ color: "var(--gold-500)" }} />
                <h3 style={{ margin: 0 }}>General Schedule</h3>
              </div>
              <div className="event-schedule">
                {service.schedule.map((item, i) => (
                  <div key={i} className="event-schedule-item">
                    <div className="event-schedule-time">
                      <div style={{ fontWeight: 700 }}>{item.day}</div>
                      <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>{item.time}</div>
                    </div>
                    <div className="event-schedule-desc">
                      <p>{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Branch-Specific Schedules */}
          <div className="animate-on-scroll" ref={branchRef}>
            <div style={{
              marginBottom: "2.5rem", padding: "2.5rem",
              background: "linear-gradient(135deg, var(--black-800), var(--purple-950), var(--black-700))",
              borderRadius: "var(--radius-2xl)", color: "var(--text-inverse)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Church size={20} style={{ color: "var(--gold-400)" }} />
                <h3 style={{ margin: 0, color: "var(--text-inverse)" }}>
                  {service.title} by Branch
                </h3>
              </div>
              <p style={{ opacity: 0.6, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Times may vary by branch. Contact your local branch for the latest schedule.
              </p>

              {/* Branch Search */}
              <div style={{ position: "relative", marginBottom: "1.25rem" }}>
                <Search size={16} style={{
                  position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)",
                  color: "var(--gray-400)"
                }} />
                <input
                  type="text"
                  placeholder="Search branches by name or city..."
                  value={branchSearch}
                  onChange={(e) => setBranchSearch(e.target.value)}
                  style={{
                    width: "100%", padding: "0.7rem 0.75rem 0.7rem 2.25rem",
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "var(--radius-lg)", color: "var(--white)", fontSize: "0.9rem"
                  }}
                  aria-label="Search branches"
                />
              </div>

              {/* Branch List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {filteredBranches.length === 0 ? (
                  <p style={{ textAlign: "center", padding: "1.5rem", opacity: 0.5, fontSize: "0.9rem" }}>
                    No branches found matching your search.
                  </p>
                ) : (
                  filteredBranches.map((b) => (
                    <div key={b.branchId} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
                      gap: "1rem", flexWrap: "wrap"
                    }}>
                      <div>
                        <Link
                          to={`/branches/${b.branchId}`}
                          style={{ color: "var(--gold-400)", fontWeight: 600, fontSize: "0.95rem" }}
                        >
                          {b.branchName}
                        </Link>
                        <div style={{ fontSize: "0.8rem", opacity: 0.5, marginTop: "0.15rem" }}>
                          <MapPin size={12} style={{ display: "inline", verticalAlign: "-2px" }} /> {b.city}
                        </div>
                      </div>
                      <div style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                        background: "rgba(255,255,255,0.06)", padding: "0.35rem 0.75rem",
                        borderRadius: "var(--radius-md)", color: "rgba(255,255,255,0.8)",
                        whiteSpace: "nowrap"
                      }}>
                        {b.times}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <p style={{
                marginTop: "1.25rem", fontSize: "0.8rem", opacity: 0.4,
                fontFamily: "var(--font-mono)", textAlign: "center"
              }}>
                Showing {filteredBranches.length} of {service.branchSchedules.length} branches
              </p>
            </div>
          </div>

          {/* Cell Locations (only for home-cells) */}
          {service.cellLocations && service.cellLocations.length > 0 && (
            <div className="animate-on-scroll" ref={cellRef}>
              <div className="branch-info-card" style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <Users size={18} style={{ color: "var(--gold-500)" }} />
                  <h3 style={{ margin: 0 }}>Cell Locations by Area</h3>
                </div>
                <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Find a home cell near you. Contact the cell leader to join.
                </p>

                {/* Cell Search */}
                <div style={{ position: "relative", marginBottom: "1.25rem" }}>
                  <Search size={16} style={{
                    position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)",
                    color: "var(--gray-400)"
                  }} />
                  <input
                    type="text"
                    placeholder="Search by area, city, or leader name..."
                    value={cellSearch}
                    onChange={(e) => setCellSearch(e.target.value)}
                    style={{
                      width: "100%", padding: "0.7rem 0.75rem 0.7rem 2.25rem",
                      border: "1.5px solid var(--gray-200)", borderRadius: "var(--radius-lg)",
                      fontSize: "0.9rem"
                    }}
                    aria-label="Search home cells"
                  />
                </div>

                {/* Group by city */}
                {(() => {
                  const cities = [...new Set(filteredCells?.map((c) => c.city))].sort();
                  return cities.map((city) => (
                    <div key={city} style={{ marginBottom: "1.5rem" }}>
                      <div style={{
                        display: "flex", alignItems: "center", gap: "0.5rem",
                        marginBottom: "0.75rem", paddingBottom: "0.5rem",
                        borderBottom: "2px solid var(--purple-100)"
                      }}>
                        <MapPin size={16} style={{ color: "var(--primary)" }} />
                        <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", margin: 0 }}>
                          {city}
                        </h4>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {filteredCells?.filter((c) => c.city === city).map((cell, i) => (
                          <div key={i} className="cell-location-row" style={{
                            padding: "0.85rem 1rem", background: "var(--bg-alt)",
                            borderRadius: "var(--radius-lg)",
                            border: "1px solid var(--gray-100)",
                            transition: "var(--transition)"
                          }}>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--gray-900)" }}>
                                {cell.area}
                              </div>
                              <div style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "0.15rem" }}>
                                {cell.leader}
                              </div>
                            </div>
                            <div style={{
                              fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                              background: "var(--purple-100)", color: "var(--primary)",
                              padding: "0.25rem 0.6rem", borderRadius: "var(--radius-full)",
                              fontWeight: 600, whiteSpace: "nowrap"
                            }}>
                              {cell.day} {cell.time}
                            </div>
                            <a href={`tel:${cell.contact}`} style={{
                              display: "flex", alignItems: "center", gap: "0.3rem",
                              color: "var(--primary)", fontSize: "0.8rem", fontWeight: 600,
                              fontFamily: "var(--font-mono)", whiteSpace: "nowrap"
                            }}>
                              <Phone size={12} /> {cell.contact}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}

                {filteredCells?.length === 0 && (
                  <p style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-light)" }}>
                    No cells found matching your search.
                  </p>
                )}

                <p style={{
                  marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-light)",
                  fontFamily: "var(--font-mono)", textAlign: "center"
                }}>
                  {filteredCells?.length} cells across {[...new Set(filteredCells?.map((c) => c.city))].length} cities
                </p>
              </div>
            </div>
          )}

          {/* What to Expect */}
          <div className="animate-on-scroll" ref={highlightsRef}>
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <BookOpen size={18} style={{ color: "var(--gold-500)" }} />
                <h3 style={{ margin: 0 }}>What to Expect</h3>
              </div>
              <div className="responsive-2col-grid" style={{ gap: "1.25rem" }}>
                {service.highlights.map((h, i) => (
                  <div key={i} style={{
                    padding: "1.75rem", background: "var(--bg-alt)",
                    borderRadius: "var(--radius-xl)", border: "1px solid var(--gray-100)",
                    transition: "var(--transition)"
                  }}>
                    <h4 style={{ fontSize: "1rem", fontFamily: "var(--font-body)", fontWeight: 700, marginBottom: "0.5rem", color: "var(--gray-900)" }}>
                      {h.title}
                    </h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--gray-600)", lineHeight: 1.7 }}>
                      {h.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scripture */}
          <div style={{
            textAlign: "center", padding: "3rem 2.5rem",
            background: "linear-gradient(135deg, var(--black-800), var(--purple-950), var(--black-700))",
            borderRadius: "var(--radius-2xl)", color: "var(--text-inverse)",
            marginBottom: "2.5rem"
          }}>
            <p style={{
              fontSize: "1.25rem", fontStyle: "italic", color: "var(--gold-300)",
              fontFamily: "var(--font-display)", maxWidth: "600px", margin: "0 auto 1rem",
              lineHeight: 1.7
            }}>
              "{service.scripture.text}"
            </p>
            <p style={{ opacity: 0.6, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
              — {service.scripture.ref}
            </p>
          </div>

          {/* CTA */}
          <div style={{
            textAlign: "center", padding: "2.5rem",
            background: "var(--bg-alt)", borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--gray-100)", marginBottom: "2.5rem"
          }}>
            <h3 style={{ marginBottom: "0.75rem" }}>Join Us for {service.title}</h3>
            <p style={{ color: "var(--gray-600)", marginBottom: "1.5rem", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
              Find a Christ's Heart branch near you and experience {service.title.toLowerCase()} in person.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/branches" className="btn btn-primary">
                <MapPin size={16} /> Find a Branch
              </Link>
              <Link to="/contact" className="btn btn-gold">
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Prev/Next Navigation */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: "1.5rem", borderTop: "1px solid var(--gray-200)"
          }}>
            {prev ? (
              <Link to={`/services/${prev.id}`} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem"
              }}>
                <ArrowLeft size={16} /> {prev.title}
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/services/${next.id}`} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem"
              }}>
                {next.title} <ArrowRight size={16} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </>
  );
}
