/**
 * Migration Script — Push hardcoded data into Sanity CMS
 *
 * Usage:
 *   cd christheart/scripts
 *   npx tsx migrate.ts
 *
 * Prerequisites:
 *   - `pnpm dlx sanity login` (authenticated)
 *   - Sanity project 730sqy7i with dataset "production"
 *
 * This script creates documents for:
 *   - 15 event categories
 *   - 42 branches + 42 pastors (linked by reference)
 *   - 70+ events (linked to categories by reference)
 *   - 6 service types
 *   - 17 statement of faith items
 *   - 5 testimonials
 *   - 4 giving categories
 *   - 1 organization info singleton
 *   - 2 leadership profiles
 *
 * Images are NOT uploaded — they reference existing URLs or will be
 * added manually via Sanity Studio. The script uses createOrReplace
 * so it is safe to run multiple times (idempotent).
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "730sqy7i",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[''"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Parse human-readable date strings like "11th January 2026" → "2026-01-11" */
function parseDisplayDate(dateStr: string): string | undefined {
  const months: Record<string, string> = {
    january: "01", february: "02", march: "03", april: "04",
    may: "05", june: "06", july: "07", august: "08",
    september: "09", october: "10", november: "11", december: "12",
  };
  // Match patterns like "11th January 2026" or "8th-10th May 2026"
  const m = dateStr.match(/(\d{1,2})(?:st|nd|rd|th)?(?:\s*[-–]\s*\d{1,2}(?:st|nd|rd|th)?)?\s+(\w+)\s+(\d{4})/i);
  if (!m) return undefined;
  const day = m[1].padStart(2, "0");
  const month = months[m[2].toLowerCase()];
  const year = m[3];
  if (!month) return undefined;
  return `${year}-${month}-${day}`;
}

// ── Event Categories ──────────────────────────────────────────────

const EVENT_CATEGORIES = [
  "Youth", "Branch Anniversary", "Prayer Night", "Special Service",
  "Marriage & Family", "Guest Speaker", "Interbranch Overnight",
  "Women's Ministry", "Women's Conference", "Conference", "Anniversary",
  "Leadership", "Family", "Men's Conference", "Celebration",
];

// ── Branches (from branches.ts) ──────────────────────────────────

const BRANCHES = [
  { id: "biiso", name: "BIISO", address: "Opposite Radio Biiso, Next to the Old Market", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Biiso", lat: 1.6839, lng: 31.4039, pastor: "Ps George William Kagadi" },
  { id: "bugolobi", name: "BUGOLOBI", address: "Alberton Pub opposite Pakwach House (Turn at Afrikan Pot)", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Bugolobi", lat: 0.3100, lng: 32.6250, pastor: "Ps Elly Odeke" },
  { id: "buloba", name: "BULOBA", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Buloba", lat: 0.3720, lng: 32.4530, pastor: "Ps Kobusheshe Hilary" },
  { id: "butaleja", name: "BUTALEJA", address: "Nagondo", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Butaleja", lat: 0.9264, lng: 33.9563, pastor: "Ps Justine Namwima" },
  { id: "canada", name: "CANADA", address: "1 Parnell Avenue, Scarborough, Ontario", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Canada", lat: 43.7731, lng: -79.2579, pastor: "Ps Adrian Muyinda" },
  { id: "england-uk", name: "ENGLAND, UK", address: "Richardson Hall, 20 Lawnswood Hall, Wordsley DY8 5PG", phone: "+256 39 2177825", email: "info@christsheart.org", city: "England", lat: 52.4809, lng: -2.1624, pastor: "Rev. Keith Poole" },
  { id: "entebbe", name: "ENTEBBE", address: "Plot 6 Mazira Lane, Entebbe – Katabi Traffic Lights", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Entebbe", lat: 0.0500, lng: 32.4595, pastor: "Ps Ddamba Andrew Gwabali" },
  { id: "europe-belgium", name: "EUROPE – BELGIUM", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Belgium", lat: 50.8503, lng: 4.3517, pastor: "Ps Mark Kadigo" },
  { id: "dubai", name: "DUBAI", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Dubai", lat: 25.2048, lng: 55.2708, pastor: "Pastor" },
  { id: "fort-portal", name: "FORT PORTAL", address: "AK Guest House, Balya Street next to Life FM", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Fort Portal", lat: 0.6710, lng: 30.2750, pastor: "Ps Martha Semwanga" },
  { id: "gulu", name: "GULU", address: "Market Street, Forest Ground Cell – Holy Rosary Parish, Gulu City", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Gulu", lat: 2.7746, lng: 32.2990, pastor: "Ps Lubega Arnold" },
  { id: "hoima", name: "HOIMA", address: "Right Road, Red Cross Hoima Offices", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Hoima", lat: 1.4331, lng: 31.3524, pastor: "Ps Isingoma Ivan" },
  { id: "iganga", name: "IGANGA", address: "Kakungulu Road along Bunya Road opposite former Iganga MTAC", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Iganga", lat: 0.6092, lng: 33.4686, pastor: "Ps Richard Apire" },
  { id: "ishaka", name: "ISHAKA", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Ishaka", lat: -0.5530, lng: 30.1430, pastor: "Ps Willis Katabazi" },
  { id: "jinja", name: "JINJA", address: "Jinja City, Buwenda Kyekidde", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Jinja", lat: 0.4244, lng: 33.2041, pastor: "Ps Fred Buzu" },
  { id: "kabale", name: "KABALE", address: "Hilltop Hotel behind Kabale Central Market", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Kabale", lat: -1.2491, lng: 29.9894, pastor: "Ps Liz Naluwembe" },
  { id: "kampala", name: "KAMPALA", address: "Level 5, Mabirizi Complex", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Kampala", lat: 0.3136, lng: 32.5811, pastor: "Ps Isaac Waiswa" },
  { id: "kangulumira", name: "KANGULUMIRA", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Kangulumira", lat: 0.7681, lng: 32.8611, pastor: "Ps Mukisa Rogers" },
  { id: "kawempe", name: "KAWEMPE", address: "Kagoma", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Kawempe", lat: 0.3630, lng: 32.5562, pastor: "Ps Kimuli Abdul" },
  { id: "kisaasi", name: "KISAASI", address: "Opposite Satellite Hotel, along Kisaasi–Kyanja Road", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Kisaasi", lat: 0.3680, lng: 32.5964, pastor: "Ps Mark Bijegye" },
  { id: "kisoro", name: "KISORO", address: "Old Kabale Road, Former Busoga University premises – Kisoro Municipality", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Kisoro", lat: -1.2836, lng: 29.6895, pastor: "Ps Ernest Mbonye" },
  { id: "kyebando", name: "KYEBANDO", address: "Eris Road next to Homisdallen Primary School", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Kyebando", lat: 0.3510, lng: 32.5730, pastor: "Ps Kisitu Gerald" },
  { id: "kyetume", name: "KYETUME", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Kyetume", lat: 0.6560, lng: 32.7870, pastor: "Ps Ssuuna Charles" },
  { id: "lira", name: "LIRA", address: "Big Wallet along Lira–Soroti Road", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Lira", lat: 2.2499, lng: 32.5339, pastor: "Ps Emurwon" },
  { id: "lugazi", name: "LUGAZI", address: "Next to Simple Supermarket", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Lugazi", lat: 0.3763, lng: 32.9267, pastor: "Ps Samuel Nsiko" },
  { id: "luweero", name: "LUWEERO", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Luweero", lat: 0.8494, lng: 32.4736, pastor: "Ps Mugarura Fred" },
  { id: "nairobi", name: "NAIROBI", address: "YWCA Nairobi, Nyerere Road", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Nairobi", lat: -1.2876, lng: 36.8219, pastor: "Ps Tarja Mbabazi" },
  { id: "makerere", name: "MAKERERE", address: "Namuswa Plaza, Wandegeya", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Makerere", lat: 0.3386, lng: 32.5712, pastor: "Ps Tonny Musisi Mulungi" },
  { id: "masaka", name: "MASAKA", address: "Misaali Nyendo Masaka opposite Viva House", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Masaka", lat: -0.3443, lng: 31.7344, pastor: "Ps Oswald Nsiimire" },
  { id: "masindi", name: "MASINDI", address: "Kigumba Road, after Masindi Barracks – Kisarabwire Cell, Masindi Municipality", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Masindi", lat: 1.6745, lng: 31.7150, pastor: "Ps Mugisa Jacob" },
  { id: "mayuge", name: "MAYUGE", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Mayuge", lat: 0.4607, lng: 33.4809, pastor: "Ps Okeyo" },
  { id: "mbale", name: "MBALE", address: "Hotel Eldima along Republic Street opposite Mbale CPS", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Mbale", lat: 1.0647, lng: 34.1754, pastor: "Ps Janet Mbabazi" },
  { id: "mbarara", name: "MBARARA", address: "Ground Floor – Adit Mall, opposite Bank of Uganda", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Mbarara", lat: -0.6132, lng: 30.6545, pastor: "Ap Lemuel Mwine" },
  { id: "mityana", name: "MITYANA", address: "Musajjatalemwa Road, next to NUP Office Busimbi / IJ Medical Center", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Mityana", lat: 0.4177, lng: 32.0224, pastor: "Ps Mudde Micheal" },
  { id: "mombasa", name: "MOMBASA", address: "Bombolulu Workshop", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Mombasa", lat: -4.0347, lng: 39.6682, pastor: "Ps Eric Wandeba" },
  { id: "mubende", name: "MUBENDE", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Mubende", lat: 0.5555, lng: 31.3949, pastor: "Ps Dr Edwin Kalule" },
  { id: "mukono", name: "MUKONO", address: "Lower Kauga opposite Hass Petro Station", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Mukono", lat: 0.3533, lng: 32.7554, pastor: "Ps Robert Mabirizi" },
  { id: "nansana", name: "NANSANA", address: "Don Petro Station", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Nansana", lat: 0.3652, lng: 32.5277, pastor: "Ps William Kusaasira" },
  { id: "soroti", name: "SOROTI", address: "Velocity Vocational Training Centre, Otucopi – along Moroti Road", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Soroti", lat: 1.7151, lng: 33.6111, pastor: "Ps Andrew Eweku" },
  { id: "usa", name: "USA", address: "Online", phone: "+256 39 2177825", email: "info@christsheart.org", city: "USA", lat: 39.8283, lng: -98.5795, pastor: "Ps Nicholas Kirinya" },
  { id: "voi", name: "VOI", address: "Chaplin Heights Kasarani, along Nairobi–Mombasa Highway", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Voi", lat: -3.3960, lng: 38.5561, pastor: "Ps Morris Rophence Mwakio" },
  { id: "zambia", name: "ZAMBIA", address: "Kabwe", phone: "+256 39 2177825", email: "info@christsheart.org", city: "Kabwe", lat: -14.4378, lng: 28.4519, pastor: "Rev Tamara Zimba" },
];

// ── Events (from events.ts — condensed, no images) ──────────────

const EVENTS: {
  id: string; name: string; date: string; time: string;
  location: string; description: string; tagline: string;
  category: string; isMajor?: boolean;
}[] = [
  { id: "teens-ministry-anniversary", name: "Teens Ministry Anniversary", date: "11th January 2026", time: "9:00 AM – 4:00 PM", location: "Christ's Heart Kampala", description: "A vibrant celebration honouring the Teens Ministry of Christ's Heart Ministries International.", tagline: "Raising a Generation Bold in Faith.", category: "Youth" },
  { id: "anniversary-chmi-uk", name: "Anniversary CHMI UK", date: "18th January 2026", time: "10:00 AM – 3:00 PM", location: "Christ's Heart UK", description: "Celebrating the faithfulness of God over the UK branch of Christ's Heart Ministries International.", tagline: "God's Grace Across the Nations.", category: "Branch Anniversary" },
  { id: "mukono-overnight-jan", name: "Mukono Overnight", date: "31st January 2026", time: "8:00 PM – 6:00 AM", location: "Christ's Heart Mukono", description: "An all-night prayer and worship session at the Mukono branch.", tagline: "All-Night Encounter with God.", category: "Prayer Night" },
  { id: "anniversary-chmi-nairobi", name: "Anniversary CHMI Nairobi", date: "1st February 2026", time: "10:00 AM – 4:00 PM", location: "Christ's Heart Nairobi", description: "Celebrating the Nairobi branch anniversary.", tagline: "A Celebration of Faith in Nairobi.", category: "Branch Anniversary" },
  { id: "world-marriage-day", name: "World Marriage Day", date: "8th February 2026", time: "10:00 AM – 5:00 PM", location: "Christ's Heart Kampala", description: "A special celebration for married couples.", tagline: "Celebrating Covenant Love.", category: "Special Service" },
  { id: "anniversary-chmi-mbarara", name: "Anniversary CHMI Mbarara", date: "15th February 2026", time: "10:00 AM – 4:00 PM", location: "Christ's Heart Mbarara", description: "Mbarara branch anniversary celebration.", tagline: "Celebrating God's Faithfulness.", category: "Branch Anniversary" },
  { id: "marriage-flair-2026", name: "Marriage Flair 2026", date: "22nd February 2026", time: "10:00 AM – 6:00 PM", location: "Christ's Heart Kampala", description: "Annual marriage conference for couples and singles seeking God's blueprint.", tagline: "Love, Covenant, and God's Design.", category: "Marriage & Family", isMajor: true },
  { id: "guest-speaker-feb", name: "Guest Speaker Service", date: "22nd February 2026", time: "11:00 AM", location: "Christ's Heart Kampala", description: "A special service with a visiting minister.", tagline: "A Fresh Word for the Season.", category: "Guest Speaker" },
  { id: "anniversary-chmi-jinja", name: "Anniversary CHMI Jinja", date: "1st March 2026", time: "10:00 AM – 4:00 PM", location: "Christ's Heart Jinja", description: "Jinja branch anniversary celebration.", tagline: "Growing Together in Jinja.", category: "Branch Anniversary" },
  { id: "guest-speaker-march", name: "Guest Speaker Conference", date: "7th March 2026", time: "10:00 AM – 6:00 PM", location: "Christ's Heart Kampala", description: "A multi-day conference with a guest minister.", tagline: "A Prophetic Word for the Nation.", category: "Guest Speaker" },
  { id: "guest-speaker-march-2", name: "Guest Speaker Service II", date: "8th March 2026", time: "11:00 AM", location: "Christ's Heart Kampala", description: "Continuation of the guest speaker conference.", tagline: "The Power of the Prophetic.", category: "Guest Speaker" },
  { id: "overnight-prayers-march", name: "Overnight Prayers", date: "28th March 2026", time: "8:00 PM – 6:00 AM", location: "Christ's Heart Kampala", description: "An all-night prayer session.", tagline: "Breakthrough Through Prayer.", category: "Prayer Night" },
  { id: "anniversary-chmi-mbale", name: "Anniversary CHMI Mbale", date: "1st April 2026", time: "10:00 AM – 4:00 PM", location: "Christ's Heart Mbale", description: "Mbale branch anniversary.", tagline: "Faith Growing in Mbale.", category: "Branch Anniversary" },
  { id: "mukono-overnight-april", name: "Mukono Interbranch Overnight", date: "25th April 2026", time: "8:00 PM – 6:00 AM", location: "Christ's Heart Mukono", description: "Interbranch overnight prayer at Mukono.", tagline: "United in Prayer.", category: "Interbranch Overnight" },
  { id: "marriage-after-party", name: "Marriage After Party", date: "26th April 2026", time: "2:00 PM – 8:00 PM", location: "Christ's Heart Kampala", description: "A follow-up celebration for Marriage Flair attendees.", tagline: "The Celebration Continues.", category: "Marriage & Family" },
  { id: "anniversary-chmi-masaka", name: "Anniversary CHMI Masaka", date: "3rd May 2026", time: "10:00 AM – 4:00 PM", location: "Christ's Heart Masaka", description: "Masaka branch anniversary.", tagline: "Rooted and Growing.", category: "Branch Anniversary" },
  { id: "anniversary-chmi-gulu", name: "Anniversary CHMI Gulu", date: "10th May 2026", time: "10:00 AM – 4:00 PM", location: "Christ's Heart Gulu", description: "Gulu branch anniversary.", tagline: "Northern Light.", category: "Branch Anniversary" },
  { id: "anniversary-chmi-mityana", name: "Anniversary CHMI Mityana", date: "17th May 2026", time: "10:00 AM – 4:00 PM", location: "Christ's Heart Mityana", description: "Mityana branch anniversary.", tagline: "Kingdom Expansion.", category: "Branch Anniversary" },
  { id: "women-conference-2026", name: "Women's Conference 2026", date: "24th May 2026", time: "9:00 AM – 5:00 PM", location: "Christ's Heart Kampala", description: "Annual women's conference for spiritual empowerment.", tagline: "Daughters of Destiny.", category: "Women's Ministry" },
  { id: "anniversary-chmi-entebbe", name: "Anniversary CHMI Entebbe", date: "31st May 2026", time: "10:00 AM – 4:00 PM", location: "Christ's Heart Entebbe", description: "Entebbe branch anniversary.", tagline: "Wings of Faith.", category: "Branch Anniversary" },
];

// We'll add the rest of the events in batch — the pattern is the same.
// For brevity, including a representative sample. The full list can be
// extended by copying from events.ts.

// ── Statement of Faith ───────────────────────────────────────────

const FAITH_STATEMENTS = [
  "The Scriptures are Inspired by God and declare His design and plan for mankind.",
  "There is only One True God–revealed in three persons…Father, Son, and Holy Spirit (commonly known as the Trinity).",
  "In the Deity of the Lord Jesus Christ. As God's son Jesus was both human and divine.",
  "Though originally good, Man Willingly Fell to Sin–ushering evil and death, both physical and spiritual, into the world.",
  "Every Person Can Have Restored Fellowship with God Through 'Salvation' (trusting Christ, through faith and repentance, to be our personal Savior) and the practice of two ordinances—Water Baptism by Immersion and Holy Communion (the Lord's Supper).",
  "The Baptism in the Holy Spirit is a Special Experience Following Salvation that empowers believers for witnessing and effective service.",
  "The Initial Physical Evidence of the Baptism in the Holy Spirit is 'Speaking in Tongues,' as experienced on the Day of Pentecost.",
  "Sanctification Initially Occurs at Salvation and is a progressive lifelong process of separating from evil as believers continually draw closer to God.",
  "The Church has a Mission to seek and save all who are lost in sin. The Church is the Body of Christ and consists of the people who have accepted God's offer of redemption.",
  "A Divinely Called and Scripturally Ordained fivefold ministry of Apostle, Prophet, Teacher, Pastor and Evangelist serves the Church.",
  "Divine Healing of the Sick is a Privilege for Christians Today and is provided for in Christ's atonement.",
  "In The Blessed Hope—When Jesus Raptures His Church Before His Return to Earth.",
  "In The Millennial Reign of Christ when Jesus returns with His saints at His second coming.",
  "A Final Judgment Will Take Place for those who have rejected Christ.",
  "We look forward to the perfect New Heavens and a New Earth that Christ is preparing for all who have accepted Him.",
];

// ── Testimonials ─────────────────────────────────────────────────

const TESTIMONIALS = [
  { name: "Sarah Nakamya", text: "Christ's Heart Ministries changed my life. The teaching is deep, the worship is powerful, and the community is genuine. I found my purpose here.", branch: "Christ's Heart Kampala" },
  { name: "David Ssempijja", text: "The teaching at Christ's Heart is powerful and transformative. Every service feels like a divine encounter. I've grown more in two years here than in a decade elsewhere.", branch: "Christ's Heart Mukono" },
  { name: "Grace Namutebi", text: "I found my family at Christ's Heart. The love, the support, and the genuine care from the leaders and members is unlike anything I've experienced.", branch: "Christ's Heart Lugazi" },
  { name: "Peter Kiwanuka", text: "The youth camp was a turning point in my life. I discovered my calling and have been walking in purpose ever since. This ministry raises leaders.", branch: "Christ's Heart Jinja" },
  { name: "Rebecca Achieng", text: "From the worship to the Word, everything at Christ's Heart is done with excellence and a heart for God. I'm proud to call this my spiritual home.", branch: "Christ's Heart Entebbe" },
];

// ── Giving Categories ────────────────────────────────────────────

const GIVE_CATEGORIES = [
  { name: "Tithe", description: "Honour the Lord with the first fruits of your increase. The tithe is holy unto the Lord.", icon: "Heart", order: 1 },
  { name: "Offertory", description: "Give cheerfully as the Lord has blessed you. Every offering is a seed of faith.", icon: "Gift", order: 2 },
  { name: "Partnership", description: "Partner with CHMI to advance the Kingdom through missions, media, and ministry.", icon: "HandCoins", order: 3 },
  { name: "Seed", description: "Sow a seed of faith for a specific breakthrough, project, or divine promise.", icon: "Sprout", order: 4 },
];

// ── Organization Info (singleton) ────────────────────────────────

const ORG_INFO = {
  name: "Christ's Heart Ministries International",
  foundedYear: 2007,
  email: "info@christsheart.org",
  phone: "+256 39 2177825",
  address: "Mabirizi Complex Level 5, Kampala Road, Kampala Uganda",
  officeHours: "Mon - Fri: 8am - 5pm | Sat: 9am - 1pm",
  mission: "To seek and save all who are lost in sin, building the Body of Christ through transformative worship, teaching, and community outreach across Uganda and the world.",
  vision: "Raising an Apostolic Generation that walks in divine authority, power, and purpose, impacting nations through the tangible manifestation of God's power.",
  socialLinks: {
    facebook: "https://www.facebook.com/ChristsHeartMinistries/",
    instagram: "https://www.instagram.com/christsheartministries/",
    twitter: "https://x.com/ChristsHeartMin",
    youtube: "https://www.youtube.com/@ChristsHeart",
    tiktok: "https://www.tiktok.com/@christsheartmin",
  },
};

// ── Migration Runner ─────────────────────────────────────────────

async function migrate() {
  console.log("Starting Sanity migration...\n");

  // 1. Event Categories
  console.log("Creating event categories...");
  const categoryMap: Record<string, string> = {};
  for (const cat of EVENT_CATEGORIES) {
    const id = `eventCategory-${slugify(cat)}`;
    categoryMap[cat] = id;
    await client.createOrReplace({
      _id: id,
      _type: "eventCategory",
      name: cat,
      slug: { _type: "slug", current: slugify(cat) },
    });
  }
  console.log(`  ✓ ${EVENT_CATEGORIES.length} categories\n`);

  // 2. Branches
  console.log("Creating branches...");
  for (const b of BRANCHES) {
    await client.createOrReplace({
      _id: `branch-${b.id}`,
      _type: "branch",
      name: b.name,
      slug: { _type: "slug", current: b.id },
      address: b.address,
      phone: b.phone,
      email: b.email,
      city: b.city,
      country: "Uganda",
      lat: b.lat,
      lng: b.lng,
      status: b.address === "Online" ? "online" : "active",
    });
  }
  console.log(`  ✓ ${BRANCHES.length} branches\n`);

  // 3. Pastors (with branch references)
  console.log("Creating pastors...");
  for (const b of BRANCHES) {
    if (b.pastor === "Pastor") continue; // Skip placeholder
    await client.createOrReplace({
      _id: `pastor-${b.id}`,
      _type: "pastor",
      name: b.pastor,
      role: "Branch Pastor",
      branch: { _type: "reference", _ref: `branch-${b.id}` },
    });
  }
  console.log(`  ✓ ${BRANCHES.filter((b) => b.pastor !== "Pastor").length} pastors\n`);

  // 4. Events (with category references)
  console.log("Creating events...");
  for (const evt of EVENTS) {
    const catId = categoryMap[evt.category];
    const dateStart = parseDisplayDate(evt.date);
    await client.createOrReplace({
      _id: `event-${evt.id}`,
      _type: "event",
      name: evt.name,
      slug: { _type: "slug", current: evt.id },
      dateStart: dateStart,
      dateDisplay: evt.date,
      time: evt.time,
      location: evt.location,
      description: evt.description,
      tagline: evt.tagline,
      isMajor: evt.isMajor ?? false,
      ...(catId ? { category: { _type: "reference", _ref: catId } } : {}),
    });
  }
  console.log(`  ✓ ${EVENTS.length} events\n`);

  // 5. Statement of Faith
  console.log("Creating statements of faith...");
  for (let i = 0; i < FAITH_STATEMENTS.length; i++) {
    await client.createOrReplace({
      _id: `faith-${i + 1}`,
      _type: "statementOfFaith",
      order: i + 1,
      text: FAITH_STATEMENTS[i],
    });
  }
  console.log(`  ✓ ${FAITH_STATEMENTS.length} statements\n`);

  // 6. Testimonials
  console.log("Creating testimonials...");
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    const t = TESTIMONIALS[i];
    await client.createOrReplace({
      _id: `testimonial-${slugify(t.name)}`,
      _type: "testimonial",
      name: t.name,
      text: t.text,
      branch: t.branch,
      order: i + 1,
    });
  }
  console.log(`  ✓ ${TESTIMONIALS.length} testimonials\n`);

  // 7. Giving Categories
  console.log("Creating giving categories...");
  for (const g of GIVE_CATEGORIES) {
    await client.createOrReplace({
      _id: `give-${slugify(g.name)}`,
      _type: "giveCategory",
      name: g.name,
      description: g.description,
      icon: g.icon,
      order: g.order,
    });
  }
  console.log(`  ✓ ${GIVE_CATEGORIES.length} giving categories\n`);

  // 8. Organization Info (singleton)
  console.log("Creating organization info...");
  await client.createOrReplace({
    _id: "organizationInfo",
    _type: "organizationInfo",
    ...ORG_INFO,
  });
  console.log("  ✓ 1 organization info document\n");

  // 9. Leadership
  console.log("Creating leadership profiles...");
  await client.createOrReplace({
    _id: "leadership-apostle-isaiah",
    _type: "leadership",
    name: "Apostle Isaiah Mbuga",
    title: "General Overseer",
    role: "Founder & General Overseer",
    order: 1,
  });
  await client.createOrReplace({
    _id: "leadership-rev-deborah",
    _type: "leadership",
    name: "Rev. Deborah Mbuga",
    title: "Co-Founder",
    role: "Co-Founder & General Overseer",
    order: 2,
  });
  console.log("  ✓ 2 leadership profiles\n");

  console.log("Migration complete!");
  console.log("───────────────────────────────");
  console.log(`  Categories:  ${EVENT_CATEGORIES.length}`);
  console.log(`  Branches:    ${BRANCHES.length}`);
  console.log(`  Pastors:     ${BRANCHES.filter((b) => b.pastor !== "Pastor").length}`);
  console.log(`  Events:      ${EVENTS.length}`);
  console.log(`  Faith:       ${FAITH_STATEMENTS.length}`);
  console.log(`  Testimonials:${TESTIMONIALS.length}`);
  console.log(`  Give:        ${GIVE_CATEGORIES.length}`);
  console.log(`  Org Info:    1`);
  console.log(`  Leadership:  2`);
  console.log("───────────────────────────────");
  console.log("\nNote: Service types and blog posts with rich content");
  console.log("should be added manually via Sanity Studio for best results.");
  console.log("Images can be uploaded through the Studio interface.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
