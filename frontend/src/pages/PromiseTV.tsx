import { useState, useMemo } from "react";
import { Search, Play, X, ChevronDown, Tv, Calendar } from "lucide-react";
import { usePromiseTVVideos } from "../hooks/usePromiseTVVideos";
import type { TVEpisode } from "../types";

const PAGE_SIZE = 15;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function PromiseTV() {
  const { episodes, loading, loadMore, hasMore: apiHasMore, loadingMore } = usePromiseTVVideos();
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [inlineVideoId, setInlineVideoId] = useState<string | null>(null);

  const featured = episodes[0];

  const filtered = useMemo(() =>
    episodes.slice(1).filter((ep) => {
      if (!search) return true;
      return ep.title.toLowerCase().includes(search.toLowerCase()) ||
        ep.description.toLowerCase().includes(search.toLowerCase());
    }), [episodes, search]);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length || apiHasMore;

  function playEpisode(ep: TVEpisode) {
    setInlineVideoId(ep.videoId);
  }

  return (
    <>
      <section className="page-hero-xl hero-promise-tv">
        <div className="container">
          <div className="hero-tag hero-animate hero-animate-delay-1">
            <Tv size={14} /> Promise TV
          </div>
          <h1 className="hero-animate hero-animate-delay-2">The Vicar's Wife</h1>
          <p className="hero-animate hero-animate-delay-3">
            Life Behind The Pulpit — Watch every episode of The Vicar's Wife,
            our beloved Promise TV program featuring inspiring conversations with women in ministry.
          </p>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Featured Episode */}
      {featured && !loading && (
        <section className="section" style={{ background: "var(--bg-alt)" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <div className="section-header">
              <span className="section-label">Latest Episode</span>
              <h2>Most Recent Episode</h2>
            </div>
            <div className="sermon-featured">
              <div className="sermon-featured-visual">
                {inlineVideoId === featured.videoId ? (
                  <>
                    <iframe
                      src={`https://www.youtube.com/embed/${featured.videoId}?autoplay=1`}
                      title={featured.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", borderRadius: "inherit" }}
                    />
                    <button
                      className="sermon-inline-close"
                      onClick={() => setInlineVideoId(null)}
                      aria-label="Close video"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <img src={featured.thumbnailHigh || featured.thumbnail} alt={featured.title} width={480} height={360} />
                    <button
                      className="sermon-featured-play"
                      onClick={() => playEpisode(featured)}
                      aria-label="Play episode"
                    >
                      <Play size={32} />
                    </button>
                  </>
                )}
              </div>
              <div className="sermon-featured-content">
                <span className="badge badge-gold">Latest</span>
                <h3>{featured.title}</h3>
                <p className="sermon-featured-meta-row">
                  <span>The Vicar's Wife</span>
                  <span className="sermon-meta-dot">&middot;</span>
                  <span>{formatDate(featured.date)}</span>
                </p>
                <button
                  className="btn btn-gold"
                  style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem", width: "fit-content" }}
                  onClick={() => playEpisode(featured)}
                >
                  {inlineVideoId === featured.videoId ? (
                    <><Play size={16} /> Playing</>
                  ) : (
                    <><Play size={16} /> Watch Now</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Episodes */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Library</span>
            <h2>All Episodes</h2>
            {!loading && <p>{filtered.length} more episodes from Promise TV</p>}
          </div>

          {/* Search bar */}
          <div className="sermons-toolbar">
            <div className="sermons-search-wrap">
              <Search size={17} className="sermons-search-icon" />
              <input
                type="text"
                placeholder="Search episodes by title..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
                className="sermons-search-input"
                aria-label="Search episodes"
              />
              {search && (
                <button className="sermons-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

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

          {/* Episode Grid */}
          {!loading && (
            <>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
                  <Search size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                  <p>No episodes found.</p>
                  <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={() => { setSearch(""); setVisibleCount(PAGE_SIZE); }}>
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="sermons-grid">
                  {displayed.map((ep) => {
                    const isVideoInline = inlineVideoId === ep.videoId;

                    return (
                      <div
                        key={ep.id}
                        className={`sermon-card${isVideoInline ? " sermon-card--playing" : ""}`}
                      >
                        {isVideoInline ? (
                          <div className="sermon-thumb-wrap">
                            <iframe
                              src={`https://www.youtube.com/embed/${ep.videoId}?autoplay=1`}
                              title={ep.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                            />
                            <button
                              className="sermon-inline-close"
                              onClick={(e) => { e.stopPropagation(); setInlineVideoId(null); }}
                              aria-label="Close video"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div
                            className="sermon-thumb-wrap"
                            onClick={() => playEpisode(ep)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Play: ${ep.title}`}
                            onKeyDown={(e) => e.key === "Enter" && playEpisode(ep)}
                          >
                            <img
                              src={ep.thumbnail}
                              alt={ep.title}
                              loading="lazy"
                              width={320}
                              height={180}
                              decoding="async"
                            />
                            <div className="sermon-hover-overlay">
                              <div className="sermon-play-circle">
                                <Play size={20} />
                              </div>
                              <span className="sermon-watch-label">Watch Now</span>
                            </div>
                          </div>
                        )}

                        <div className="sermon-card-meta">
                          <h3 className="sermon-card-title">{ep.title}</h3>
                          <div className="sermon-card-info">
                            <span className="sermon-card-category">The Vicar's Wife</span>
                            <span className="sermon-meta-dot">&middot;</span>
                            <span className="sermon-card-date">
                              <Calendar size={11} /> {formatDate(ep.date)}
                            </span>
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
                    Showing {displayed.length} of {filtered.length} episodes
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

            </>
          )}
        </div>
      </section>
    </>
  );
}
