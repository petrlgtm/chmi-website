import { useState, useEffect } from "react";

interface TypingTextProps {
  texts: string[];
  speed?: number;
  pause?: number;
  className?: string;
}

export default function TypingText({ texts, speed = 60, pause = 2500, className = "" }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];

    if (!isDeleting && charIndex < current.length) {
      const timer = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(timer);
    }

    if (!isDeleting && charIndex === current.length) {
      const timer = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIndex > 0) {
      const timer = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((t) => (t + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  useEffect(() => {
    setDisplayText(texts[textIndex].slice(0, charIndex));
  }, [charIndex, textIndex, texts]);

  return (
    <span className={`typing-text ${className}`}>
      {displayText}
      <span className="typing-cursor">|</span>
    </span>
  );
}
