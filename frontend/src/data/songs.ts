import type { Song } from "../types";

// Helper to build a song entry from minimal data
function s(id: string, title: string, date: string, desc?: string): Song {
  return {
    id,
    title,
    artist: "Isaiah Mbuga",
    date,
    description: desc || `${title} — a worship song by Apostle Isaiah Mbuga`,
    videoId: id,
    thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
    thumbnailHigh: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

// Complete fallback catalogue — shown when YouTube API is unavailable
// Sources: Isaiah Mbuga - Topic channel, Christ's Heart TV, official uploads
export const songs: Song[] = [
  // ── This Is Your Season (2025) ──
  s("1myiV_Y-SJ4", "Cast Me Not", "2025-01-01"),
  s("5nbPgilCpes", "Mutukuvu", "2025-01-01"),
  s("8SFjMaJSiv0", "Tuzze Kulanga", "2025-01-01"),
  s("CqrZXQ5FwG4", "Above All Names", "2025-01-01"),
  s("MNUTa9JeoZU", "Joy Devine", "2025-01-01"),
  s("VzgRxb19bsM", "Yeffe", "2025-01-01"),
  s("W6t28TEO1fA", "Kijja Kuggwa", "2025-01-01"),
  s("YUUCPFimNZQ", "It Is Well With Me", "2025-01-01"),
  s("c55VWpJ0iUU", "It Is Well With My Soul", "2025-01-01"),
  s("dxZUAQOgmN4", "Freedom Song", "2025-01-01"),
  s("gLyISC6Vi4M", "This Is Your Season", "2025-01-01"),

  // ── Bubbling (2025) ──
  s("-wVfe65t-Hc", "Eyeesiga", "2025-01-01"),
  s("0P-FdGEakR4", "He Is with Me", "2025-01-01"),
  s("CmVLFgLG1KU", "The River", "2025-01-01"),
  s("dqCwoTfjKHo", "Nziza Bugya", "2025-01-01"),
  s("SeZcXMN6qD8", "Ensi Nebwekyuka", "2025-01-01"),
  s("vhyGdIWAzwE", "Bubbling (Joy Unspeakable)", "2025-01-01"),
  s("eLF3DHabAlM", "Mujje", "2025-01-01"),
  s("fgAnWQRcTlo", "Praise Jehovah", "2025-01-01"),
  s("vlq9qoWv6Bg", "Heart of Flesh", "2025-01-01"),
  s("dHSlkFWvyQE", "Kwata Omukono", "2025-01-01"),
  s("ftBSLNCkTP8", "The Name of Jesus", "2025-01-01"),

  // ── Exalt (2023) ──
  s("r3ljNaw11mg", "Exalt", "2023-01-01"),

  // ── Purify My Heart (2022) ──
  s("Y9OMJAXP-Bw", "Purify My Heart", "2022-01-01"),

  // ── Nawambibwa Dda (2019) ──
  s("fePA5mc2Iok", "Nkwaataako Leero", "2019-04-19"),
  s("A7YuVAdH-bo", "My Tomorrow", "2019-04-19"),
  s("Gd05kYAMFuM", "The Only God I Know", "2019-04-19"),
  s("sPiksn4Fk4s", "Mukama Kyakoze", "2019-04-19"),

  // ── Linda Linda (2019) ──
  s("XijmsV-XNws", "Linda", "2019-01-01"),
  s("XxYhwNjrs4g", "Linda Linda", "2019-01-01"),

  // ── Other songs & singles ──
  s("Qwxc8kOunIs", "Lwazi", "2024-01-01"),
  s("-kym_RiVGAw", "Be One", "2024-01-01"),
  s("yAV9suZSirI", "Aberera", "2024-01-01"),
  s("YTqwJ-Ln3VY", "Gwe Weka", "2024-01-01"),
  s("MhNFsInoIM8", "Mpambiddwa", "2024-01-01"),
  s("Ym1e_i1kpDQ", "I Willi", "2024-01-01"),
  s("UqGVnUrBzro", "Let Your River Flow", "2024-01-01"),
  s("v1Gzpyn2iNQ", "Newadeyo Yesu", "2024-01-01"),
  s("oHyrftSTQX0", "Wewunyisa", "2024-01-01"),
  s("gci6s2iWPbY", "Saba Busabi", "2024-01-01"),
  s("lzXyfMFcajg", "Nkwesize", "2024-01-01"),
  s("VR-ZsKmIxGQ", "Amen", "2024-01-01"),
  s("O9MAJTq6C0A", "Nsababusabi", "2024-01-01"),
  s("xblGIgK_tDI", "Nkwetaaga", "2024-01-01"),
  s("TJlmyVRl9B0", "Byenali Nina", "2024-01-01"),
  s("EsoYU9ptZAg", "Take Me Deeper", "2024-01-01"),
  s("EP5vxCNmI9o", "One Way", "2024-01-01"),
  s("ir1g8PenD4o", "When You Find Me", "2024-01-01"),
  s("MTA3VANSwSI", "Nyimusa", "2024-01-01"),
  s("YEMv67mSJio", "Kingdom Minded People", "2024-01-01"),
  s("5yl9BAr5q9c", "Worthy", "2024-01-01"),
  s("JKNkVFwBVHo", "Luliba", "2024-01-01"),
  s("710B3o7mwqg", "Sadaaka", "2024-01-01"),
  s("b-75Z8fPZLI", "Men Of Action", "2024-01-01", "Men Of Action — theme song by Bishop Isaiah Mbuga ft Christ's Heart Pastors"),
  s("pcFgGw8Czhk", "Meditation", "2024-01-01"),
  s("pRFQKcwY5kc", "Kanyimbe (Nafunye Esuubi)", "2024-01-01"),
  s("N6Re09DpY-Q", "Njagala", "2024-01-01"),
  s("3MTTx4W6KJo", "Ndi Mu Ggwe Yesu", "2024-01-01"),
  s("v1Xfhv3mkMw", "In Your Presence", "2024-01-01"),
  s("cm1Rt55--8w", "He Will Do It for Me", "2024-01-01"),
  s("bNHe6rnsIs0", "Revival", "2024-01-01"),
  s("SItmnJoBEmo", "Worship Medley", "2024-01-01"),
  s("T7HTh0yIGNA", "Lift up the Name of Jesus", "2024-01-01"),
];
