import { useState, useMemo } from "react";
import { Search, Play, X, ExternalLink, ChevronDown, Headphones, Video, Mic } from "lucide-react";
import { useYouTubeVideos } from "../hooks/useYouTubeVideos";
import { useHeroStyle } from "../context/SiteImagesContext";
import { usePlayer } from "../hooks/usePlayer";
import type { Sermon } from "../types";

const PAGE_SIZE = 12;

const CATEGORY_KEYWORDS: [string, string][] = [
  ["lunch hour", "Lunch Hour"],
  ["sunday service", "Sunday"],
  ["sunday", "Sunday"],
  ["night service", "Night Service"],
  ["overnight", "Overnight"],
  ["conference", "Conference"],
  ["anniversary", "Anniversary"],
  ["crusade", "Crusade"],
  ["revival", "Revival"],
];

function getCategory(title: string): string {
  const t = title.toLowerCase();
  for (const [kw, label] of CATEGORY_KEYWORDS) {
    if (t.includes(kw)) return label;
  }
  return "Sermon";
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function Sermons() {
  const heroStyle = useHeroStyle("heroSermons");
  const { sermons, loading, error, loadMore, hasMore: apiHasMore, loadingMore } = useYouTubeVideos();
  const { currentItem, play } = usePlayer();
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mediaMode, setMediaMode] = useState<"video" | "audio">("video");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeYear, setActiveYear] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(sermons.map((s) => getCategory(s.title)));
    return ["All", ...Array.from(cats)];
  }, [sermons]);

  const years = useMemo(() => {
    const ys = new Set(sermons.map((s) => {
      const d = new Date(s.date);
      return isNaN(d.getTime()) ? "" : d.getFullYear().toString();
    }).filter(Boolean));
    return Array.from(ys).sort().reverse();
  }, [sermons]);

  const filtered = useMemo(() =>
    sermons.filter((s) => {
      const matchSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || getCategory(s.title) === activeCategory;
      const matchYear =
        activeYear === "All" || new Date(s.date).getFullYear().toString() === activeYear;
      return matchSearch && matchCat && matchYear;
    }), [sermons, search, activeCategory, activeYear]);

  const displayedSermons = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length || apiHasMore;
  const featured = sermons[0];

  function playSermon(sermon: Sermon, mode?: "video" | "audio") {
    const m = mode ?? mediaMode;
    play({
      id: sermon.id,
      title: sermon.title,
      subtitle: sermon.preacher,
      videoId: sermon.videoId,
      thumbnail: sermon.thumbnail,
      thumbnailHigh: sermon.thumbnailHigh,
      mode: m,
    });
  }

  function resetFilters() {
    setSearch("");
    setActiveCategory("All");
    setActiveYear("All");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <>
      <section className="page-hero-xl hero-sermons" style={heroStyle}>
        <div className="container">
          <div className="hero-tag hero-animate hero-animate-delay-1">
            <Mic size={14} /> Listen & Learn
          </div>
          <h1 className="hero-animate hero-animate-delay-2">Sermons</h1>
          <p className="hero-animate hero-animate-delay-3">
            Watch or listen to powerful messages from Christ's Heart Ministries.
            Search and stream sermons to grow in faith and deepen your walk with God.
          </p>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Featured Sermon */}
      {featured && !loading && (
        <section id="latest" className="section" style={{ background: "var(--bg-alt)" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <div className="section-header">
              <span className="section-label">Latest Message</span>
              <h2>Most Recent Sermon</h2>
            </div>
            <div className="sermon-featured">
              <div className="sermon-featured-visual">
                {currentItem?.id === featured.id && currentItem.mode === "audio" ? (
                  <div className="song-now-playing-overlay" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
                    <div className="song-audio-bars">
                      <span /><span /><span /><span />
                    </div>
                    <span className="song-now-playing-label">Now Playing</span>
                  </div>
                ) : null}
                <img src={featured.thumbnailHigh || featured.thumbnail} alt={featured.title} width={480} height={360} />
                <button
                  className="sermon-featured-play"
                  onClick={() => playSermon(featured)}
                  aria-label="Play sermon"
                >
                  <Play size={32} />
                </button>
              </div>
              <div className="sermon-featured-content">
                <span className="badge badge-gold">Latest</span>
                <h3>{featured.title}</h3>
                <p className="sermon-featured-meta-row">
                  <span>{getCategory(featured.title)}</span>
                  <span className="sermon-meta-dot">&middot;</span>
                  <span>{formatDate(featured.date)}</span>
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <button
                    className="btn btn-gold"
                    style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem", width: "fit-content" }}
                    onClick={() => playSermon(featured, "video")}
                  >
                    {currentItem?.id === featured.id && currentItem.mode === "video" ? (
                      <><Video size={16} /> Playing Video</>
                    ) : (
                      <><Video size={16} /> Watch Now</>
                    )}
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem", width: "fit-content" }}
                    onClick={() => playSermon(featured, "audio")}
                  >
                    {currentItem?.id === featured.id && currentItem.mode === "audio" ? (
                      <><Headphones size={16} /> Playing Audio</>
                    ) : (
                      <><Headphones size={16} /> Listen</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Sermons */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Library</span>
            <h2>All Sermons</h2>
            {!loading && <p>{sermons.length} sermons from Christ's Heart TV</p>}
          </div>

          {/* ── Row 1: Search + Video/Audio segmented ── */}
          <div className="sermons-toolbar">
            <div className="sermons-search-wrap">
              <Search size={17} className="sermons-search-icon" />
              <input
                type="text"
                placeholder="Search sermons by title..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
                className="sermons-search-input"
                aria-label="Search sermons"
              />
              {search && (
                <button className="sermons-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Segmented video/audio */}
            <div className="sermons-mode-seg" role="group" aria-label="Media mode">
              <button
                className={`sermons-mode-seg-btn${mediaMode === "video" ? " active" : ""}`}
                onClick={() => setMediaMode("video")}
                aria-pressed={mediaMode === "video"}
              >
                <Video size={14} /> Video
              </button>
              <button
                className={`sermons-mode-seg-btn${mediaMode === "audio" ? " active" : ""}`}
                onClick={() => setMediaMode("audio")}
                aria-pressed={mediaMode === "audio"}
              >
                <Headphones size={14} /> Audio
              </button>
            </div>
          </div>

          {/* ── Row 2: Category + Year filter pills ── */}
          {!loading && sermons.length > 0 && (
            <div className="sermons-filters">
              <div className="sermons-filter-pills">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`sermons-pill${activeCategory === cat ? " active" : ""}`}
                    onClick={() => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {years.length > 1 && (
                <div className="sermons-filter-pills">
                  <button
                    className={`sermons-pill${activeYear === "All" ? " active" : ""}`}
                    onClick={() => { setActiveYear("All"); setVisibleCount(PAGE_SIZE); }}
                  >
                    All Years
                  </button>
                  {years.map((yr) => (
                    <button
                      key={yr}
                      className={`sermons-pill${activeYear === yr ? " active" : ""}`}
                      onClick={() => { setActiveYear(yr); setVisibleCount(PAGE_SIZE); }}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="sermons-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="sermon-card">
                  <div className="skeleton" style={{ aspectRatio: "16/9", borderRadius: "var(--radius-lg)" }} />
                  <div style={{ padding: "0.85rem 0.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" style={{ width: "65%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
              <Video size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
              <p>Unable to load sermons from YouTube.</p>
              <a
                href="https://www.youtube.com/@ChristsHeart"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: "1.5rem" }}
              >
                <ExternalLink size={16} /> Watch on YouTube
              </a>
            </div>
          )}

          {/* Sermon Grid */}
          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
                  <Search size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                  <p>No sermons found.</p>
                  <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={resetFilters}>
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="sermons-grid">
                  {displayedSermons.map((sermon) => {
                    const isPlaying = currentItem?.id === sermon.id;
                    const isAudioPlaying = isPlaying && currentItem?.mode === "audio";
                    const duration = (sermon as unknown as Record<string, unknown>).duration as string | undefined;

                    return (
                      <div
                        key={sermon.id}
                        className={`sermon-card${isPlaying ? " sermon-card--playing" : ""}`}
                      >
                        <div
                          className="sermon-thumb-wrap"
                          onClick={() => playSermon(sermon)}
                          role="button"
                          tabIndex={0}
                          aria-label={isPlaying ? `Now playing: ${sermon.title}` : `Play: ${sermon.title}`}
                          onKeyDown={(e) => e.key === "Enter" && playSermon(sermon)}
                        >
                          <img
                            src={sermon.thumbnail}
                            alt={sermon.title}
                            loading="lazy"
                            width={320}
                            height={180}
                            decoding="async"
                          />
                          {duration && !isAudioPlaying && (
                            <span className="sermon-duration">&#9201; {duration}</span>
                          )}
                          {isAudioPlaying ? (
                            <div className="song-now-playing-overlay">
                              <div className="song-audio-bars">
                                <span /><span /><span /><span />
                              </div>
                              <span className="song-now-playing-label">Now Playing</span>
                            </div>
                          ) : (
                            <div className="sermon-hover-overlay">
                              <div className="sermon-play-circle">
                                {mediaMode === "audio" ? <Headphones size={20} /> : <Play size={20} />}
                              </div>
                              <span className="sermon-watch-label">
                                {mediaMode === "audio" ? "Listen Now" : "Watch Now"}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card metadata */}
                        <div className="sermon-card-meta">
                          <h3 className="sermon-card-title">{sermon.title}</h3>
                          <div className="sermon-card-info">
                            <span className="sermon-card-category">{getCategory(sermon.title)}</span>
                            <span className="sermon-meta-dot">&middot;</span>
                            <span className="sermon-card-date">{formatDate(sermon.date)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {filtered.length > 0 && (
                <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-light)", marginBottom: "1rem" }}>
                    Showing {displayedSermons.length} of {filtered.length}{apiHasMore ? "+" : ""} sermons
                  </p>
                  {hasMore && (
                    <button
                      className="btn btn-primary"
                      disabled={loadingMore}
                      onClick={() => {
                        setVisibleCount((p) => p + PAGE_SIZE);
                        if (visibleCount + PAGE_SIZE >= filtered.length && apiHasMore) {
                          loadMore();
                        }
                      }}
                    >
                      <ChevronDown size={16} /> {loadingMore ? "Loading..." : "Show More"}
                    </button>
                  )}
                </div>
              )}

              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <a
                  href="https://www.youtube.com/@ChristsHeart"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-black"
                >
                  <ExternalLink size={16} /> View All on YouTube
                </a>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
