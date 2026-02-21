// All available optimized church images
// Use import.meta.env.BASE_URL so paths work on both localhost and GitHub Pages
const BASE = `${import.meta.env.BASE_URL}events/november-blessing/optimized`;

export const ALL_IMAGES = Array.from({ length: 21 }, (_, i) =>
  `${BASE}/${i + 2}.webp`
);

// Apostle Isaiah images
const APOSTLE_BASE = `${import.meta.env.BASE_URL}images/apostle-isaiah`;
export const APOSTLE_ISAIAH = {
  portrait: `${APOSTLE_BASE}/apostle-isaiah-1.png`,
  preaching: `${APOSTLE_BASE}/apostle-isaiah-2.jpg`,
  couple: `${APOSTLE_BASE}/bishop-and-mummy.jpg`,
};

// Named image assignments for specific sections
export const IMAGES = {
  // Home page
  mission: APOSTLE_ISAIAH.couple,
  // About page
  history: ALL_IMAGES[8],            // 10.webp
  leadership: APOSTLE_ISAIAH.couple,
  gallery: [
    ALL_IMAGES[10],  // 12.webp
    ALL_IMAGES[11],  // 13.webp
    ALL_IMAGES[12],  // 14.webp
    ALL_IMAGES[13],  // 15.webp
    ALL_IMAGES[14],  // 16.webp
    ALL_IMAGES[15],  // 17.webp
    ALL_IMAGES[16],  // 18.webp
  ],
  // Give page impact cards
  giveImpact: [
    ALL_IMAGES[17],  // 19.webp
    ALL_IMAGES[18],  // 20.webp
    ALL_IMAGES[19],  // 21.webp
  ],
  // Events (9 major calendar events, each gets a unique image)
  events: [
    ALL_IMAGES[1],   // 3.webp  — Marriage Flair
    ALL_IMAGES[3],   // 5.webp  — Virtuous Woman Conference
    ALL_IMAGES[6],   // 8.webp  — CHMI 19th Anniversary
    ALL_IMAGES[7],   // 9.webp  — The Blend
    ALL_IMAGES[10],  // 12.webp — Babies Conference
    ALL_IMAGES[2],   // 4.webp  — Men of Action
    ALL_IMAGES[0],   // 2.webp  — November Blessing
    ALL_IMAGES[5],   // 7.webp  — Crossover Night
    ALL_IMAGES[4],   // 6.webp  — Easter Celebration
  ],
  // Branch detail gallery
  branches: [
    ALL_IMAGES[5],   // 7.webp
    ALL_IMAGES[8],   // 10.webp
    ALL_IMAGES[11],  // 13.webp
  ],
  // Default pastor avatar
  pastorDefault: ALL_IMAGES[9],  // 11.webp (leadership)
};
