import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";
import { BLOG_POSTS_QUERY, BLOG_POST_BY_SLUG_QUERY } from "../lib/queries";
import { posts as fallbackPosts } from "../data/blogPosts";
import type { BlogPost } from "../data/blogPosts";
import type { PortableTextBlock } from "@portabletext/types";

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string;
  content: PortableTextBlock[];
  image: string;
  publishedAt: string;
  readTime: string;
}

function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return isoDate;
  }
}

function mapToLegacy(post: SanityBlogPost): BlogPost {
  return {
    id: post.slug,
    title: post.title,
    date: post.publishedAt ? formatDate(post.publishedAt) : "",
    author: post.author || "",
    category: post.category || "",
    excerpt: post.excerpt || "",
    image: post.image || "",
    readTime: post.readTime || "",
    content: "",
  };
}

export function useSanityBlogPosts() {
  const [data, setData] = useState<BlogPost[]>(fallbackPosts);
  const [sanityPosts, setSanityPosts] = useState<SanityBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSanityData, setHasSanityData] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const posts = await sanityClient.fetch<SanityBlogPost[]>(BLOG_POSTS_QUERY);
        if (cancelled || !posts?.length) return;

        setSanityPosts(posts);
        setData(posts.map(mapToLegacy));
        setHasSanityData(true);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("Sanity blog posts fetch failed, using fallback:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { data, sanityPosts, loading, error, hasSanityData };
}

export function useSanityBlogPost(slug: string) {
  const [post, setPost] = useState<SanityBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await sanityClient.fetch<SanityBlogPost | null>(
          BLOG_POST_BY_SLUG_QUERY,
          { slug },
        );
        if (cancelled) return;
        setPost(result);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("Sanity blog post fetch failed:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { post, loading, error };
}
