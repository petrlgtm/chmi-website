import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "730sqy7i",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const allServices = [
  // ── 1. Sunday Services ──
  {
    _type: "serviceType",
    title: "Sunday Services",
    slug: { _type: "slug", current: "sunday-services" },
    shortDesc:
      "7am, 9am (Teen\u2019s Service), 11am and 4pm. Please check for variations with your local branch.",
    description: [
      "Sunday Services are the heartbeat of Christ\u2019s Heart Ministries. Every Sunday, believers gather across our branches to experience powerful worship, anointed preaching, and the tangible presence of God.",
      "Our services are designed to minister to every age group and spiritual need. From the early morning glory service to the afternoon power service, each gathering is a unique encounter with the Holy Spirit.",
      "Whether you\u2019re a first-time visitor or a long-time member, you\u2019ll find a warm, welcoming atmosphere where the Word of God is taught with clarity and the power of God is demonstrated with signs and wonders.",
    ],
    schedules: [
      { _key: "s1a", day: "Sunday", time: "7:00 AM", details: "Early Morning Glory Service \u2014 A powerful start to the Lord\u2019s day with worship and the Word" },
      { _key: "s1b", day: "Sunday", time: "9:00 AM", details: "Teen\u2019s Service \u2014 Dynamic worship and teaching tailored for teenagers and young adults" },
      { _key: "s1c", day: "Sunday", time: "11:00 AM", details: "Main Service \u2014 The flagship gathering with full worship, choir ministration, and the sermon" },
      { _key: "s1d", day: "Sunday", time: "4:00 PM", details: "Afternoon Power Service \u2014 An evening of deeper teaching, prayer, and prophetic ministry" },
    ],
    isOnline: false,
    branchSchedules: [
      { _key: "b1a", branchId: "kampala", branchName: "Christ\u2019s Heart Kampala", city: "Kampala", times: "Sunday: 7am, 9am (Teen\u2019s), 11am & 4pm" },
      { _key: "b1b", branchId: "mukono", branchName: "Christ\u2019s Heart Mukono", city: "Mukono", times: "Sunday: 9am & 11am" },
      { _key: "b1c", branchId: "lugazi", branchName: "Christ\u2019s Heart Lugazi", city: "Lugazi", times: "Sunday: 9am & 11am" },
      { _key: "b1d", branchId: "lira", branchName: "Christ\u2019s Heart Lira", city: "Lira", times: "Sunday: 9am & 11am" },
      { _key: "b1e", branchId: "jinja", branchName: "Christ\u2019s Heart Jinja", city: "Jinja", times: "Sunday: 9am & 11am" },
      { _key: "b1f", branchId: "iganga", branchName: "Christ\u2019s Heart Iganga", city: "Iganga", times: "Sunday: 9am & 11am" },
      { _key: "b1g", branchId: "soroti", branchName: "Christ\u2019s Heart Soroti", city: "Soroti", times: "Sunday: 9am & 11am" },
      { _key: "b1h", branchId: "mbale", branchName: "Christ\u2019s Heart Mbale", city: "Mbale", times: "Sunday: 9am & 11am" },
      { _key: "b1i", branchId: "masaka", branchName: "Christ\u2019s Heart Masaka", city: "Masaka", times: "Sunday: 9am & 11am" },
      { _key: "b1j", branchId: "gulu", branchName: "Christ\u2019s Heart Gulu", city: "Gulu", times: "Sunday: 9am & 11am" },
      { _key: "b1k", branchId: "mbarara", branchName: "Christ\u2019s Heart Mbarara", city: "Mbarara", times: "Sunday: 9am & 11am" },
      { _key: "b1l", branchId: "fort-portal", branchName: "Christ\u2019s Heart Fort Portal", city: "Fort Portal", times: "Sunday: 9am & 11am" },
      { _key: "b1m", branchId: "masindi", branchName: "Christ\u2019s Heart Masindi", city: "Masindi", times: "Sunday: 9am & 11am" },
      { _key: "b1n", branchId: "hoima", branchName: "Christ\u2019s Heart Hoima", city: "Hoima", times: "Sunday: 9am & 11am" },
      { _key: "b1o", branchId: "bugolobi", branchName: "Christ\u2019s Heart Bugolobi", city: "Bugolobi", times: "Sunday: 9am & 11am" },
      { _key: "b1p", branchId: "makerere", branchName: "Christ\u2019s Heart Makerere", city: "Makerere", times: "Sunday: 9am & 11am" },
      { _key: "b1q", branchId: "kisaasi", branchName: "Christ\u2019s Heart Kisaasi", city: "Kisaasi", times: "Sunday: 9am & 11am" },
      { _key: "b1r", branchId: "buluba", branchName: "Christ\u2019s Heart Buluba", city: "Buluba", times: "Sunday: 9am & 11am" },
      { _key: "b1s", branchId: "nansana", branchName: "Christ\u2019s Heart Nansana", city: "Nansana", times: "Sunday: 9am & 11am" },
      { _key: "b1t", branchId: "mityana", branchName: "Christ\u2019s Heart Mityana", city: "Mityana", times: "Sunday: 9am & 11am" },
    ],
    highlights: [
      { _key: "h1a", title: "Anointed Worship", text: "Experience spirit-filled worship led by our gifted praise team and choir that ushers you into God\u2019s presence." },
      { _key: "h1b", title: "Powerful Preaching", text: "Apostle Isaiah Mbuga and guest ministers deliver transformative messages rooted in Scripture." },
      { _key: "h1c", title: "Children\u2019s Church", text: "A dedicated program for children with age-appropriate teaching, activities, and fun." },
      { _key: "h1d", title: "Prayer Ministry", text: "Altar call and personal prayer ministry available after every service for healing and breakthrough." },
    ],
    scripture: {
      text: "Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another.",
      ref: "Hebrews 10:25",
    },
  },

  // ── 2. Discipleship Class ──
  {
    _type: "serviceType",
    title: "Discipleship Class",
    slug: { _type: "slug", current: "discipleship-class" },
    shortDesc:
      "Deep dive into God\u2019s word through interactive discipleship sessions and home cell fellowships.",
    description: [
      "Discipleship Class at Christ\u2019s Heart Ministries is more than just reading Scripture \u2014 it\u2019s an immersive journey into the depths of God\u2019s Word designed to form mature, Spirit-filled disciples. Our mid-week sessions equip believers with a thorough understanding of the Bible and apostolic doctrine.",
      "Led by trained facilitators and pastors, each session combines expository teaching with interactive discussion, allowing participants to ask questions, share insights, and apply biblical principles to everyday life.",
      "We believe that a strong foundation in the Word of God is essential for spiritual growth, which is why our Discipleship Classes cover both Old and New Testament books, doctrinal themes, and practical Christian living.",
    ],
    schedules: [
      { _key: "s2a", day: "Wednesday", time: "6:00 PM", details: "Mid-Week Bible Study \u2014 Systematic study through books of the Bible" },
      { _key: "s2b", day: "Thursday", time: "5:30 PM", details: "Leadership Bible Study \u2014 Advanced study for church leaders and ministers" },
      { _key: "s2c", day: "Saturday", time: "10:00 AM", details: "New Believers\u2019 Class \u2014 Foundational teaching for those new to the faith" },
    ],
    isOnline: false,
    branchSchedules: [
      { _key: "b2a", branchId: "kampala", branchName: "Christ\u2019s Heart Kampala", city: "Kampala", times: "Wednesday: 6pm | Saturday: 10am (New Believers)" },
      { _key: "b2b", branchId: "mukono", branchName: "Christ\u2019s Heart Mukono", city: "Mukono", times: "Wednesday: 6pm" },
      { _key: "b2c", branchId: "jinja", branchName: "Christ\u2019s Heart Jinja", city: "Jinja", times: "Wednesday: 6pm" },
      { _key: "b2d", branchId: "mbale", branchName: "Christ\u2019s Heart Mbale", city: "Mbale", times: "Thursday: 5:30pm" },
      { _key: "b2e", branchId: "lira", branchName: "Christ\u2019s Heart Lira", city: "Lira", times: "Wednesday: 5:30pm" },
      { _key: "b2f", branchId: "gulu", branchName: "Christ\u2019s Heart Gulu", city: "Gulu", times: "Wednesday: 6pm" },
      { _key: "b2g", branchId: "mbarara", branchName: "Christ\u2019s Heart Mbarara", city: "Mbarara", times: "Wednesday: 6pm" },
      { _key: "b2h", branchId: "masaka", branchName: "Christ\u2019s Heart Masaka", city: "Masaka", times: "Thursday: 6pm" },
      { _key: "b2i", branchId: "soroti", branchName: "Christ\u2019s Heart Soroti", city: "Soroti", times: "Wednesday: 5:30pm" },
      { _key: "b2j", branchId: "makerere", branchName: "Christ\u2019s Heart Makerere", city: "Makerere", times: "Tuesday: 6pm | Saturday: 10am" },
      { _key: "b2k", branchId: "kisaasi", branchName: "Christ\u2019s Heart Kisaasi", city: "Kisaasi", times: "Wednesday: 6pm" },
      { _key: "b2l", branchId: "bugolobi", branchName: "Christ\u2019s Heart Bugolobi", city: "Bugolobi", times: "Wednesday: 6pm" },
    ],
    highlights: [
      { _key: "h2a", title: "Verse-by-Verse Teaching", text: "Systematic exposition of Scripture that builds a comprehensive understanding of God\u2019s Word." },
      { _key: "h2b", title: "Interactive Discussion", text: "Open forum for questions, insights, and practical application of biblical principles." },
      { _key: "h2c", title: "Study Materials", text: "Handouts, study guides, and recommended resources to support your personal study." },
      { _key: "h2d", title: "Discipleship Track", text: "A structured path from new believer to mature disciple with clear milestones." },
    ],
    scripture: {
      text: "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.",
      ref: "2 Timothy 2:15",
    },
  },

  // ── 3. Overnight Prayers ──
  {
    _type: "serviceType",
    title: "Overnight Prayers",
    slug: { _type: "slug", current: "overnight-prayers" },
    shortDesc:
      "Powerful overnight prayer sessions for breakthrough and divine encounters.",
    description: [
      "Overnight Prayer sessions at Christ\u2019s Heart Ministries are among the most powerful gatherings in our calendar. These extended times of corporate prayer and intercession create an atmosphere for supernatural breakthrough.",
      "From worship and praise to focused intercession and prophetic declarations, overnight prayers are a time when the body of Christ comes together to contend for divine intervention in personal lives, families, communities, and nations.",
      "Many testimonies of healing, deliverance, financial breakthrough, and restoration have come from these powerful nights of prayer. The atmosphere is charged with faith and expectation as believers press into God\u2019s presence.",
    ],
    schedules: [
      { _key: "s3a", day: "Friday", time: "10:00 PM - 5:00 AM", details: "Monthly All-Night Prayer \u2014 First Friday of every month" },
      { _key: "s3b", day: "Quarterly", time: "8:00 PM - 6:00 AM", details: "Prophetic Prayer Summit \u2014 Extended prayer with prophetic ministry" },
    ],
    isOnline: false,
    branchSchedules: [
      { _key: "b3a", branchId: "kampala", branchName: "Christ\u2019s Heart Kampala", city: "Kampala", times: "1st Friday: 10pm - 5am | Quarterly Prayer Summits" },
      { _key: "b3b", branchId: "mukono", branchName: "Christ\u2019s Heart Mukono", city: "Mukono", times: "1st Friday: 10pm - 4am" },
      { _key: "b3c", branchId: "jinja", branchName: "Christ\u2019s Heart Jinja", city: "Jinja", times: "1st Friday: 10pm - 4am" },
      { _key: "b3d", branchId: "mbale", branchName: "Christ\u2019s Heart Mbale", city: "Mbale", times: "Last Friday: 9pm - 4am" },
      { _key: "b3e", branchId: "lira", branchName: "Christ\u2019s Heart Lira", city: "Lira", times: "1st Friday: 10pm - 4am" },
      { _key: "b3f", branchId: "gulu", branchName: "Christ\u2019s Heart Gulu", city: "Gulu", times: "1st Friday: 10pm - 4am" },
      { _key: "b3g", branchId: "mbarara", branchName: "Christ\u2019s Heart Mbarara", city: "Mbarara", times: "1st Friday: 10pm - 4am" },
    ],
    highlights: [
      { _key: "h3a", title: "Corporate Intercession", text: "United prayer for personal breakthrough, family, church, and national matters." },
      { _key: "h3b", title: "Prophetic Ministry", text: "Words of knowledge and prophetic declarations that bring direction and encouragement." },
      { _key: "h3c", title: "Worship & Warfare", text: "Extended worship sessions that break chains and release spiritual freedom." },
      { _key: "h3d", title: "Testimonies", text: "Powerful testimonies of answered prayer that build faith and inspire perseverance." },
    ],
    scripture: {
      text: "And it came to pass, that at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them.",
      ref: "Acts 16:25",
    },
  },

  // ── 4. Lunch Hour Services ──
  {
    _type: "serviceType",
    title: "Lunch Hour Services",
    slug: { _type: "slug", current: "lunch-hour-services" },
    shortDesc:
      "Mid-day refreshing for working professionals and students.",
    description: [
      "Lunch Hour Services are a unique offering for working professionals, business people, and students who want to refresh their spirits during the workday. These compact yet powerful services fit perfectly into a lunch break.",
      "Held at convenient locations in business districts and near educational institutions, these services offer a quick but impactful time of worship, a short message, and prayer. Many professionals credit these services for keeping them spiritually grounded in their workplace.",
      "The format is designed to be accessible \u2014 come as you are, receive a Word, and return to your day refreshed and empowered by the Holy Spirit.",
    ],
    schedules: [
      { _key: "s4a", day: "Monday - Friday", time: "12:45 PM - 1:45 PM", details: "Daily Lunch Hour Service (Kampala) \u2014 Worship, the Word, and prayer" },
      { _key: "s4b", day: "Wednesday", time: "12:45 PM - 1:45 PM", details: "Business Fellowship \u2014 Special session for entrepreneurs and business professionals" },
    ],
    isOnline: false,
    branchSchedules: [
      { _key: "b4a", branchId: "kampala", branchName: "Christ\u2019s Heart Kampala", city: "Kampala", times: "Mon-Fri: 12:45pm \u2013 1:45pm" },
      { _key: "b4b", branchId: "bugolobi", branchName: "Christ\u2019s Heart Bugolobi", city: "Bugolobi", times: "Check with branch for times" },
      { _key: "b4c", branchId: "makerere", branchName: "Christ\u2019s Heart Makerere", city: "Makerere", times: "Check with branch for times" },
      { _key: "b4d", branchId: "mukono", branchName: "Christ\u2019s Heart Mukono", city: "Mukono", times: "Check with branch for times" },
    ],
    highlights: [
      { _key: "h4a", title: "Convenient Timing", text: "One-hour format (12:45pm\u20131:45pm at Kampala) \u2014 perfectly within your lunch break." },
      { _key: "h4b", title: "Workplace Ministry", text: "Practical teaching on faith in the workplace, integrity, and professional excellence." },
      { _key: "h4c", title: "Networking", text: "Connect with fellow believers in your industry for mutual encouragement and support." },
      { _key: "h4d", title: "Quick Prayer", text: "Personal prayer available for specific needs \u2014 take your burdens to the Lord." },
    ],
    scripture: {
      text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      ref: "Matthew 11:28",
    },
  },

  // ── 5. Home Cells ──
  {
    _type: "serviceType",
    title: "Home Cells",
    slug: { _type: "slug", current: "home-cells" },
    shortDesc:
      "Small group fellowships in homes for deeper connection and spiritual growth.",
    description: [
      "Home Cells are the backbone of community at Christ\u2019s Heart Ministries. These small group fellowships meet in homes throughout the week, providing an intimate environment for deeper connection, accountability, and spiritual growth.",
      "Each Home Cell is led by a trained cell leader who facilitates Bible discussion, prayer, and fellowship. It\u2019s in these smaller gatherings that lasting friendships are formed, spiritual gifts are developed, and practical support is given.",
      "Whether you\u2019re new to the faith or a seasoned believer, Home Cells offer a space where you can be known, loved, and grow at your own pace. Many members consider their Home Cell family to be their closest spiritual community.",
    ],
    schedules: [
      { _key: "s5a", day: "Tuesday - Thursday", time: "Various Times", details: "Weekly Home Cell meetings \u2014 Check with your local branch for specific days and times" },
      { _key: "s5b", day: "Monthly", time: "Saturday 3:00 PM", details: "Combined Cell Rally \u2014 All cells in a zone come together for a larger celebration" },
    ],
    isOnline: false,
    branchSchedules: [
      { _key: "b5a", branchId: "kampala", branchName: "Christ\u2019s Heart Kampala", city: "Kampala", times: "Tue & Thu: Various locations across Kampala zones" },
      { _key: "b5b", branchId: "mukono", branchName: "Christ\u2019s Heart Mukono", city: "Mukono", times: "Wednesday: Mukono Town & surrounding areas" },
      { _key: "b5c", branchId: "jinja", branchName: "Christ\u2019s Heart Jinja", city: "Jinja", times: "Tuesday: Buwenda & surrounding areas" },
      { _key: "b5d", branchId: "mbale", branchName: "Christ\u2019s Heart Mbale", city: "Mbale", times: "Wednesday: Half London & surrounding areas" },
      { _key: "b5e", branchId: "mbarara", branchName: "Christ\u2019s Heart Mbarara", city: "Mbarara", times: "Thursday: Multiple cells across Mbarara town" },
      { _key: "b5f", branchId: "gulu", branchName: "Christ\u2019s Heart Gulu", city: "Gulu", times: "Wednesday: Market Street & surrounding" },
    ],
    cellLocations: [
      { _key: "c1", area: "Kampala Central", city: "Kampala", day: "Tuesday", time: "6:30 PM", leader: "Bro. Kenneth Ssemanda", contact: "+256 704 320 100" },
      { _key: "c2", area: "Ntinda / Kisaasi", city: "Kampala", day: "Tuesday", time: "6:30 PM", leader: "Sis. Judith Nambi", contact: "+256 774 550 230" },
      { _key: "c3", area: "Naalya / Kira", city: "Kampala", day: "Wednesday", time: "6:00 PM", leader: "Bro. Martin Opio", contact: "+256 700 881 034" },
      { _key: "c4", area: "Nansana / Nabweru", city: "Kampala", day: "Thursday", time: "6:30 PM", leader: "Bro. Isaac Kizza", contact: "+256 774 250 868" },
      { _key: "c5", area: "Bugolobi / Mbuya", city: "Kampala", day: "Tuesday", time: "7:00 PM", leader: "Sis. Esther Namutebi", contact: "+256 700 195 300" },
      { _key: "c6", area: "Wandegeya / Makerere", city: "Kampala", day: "Wednesday", time: "6:00 PM", leader: "Bro. Dennis Ssebulime", contact: "+256 704 320 213" },
      { _key: "c7", area: "Mukono Town", city: "Mukono", day: "Wednesday", time: "6:00 PM", leader: "Sis. Grace Nanfuka", contact: "+256 705 029 100" },
      { _key: "c8", area: "Lower Kauga, Mukono", city: "Mukono", day: "Thursday", time: "6:30 PM", leader: "Bro. James Kato Jr.", contact: "+256 705 029 989" },
      { _key: "c9", area: "Seeta / Namanve", city: "Mukono", day: "Tuesday", time: "6:30 PM", leader: "Bro. Paul Nsubuga", contact: "+256 773 441 020" },
      { _key: "c10", area: "Buwenda, Jinja", city: "Jinja", day: "Tuesday", time: "6:00 PM", leader: "Bro. John Mukisa Jr.", contact: "+256 774 205 500" },
      { _key: "c11", area: "Walukuba, Jinja", city: "Jinja", day: "Thursday", time: "6:30 PM", leader: "Sis. Ruth Nagudi", contact: "+256 774 205 439" },
      { _key: "c12", area: "Half London, Mbale", city: "Mbale", day: "Wednesday", time: "6:00 PM", leader: "Bro. Peter Wandera Jr.", contact: "+256 704 370 801" },
      { _key: "c13", area: "Mbarara Town Centre", city: "Mbarara", day: "Thursday", time: "6:30 PM", leader: "Bro. Andrew Tumusiime Jr.", contact: "+256 759 723 344" },
      { _key: "c14", area: "Gulu Market Street", city: "Gulu", day: "Wednesday", time: "5:30 PM", leader: "Bro. Francis Okello Jr.", contact: "+256 774 851 249" },
      { _key: "c15", area: "Lira Town", city: "Lira", day: "Wednesday", time: "6:00 PM", leader: "Bro. Samuel Otim Jr.", contact: "+256 773 905 117" },
      { _key: "c16", area: "Masaka Nyendo", city: "Masaka", day: "Thursday", time: "6:00 PM", leader: "Sis. Grace Nalubega Jr.", contact: "+256 779 590 918" },
    ],
    highlights: [
      { _key: "h5a", title: "Intimate Fellowship", text: "Small group setting (8-15 people) allows for deep, personal connection and accountability." },
      { _key: "h5b", title: "Neighbourhood Based", text: "Meet in homes close to where you live for convenience and community engagement." },
      { _key: "h5c", title: "Life Application", text: "Discuss how to apply Sunday\u2019s message practically in your daily life." },
      { _key: "h5d", title: "Pastoral Care", text: "Cell leaders provide personal spiritual guidance, hospital visits, and crisis support." },
    ],
    scripture: {
      text: "And they, continuing daily with one accord in the temple, and breaking bread from house to house, did eat their meat with gladness and singleness of heart.",
      ref: "Acts 2:46",
    },
  },

  // ── 6. Night Services (Online) ──
  {
    _type: "serviceType",
    title: "Night Services",
    slug: { _type: "slug", current: "night-services" },
    shortDesc:
      "Live online evening worship with Apostle Isaiah Mbuga every weeknight.",
    description: [
      "Night Services are live online gatherings hosted by Apostle Isaiah Mbuga every weeknight. These evening sessions carry a unique atmosphere \u2014 intimate, intense, and deeply prophetic \u2014 as the Apostle ministers the Word and leads believers into the presence of God from wherever they are.",
      "Streamed live on ChristHeartTV (YouTube) and TikTok, Night Services bring the anointing directly to your home. Many believers across Uganda and beyond have experienced life-changing encounters during these broadcasts, including healings, deliverances, and profound spiritual revelations.",
      "Whether you are winding down after a long day or seeking a fresh encounter with God, Night Services are an open door to the supernatural. Tune in, engage in the chat, and let the Holy Spirit minister to you.",
    ],
    schedules: [
      { _key: "s6a", day: "Monday \u2013 Friday", time: "9:00 PM \u2013 10:30 PM", details: "Apostle Live \u2014 Night Service with Apostle Isaiah Mbuga" },
    ],
    isOnline: true,
    onlineDetails: {
      host: "Apostle Isaiah Mbuga",
      platforms: [
        { _key: "p1", label: "ChristHeartTV (YouTube)", url: "https://www.youtube.com/@ChristsHeart" },
        { _key: "p2", label: "TikTok", url: "https://www.tiktok.com/@christsheartmin" },
      ],
    },
    branchSchedules: [],
    highlights: [
      { _key: "h6a", title: "Apostle Isaiah Mbuga Live", text: "Personal ministry from the Apostle every weeknight \u2014 teaching, prophecy, and prayer." },
      { _key: "h6b", title: "Watch from Anywhere", text: "Stream live on YouTube and TikTok from the comfort of your home, no matter where you are." },
      { _key: "h6c", title: "Interactive Chat", text: "Share prayer requests and engage in real-time through the live chat during the broadcast." },
      { _key: "h6d", title: "Replay Available", text: "Missed a session? Watch the replay on ChristHeartTV at any time." },
    ],
    scripture: {
      text: "At midnight I will rise to give thanks unto thee because of thy righteous judgments.",
      ref: "Psalm 119:62",
    },
  },
];

async function seed() {
  // Check for existing serviceType documents
  const existing = await client.fetch('*[_type == "serviceType"] { _id, title, "slug": slug.current }');
  const existingSlugs = new Set(existing.map((d) => d.slug));

  console.log(`Found ${existing.length} existing services: ${existing.map((d) => d.slug).join(", ") || "(none)"}`);

  const toCreate = allServices.filter(
    (s) => !existingSlugs.has(s.slug.current)
  );

  if (toCreate.length === 0) {
    console.log("All services already exist. Nothing to seed.");
    return;
  }

  console.log(`Seeding ${toCreate.length} new services...`);
  const tx = client.transaction();

  for (const svc of toCreate) {
    tx.create(svc);
    console.log(`  + ${svc.title} (${svc.slug.current})`);
  }

  const result = await tx.commit();
  console.log(`Done! Created ${result.results.length} documents.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
