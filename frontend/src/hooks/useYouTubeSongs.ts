import { useState, useEffect, useRef } from "react";
import type { Song } from "../types";
import { songs as fallbackSongs } from "../data/songs";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "";
const CHANNEL_ID = "UChS0PgHCe9IaskluH_kfXEw";
const PAGE_SIZE = 10;

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

function mapItem(item: YouTubeItem): Song | null {
  const title = item.snippet.title;
  if (title === "Private video" || title === "Deleted video") return null;
  const thumbs = item.snippet.thumbnails;
  return {
    id: item.snippet.resourceId?.videoId || title,
    title,
    artist: "Isaiah Mbuga",
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

export function useYouTubeSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const done = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchFirstBatch() {
      try {
        // Get the uploads playlist ID
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const channelData = await channelRes.json();

        if (channelData.error) throw new Error(channelData.error.message);

        const uploadsId =
          channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsId) throw new Error("Could not find uploads playlist");

        // Fetch first batch
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=${PAGE_SIZE}&key=${API_KEY}`;
        const res = await fetch(url);
        const data: YouTubeResponse = await res.json();

        if (data.error) throw new Error(data.error.message);
        if (cancelled) return;

        const videos = (data.items || []).map(mapItem).filter(Boolean) as Song[];

        setSongs(videos);
        setLoading(false);

        // Load rest in background
        if (data.nextPageToken) {
          loadRest(uploadsId, data.nextPageToken, videos, cancelled);
        } else {
          done.current = true;
        }
      } catch (err) {
        if (cancelled) return;
        console.warn("YouTube Songs API unavailable, using fallback data:", err);
        setSongs(fallbackSongs);
        setError(null);
        setLoading(false);
      }
    }

    async function loadRest(
      uploadsId: string,
      pageToken: string,
      existing: Song[],
      wasCancelled: boolean
    ) {
      let token: string | null = pageToken;
      let all = [...existing];

      while (token && !wasCancelled) {
        setLoadingMore(true);
        try {
          const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=${PAGE_SIZE}&pageToken=${token}&key=${API_KEY}`;
          const res = await fetch(url);
          const data: YouTubeResponse = await res.json();

          if (data.error) break;

          const batch = (data.items || []).map(mapItem).filter(Boolean) as Song[];
          all = [...all, ...batch];
          token = data.nextPageToken || null;

          setSongs([...all]);
        } catch {
          break;
        }
      }

      done.current = true;
      setLoadingMore(false);
    }

    fetchFirstBatch();
    return () => {
      cancelled = true;
    };
  }, []);

  return { songs, loading, loadingMore, error };
}
