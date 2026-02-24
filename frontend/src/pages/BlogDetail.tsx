import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Clock, ArrowRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useSanityBlogPosts, useSanityBlogPost } from "../hooks/useSanityBlogPosts";
import { portableTextComponents } from "../lib/portableTextComponents";
import { ALL_IMAGES } from "../utils/imageFallbacks";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: posts } = useSanityBlogPosts();
  const { post: sanityPost } = useSanityBlogPost(id || "");
  const post = posts.find((p) => p.id === id);
  const postIndex = posts.findIndex((p) => p.id === id);
  const nextPost = postIndex >= 0 && postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;

  if (!post) {
    return (
      <section className="section" style={{ paddingTop: "8rem", textAlign: "center" }}>
        <div className="container">
          <h2>Post Not Found</h2>
          <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog" className="btn btn-primary" style={{ marginTop: "2rem" }}>
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero-xl hero-about">
        <div className="container">
          <div className="breadcrumb hero-animate hero-animate-delay-1">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/blog">Blog</Link>
            <span className="breadcrumb-sep">/</span>
            <span style={{ color: "var(--gold-400)" }}>{post.category}</span>
          </div>
          <h1 className="hero-animate hero-animate-delay-2">{post.title}</h1>
          <div className="blog-detail-hero-meta hero-animate hero-animate-delay-3">
            <span><User size={15} /> {post.author}</span>
            <span><Calendar size={15} /> {post.date}</span>
            <span><Clock size={15} /> {post.readTime}</span>
          </div>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          {/* Featured image */}
          <div className="blog-detail-image">
            <img src={post.image || ALL_IMAGES[0]} alt={post.title} />
            <div className="blog-detail-image-overlay" />
            <span className="badge badge-purple blog-detail-category">
              <Tag size={11} /> {post.category}
            </span>
          </div>

          {/* Article body */}
          <article className="blog-detail-body">
            {sanityPost?.content ? (
              <PortableText value={sanityPost.content} components={portableTextComponents} />
            ) : (
              post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return <h3 key={i} className="blog-detail-subheading">{paragraph.replace(/\*\*/g, "")}</h3>;
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={i} className="blog-detail-list">
                      {paragraph.split("\n").map((line, j) => (
                        <li key={j}>{line.replace(/^- \*\*/, "").replace(/\*\*/, ": ").replace(/\*\*/g, "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith("*") && paragraph.endsWith("*") && !paragraph.startsWith("**")) {
                  return <p key={i} className="blog-detail-italic">{paragraph.replace(/^\*/, "").replace(/\*$/, "")}</p>;
                }
                const html = paragraph
                  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\*(.+?)\*/g, "<em>$1</em>");
                return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
              })
            )}
          </article>

          {/* Author card */}
          <div className="blog-detail-author-card">
            <div className="blog-detail-author-avatar">
              <User size={24} />
            </div>
            <div>
              <p className="blog-detail-author-name">{post.author}</p>
              <p className="blog-detail-author-role">Christ's Heart Ministries International</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="blog-detail-nav">
            {prevPost ? (
              <Link to={`/blog/${prevPost.id}`} className="blog-detail-nav-link blog-detail-nav-prev">
                <ArrowLeft size={16} />
                <div>
                  <span className="blog-detail-nav-label">Previous</span>
                  <span className="blog-detail-nav-title">{prevPost.title}</span>
                </div>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link to={`/blog/${nextPost.id}`} className="blog-detail-nav-link blog-detail-nav-next">
                <div>
                  <span className="blog-detail-nav-label">Next</span>
                  <span className="blog-detail-nav-title">{nextPost.title}</span>
                </div>
                <ArrowRight size={16} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </>
  );
}
