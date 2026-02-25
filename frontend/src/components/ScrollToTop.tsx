import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };
      // Element may not be in DOM yet after navigation — retry briefly
      if (!tryScroll()) {
        let attempts = 0;
        const iv = setInterval(() => {
          if (tryScroll() || ++attempts > 30) clearInterval(iv);
        }, 60);
        return () => clearInterval(iv);
      }
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
