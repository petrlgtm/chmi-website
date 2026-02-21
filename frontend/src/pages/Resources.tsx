import { BookOpen, ExternalLink } from "lucide-react";
import { ALL_IMAGES, APOSTLE_ISAIAH } from "../utils/imageFallbacks";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useHeroStyle } from "../context/SiteImagesContext";

interface Resource {
  id: string;
  title: string;
  author: string;
  type: "book";
  description: string;
  image: string;
  price: number;
}

const resources: Resource[] = [
  {
    id: "beneath-the-surface",
    title: "Beneath the Surface",
    author: "Apostle Isaiah Mbuga",
    type: "book",
    description: "A revealing look beyond what the eye can see. Apostle Isaiah digs into the hidden dimensions of spiritual life, uncovering the layers beneath our walk with God that determine true fruitfulness, character, and lasting impact in the Kingdom.",
    image: APOSTLE_ISAIAH.preaching,
    price: 20000,
  },
  {
    id: "rite-of-passage",
    title: "Rite of Passage",
    author: "Apostle Isaiah Mbuga",
    type: "book",
    description: "Every believer must pass through seasons of transition that shape their destiny. This book unpacks the spiritual rites of passage that mark a believer's growth — from salvation to maturity, from following to leading, from promise to fulfilment.",
    image: ALL_IMAGES[4],
    price: 20000,
  },
  {
    id: "leveraging-the-generation",
    title: "Leveraging the Generation",
    author: "Apostle Isaiah Mbuga",
    type: "book",
    description: "A timely call to the church to intentionally invest in the next generation. Apostle Isaiah presents a compelling case for why the church must empower, equip, and release young people into their God-given assignments before the window of opportunity closes.",
    image: ALL_IMAGES[8],
    price: 20000,
  },
  {
    id: "be-a-man",
    title: "Be a Man",
    author: "Apostle Isaiah Mbuga",
    type: "book",
    description: "A bold and unapologetic call to biblical manhood. In a generation confused about masculinity, Apostle Isaiah lays out God's original design for the man — as priest, provider, protector, and prophet in the home, the church, and the marketplace.",
    image: ALL_IMAGES[3],
    price: 70000,
  },
  {
    id: "unforgotten-ministry",
    title: "Unforgotten Ministry",
    author: "Apostle Isaiah Mbuga",
    type: "book",
    description: "A powerful exploration of the ministries and callings that the modern church has neglected. Apostle Isaiah revisits forgotten biblical patterns of service, intercession, and sacrifice that are essential for the church to fulfil its mandate in this hour.",
    image: ALL_IMAGES[6],
    price: 70000,
  },
];

const mediaLinks = [
  {
    label: "PROMISE TV",
    url: "https://www.instagram.com/promisetv",
    desc: "Prophetic broadcast ministry — follow on Instagram for live streams and clips",
    color: "var(--primary)",
  },
  {
    label: "Christ's Heart TV",
    url: "https://www.youtube.com/@christshearttv",
    desc: "Full sermons, conferences, and teachings on our YouTube channel",
    color: "var(--gold-600)",
  },
];

export default function Resources() {
  const heroStyle = useHeroStyle("heroResources");
  const booksRef = useScrollAnimation<HTMLDivElement>();
  const mediaRef = useScrollAnimation<HTMLDivElement>();

  const formatPrice = (price: number) =>
    `UGX ${price.toLocaleString()}`;

  const handleOrder = () => {
    window.open("https://wa.me/256392177825?text=Hello%2C%20I%20would%20like%20to%20order%20a%20book%20by%20Apostle%20Isaiah%20Mbuga.", "_blank");
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
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#0a0a0a" />
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
                    {res.description.slice(0, 150)}…
                  </p>
                  <p className="resource-card-price">{formatPrice(res.price)}</p>
                  <button onClick={handleOrder} className="btn btn-primary resource-download-btn">
                    <BookOpen size={14} /> Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media channels */}
      <section className="about-timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label resources-media-label">Media</span>
            <h2 className="resources-media-heading">Watch, Listen &amp; Connect</h2>
            <p className="resources-media-desc">Access our media channels for sermons, teachings, and prophetic broadcasts</p>
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
