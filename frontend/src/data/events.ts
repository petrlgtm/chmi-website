import type { ChurchEvent } from "../types";
import { eventFallbackImage } from "../utils/imageFallbacks";

// Auto-incrementing counter per category for varied Unsplash fallbacks
const _c: Record<string, number> = {};
const fb = (category: string) => {
  _c[category] = (_c[category] ?? -1) + 1;
  return eventFallbackImage(category, _c[category]);
};

export const events: ChurchEvent[] = [
  // ── JANUARY ──────────────────────────────────────────────────────
  {
    id: "mukono-overnight-jan",
    name: "Mukono Overnight",
    date: "31st January 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit. The Mukono Overnight is a monthly anchor event where we press into God's presence and receive fresh direction for the season ahead.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── FEBRUARY ─────────────────────────────────────────────────────
  {
    id: "breaking-the-fast",
    name: "Breaking the Fast",
    date: "10th February 2026",
    time: "12:00 PM – 3:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "A powerful fellowship gathering as the church comes together to break a season of corporate fasting. Featuring thanksgiving worship, communion, shared meals, and a celebratory atmosphere as we mark the end of our consecration season. Expect testimonies of answered prayers and breakthroughs from the fast.",
    image: fb("Special Service"),
    tagline: "The Fast Is Over. The Breakthrough Is Here.",
    category: "Special Service",
    isMajor: false,
  },
  {
    id: "marriage-flair",
    name: "Marriage Flair",
    date: "21st February 2026",
    time: "9:00 AM – 5:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "A powerful celebration of love, covenant, and God's design for marriage. Marriage Flair brings couples and singles together for a day of teaching, testimonies, and prayer focused on building strong, God-honouring homes. Featuring practical sessions on communication, intimacy, and raising godly families.",
    image: fb("Marriage & Family"),
    tagline: "Celebrate Love. Build God's Way.",
    category: "Marriage & Family",
    isMajor: true,
  },
  {
    id: "bishop-victory-godspower-kla",
    name: "Bishop Victory Godspower – KLA",
    date: "22nd February 2026",
    time: "9:00 AM – 1:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "A special Sunday service featuring the internationally renowned Bishop Victory Godspower. Experience a powerful ministration of the Word, prophetic declarations, and an atmosphere of signs and wonders. An unmissable opportunity to receive a fresh impartation from this anointed vessel of God.",
    image: fb("Guest Speaker"),
    tagline: "A Word From Heaven. A Shift in Your Season.",
    category: "Guest Speaker",
    isMajor: true,
  },
  {
    id: "lunch-hour-bishop-victory",
    name: "Lunch Hour with Bishop Victory Godspower",
    date: "23rd–26th February 2026",
    time: "12:00 PM – 2:00 PM Daily",
    location: "Christ's Heart Kampala",
    description:
      "Four days of powerful midday encounters with Bishop Victory Godspower. These lunch-hour sessions are designed for the working class and students — short, intense, and loaded with the fire of God. Come during your lunch break and leave with a fresh word, fresh fire, and fresh direction for your life.",
    image: fb("Guest Speaker"),
    tagline: "Your Lunch Hour Will Never Be the Same.",
    category: "Guest Speaker",
    isMajor: true,
  },
  {
    id: "promise-fellowship-bishop-victory",
    name: "Promise Fellowship with Bishop Victory Godspower",
    date: "25th February 2026",
    time: "5:00 PM – 8:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "A special evening fellowship with Bishop Victory Godspower focusing on the promises of God. An evening of deep teaching, prophetic ministry, and covenant declarations. Come and lay hold of what God has spoken over your life, family, and ministry.",
    image: fb("Guest Speaker"),
    tagline: "Hold On to Every Promise. God Is Faithful.",
    category: "Guest Speaker",
    isMajor: true,
  },
  {
    id: "mukono-overnight-feb",
    name: "Mukono Overnight",
    date: "28th February 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit. The Mukono Overnight is a monthly anchor event where we press into God's presence and receive fresh direction for the season ahead.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── MARCH ────────────────────────────────────────────────────────
  {
    id: "interbranch-overnight-kyebando-mar",
    name: "Interbranch Overnight Kyebando",
    date: "13th March 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Kyebando",
    description:
      "An electrifying all-night gathering at the Kyebando branch where multiple branches converge for a unified night of prayer, worship, and fellowship. The interbranch format creates a powerful atmosphere as believers from different communities join their faith together in one accord.",
    image: fb("Interbranch Overnight"),
    tagline: "Many Branches. One Fire.",
    category: "Interbranch Overnight",
    isMajor: false,
  },
  {
    id: "mass-wedding",
    name: "Mass Wedding",
    date: "14th March 2026",
    time: "10:00 AM – 4:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "A glorious ceremony where multiple couples exchange vows and begin their married life before God, family, and the church. The Mass Wedding is one of CHMI's most beautiful events — celebrating love, covenant, and community. Featuring a full wedding service, reception, and blessings from the senior leadership.",
    image: fb("Marriage & Family"),
    tagline: "Covenant Love. Kingdom Beginnings.",
    category: "Marriage & Family",
    isMajor: true,
  },
  {
    id: "virtuous-woman-run",
    name: "Virtuous Woman Run",
    date: "28th March 2026",
    time: "6:00 AM – 12:00 PM",
    location: "Kampala City",
    description:
      "An exciting charity run and fitness event organised by the women of Christ's Heart Ministries. The Virtuous Woman Run combines physical wellness with spiritual empowerment — a fun, energetic morning of running, walking, and fellowship followed by a short devotional and prayer. Open to women of all ages and fitness levels.",
    image: fb("Women's Ministry"),
    tagline: "Run With Purpose. Walk in Strength.",
    category: "Women's Ministry",
    isMajor: true,
  },
  {
    id: "mukono-overnight-mar",
    name: "Mukono Overnight",
    date: "28th March 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit. Press into God's presence and receive fresh direction for the season ahead.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── APRIL ────────────────────────────────────────────────────────
  {
    id: "easter-celebration",
    name: "Easter Celebration",
    date: "5th April 2026",
    time: "9:00 AM – 1:00 PM",
    location: "Christ's Heart Kampala – All Branches",
    description:
      "Join us for a glorious Easter Sunday celebration as we commemorate the resurrection of our Lord Jesus Christ. A powerful service of worship, thanksgiving, and declaration that He is risen. Believers from all branches come together to celebrate the victory of the cross and the power of the empty tomb. An atmosphere charged with praise, prophetic declaration, and the joy of resurrection faith.",
    image: fb("Special Service"),
    tagline: "He Is Risen. Victory Is Ours.",
    category: "Special Service",
    isMajor: true,
  },
  {
    id: "interbranch-overnight-nansana-apr",
    name: "Interbranch Overnight Nansana",
    date: "10th April 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Nansana",
    description:
      "A powerful all-night gathering at the Nansana branch where multiple branches come together for a unified night of prayer, worship, and deep fellowship. Experience the power of corporate intercession as believers from different communities join in one accord.",
    image: fb("Interbranch Overnight"),
    tagline: "United in Prayer Through the Night.",
    category: "Interbranch Overnight",
    isMajor: false,
  },
  {
    id: "pastor-olashore",
    name: "Pastor Olashore – Special Ministration",
    date: "April 2026",
    time: "To Be Confirmed",
    location: "Christ's Heart Kampala",
    description:
      "A highly anticipated visit from Pastor Olashore for a special ministration at Christ's Heart Kampala. Dates to be confirmed — stay tuned for details on what promises to be a powerful encounter with the Word and the Spirit. Mark your calendar and prepare your heart.",
    image: fb("Guest Speaker"),
    tagline: "A Divine Appointment Awaits.",
    category: "Guest Speaker",
    isMajor: true,
  },
  {
    id: "mukono-overnight-apr",
    name: "Mukono Overnight",
    date: "25th April 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit. Press into God's presence and receive fresh direction.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── MAY ──────────────────────────────────────────────────────────
  {
    id: "virtuous-woman",
    name: "Virtuous Woman Conference",
    date: "8th–10th May 2026",
    time: "9:00 AM – 5:00 PM",
    location: "Christ's Heart Kampala – Mabirizi Complex",
    description:
      "A powerful three-day women's conference celebrating the strength, grace, and beauty of the godly woman. Featuring worship, keynote speakers, panel discussions, and ministry time focused on identity, purpose, and destiny. Women from all branches come together for a weekend of empowerment, sisterhood, and spiritual renewal.",
    image: fb("Women's Conference"),
    tagline: "Crowned With Grace. Walking in Power.",
    category: "Women's Conference",
    isMajor: true,
  },
  {
    id: "interbranch-overnight-kisaasi-may",
    name: "Interbranch Overnight Kisaasi",
    date: "15th May 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Kisaasi",
    description:
      "Multiple branches converge at the Kisaasi location for a powerful all-night prayer and worship gathering. An atmosphere of unity, intercession, and prophetic ministry as the body of Christ comes together across branch lines for a night of encounter.",
    image: fb("Interbranch Overnight"),
    tagline: "Branches Unite. Heaven Responds.",
    category: "Interbranch Overnight",
    isMajor: false,
  },
  {
    id: "mukono-overnight-may",
    name: "Mukono Overnight",
    date: "30th May 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit. Press into God's presence and receive fresh direction.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── JUNE ─────────────────────────────────────────────────────────
  {
    id: "pastor-team-build",
    name: "Pastor Team Build",
    date: "9th June 2026",
    time: "9:00 AM – 5:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "A dedicated leadership development day for all pastors and ministry leaders across the CHMI network. Featuring team-building exercises, strategic planning sessions, and leadership training. An investment in the shepherds who lead our branches and ministries worldwide.",
    image: fb("Leadership"),
    tagline: "Stronger Leaders. Stronger Churches.",
    category: "Leadership",
    isMajor: true,
  },
  {
    id: "interbranch-overnight-makerere-jun",
    name: "Interbranch Overnight Makerere",
    date: "12th June 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Makerere",
    description:
      "An all-night interbranch prayer gathering at the Makerere location. Students and community members from multiple branches converge for a night of intense worship, intercession, and prophetic ministry. The university community atmosphere adds a unique energy to this gathering.",
    image: fb("Interbranch Overnight"),
    tagline: "The Campus Burns With Prayer.",
    category: "Interbranch Overnight",
    isMajor: false,
  },
  {
    id: "mukono-overnight-jun",
    name: "Mukono Overnight",
    date: "27th June 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── JULY ─────────────────────────────────────────────────────────
  {
    id: "interbranch-overnight-nansana-jul",
    name: "Interbranch Overnight Nansana",
    date: "10th July 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Nansana",
    description:
      "A powerful all-night gathering at the Nansana branch where multiple branches come together for a unified night of prayer, worship, and deep fellowship. Experience the power of corporate intercession as believers from different communities join in one accord.",
    image: fb("Interbranch Overnight"),
    tagline: "United in Prayer Through the Night.",
    category: "Interbranch Overnight",
    isMajor: false,
  },
  {
    id: "the-blend",
    name: "The Blend",
    date: "18th July 2026",
    time: "9:00 AM – 6:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "An inter-generational gathering where different generations of believers — from children to elders — come together in worship, fellowship, and ministry. The Blend celebrates unity across age groups, honouring what each generation carries and creating a powerful atmosphere where the old and new flow together in one Spirit.",
    image: fb("Conference"),
    tagline: "Generations United. One Spirit. One Vision.",
    category: "Conference",
    isMajor: true,
  },
  {
    id: "mukono-overnight-jul",
    name: "Mukono Overnight",
    date: "25th July 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── AUGUST ───────────────────────────────────────────────────────
  {
    id: "babies-conference",
    name: "Babies Conference",
    date: "1st August 2026",
    time: "9:00 AM – 4:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "A joyful and anointed conference dedicated to celebrating new life and equipping parents in raising the next generation. Featuring teaching on godly parenting, baby dedications, prayer over families, and practical sessions on raising children in faith. A must-attend for young families and expecting parents.",
    image: fb("Family"),
    tagline: "A Generation Born for Greatness.",
    category: "Family",
    isMajor: true,
  },
  {
    id: "interbranch-overnight-kisaasi-aug",
    name: "Interbranch Overnight Kisaasi",
    date: "14th August 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Kisaasi",
    description:
      "Multiple branches converge at the Kisaasi location for a powerful all-night prayer and worship gathering. An atmosphere of unity, intercession, and prophetic ministry as the body of Christ comes together for a night of encounter.",
    image: fb("Interbranch Overnight"),
    tagline: "Branches Unite. Heaven Responds.",
    category: "Interbranch Overnight",
    isMajor: false,
  },
  {
    id: "mukono-overnight-aug",
    name: "Mukono Overnight",
    date: "29th August 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── SEPTEMBER ────────────────────────────────────────────────────
  {
    id: "men-of-action",
    name: "Men of Action",
    date: "5th September 2026",
    time: "8:00 AM – 4:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "A conference dedicated to building godly men who lead with integrity, purpose, and faith. Featuring dynamic speakers, breakout sessions on leadership, family, career, and spiritual warfare, plus powerful fellowship designed specifically for men ready to rise and take their God-given place.",
    image: fb("Men's Conference"),
    tagline: "Rise. Lead. Transform.",
    category: "Men's Conference",
    isMajor: true,
  },
  {
    id: "interbranch-overnight-kyebando-sep",
    name: "Interbranch Overnight Kyebando",
    date: "11th September 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Kyebando",
    description:
      "An electrifying all-night gathering at the Kyebando branch where multiple branches converge for a unified night of prayer, worship, and fellowship. The interbranch format creates a powerful atmosphere of corporate intercession.",
    image: fb("Interbranch Overnight"),
    tagline: "Many Branches. One Fire.",
    category: "Interbranch Overnight",
    isMajor: false,
  },
  {
    id: "pastor-appreciation-kangulumira",
    name: "Pastor Appreciation Sunday & Kangulumira Anniversary",
    date: "27th September 2026",
    time: "9:00 AM – 3:00 PM",
    location: "Christ's Heart Kangulumira & All Branches",
    description:
      "A special Sunday across all branches dedicated to honouring and appreciating our pastors and spiritual leaders. Combined with the Kangulumira branch anniversary, this day celebrates the sacrificial service of those who shepherd the flock. Featuring tributes, gifts, prayer over pastors, and a powerful celebratory service.",
    image: fb("Leadership"),
    tagline: "Honouring Those Who Shepherd Us.",
    category: "Leadership",
    isMajor: true,
  },
  {
    id: "mukono-overnight-sep",
    name: "Mukono Overnight",
    date: "26th September 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── OCTOBER ──────────────────────────────────────────────────────
  {
    id: "interbranch-overnight-makerere-oct",
    name: "Interbranch Overnight Makerere",
    date: "9th October 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Makerere",
    description:
      "An all-night interbranch prayer gathering at the Makerere location. Students and community members from multiple branches converge for a night of intense worship, intercession, and prophetic ministry.",
    image: fb("Interbranch Overnight"),
    tagline: "The Campus Burns With Prayer.",
    category: "Interbranch Overnight",
    isMajor: false,
  },
  {
    id: "mukono-overnight-oct",
    name: "Mukono Overnight",
    date: "31st October 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── NOVEMBER ─────────────────────────────────────────────────────
  {
    id: "november-blessing",
    name: "November Blessing",
    date: "9th–15th November 2026",
    time: "9:00 AM – 5:00 PM Daily",
    location: "Christ's Heart Kampala – Mabirizi Complex",
    description:
      "Our annual week-long gathering of praise, worship, and prophetic declarations as we enter the season of thanksgiving. Join thousands of believers for seven days of supernatural encounters, divine blessings, and life-changing ministry. Featuring powerful worship, international guest speakers, and an atmosphere charged with God's presence.",
    image: fb("Conference"),
    tagline: "Step Into a Season of Supernatural Overflow.",
    category: "Conference",
    isMajor: true,
  },
  {
    id: "mukono-overnight-nov",
    name: "Mukono Overnight",
    date: "28th November 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Mukono",
    description:
      "An all-night prayer and worship experience at our Mukono branch. Believers gather for extended intercession, prophetic declarations, and a deep encounter with the Holy Spirit.",
    image: fb("Prayer Night"),
    tagline: "A Night in His Presence Changes Everything.",
    category: "Prayer Night",
    isMajor: true,
  },

  // ── DECEMBER ─────────────────────────────────────────────────────
  {
    id: "interbranch-overnight-kyebando-dec",
    name: "Interbranch Overnight Kyebando",
    date: "11th December 2026",
    time: "8:00 PM – 6:00 AM",
    location: "Christ's Heart Kyebando",
    description:
      "An electrifying all-night gathering at the Kyebando branch where multiple branches converge for a unified night of prayer, worship, and fellowship to close out the year. A powerful send-off into the festive season.",
    image: fb("Interbranch Overnight"),
    tagline: "Ending the Year in Prayer.",
    category: "Interbranch Overnight",
    isMajor: false,
  },
  {
    id: "children-bible-camp",
    name: "Children Bible Camp",
    date: "14th–17th December 2026",
    time: "9:00 AM – 4:00 PM Daily",
    location: "Christ's Heart Kampala",
    description:
      "A fun-filled four-day Bible camp for children featuring interactive Bible teaching, games, crafts, drama, music, and fellowship. The Children Bible Camp is designed to build the faith foundation of the youngest members of our church family. Children learn about God's love, character, and purpose for their lives in an exciting and age-appropriate environment.",
    image: fb("Family"),
    tagline: "Building Faith. Shaping Futures.",
    category: "Family",
    isMajor: true,
  },
  {
    id: "honor-dinner",
    name: "Honor Dinner",
    date: "19th–20th December 2026",
    time: "6:00 PM – 10:00 PM",
    location: "Christ's Heart Kampala",
    description:
      "An elegant two-evening gala dinner honouring the faithful servants, leaders, and partners of Christ's Heart Ministries International. A night of celebration, appreciation, awards, and fellowship as we close the year by recognising those who have gone above and beyond in service to God and the ministry.",
    image: fb("Celebration"),
    tagline: "Honouring the Faithful. Celebrating the Journey.",
    category: "Celebration",
    isMajor: true,
  },
  {
    id: "crossover-night",
    name: "Crossover Night",
    date: "31st December 2026",
    time: "10:00 PM – 2:00 AM",
    location: "All Branches",
    description:
      "Cross over into the new year in the presence of God. Our Crossover Night is a powerful all-branches gathering featuring extended worship, prophetic declarations, thanksgiving, and prayer as we usher in the new year with faith and expectation. Do not enter 2027 without seeking God's face first.",
    image: fb("Special Service"),
    tagline: "Cross Over in Power. Enter the New Year With God.",
    category: "Special Service",
    isMajor: true,
  },
];
