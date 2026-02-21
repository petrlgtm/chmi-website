import type { Sermon } from "../types";

const img = (n: number) => `${import.meta.env.BASE_URL}events/november-blessing/optimized/${n}.webp`;

// Fallback sermons shown when YouTube API is unavailable
export const sermons: Sermon[] = [
  {
    id: "fallback-1",
    title: "Walking in Divine Purpose",
    preacher: "Apostle Isaiah Mbuga",
    date: "2026-02-09",
    description:
      "A powerful message about discovering and walking in the purpose God has ordained for your life.",
    type: "video",
    videoId: "",
    thumbnail: img(2),
  },
];
