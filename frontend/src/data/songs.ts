import type { Song } from "../types";

const img = (n: number) =>
  `${import.meta.env.BASE_URL}events/november-blessing/optimized/${n}.webp`;

// Fallback songs shown when YouTube API is unavailable
export const songs: Song[] = [
  {
    id: "fallback-song-1",
    title: "Cast Me Not",
    artist: "Isaiah Mbuga",
    date: "2023-01-01",
    description:
      "A heartfelt worship song calling on God's presence and mercy.",
    videoId: "",
    thumbnail: img(2),
  },
  {
    id: "fallback-song-2",
    title: "Joy Devine",
    artist: "Isaiah Mbuga",
    date: "2023-01-01",
    description:
      "An uplifting praise song celebrating the divine joy found in Christ.",
    videoId: "",
    thumbnail: img(3),
  },
  {
    id: "fallback-song-3",
    title: "This Is Your Season",
    artist: "Isaiah Mbuga",
    date: "2025-12-27",
    description:
      "A prophetic declaration that this is your season of breakthrough and blessing.",
    videoId: "",
    thumbnail: img(4),
  },
  {
    id: "fallback-song-4",
    title: "It Is Well With Me",
    artist: "Isaiah Mbuga",
    date: "2023-01-01",
    description:
      "A worship anthem of peace and trust in God's faithfulness.",
    videoId: "",
    thumbnail: img(5),
  },
  {
    id: "fallback-song-5",
    title: "Above All Names",
    artist: "Isaiah Mbuga",
    date: "2023-01-01",
    description:
      "Exalting the name of Jesus above every other name.",
    videoId: "",
    thumbnail: img(6),
  },
];
