import { useState, useEffect, useRef, useCallback } from "react";
import type { TVEpisode } from "../types";
import { promiseTvEpisodes } from "../data/promiseTv";

const API_KEY = import.meta.env.VITE_PROMISE_TV_KEY || "";
const CHANNEL_ID = "UCBCpcsmwGVbHi8N80Q1k2NQ";
const BATCH_SIZE = 50;

interface YouTubeSnippet {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    high?: { url: string };
    medium?: { url: string };
    default?: { url: string };
  };
  resourceId?: { videoId: string };
}

interface YouTubeItem {
  snippet: YouTubeSnippet;
}

interface YouTubeResponse {
  items?: YouTubeItem[];
  nextPageToken?: string;
  error?: { message: string };
}

function isVicarEpisode(title: string): boolean {
  return /vicar/i.test(title);
}

function mapItem(item: YouTubeItem): TVEpisode | null {
  const title = item.snippet.title;
  if (title === "Private video" || title === "Deleted video") return null;
  if (!isVicarEpisode(title)) return null;

  const thumbs = item.snippet.thumbnails;
  return {
    id: item.snippet.resourceId?.videoId || title,
    title,
    date: item.snippet.publishedAt,
    description: item.snippet.description.slice(0, 200),
    videoId: item.snippet.resourceId?.videoId || "",
    thumbnail:
      thumbs.medium?.url ||
      thumbs.high?.url ||
      thumbs.default?.url ||
      "",
    thumbnailHigh:
      thumbs.high?.url ||
      thumbs.medium?.url ||
      thumbs.default?.url ||
      "",
  };
}

export function usePromiseTVVideos() {
  const [episodes, setEpisodes] = useState<TVEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const uploadsId = useRef<string | null>(null);
  const nextPageToken = useRef<string | null>(null);
  const hasMore = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchFirst() {
      if (!API_KEY) {
        setEpisodes(promiseTvEpisodes);
        setLoading(false);
        return;
      }

      try {
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`,
        );
        const channelData = await channelRes.json();

        if (channelData.error) throw new Error(channelData.error.message);

        const uid =
          channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uid) throw new Error("Could not find uploads playlist");

        uploadsId.current = uid;

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uid}&maxResults=${BATCH_SIZE}&key=${API_KEY}`;
        const res = await fetch(url);
        const data: YouTubeResponse = await res.json();

        if (data.error) throw new Error(data.error.message);
        if (cancelled) return;

        const filtered = (data.items || [])
          .map(mapItem)
          .filter(Boolean) as TVEpisode[];

        nextPageToken.current = data.nextPageToken || null;
        hasMore.current = !!data.nextPageToken;

        setEpisodes(filtered.length > 0 ? filtered : promiseTvEpisodes);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.warn("Promise TV API unavailable, using fallback:", err);
        setEpisodes(promiseTvEpisodes);
        setLoading(false);
      }
    }

    fetchFirst();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = useCallback(async () => {
    if (!uploadsId.current || !nextPageToken.current || loadingMore) return;

    setLoadingMore(true);
    try {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId.current}&maxResults=${BATCH_SIZE}&pageToken=${nextPageToken.current}&key=${API_KEY}`;
      const res = await fetch(url);
      const data: YouTubeResponse = await res.json();

      if (data.error) throw new Error(data.error.message);

      const batch = (data.items || [])
        .map(mapItem)
        .filter(Boolean) as TVEpisode[];

      nextPageToken.current = data.nextPageToken || null;
      hasMore.current = !!data.nextPageToken;

      setEpisodes((prev) => [...prev, ...batch]);
    } catch {
      hasMore.current = false;
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore]);

  return {
    episodes,
    loading,
    loadingMore,
    loadMore,
    hasMore: hasMore.current,
  };
}
