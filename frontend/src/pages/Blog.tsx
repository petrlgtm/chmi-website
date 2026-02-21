import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Tag, ArrowRight, Rss, Search } from "lucide-react";
import { categories } from "../data/blogPosts";
import { useSanityBlogPosts } from "../hooks/useSanityBlogPosts";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Blog() {
  const { data: posts } = useSanityBlogPosts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const featuredRef = useScrollAnimation<HTMLDivElement>();
  const gridRef = useScrollAnimation<HTMLDivElement>();

  const filtered = posts.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const showFeatured = category === "All" && !search && filtered.length > 0;
  const gridPosts = showFeatured ? filtered.slice(1) : filtered;

  return (
    <>
      <section className="page-hero-xl hero-blog">
        <div className="container">
          <div className="hero-tag hero-animate hero-animate-delay-1">
            <Rss size={14} /> The Written Word
          </div>
          <h1 className="hero-animate hero-animate-delay-2">Blog &amp; Insights</h1>
          <p className="hero-animate hero-animate-delay-3">
            Teachings, testimonies, event recaps, and ministry updates from
            Christ's Heart Ministries International.
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

          {/* Search + Category filter */}
          <div className="blog-filter-bar">
            <div className="blog-search-wrap">
              <Search size={16} className="blog-search-icon" />
              <input
                type="text"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="blog-search-input"
              />
            </div>
            <div className="branch-filter-chips blog-filter-chips">
              {categories.map((cat) => (
                <button key={cat} className={`branch-chip ${category === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured post */}
          {showFeatured && (
            <div className="animate-on-scroll" ref={featuredRef}>
              <Link to={`/blog/${filtered[0].id}`} className="blog-featured-link">
                <div className="blog-featured blog-featured-spaced">
                  <div className="blog-featured-image">
                    <img src={filtered[0].image} alt={filtered[0].title} />
                  </div>
                  <div className="blog-featured-body">
                    <div className="blog-featured-badges">
                      <span className="badge badge-purple"><Tag size={11} /> {filtered[0].category}</span>
                      <span className="badge badge-dark"><Calendar size={11} /> {filtered[0].date}</span>
                    </div>
                    <h2 className="blog-featured-title">{filtered[0].title}</h2>
                    <p className="blog-featured-excerpt">
                      {filtered[0].excerpt.slice(0, 200)}…
                    </p>
                    <div className="blog-featured-meta">
                      <span className="blog-featured-author">
                        <User size={14} /> {filtered[0].author}
                      </span>
                      <span className="blog-featured-readtime">
                        {filtered[0].readTime}
                      </span>
                    </div>
                    <span className="btn btn-primary blog-read-more-btn">
                      Read More <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Posts grid */}
          <div className="blog-grid animate-on-scroll" ref={gridRef}>
            {gridPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="blog-card-link">
                <article className="blog-card">
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-badges">
                      <span className="badge badge-purple blog-card-badge-sm"><Tag size={10} /> {post.category}</span>
                      <span className="blog-card-date">
                        <Calendar size={11} /> {post.date}
                      </span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">
                      {post.excerpt.slice(0, 120)}…
                    </p>
                    <div className="blog-card-footer">
                      <span className="blog-card-author">
                        <User size={11} /> {post.author}
                      </span>
                      <span className="blog-card-readtime">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="blog-empty">
              <Rss size={48} />
              <p>No posts found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
