import { useRef } from "react";
import { Heart, Users, Globe, ArrowDown, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useSanityGiveCategories } from "../hooks/useSanityGiveCategories";
import { useHeroStyle } from "../context/SiteImagesContext";
export default function Give() {
  const heroStyle = useHeroStyle("heroGive");
  const { data: givingOptions } = useSanityGiveCategories();
  const gridRef = useScrollAnimation<HTMLDivElement>();
  const scriptureRef = useScrollAnimation<HTMLDivElement>();
  const paymentRef = useRef<HTMLDivElement>(null);

  const scrollToPayment = () => {
    paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <section className="page-hero-xl hero-give" style={heroStyle}>
        <div className="container">
          <div className="hero-tag hero-animate hero-animate-delay-1">
            <Heart size={14} /> Generosity
          </div>
          <h1 className="hero-animate hero-animate-delay-2">Give Online</h1>
          <p className="hero-animate hero-animate-delay-3">
            Your generosity fuels the mission of Christ's Heart Ministries. Every gift makes an
            eternal impact in the lives of people across Uganda and beyond.
          </p>
          <div className="give-hero-stat hero-animate hero-animate-delay-4">
            <div className="give-hero-stat-item">
              <span className="num">80+</span>
              <span className="label">Branches</span>
            </div>
            <div className="give-hero-stat-item">
              <span className="num">10,000+</span>
              <span className="label">Lives Touched</span>
            </div>
            <div className="give-hero-stat-item">
              <span className="num">50+</span>
              <span className="label">Outreaches</span>
            </div>
          </div>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      <section className="section">
        <div className="container">
          <div className="giving-list-wrap animate-on-scroll" ref={gridRef}>
            <h2 className="giving-list-heading">What would you like to give towards?</h2>
            <div className="giving-list">
              {givingOptions.map((option) => (
                <button
                  key={option.name}
                  className="giving-list-row"
                  onClick={scrollToPayment}
                >
                  <span className="giving-list-name">{option.name}</span>
                  <span className="giving-list-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scripture + Payment */}
      <section className="section">
        <div className="container">
          <div ref={scriptureRef} className="give-scripture-card animate-on-scroll">
            <p className="give-scripture-text">
              "Each of you should give what you have decided in your heart to give, not reluctantly
              or under compulsion, for God loves a cheerful giver."
            </p>
            <p className="give-scripture-ref">— 2 Corinthians 9:7</p>
          </div>

          {/* Payment Info */}
          <div className="give-payment-grid" ref={paymentRef}>
            <div className="give-payment-card">
              <div className="give-payment-card-header">
                <Users size={18} />
                <h3>Mobile Money</h3>
              </div>
              <p className="give-payment-card-text">
                Send your giving via Mobile Money to:<br />
                <strong className="give-payment-number">+256 39 2177825</strong><br />
                Name: Christ's Heart Ministries
              </p>
            </div>
            <div className="give-payment-card">
              <div className="give-payment-card-header">
                <Globe size={18} />
                <h3>Bank Transfer</h3>
              </div>
              <p className="give-payment-card-text">
                Bank details available on request.<br />
                Contact us at:<br />
                <strong className="give-payment-email">info@christsheart.org</strong>
              </p>
            </div>
          </div>

          <div className="give-payment-hint">
            <ArrowDown size={14} />
            <span>After sending, WhatsApp <strong>+256 39 2177825</strong> with your name and giving type for confirmation</span>
          </div>
        </div>
      </section>
    </>
  );
}
