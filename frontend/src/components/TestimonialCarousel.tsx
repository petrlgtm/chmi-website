import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useSanityTestimonials } from "../hooks/useSanityTestimonials";

export default function TestimonialCarousel() {
  const { data: testimonials } = useSanityTestimonials();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const goNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goPrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  };

  const t = testimonials[current];

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-carousel-inner">
        <Quote size={40} className="testimonial-quote-icon" />
        <div className={`testimonial-slide ${isTransitioning ? "transitioning" : ""}`}>
          <p className="testimonial-text">"{t.text}"</p>
          <div className="testimonial-author-info">
            <div className="testimonial-author-avatar">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="testimonial-author-name">{t.name}</p>
              <p className="testimonial-author-branch">{t.branch}</p>
            </div>
          </div>
        </div>
        <div className="testimonial-controls">
          <button onClick={goPrev} aria-label="Previous testimonial"><ChevronLeft size={20} /></button>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === current ? "active" : ""}`}
                onClick={() => { setIsTransitioning(true); setTimeout(() => { setCurrent(i); setIsTransitioning(false); }, 300); }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={goNext} aria-label="Next testimonial"><ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
  );
}
