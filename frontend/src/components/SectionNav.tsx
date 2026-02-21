import { useState, useEffect } from "react";

interface SectionNavProps {
  sections: { id: string; label: string }[];
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id || "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(section.id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="section-nav" aria-label="Page sections">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`section-nav-dot ${active === s.id ? "active" : ""}`}
          onClick={() => scrollTo(s.id)}
          aria-label={s.label}
          title={s.label}
        />
      ))}
    </nav>
  );
}
