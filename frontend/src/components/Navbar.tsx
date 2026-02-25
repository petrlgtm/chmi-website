import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Home, MapPin, Calendar, Users, BookOpen, Mail, Heart, ChevronRight, Rss, Library, Sun, Moon } from "lucide-react";
import logo01 from "../../../logos/CHMI Logos-01.png";
import { APOSTLE_ISAIAH } from "../utils/imageFallbacks";
import { events } from "../data/events";
import { getUpcomingEvents } from "../utils/eventDate";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const location = useLocation();

  // Apply / remove dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 80 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const [eventsExpanded, setEventsExpanded] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [resourcesExpanded, setResourcesExpanded] = useState(false);
  const isActive = (path: string) => location.pathname === path;
  const nearbyEvents = getUpcomingEvents(events).slice(0, 4);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/branches", label: "Branches", icon: MapPin },
    { path: "/events", label: "Events", icon: Calendar, hasChildren: true },
    { path: "/about", label: "About", icon: Users, hasChildren: true },
    { path: "/sermons", label: "Sermons", icon: BookOpen },
    { path: "/resources", label: "Resources", icon: Library, hasChildren: true },
    { path: "/blog", label: "Blog", icon: Rss },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${hidden ? "navbar-hidden" : ""}`} aria-label="Main navigation">

        {/* ── Row 1: Logo | Nav links | Actions ── */}
        <div className="navbar-top">
          <div className="navbar-top-inner">

            <Link to="/" className="navbar-brand" aria-label="Christ's Heart Ministries - Home">
              <img src={logo01} alt="Christ's Heart logo" className="navbar-logo" />
            </Link>

            <div className="navbar-links">
              <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
              <Link to="/branches" className={isActive("/branches") ? "active" : ""}>Branches</Link>
              <div className="events-dropdown">
                <Link to="/events" className={location.pathname.startsWith("/events") ? "active" : ""}>
                  Events <ChevronDown size={14} />
                </Link>
                <div className="dropdown-menu">
                  {nearbyEvents.map((e) => (
                    <Link key={e.id} to={`/events/${e.id}`}>{e.name}</Link>
                  ))}
                  <Link to="/events" className="dropdown-view-all">View All Events</Link>
                </div>
              </div>
              <div className="events-dropdown">
                <Link to="/about" className={location.pathname.startsWith("/about") ? "active" : ""}>
                  About <ChevronDown size={14} />
                </Link>
                <div className="dropdown-menu">
                  <Link to="/about#mission-vision">Mission &amp; Vision</Link>
                  <Link to="/about#statement-of-faith">Statement of Faith</Link>
                  <Link to="/about" className="dropdown-view-all">Full About Page</Link>
                </div>
              </div>
              <Link to="/sermons" className={isActive("/sermons") ? "active" : ""}>Sermons</Link>
              <div className="events-dropdown">
                <Link to="/resources" className={location.pathname.startsWith("/resources") ? "active" : ""}>
                  Resources <ChevronDown size={14} />
                </Link>
                <div className="dropdown-menu">
                  <Link to="/resources#books">Books</Link>
                  <Link to="/resources#songs">Songs</Link>
                  <Link to="/resources#media">Media</Link>
                </div>
              </div>
              <Link to="/blog" className={isActive("/blog") ? "active" : ""}>Blog</Link>
              <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
            </div>

            <div className="navbar-actions">
              <button
                className="navbar-icon-btn navbar-theme-toggle"
                onClick={() => setIsDark((d) => !d)}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Light mode" : "Dark mode"}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Row 2: Site name | Socials + Give ── */}
        <div className="navbar-bottom">
          <div className="navbar-bottom-inner">
            <span className="navbar-site-name">Christ's Heart Ministries International</span>
            <div className="navbar-socials">
              {/* Facebook */}
              <a href="https://facebook.com/christsheartmin" target="_blank" rel="noopener noreferrer" className="navbar-social-link" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/christsheartmin" target="_blank" rel="noopener noreferrer" className="navbar-social-link" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="https://x.com/christsheartmin" target="_blank" rel="noopener noreferrer" className="navbar-social-link" aria-label="X (Twitter)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@ChristsHeart" target="_blank" rel="noopener noreferrer" className="navbar-social-link" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@christsheartmin" target="_blank" rel="noopener noreferrer" className="navbar-social-link" aria-label="TikTok">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/></svg>
              </a>
              <Link to="/give" className="btn btn-gold navbar-give-btn">Give</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Split Panel Mobile Menu */}
      <div className={`mobile-menu-split ${mobileOpen ? "open" : ""}`} role="dialog" aria-label="Mobile navigation">
        {/* Left Panel - Branding (tap to close) */}
        <div className="mobile-panel-left" onClick={() => setMobileOpen(false)}>
          <img src={APOSTLE_ISAIAH.portrait} alt="" className="mobile-panel-portrait" aria-hidden="true" />
          <div className="mobile-brand-content">
            <p className="mobile-brand-tagline">Raising An Apostolic Generation</p>
          </div>
          <div className="mobile-brand-footer">
            <p className="mobile-brand-verse">"For where your treasure is, there your heart will be also."</p>
            <p className="mobile-brand-ref">— Matthew 6:21</p>
          </div>
        </div>

        {/* Right Panel - Navigation */}
        <div className="mobile-panel-right">
          <div className="mobile-panel-header">
            <img src={logo01} alt="Christ's Heart logo" className="mobile-header-logo" />
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <button
                className="navbar-icon-btn"
                onClick={() => setIsDark((d) => !d)}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
                <X size={22} />
              </button>
            </div>
          </div>

          <div className="mobile-nav-links">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = item.hasChildren
                ? location.pathname.startsWith(item.path)
                : isActive(item.path);

              return (
                <div key={item.path} className="mobile-nav-item" style={{ animationDelay: `${index * 0.04}s` }}>
                  {item.hasChildren && item.path === "/events" ? (
                    <>
                      <button
                        className={`mobile-nav-link mobile-nav-expandable ${active ? "active" : ""}`}
                        onClick={() => setEventsExpanded(!eventsExpanded)}
                      >
                        <Icon size={18} className="mobile-nav-icon" />
                        <span>{item.label}</span>
                        <ChevronRight size={16} className={`mobile-expand-arrow ${eventsExpanded ? "expanded" : ""}`} />
                      </button>
                      <div className={`mobile-subnav ${eventsExpanded ? "open" : ""}`}>
                        {nearbyEvents.map((e) => (
                          <Link key={e.id} to={`/events/${e.id}`} className="mobile-subnav-link">
                            {e.name}
                          </Link>
                        ))}
                        <Link to={item.path} className="mobile-subnav-link mobile-subnav-viewall">
                          View All Events
                        </Link>
                      </div>
                    </>
                  ) : item.hasChildren && item.path === "/about" ? (
                    <>
                      <button
                        className={`mobile-nav-link mobile-nav-expandable ${active ? "active" : ""}`}
                        onClick={() => setAboutExpanded(!aboutExpanded)}
                      >
                        <Icon size={18} className="mobile-nav-icon" />
                        <span>{item.label}</span>
                        <ChevronRight size={16} className={`mobile-expand-arrow ${aboutExpanded ? "expanded" : ""}`} />
                      </button>
                      <div className={`mobile-subnav ${aboutExpanded ? "open" : ""}`}>
                        <Link to="/about#mission-vision" className="mobile-subnav-link">Mission &amp; Vision</Link>
                        <Link to="/about#statement-of-faith" className="mobile-subnav-link">Statement of Faith</Link>
                        <Link to="/about" className="mobile-subnav-link mobile-subnav-viewall">Full About Page</Link>
                      </div>
                    </>
                  ) : item.hasChildren && item.path === "/resources" ? (
                    <>
                      <button
                        className={`mobile-nav-link mobile-nav-expandable ${active ? "active" : ""}`}
                        onClick={() => setResourcesExpanded(!resourcesExpanded)}
                      >
                        <Icon size={18} className="mobile-nav-icon" />
                        <span>{item.label}</span>
                        <ChevronRight size={16} className={`mobile-expand-arrow ${resourcesExpanded ? "expanded" : ""}`} />
                      </button>
                      <div className={`mobile-subnav ${resourcesExpanded ? "open" : ""}`}>
                        <Link to="/resources#books" className="mobile-subnav-link">Books</Link>
                        <Link to="/resources#songs" className="mobile-subnav-link">Songs</Link>
                        <Link to="/resources#media" className="mobile-subnav-link">Media</Link>
                      </div>
                    </>
                  ) : (
                    <Link to={item.path} className={`mobile-nav-link ${active ? "active" : ""}`}>
                      <Icon size={18} className="mobile-nav-icon" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <Link to="/give" className="mobile-give-btn" onClick={() => setMobileOpen(false)}>
            <Heart size={18} />
            <span>Give Online</span>
          </Link>
        </div>
      </div>
    </>
  );
}
