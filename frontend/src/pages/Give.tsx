import { useRef } from "react";
import { Heart, Gem, TrendingUp, Users, Globe, ArrowDown } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useSanityGiveCategories } from "../hooks/useSanityGiveCategories";
import { resolveIcon } from "../lib/iconResolver";
import Card3D from "../components/Card3D";
import { IMAGES } from "../utils/imageFallbacks";

const impactItems = [
  {
    img: IMAGES.giveImpact[0],
    title: "Community Outreach",
    desc: "Your giving feeds families, clothes children, and provides medical support in rural communities.",
  },
  {
    img: IMAGES.giveImpact[1],
    title: "Youth Empowerment",
    desc: "Investing in the next generation through mentorship programs, education, and spiritual development.",
  },
  {
    img: IMAGES.giveImpact[2],
    title: "Church Planting",
    desc: "Establishing new branches to bring the gospel and community to underserved areas across Africa.",
  },
];

export default function Give() {
  const { data: givingOptions } = useSanityGiveCategories();
  const gridRef = useScrollAnimation<HTMLDivElement>();
  const scriptureRef = useScrollAnimation<HTMLDivElement>();
  const meterRef = useScrollAnimation<HTMLDivElement>();
  const impactRef = useScrollAnimation<HTMLDivElement>();
  const paymentRef = useRef<HTMLDivElement>(null);

  const scrollToPayment = () => {
    paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <section className="page-hero-xl hero-give">
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
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#0a0a0a" />
        </svg>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Ways to Give</span>
            <h2>Choose How You'd Like to Give</h2>
            <p>Select a giving category below to make your contribution</p>
          </div>

          <div className="giving-grid animate-on-scroll" ref={gridRef}>
            {givingOptions.map((option) => {
              const Icon = resolveIcon(option.icon);
              return (
                <Card3D key={option.name} className="giving-card">
                  <div className="giving-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{option.name}</h3>
                  <p>{option.description}</p>
                  <button className="btn btn-primary" onClick={scrollToPayment}>
                    <Gem size={16} /> Give {option.name}
                  </button>
                </Card3D>
              );
            })}
          </div>

          {/* Donation Impact Meter */}
          <div className="donation-meter animate-on-scroll" ref={meterRef}>
            <div className="donation-meter-header">
              <TrendingUp size={20} />
              <h3>Building Fund Progress</h3>
            </div>
            <p>Help us build a new worship center for the growing Christ's Heart family</p>
            <div className="donation-progress">
              <div className="donation-progress-bar" style={{ width: "68%" }} />
            </div>
            <div className="donation-stats">
              <span>Raised: <strong>UGX 340M</strong></span>
              <span><strong>68%</strong> of goal</span>
              <span>Goal: <strong>UGX 500M</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section give-impact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Your Impact</span>
            <h2>Where Your Giving Goes</h2>
            <p>Every contribution creates tangible change in communities</p>
          </div>
          <div className="give-impact-grid animate-on-scroll" ref={impactRef}>
            {impactItems.map((item) => (
              <div key={item.title} className="give-impact-card">
                <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
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
