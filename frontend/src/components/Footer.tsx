import { useState } from "react";
import { Link } from "react-router-dom";
import { Youtube, Radio, Facebook, Instagram, Twitter, Send, Tv, BookOpen } from "lucide-react";
import { submitWeb3Form } from "../lib/web3forms";
import logo02 from "../../../logos/CHMI Logos-02.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await submitWeb3Form("newsletter", { email });
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <div className="brand-icon"><img src={logo02} alt="Christ's Heart" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "inherit" }} /></div>
              <span>Christ's Heart Ministries</span>
            </div>
            <p>
              Founded in 2007 by Apostle Isaiah and Rev. Deborah Mbuga, Christ's Heart Ministries
              stands as a beacon of transformative spirituality in Uganda and throughout Africa.
            </p>
            <div className="footer-newsletter">
              <p>Stay connected with our community</p>
              {subscribed ? (
                <p style={{ color: "var(--gold-400)", fontSize: "0.85rem", fontWeight: 600 }}>
                  Thank you for subscribing!
                </p>
              ) : (
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address for newsletter"
                  />
                  <button type="submit" aria-label="Subscribe to newsletter">
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
            <div className="footer-social">
              <a href="https://www.facebook.com/ChristsHeartMinistries/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/christsheartministries/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://x.com/ChristsHeartMin" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="https://www.youtube.com/@ChristsHeart" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="https://www.tiktok.com/@christsheartmin" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z"/></svg></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/branches">Our Branches</Link>
            <Link to="/events">Events</Link>
            <Link to="/about">About Us</Link>
            <Link to="/sermons">Sermons</Link>
          </div>

          <div className="footer-col">
            <h4>Watch & Listen</h4>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
              <a
                href="https://www.youtube.com/@ChristsHeart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ChristHeartTV"
                className="media-btn"
                style={{ backgroundColor: "#7c3aed", color: "#fff", border: "none", padding: "0.45rem 0.75rem", borderRadius: 6, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}
              >
                <Youtube size={14} style={{ marginRight: 6 }} /> ChristHeartTV
              </a>

              <a
                href="https://christsheart.org/radio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Christ's Heart Radio"
                className="media-btn"
                style={{ backgroundColor: "#fff", color: "#000", border: "1px solid #e5e7eb", padding: "0.45rem 0.75rem", borderRadius: 6, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}
              >
                <Radio size={14} style={{ marginRight: 6 }} /> ChristHeart Radio
              </a>

              <a
                href="https://www.instagram.com/promisetvug/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PROMISE TV"
                className="media-btn"
                style={{ backgroundColor: "#FFD700", color: "#000", border: "none", padding: "0.45rem 0.75rem", borderRadius: 6, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}
              >
                <Tv size={14} style={{ marginRight: 6 }} /> Promise TV
              </a>

            </div>
            <div className="footer-media-item">
              <BookOpen size={14} className="footer-media-icon" />
              <div>
                <span className="footer-media-label">The Written Word</span>
                <span className="footer-media-detail">Blog</span>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>Mabirizi Complex Level 5,<br />Kampala Road, Kampala Uganda</p>
            <p><a href="tel:+256392177825" style={{ color: "inherit", textDecoration: "none" }}>+256 39 2177825</a></p>
            <p><a href="mailto:info@christsheart.org" style={{ color: "inherit", textDecoration: "none" }}>info@christsheart.org</a></p>
            <div style={{ marginTop: "1rem" }}>
              <Link to="/give">Give Online</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Christ's Heart Ministries International. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
