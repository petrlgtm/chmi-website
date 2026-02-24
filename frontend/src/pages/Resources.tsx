import { useState } from "react";
import { BookOpen, ExternalLink, Play, X, Music, ChevronDown, Search } from "lucide-react";
import { ALL_IMAGES, APOSTLE_ISAIAH } from "../utils/imageFallbacks";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useHeroStyle } from "../context/SiteImagesContext";
import { useSanityResources } from "../hooks/useSanityResources";
import { useYouTubeSongs } from "../hooks/useYouTubeSongs";
import { usePlayer } from "../hooks/usePlayer";
import type { ResourceItem, MediaChannel } from "../hooks/useSanityResources";

const CHURCH_EMAIL = "info@christsheart.org";

const SONGS_PAGE_SIZE = 8;

const fallbackResources: ResourceItem[] = [
  {
    id: "beneath-the-surface",
    title: "Beneath the Surface",
    author: "Apostle Isaiah Mbuga",
    description: "A revealing look beyond what the eye can see. Apostle Isaiah digs into the hidden dimensions of spiritual life, uncovering the layers beneath our walk with God that determine true fruitfulness, character, and lasting impact in the Kingdom.",
    image: APOSTLE_ISAIAH.preaching,
    price: 20000,
  },
  {
    id: "rite-of-passage",
    title: "Rite of Passage",
    author: "Apostle Isaiah Mbuga",
    description: "Every believer must pass through seasons of transition that shape their destiny. This book unpacks the spiritual rites of passage that mark a believer\u2019s growth \u2014 from salvation to maturity, from following to leading, from promise to fulfilment.",
    image: ALL_IMAGES[4],
    price: 20000,
  },
  {
    id: "leveraging-the-generation",
    title: "Leveraging the Generation",
    author: "Apostle Isaiah Mbuga",
    description: "A timely call to the church to intentionally invest in the next generation. Apostle Isaiah presents a compelling case for why the church must empower, equip, and release young people into their God-given assignments before the window of opportunity closes.",
    image: ALL_IMAGES[8],
    price: 20000,
  },
  {
    id: "be-a-man",
    title: "Be a Man",
    author: "Apostle Isaiah Mbuga",
    description: "A bold and unapologetic call to biblical manhood. In a generation confused about masculinity, Apostle Isaiah lays out God\u2019s original design for the man \u2014 as priest, provider, protector, and prophet in the home, the church, and the marketplace.",
    image: ALL_IMAGES[3],
    price: 70000,
  },
  {
    id: "unforgotten-ministry",
    title: "Unforgotten Ministry",
    author: "Apostle Isaiah Mbuga",
    description: "A powerful exploration of the ministries and callings that the modern church has neglected. Apostle Isaiah revisits forgotten biblical patterns of service, intercession, and sacrifice that are essential for the church to fulfil its mandate in this hour.",
    image: ALL_IMAGES[6],
    price: 70000,
  },
];

const fallbackMedia: MediaChannel[] = [
  {
    label: "PROMISE TV",
    url: "https://www.instagram.com/promisetv",
    desc: "Prophetic broadcast ministry \u2014 follow on Instagram for live streams and clips",
    color: "var(--primary)",
  },
  {
    label: "Christ\u2019s Heart TV",
    url: "https://www.youtube.com/@christshearttv",
    desc: "Full sermons, conferences, and teachings on our YouTube channel",
    color: "var(--gold-600)",
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Resources() {
  const heroStyle = useHeroStyle("heroResources");
  const booksRef = useScrollAnimation<HTMLDivElement>();
  const mediaRef = useScrollAnimation<HTMLDivElement>();
  const { resources: sanityResources, mediaChannels: sanityMedia } = useSanityResources();
  const { songs, loading: songsLoading, error: songsError, loadMore: loadMoreSongs, hasMore: songsApiHasMore, loadingMore: songsLoadingMore } = useYouTubeSongs();
  const songsRef = useScrollAnimation<HTMLDivElement>(0.15, !songsLoading && !songsError);
  const { currentItem, play } = usePlayer();

  const [songsSearch, setSongsSearch] = useState("");
  const [visibleSongs, setVisibleSongs] = useState(SONGS_PAGE_SIZE);

  const resources = sanityResources.length > 0 ? sanityResources : fallbackResources;
  const mediaLinks = sanityMedia.length > 0 ? sanityMedia : fallbackMedia;

  const filteredSongs = songs.filter(
    (s) =>
      !songsSearch ||
      s.title.toLowerCase().includes(songsSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(songsSearch.toLowerCase())
  );
  const displayedSongs = filteredSongs.slice(0, visibleSongs);
  const hasMoreSongs = visibleSongs < filteredSongs.length || songsApiHasMore;

  const formatPrice = (price: number) =>
    `UGX ${price.toLocaleString()}`;

  const handleOrder = (title: string) => {
    const subject = encodeURIComponent(`Book Order: ${title}`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to order the book "${title}" by Apostle Isaiah Mbuga.\n\nPlease let me know the available options for payment and delivery.\n\nThank you.`
    );
    window.location.href = `mailto:${CHURCH_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="page-hero-xl hero-resources" style={heroStyle}>
        <div className="container">
          <div className="hero-tag hero-animate hero-animate-delay-1">
            <BookOpen size={14} /> Resources
          </div>
          <h1 className="hero-animate hero-animate-delay-2">Books &amp; Media</h1>
          <p className="hero-animate hero-animate-delay-3">
            Grow deeper in faith with teachings, books, and resources from Apostle Isaiah Mbuga
            and the Christ's Heart Ministries family.
          </p>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Books */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Publications</span>
            <h2>Books by Apostle Isaiah Mbuga</h2>
            <p>Transformative teaching in written form — for your growth and the growth of those you lead</p>
          </div>

          <div className="resource-grid animate-on-scroll" ref={booksRef}>
            {resources.map((res) => (
              <div key={res.id} className="resource-card">
                <div className="resource-card-image">
                  <img src={res.image} alt={res.title} loading="lazy" />
                  <div className="resource-type-badge resource-type-badge--book">
                    <BookOpen size={10} /> Book
                  </div>
                </div>
                <div className="resource-card-body">
                  <h3 className="resource-card-title">{res.title}</h3>
                  <p className="resource-card-author">{res.author}</p>
                  <p className="resource-card-desc">
                    {res.description.slice(0, 150)}{res.description.length > 150 ? "\u2026" : ""}
                  </p>
                  <p className="resource-card-price">{formatPrice(res.price)}</p>
                  <button onClick={() => handleOrder(res.title)} className="btn btn-primary resource-download-btn">
                    <BookOpen size={14} /> Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Songs — Watch, Listen & Connect */}
      <section className="about-timeline-section songs-section" id="songs">
        <div className="container">
          <div className="section-header">
            <span className="section-label resources-media-label">Music</span>
            <h2 className="resources-media-heading">Watch, Listen &amp; Connect</h2>
            <p className="resources-media-desc">
              Stream gospel songs by Apostle Isaiah Mbuga — worship, praise, and prophetic music
            </p>
          </div>

          {/* Search bar */}
          {!songsLoading && songs.length > 0 && (
            <div className="songs-toolbar">
              <div className="songs-search-wrap">
                <Search size={17} className="songs-search-icon" />
                <input
                  type="text"
                  placeholder="Search songs..."
                  value={songsSearch}
                  onChange={(e) => {
                    setSongsSearch(e.target.value);
                    setVisibleSongs(SONGS_PAGE_SIZE);
                  }}
                  className="songs-search-input"
                  aria-label="Search songs"
                />
                {songsSearch && (
                  <button
                    className="songs-search-clear"
                    onClick={() => setSongsSearch("")}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <p className="songs-count">
                {songs.length} song{songs.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* Loading skeletons */}
          {songsLoading && (
            <div className="songs-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="song-card">
                  <div
                    className="skeleton"
                    style={{ aspectRatio: "16/9", borderRadius: "var(--radius-lg)" }}
                  />
                  <div
                    style={{
                      padding: "0.85rem 0.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" style={{ width: "65%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {songsError && (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
              <Music size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
              <p>Unable to load songs from YouTube.</p>
              <a
                href="https://www.youtube.com/channel/UC8YCTJBNTxHVdSi7QROeedQ"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: "1.5rem" }}
              >
                <ExternalLink size={16} /> Listen on YouTube
              </a>
            </div>
          )}

          {/* Songs grid */}
          {!songsLoading && !songsError && (
            <div className="animate-on-scroll" ref={songsRef}>
              {filteredSongs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
                  <Search size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                  <p>No songs found.</p>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: "1rem" }}
                    onClick={() => {
                      setSongsSearch("");
                      setVisibleSongs(SONGS_PAGE_SIZE);
                    }}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="songs-grid">
                  {displayedSongs.map((song) => {
                    const isPlaying = currentItem?.id === song.id;

                    return (
                      <div
                        key={song.id}
                        className={`song-card${isPlaying ? " song-card--playing" : ""}`}
                      >
                        {/* Thumbnail */}
                        <div
                          className="song-thumb-wrap"
                          onClick={() => song.videoId && play({ ...song, subtitle: song.artist })}
                          role="button"
                          tabIndex={0}
                          aria-label={isPlaying ? `Now playing: ${song.title}` : `Play: ${song.title}`}
                          onKeyDown={(e) =>
                            e.key === "Enter" && song.videoId && play({ ...song, subtitle: song.artist })
                          }
                        >
                          <img
                            src={song.thumbnail}
                            alt={song.title}
                            loading="lazy"
                            width={320}
                            height={180}
                            decoding="async"
                          />
                          {isPlaying ? (
                            <div className="song-now-playing-overlay">
                              <div className="song-audio-bars">
                                <span /><span /><span /><span />
                              </div>
                              <span className="song-now-playing-label">Now Playing</span>
                            </div>
                          ) : (
                            <div className="song-hover-overlay">
                              <div className="song-play-circle">
                                <Play size={20} />
                              </div>
                              <span className="song-watch-label">Play</span>
                            </div>
                          )}
                        </div>

                        {/* Card meta */}
                        <div className="song-card-meta">
                          <h3 className="song-card-title">{song.title}</h3>
                          <div className="song-card-info">
                            <span className="song-card-artist">{song.artist}</span>
                            <span className="song-meta-dot">&middot;</span>
                            <span className="song-card-date">{formatDate(song.date)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {filteredSongs.length > 0 && (
                <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-light)",
                      marginBottom: "1rem",
                    }}
                  >
                    Showing {displayedSongs.length} of {filteredSongs.length}{songsApiHasMore ? "+" : ""} songs
                  </p>
                  {hasMoreSongs && (
                    <button
                      className="btn btn-primary"
                      disabled={songsLoadingMore}
                      onClick={() => {
                        setVisibleSongs((p) => p + SONGS_PAGE_SIZE);
                        if (visibleSongs + SONGS_PAGE_SIZE >= filteredSongs.length && songsApiHasMore) {
                          loadMoreSongs();
                        }
                      }}
                    >
                      <ChevronDown size={16} /> {songsLoadingMore ? "Loading..." : "Show More"}
                    </button>
                  )}
                </div>
              )}

              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <a
                  href="https://www.youtube.com/channel/UC8YCTJBNTxHVdSi7QROeedQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-black"
                >
                  <ExternalLink size={16} /> View All on YouTube
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Media channel links */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Channels</span>
            <h2>Our Media Channels</h2>
            <p>Follow us across platforms for sermons, teachings, and prophetic broadcasts</p>
          </div>
          <div className="media-channel-grid animate-on-scroll" ref={mediaRef}>
            {mediaLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="media-channel-card"
              >
                <div className="media-channel-header">
                  <div className="media-channel-icon" style={{ background: link.color }}>
                    <ExternalLink size={18} />
                  </div>
                  <h4 className="media-channel-title">{link.label}</h4>
                </div>
                <p className="media-channel-desc">{link.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
