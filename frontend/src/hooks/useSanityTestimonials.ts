import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { TESTIMONIALS_QUERY } from "../lib/queries";

export interface TestimonialItem {
  text: string;
  name: string;
  branch: string;
}

export const fallbackTestimonials: TestimonialItem[] = [
  {
    text: "Christ\u2019s Heart Ministries changed my life. The teaching is deep, the worship is powerful, and the community is genuine. I found my purpose here.",
    name: "Sarah Nakamya",
    branch: "Christ\u2019s Heart Kampala",
  },
  {
    text: "The teaching at Christ\u2019s Heart is powerful and transformative. Every service feels like a divine encounter. I\u2019ve grown more in two years here than in a decade elsewhere.",
    name: "David Ssempijja",
    branch: "Christ\u2019s Heart Mukono",
  },
  {
    text: "I found my family at Christ\u2019s Heart. The love, the support, and the genuine care from the leaders and members is unlike anything I\u2019ve experienced.",
    name: "Grace Namutebi",
    branch: "Christ\u2019s Heart Lugazi",
  },
  {
    text: "The youth camp was a turning point in my life. I discovered my calling and have been walking in purpose ever since. This ministry raises leaders.",
    name: "Peter Kiwanuka",
    branch: "Christ\u2019s Heart Jinja",
  },
  {
    text: "From the worship to the Word, everything at Christ\u2019s Heart is done with excellence and a heart for God. I\u2019m proud to call this my spiritual home.",
    name: "Rebecca Achieng",
    branch: "Christ\u2019s Heart Entebbe",
  },
];

interface SanityTestimonial {
  _id: string;
  name: string;
  text: string;
  branch: string;
  order: number;
}

export function useSanityTestimonials() {
  const [data, setData] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const testimonials = await sanityClient.fetch<SanityTestimonial[]>(TESTIMONIALS_QUERY);
        if (cancelled || !testimonials?.length) return;

        setData(
          testimonials.map((t) => ({
            name: t.name,
            text: t.text,
            branch: t.branch || "",
          })),
        );
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("Sanity testimonials fetch failed, using fallback:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
