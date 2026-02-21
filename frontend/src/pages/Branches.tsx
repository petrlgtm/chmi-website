import { useState, useMemo, useRef, useCallback, useEffect, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight, Church, Search, Filter, Wifi, Globe } from "lucide-react";
import { useSanityBranches } from "../hooks/useSanityBranches";

/** Country flag emoji for non-Uganda branches */
const COUNTRY_FLAGS: Record<string, string> = {
  Canada: "\u{1F1E8}\u{1F1E6}", England: "\u{1F1EC}\u{1F1E7}", Belgium: "\u{1F1E7}\u{1F1EA}",
  Dubai: "\u{1F1E6}\u{1F1EA}", USA: "\u{1F1FA}\u{1F1F8}", Nairobi: "\u{1F1F0}\u{1F1EA}",
  Mombasa: "\u{1F1F0}\u{1F1EA}", Voi: "\u{1F1F0}\u{1F1EA}", Kabwe: "\u{1F1FF}\u{1F1F2}",
};

const UGANDA_CITIES = new Set([
  "Biiso","Bugolobi","Buloba","Butaleja","Entebbe","Fort Portal","Gulu",
  "Hoima","Iganga","Ishaka","Jinja","Kabale","Kampala","Kangulumira",
  "Kawempe","Kisaasi","Kisoro","Kyebando","Kyetume","Lira","Lugazi",
  "Luweero","Makerere","Masaka","Masindi","Mayuge","Mbale","Mbarara",
  "Mityana","Mubende","Mukono","Nansana","Soroti",
]);

function getCountryLabel(city: string): string {
  if (UGANDA_CITIES.has(city)) return "Uganda";
  const flags: Record<string, string> = {
    Canada: "Canada", England: "United Kingdom", Belgium: "Belgium",
    Dubai: "UAE", USA: "United States", Nairobi: "Kenya",
    Mombasa: "Kenya", Voi: "Kenya", Kabwe: "Zambia",
  };
  return flags[city] ?? city;
}

/** Curated Unsplash church/worship/community images for branch cards */
const BRANCH_IMAGES = [
  "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=500&q=75&fit=crop",
  "https://images.unsplash.com/photo-1519491050882-a38c0afe472c?w=500&q=75&fit=crop",
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=500&q=75&fit=crop",
  "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=500&q=75&fit=crop",
  "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=500&q=75&fit=crop",
  "https://images.unsplash.com/photo-1477672680933-0287a151330e?w=500&q=75&fit=crop",
  "https://images.unsplash.com/photo-1508963493744-76fce69379c0?w=500&q=75&fit=crop",
  "https://images.unsplash.com/photo-1529070538774-1560d23cee83?w=500&q=75&fit=crop",
];

const BranchMap = lazy(() => import("../components/BranchMap"));

export default function Branches() {
  const { data: branches } = useSanityBranches();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const COUNTRY_COUNT = useMemo(() => new Set(branches.map((b) => getCountryLabel(b.city))).size, [branches]);

  const scrollToResults = useCallback(() => {
    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }, []);

  useEffect(() => {
    if (search.length >= 2 || cityFilter) {
      scrollToResults();
    }
    return () => clearTimeout(scrollTimerRef.current);
  }, [search, cityFilter, scrollToResults]);

  const cities = useMemo(() => {
    const all = branches.map((b) => b.city);
    return [...new Set(all)].sort();
  }, [branches]);

  const filtered = useMemo(() => {
    return branches.filter((b) => {
      const matchSearch =
        !search ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.city.toLowerCase().includes(search.toLowerCase()) ||
        b.address.toLowerCase().includes(search.toLowerCase());
      const matchCity = !cityFilter || b.city === cityFilter;
      return matchSearch && matchCity;
    });
  }, [branches, search, cityFilter]);

  return (
    <>
      <section className="page-hero-xl hero-branches">
        <div className="container">
          <div className="hero-tag hero-animate hero-animate-delay-1">
            <Church size={14} /> Our Branch Network
          </div>
          <h1 className="hero-animate hero-animate-delay-2">Find a Church Near You</h1>
          <p className="hero-animate hero-animate-delay-3">
            Christ's Heart Ministries has branches across Uganda and around the world.
            Visit a branch near you today.
          </p>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#0a0a0a" />
        </svg>
      </div>

      <section className="section">
        <div className="container">

          {/* ── Top row: Filter sidebar LEFT + Map RIGHT ── */}
          <div className="branches-sidebar-layout">

            {/* Left: search + city filter */}
            <aside className="branch-filter-sidebar">
              <div className="branch-search-field">
                <Search size={16} className="branch-search-field-icon" />
                <input
                  type="text"
                  placeholder="Search by name, city…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search branches"
                  className="branch-search-field-input"
                />
              </div>

              <div className="branch-filter-panel">
                <div className="branch-filter-panel-header">
                  <Filter size={14} style={{ color: "var(--text-light)" }} />
                  <span className="branch-filter-label">Filter by City</span>
                </div>
                <div className="branch-city-filter-list">
                  <button
                    className={`branch-city-btn ${!cityFilter ? "active" : ""}`}
                    onClick={() => setCityFilter("")}
                  >
                    <Church size={13} /> All Cities
                    <span className="branch-city-count">{branches.length}</span>
                  </button>
                  {cities.map((city) => {
                    const count = branches.filter((b) => b.city === city).length;
                    return (
                      <button
                        key={city}
                        className={`branch-city-btn ${cityFilter === city ? "active" : ""}`}
                        onClick={() => setCityFilter(cityFilter === city ? "" : city)}
                      >
                        <MapPin size={13} /> {city}
                        <span className="branch-city-count">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Right: Map */}
            <div>
              <Suspense fallback={<div className="branch-map-placeholder">Loading map…</div>}>
                <BranchMap branches={filtered} selectedId={selectedBranch ?? undefined} />
              </Suspense>
            </div>
          </div>

          {/* ── Stats bar ── */}
          <div className="branch-stats-bar">
            <div className="branch-stat-item">
              <span className="branch-stat-number">{branches.length}</span>
              <span className="branch-stat-label">Branches</span>
            </div>
            <div className="branch-stat-divider" />
            <div className="branch-stat-item">
              <span className="branch-stat-number">{COUNTRY_COUNT}</span>
              <span className="branch-stat-label">Countries</span>
            </div>
            <div className="branch-stat-divider" />
            <div className="branch-stat-item">
              <span className="branch-stat-number">{cities.length}</span>
              <span className="branch-stat-label">Cities</span>
            </div>
          </div>

          {/* ── Results count ── */}
          <p className="branch-count" ref={resultsRef} style={{ marginBottom: "1.5rem" }}>
            Showing <strong>{filtered.length}</strong> branch{filtered.length !== 1 ? "es" : ""}
            {search && <> matching "<strong>{search}</strong>"</>}
            {cityFilter && <> in <strong>{cityFilter}</strong></>}
          </p>

          {/* ── Branch cards grid ── */}
          <div className="branches-grid">
            {filtered.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
                <Church size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                <p>No branches found. Try a different search term.</p>
              </div>
            ) : (
              filtered.map((branch, idx) => {
                const isOnline = branch.address === "Online";
                const flag = COUNTRY_FLAGS[branch.city];
                const country = getCountryLabel(branch.city);
                const pastor = branch.pastors?.[0];
                const img = BRANCH_IMAGES[idx % BRANCH_IMAGES.length];

                return (
                  <div
                    key={branch.id}
                    className="branch-card-v2"
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/branches/${branch.id}`)}
                    onKeyDown={(e) => { if (e.key === "Enter") navigate(`/branches/${branch.id}`); }}
                  >
                    {/* ── Image strip ── */}
                    <div className="bc-image">
                      <img src={img} alt={`${branch.name} branch`} loading="lazy" />
                    </div>

                    <div className="bc-content">
                      {/* ── Header: icon + name + badges ── */}
                      <div className="bc-header">
                        <div className="bc-icon">
                          {isOnline ? <Globe size={20} /> : <Church size={20} />}
                        </div>
                        <div className="bc-title-wrap">
                          <div className="bc-name-row">
                            <h3 className="bc-name">{branch.name}</h3>
                            {isOnline && (
                              <span className="bc-badge bc-badge--online">
                                <Wifi size={10} /> Online
                              </span>
                            )}
                            {flag && (
                              <span className="bc-flag" title={country}>{flag}</span>
                            )}
                          </div>
                          <p className="bc-location">{branch.city}{!UGANDA_CITIES.has(branch.city) ? `, ${country}` : ", Uganda"}</p>
                        </div>
                      </div>

                      {/* Pastor */}
                      {pastor && pastor.name && pastor.name !== "Pastor" && (
                        <p className="bc-pastor">{pastor.name}</p>
                      )}

                      {/* Divider */}
                      <div className="bc-divider" />

                      {/* ── Info rows ── */}
                      <div className="bc-body">
                        <div className="bc-info-row">
                          <MapPin size={14} className="bc-info-icon" />
                          {isOnline ? (
                            <span className="bc-info-text bc-info-dim">Online / Virtual</span>
                          ) : (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${branch.name}, ${branch.address}, ${branch.city}`)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="bc-info-text bc-info-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {branch.address}
                            </a>
                          )}
                        </div>
                        <div className="bc-info-row">
                          <Phone size={14} className="bc-info-icon" />
                          <a href={`tel:${branch.phone.replace(/\s/g, "")}`}
                            className="bc-info-text bc-info-dim"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {branch.phone}
                          </a>
                        </div>
                        <div className="bc-info-row">
                          <Mail size={14} className="bc-info-icon" />
                          <a href={`mailto:${branch.email}`}
                            className="bc-info-text bc-info-dim"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {branch.email}
                          </a>
                        </div>
                      </div>

                      {/* ── Footer CTAs ── */}
                      <div className="bc-footer">
                        <button
                          className="bc-btn bc-btn--map"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedBranch(branch.id);
                            const el = document.getElementById("branch-map");
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          aria-label={`Show ${branch.name} on map`}
                        >
                          <MapPin size={13} /> Show on Map
                        </button>
                        <Link
                          to={`/branches/${branch.id}`}
                          className="bc-btn bc-btn--details"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Branch <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
