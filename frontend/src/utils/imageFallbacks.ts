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

// ─── Unsplash contextual fallbacks for events ──────────────────────────
// Each category has 6 images: [0] = main poster, [1–4] = gallery, [5] = extra
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const UNSPLASH_EVENTS: Record<string, string[]> = {
  // Church worship, praise, anniversary services
  worship: [
    u("photo-1438232992991-995b7058bbb3"),  // worship hands raised
    u("photo-1507692049790-de58290a4334"),  // worship crowd
    u("photo-1473177104440-ffee2f376098"),  // church interior
    u("photo-1519834785169-98be25ec3f84"),  // people standing together
    u("photo-1544427920-c49ccfb85579"),     // cross on hillside
    u("photo-1478147427282-58a87a120781"),  // church ceiling
  ],
  // Prayer nights, vigils, overnight gatherings
  prayer: [
    u("photo-1504052434569-70ad5836ab65"),  // reading bible
    u("photo-1490730141103-6cac27aaab94"),  // person in contemplation
    u("photo-1474631245212-32dc3c8310c6"),  // candles
    u("photo-1476234251651-f353703a034d"),  // starry night sky
    u("photo-1518495973542-4542c06a5843"),  // hands in prayer
    u("photo-1445445290350-18a3b86e0b5a"),  // candlelight
  ],
  // Weddings, marriage celebrations
  wedding: [
    u("photo-1519741497674-611481863552"),  // wedding bouquet
    u("photo-1511285560929-80b456fea0bc"),  // bride and groom
    u("photo-1465495976277-4387d4b0b4c6"),  // wedding couple outdoors
    u("photo-1460978812857-470ed1c77af0"),  // wedding rings
    u("photo-1515934751635-c81c6bc9a2d8"),  // wedding couple
    u("photo-1532712938310-34cb3982ef74"),  // wedding celebration
  ],
  // Women's conferences, ministry, events
  women: [
    u("photo-1491438590914-bc09fcaaf77a"),  // women friends laughing
    u("photo-1523580494863-6f3031224c94"),  // women group
    u("photo-1573497019236-17f8177b81e8"),  // diverse women together
    u("photo-1571844307880-751c6d86f3f3"),  // women running
    u("photo-1516585427167-9f4af9627e6c"),  // women empowerment
    u("photo-1609234656388-0ff363383899"),  // women together
  ],
  // Men's conferences and events
  men: [
    u("photo-1529156069898-49953e39b3ac"),  // men friends laughing
    u("photo-1528605248644-14dd04022da1"),  // group of friends
    u("photo-1517048676732-d65bc937f952"),  // men in meeting
    u("photo-1552581234-26160f608093"),     // men together
    u("photo-1556761175-5973dc0f32e7"),     // men professional
    u("photo-1500648767791-00dcc994a43e"),  // man portrait
  ],
  // Youth, teens events
  youth: [
    u("photo-1529070538774-1843cb3265df"),  // young people celebrating
    u("photo-1517457373958-b7bdd4587205"),  // youth crowd
    u("photo-1523240795612-9a054b0db644"),  // students group
    u("photo-1527525443983-6e60c75fff46"),  // happy young people
    u("photo-1511632765486-a01980e01a18"),  // friends together
    u("photo-1517486808906-6ca8b3f04846"),  // youth celebration
  ],
  // Conferences, guest speakers
  conference: [
    u("photo-1505373877841-8d25f7d46678"),  // conference stage
    u("photo-1540575467063-178a50c2df87"),  // audience at event
    u("photo-1475721027785-f74eccf877e2"),  // speaker on stage
    u("photo-1515187029135-18ee286d815b"),  // conference
    u("photo-1560439514-4e9645039924"),     // large audience
    u("photo-1540575861501-7cf05a4b125a"),  // conference hall
  ],
  // Children, babies, family events
  family: [
    u("photo-1503454537195-1dcabb73ffb9"),  // happy child
    u("photo-1484820540004-14229fe36ca4"),  // family together
    u("photo-1536640712-4d4c36ff0e4e"),     // children playing
    u("photo-1489710437720-ebb67ec84dd2"),  // family outdoors
    u("photo-1571210059434-edf0dc48e414"),  // baby
    u("photo-1476703993599-0035a21b17a9"),  // mother and child
  ],
  // Leadership, team building, pastor appreciation
  leadership: [
    u("photo-1557804506-669a67965ba0"),     // business meeting
    u("photo-1517245386807-bb43f82c33c4"),  // team meeting
    u("photo-1552664730-d307ca884978"),     // leadership discussion
    u("photo-1522071820081-009f0129c71c"),  // team collaborating
    u("photo-1559136555-9303baea8ebd"),     // teamwork
    u("photo-1521737604893-d14cc237f11d"),   // team working
  ],
  // Dinners, galas, honor events, crossover celebrations
  celebration: [
    u("photo-1519225421980-715cb0215aed"),  // elegant dinner table
    u("photo-1414235077428-338989a2e8c0"),  // dinner celebration
    u("photo-1530103862676-de8c9debad1d"),  // celebration confetti
    u("photo-1464366400600-7168b8af9bc3"),  // celebration
    u("photo-1528495612343-9ca9f4a4de28"),  // dinner table
    u("photo-1469371670807-013ccf25f16a"),  // party/gala
  ],
  // Easter / resurrection
  easter: [
    u("photo-1456428746267-a1756408f782"),  // sunrise cross
    u("photo-1544427920-c49ccfb85579"),     // cross on hillside
    u("photo-1473177104440-ffee2f376098"),  // church interior
    u("photo-1438232992991-995b7058bbb3"),  // worship
    u("photo-1508739773434-c26b3d09e071"),  // sunrise sky
    u("photo-1449157291145-7efd050a4d0e"),  // sunrise landscape
  ],
};

// Map event category strings → UNSPLASH_EVENTS keys
const CATEGORY_KEY_MAP: Record<string, string> = {
  "Special Service": "worship",
  "Prayer Night": "prayer",
  "Interbranch Overnight": "prayer",
  "Marriage & Family": "wedding",
  "Women's Conference": "women",
  "Women's Ministry": "women",
  "Men's Conference": "men",
  "Youth": "youth",
  "Guest Speaker": "conference",
  "Conference": "conference",
  "Family": "family",
  "Leadership": "leadership",
  "Celebration": "celebration",
};

/** Get a contextual Unsplash fallback image for an event category */
export function eventFallbackImage(category: string, index = 0): string {
  const key = CATEGORY_KEY_MAP[category] || "worship";
  const imgs = UNSPLASH_EVENTS[key];
  return imgs[index % imgs.length];
}

/** Get 4 contextual gallery fallback images for an event category */
export function eventGalleryFallback(category: string): string[] {
  const key = CATEGORY_KEY_MAP[category] || "worship";
  const imgs = UNSPLASH_EVENTS[key];
  // Use indices 1–4 for gallery (skip 0 which is the main poster)
  return imgs.slice(1, 5);
}
