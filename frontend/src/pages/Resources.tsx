import { useState } from "react";
import { BookOpen, ExternalLink, Play, X, Music, ChevronDown, Search, Video, Headphones, ShoppingCart, Sparkles } from "lucide-react";
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
    url: "https://www.youtube.com/@ChristsHeart",
    desc: "Full sermons, conferences, and teachings on our YouTube channel",
    color: "var(--gold-600)",
  },
  {
    label: "ChristHeart",
    url: "https://www.tiktok.com/@christsheartmin",
    desc: "Daily live services, prophetic clips, and ministry highlights on TikTok",
    color: "#00f2ea",
  },
  {
    label: "ChristHeart Radio",
    url: "https://www.christsheart.org/radio",
    desc: "Listen to anointed teachings, worship, and prophetic broadcasts anytime",
    color: "#ef4444",
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
  const mediaLinks = sanityMedia.length > 0
    ? [
        ...sanityMedia.map((s) => {
          const override = fallbackMedia.find((fb) => fb.label === s.label);
          return override ?? s;
        }),
        ...fallbackMedia.filter((fb) => !sanityMedia.some((s) => s.label === fb.label)),
      ]
    : fallbackMedia;

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
      <section className="section" id="books">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Publications</span>
            <h2>Books by Apostle Isaiah Mbuga</h2>
            <p>Transformative teaching in written form — for your growth and the growth of those you lead</p>
          </div>

          <div className="resource-grid animate-on-scroll" ref={booksRef}>
            {resources.map((res, idx) => (
              <div key={res.id} className={`resource-card${idx === 0 ? " resource-card--featured" : ""}`}>
                <div className="resource-card-image">
                  <div className="resource-book-cover">
                    <img src={res.image} alt={res.title} loading="lazy" />
                    <div className="resource-book-spine" aria-hidden="true" />
                  </div>
                  <div className="resource-type-badge resource-type-badge--book">
                    <Sparkles size={9} /> Limited Edition
                  </div>
                </div>
                <div className="resource-card-body">
                  <div className="resource-card-eyebrow">
                    <BookOpen size={11} />
                    <span>Book</span>
                  </div>
                  <h3 className="resource-card-title">{res.title}</h3>
                  <p className="resource-card-author">{res.author}</p>
                  <p className="resource-card-desc">
                    {res.description.slice(0, idx === 0 ? 220 : 130)}{res.description.length > (idx === 0 ? 220 : 130) ? "\u2026" : ""}
                  </p>
                  <div className="resource-card-footer">
                    <p className="resource-card-price">{formatPrice(res.price)}</p>
                    <button
                      onClick={() => handleOrder(res.title)}
                      className="resource-order-btn"
                      aria-label={`Order ${res.title}`}
                    >
                      <ShoppingCart size={15} />
                      <span>Order Now</span>
                    </button>
                  </div>
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
                          onClick={() => song.videoId && play({ ...song, subtitle: song.artist, mode: "video" })}
                          role="button"
                          tabIndex={0}
                          aria-label={isPlaying ? `Now playing: ${song.title}` : `Watch: ${song.title}`}
                          onKeyDown={(e) =>
                            e.key === "Enter" && song.videoId && play({ ...song, subtitle: song.artist, mode: "video" })
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
                              <span className="song-watch-label">Watch</span>
                            </div>
                          )}
                        </div>

                        {/* Card meta + Watch/Listen buttons */}
                        <div className="song-card-meta">
                          <h3 className="song-card-title">{song.title}</h3>
                          <div className="song-card-info">
                            <span className="song-card-artist">{song.artist}</span>
                            <span className="song-meta-dot">&middot;</span>
                            <span className="song-card-date">{formatDate(song.date)}</span>
                          </div>
                          <div className="song-card-actions">
                            <button
                              className={`song-action-btn song-action-btn--watch${isPlaying && currentItem?.mode === "video" ? " active" : ""}`}
                              onClick={() => song.videoId && play({ ...song, subtitle: song.artist, mode: "video" })}
                            >
                              <Video size={13} /> Watch
                            </button>
                            <button
                              className={`song-action-btn song-action-btn--listen${isPlaying && currentItem?.mode === "audio" ? " active" : ""}`}
                              onClick={() => song.videoId && play({ ...song, subtitle: song.artist, mode: "audio" })}
                            >
                              <Headphones size={13} /> Listen
                            </button>
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

              <div className="music-streaming-links">
                <p className="music-streaming-label">Stream on your favourite platform</p>
                <div className="music-streaming-row">
                  <a
                    href="https://open.spotify.com/artist/4oC0pn2hCH4V3sYlUTnjCS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="music-streaming-btn music-streaming-btn--spotify"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                    Spotify
                  </a>
                  <a
                    href="https://music.apple.com/us/artist/isaiah-mbuga/1455661602"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="music-streaming-btn music-streaming-btn--apple"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0 0 19.2.04a10.151 10.151 0 0 0-1.86-.04H6.66C6 0 5.34.028 4.68.084c-.84.07-1.59.3-2.28.72C1.23 1.504.54 2.464.24 3.754A9.596 9.596 0 0 0 0 5.964v12.072c.01.68.04 1.36.12 2.04.134.9.434 1.74.964 2.46.69.96 1.62 1.59 2.76 1.87.6.15 1.2.22 1.82.24.68.04 1.36.04 2.04.04h10.56c.68 0 1.36-.01 2.04-.06a6.428 6.428 0 0 0 2.46-.72c.96-.56 1.68-1.36 2.12-2.4.3-.72.46-1.48.52-2.26.04-.5.06-1 .06-1.5V6.124zm-6.474 9.8c-.18.36-.42.66-.72.9-.36.3-.78.48-1.26.54-.36.04-.72.02-1.08-.08-.3-.08-.56-.22-.8-.42a2.138 2.138 0 0 1-.66-1.08 2.61 2.61 0 0 1 .06-1.5c.16-.46.46-.84.86-1.1.36-.24.78-.36 1.2-.42.42-.04.84-.02 1.26.06V11.4c0-.16-.02-.32-.06-.48a.792.792 0 0 0-.56-.58c-.16-.06-.34-.08-.52-.06-.3.02-.54.16-.72.4-.1.14-.16.3-.18.48h-2.1c.02-.36.12-.7.3-1 .3-.52.74-.88 1.28-1.08.5-.18 1.02-.24 1.56-.2.44.04.86.12 1.26.3.56.24.94.64 1.14 1.22.1.3.16.62.16.94v4.24c0 .26-.02.52-.08.78-.06.24-.14.48-.26.7zm-7.56-.08c-.18.36-.42.66-.72.9-.36.3-.78.48-1.26.54-.36.04-.72.02-1.08-.08-.3-.08-.56-.22-.8-.42a2.138 2.138 0 0 1-.66-1.08c-.12-.48-.12-.98.06-1.5.16-.46.46-.84.86-1.1.36-.24.78-.36 1.2-.42.42-.04.84-.02 1.26.06V11.4c0-.16-.02-.32-.06-.48a.792.792 0 0 0-.56-.58c-.16-.06-.34-.08-.52-.06-.3.02-.54.16-.72.4-.1.14-.16.3-.18.48H7.62c.02-.36.12-.7.3-1 .3-.52.74-.88 1.28-1.08.5-.18 1.02-.24 1.56-.2.44.04.86.12 1.26.3.56.24.94.64 1.14 1.22.1.3.16.62.16.94v4.24c0 .26-.02.52-.08.78-.06.24-.14.48-.26.7zM12 5.6c-.32 0-.62-.04-.88-.2-.34-.2-.54-.5-.6-.88a4.852 4.852 0 0 1 .38-2.86c.32-.66.78-1.18 1.38-1.58.18-.12.38-.22.58-.3-.04.32-.04.62-.12.92a4.78 4.78 0 0 1-1.1 2.08c-.2.24-.32.5-.32.82 0 .24.08.46.24.64.2.22.44.34.72.36.04.02.08.02.12.02-.12.04-.26.06-.4.06z"/></svg>
                    Apple Music
                  </a>
                  <a
                    href="https://music.youtube.com/channel/UC8YCTJBNTxHVdSi7QROeedQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="music-streaming-btn music-streaming-btn--ytmusic"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228 18.228 15.432 18.228 12 15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/></svg>
                    YouTube Music
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Media channel links */}
      <section className="section" id="media">
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
