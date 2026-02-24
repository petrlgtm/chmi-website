import { useState, lazy, Suspense } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle, Send, MessageCircle, Facebook, Youtube, Instagram } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { submitWeb3Form } from "../lib/web3forms";
import { useHeroStyle } from "../context/SiteImagesContext";

const LocationMap = lazy(() => import("../components/LocationMap"));

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const heroStyle = useHeroStyle("heroContact");
  const formRef = useScrollAnimation<HTMLDivElement>();
  const mapRef = useScrollAnimation<HTMLDivElement>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    await submitWeb3Form("contact", {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <section className="page-hero-xl hero-contact" style={heroStyle}>
        <div className="container">
          <div className="hero-tag hero-animate hero-animate-delay-1">
            <MessageCircle size={14} /> We'd Love to Hear From You
          </div>
          <h1 className="hero-animate hero-animate-delay-2">Contact Us</h1>
          <p className="hero-animate hero-animate-delay-3">
            Your voice matters to us! Whether you have a question, suggestion, or simply
            want to connect, we're here with open hearts and eager ears.
          </p>
        </div>
      </section>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      <section className="section">
        <div className="container contact-container">
          <div className="animate-on-scroll" ref={formRef}>
            <div className="contact-split">
              {/* Form Side */}
              <div className="contact-split-form">
                <h2 className="contact-form-heading">Send Us a Message</h2>
                <p className="contact-form-subtext">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <div className="contact-success">
                    <CheckCircle size={48} />
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll respond within 24 hours.</p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-name">Full Name</label>
                        <input id="contact-name" name="name" type="text" placeholder="Your full name" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contact-email">Email Address</label>
                        <input id="contact-email" name="email" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-subject">Subject</label>
                      <input id="contact-subject" name="subject" type="text" placeholder="What is this about?" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-message">Message</label>
                      <textarea id="contact-message" name="message" placeholder="Tell us how we can help..." rows={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary contact-submit-btn" disabled={submitting}>
                      <Send size={18} /> {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>

              {/* Info Side */}
              <div className="contact-split-info">
                <h3>Christ's Heart Ministries International</h3>
                <p className="contact-info-intro">
                  We're always happy to help. Reach out through any of these channels.
                </p>

                <a href="https://maps.google.com/?q=Mabirizi+Complex+Kampala+Road+Kampala+Uganda" target="_blank" rel="noopener noreferrer" className="contact-split-info-item">
                  <div className="contact-split-info-icon"><MapPin size={20} /></div>
                  <div>
                    <h4>Our Address</h4>
                    <p>Mabirizi Complex Level 5, Kampala Road, Kampala Uganda</p>
                  </div>
                </a>

                <a href="tel:+256392177825" className="contact-split-info-item">
                  <div className="contact-split-info-icon"><Phone size={20} /></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+256 39 2177825</p>
                  </div>
                </a>

                <a href="mailto:info@christsheart.org" className="contact-split-info-item">
                  <div className="contact-split-info-icon"><Mail size={20} /></div>
                  <div>
                    <h4>Email</h4>
                    <p>info@christsheart.org</p>
                  </div>
                </a>

                <div className="contact-split-info-item">
                  <div className="contact-split-info-icon"><Clock size={20} /></div>
                  <div>
                    <h4>Office Hours</h4>
                    <p>Mon - Fri: 8am - 5pm | Sat: 9am - 1pm</p>
                  </div>
                </div>

                <div className="contact-social-row">
                  <a href="https://www.facebook.com/ChristsHeartMinistries/" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Facebook"><Facebook size={18} /></a>
                  <a href="https://www.youtube.com/@ChristsHeart" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="YouTube"><Youtube size={18} /></a>
                  <a href="https://www.instagram.com/christsheartministries/" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Instagram"><Instagram size={18} /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="contact-map-wrap animate-on-scroll" ref={mapRef}>
            <Suspense fallback={<div className="contact-map-loading">Loading map...</div>}>
              <LocationMap
                address="Mabirizi Complex, Kampala Road, Kampala, Uganda"
                label="Christ's Heart Ministries International"
                height="300px"
                zoom={16}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
