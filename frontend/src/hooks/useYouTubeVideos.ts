import { useState, useEffect, useRef, useCallback } from "react";
import type { Sermon } from "../types";
import { sermons as fallbackSermons } from "../data/sermons";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "";
const CHANNEL_ID = "UCPrWoYShjSnfSxgkbOk-PiQ";
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

function mapItem(item: YouTubeItem): Sermon | null {
  const title = item.snippet.title;
  if (title === "Private video" || title === "Deleted video") return null;
  const thumbs = item.snippet.thumbnails;
  return {
    id: item.snippet.resourceId?.videoId || title,
    title,
    preacher: "Christ's Heart Ministries",
    date: item.snippet.publishedAt,
    description: item.snippet.description.slice(0, 200),
    type: "video" as const,
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

export function useYouTubeVideos() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadsId = useRef<string | null>(null);
  const nextPageToken = useRef<string | null>(null);
  const hasMore = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchFirst() {
      try {
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
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

        const videos = (data.items || []).map(mapItem).filter(Boolean) as Sermon[];
        nextPageToken.current = data.nextPageToken || null;
        hasMore.current = !!data.nextPageToken;

        setSermons(videos);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.warn("YouTube API unavailable, using fallback data:", err);
        setSermons(fallbackSermons);
        setError(null);
        setLoading(false);
      }
    }

    fetchFirst();
    return () => { cancelled = true; };
  }, []);

  const loadMore = useCallback(async () => {
    if (!uploadsId.current || !nextPageToken.current || loadingMore) return;

    setLoadingMore(true);
    try {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId.current}&maxResults=${BATCH_SIZE}&pageToken=${nextPageToken.current}&key=${API_KEY}`;
      const res = await fetch(url);
      const data: YouTubeResponse = await res.json();

      if (data.error) throw new Error(data.error.message);

      const batch = (data.items || []).map(mapItem).filter(Boolean) as Sermon[];
      nextPageToken.current = data.nextPageToken || null;
      hasMore.current = !!data.nextPageToken;

      setSermons((prev) => [...prev, ...batch]);
    } catch {
      hasMore.current = false;
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore]);

  return {
    sermons,
    loading,
    loadingMore,
    error,
    loadMore,
    hasMore: hasMore.current,
  };
}
