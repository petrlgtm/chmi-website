export interface BranchSchedule {
  branchId: string;
  branchName: string;
  city: string;
  times: string;
}

export interface CellLocation {
  area: string;
  city: string;
  day: string;
  time: string;
  leader: string;
  contact: string;
}

export interface ServiceInfo {
  id: string;
  title: string;
  shortDesc: string;
  heroImage: string;
  description: string[];
  schedule: { day: string; time: string; details: string }[];
  branchSchedules: BranchSchedule[];
  cellLocations?: CellLocation[];
  highlights: { title: string; text: string }[];
  scripture: { text: string; ref: string };
}

const img = (n: number) => `${import.meta.env.BASE_URL}events/november-blessing/optimized/${n}.webp`;

export const services: ServiceInfo[] = [
  {
    id: "sunday-services",
    title: "Sunday Services",
    shortDesc: "7am, 9am (Teen's Service), 11am and 4pm. Please check for variations with your local branch.",
    heroImage: img(3),
    description: [
      "Sunday Services are the heartbeat of Christ's Heart Ministries. Every Sunday, believers gather across our branches to experience powerful worship, anointed preaching, and the tangible presence of God.",
      "Our services are designed to minister to every age group and spiritual need. From the early morning glory service to the afternoon power service, each gathering is a unique encounter with the Holy Spirit.",
      "Whether you're a first-time visitor or a long-time member, you'll find a warm, welcoming atmosphere where the Word of God is taught with clarity and the power of God is demonstrated with signs and wonders.",
    ],
    schedule: [
      { day: "Sunday", time: "7:00 AM", details: "Early Morning Glory Service — A powerful start to the Lord's day with worship and the Word" },
      { day: "Sunday", time: "9:00 AM", details: "Teen's Service — Dynamic worship and teaching tailored for teenagers and young adults" },
      { day: "Sunday", time: "11:00 AM", details: "Main Service — The flagship gathering with full worship, choir ministration, and the sermon" },
      { day: "Sunday", time: "4:00 PM", details: "Afternoon Power Service — An evening of deeper teaching, prayer, and prophetic ministry" },
    ],
    branchSchedules: [
      { branchId: "kampala", branchName: "Christ's Heart Kampala", city: "Kampala", times: "Sunday: 7am, 9am (Teen's), 11am & 4pm" },
      { branchId: "mukono", branchName: "Christ's Heart Mukono", city: "Mukono", times: "Sunday: 9am & 11am" },
      { branchId: "lugazi", branchName: "Christ's Heart Lugazi", city: "Lugazi", times: "Sunday: 9am & 11am" },
      { branchId: "lira", branchName: "Christ's Heart Lira", city: "Lira", times: "Sunday: 9am & 11am" },
      { branchId: "jinja", branchName: "Christ's Heart Jinja", city: "Jinja", times: "Sunday: 9am & 11am" },
      { branchId: "iganga", branchName: "Christ's Heart Iganga", city: "Iganga", times: "Sunday: 9am & 11am" },
      { branchId: "soroti", branchName: "Christ's Heart Soroti", city: "Soroti", times: "Sunday: 9am & 11am" },
      { branchId: "mbale", branchName: "Christ's Heart Mbale", city: "Mbale", times: "Sunday: 9am & 11am" },
      { branchId: "masaka", branchName: "Christ's Heart Masaka", city: "Masaka", times: "Sunday: 9am & 11am" },
      { branchId: "gulu", branchName: "Christ's Heart Gulu", city: "Gulu", times: "Sunday: 9am & 11am" },
      { branchId: "mbarara", branchName: "Christ's Heart Mbarara", city: "Mbarara", times: "Sunday: 9am & 11am" },
      { branchId: "fort-portal", branchName: "Christ's Heart Fort Portal", city: "Fort Portal", times: "Sunday: 9am & 11am" },
      { branchId: "masindi", branchName: "Christ's Heart Masindi", city: "Masindi", times: "Sunday: 9am & 11am" },
      { branchId: "hoima", branchName: "Christ's Heart Hoima", city: "Hoima", times: "Sunday: 9am & 11am" },
      { branchId: "bugolobi", branchName: "Christ's Heart Bugolobi", city: "Bugolobi", times: "Sunday: 9am & 11am" },
      { branchId: "makerere", branchName: "Christ's Heart Makerere", city: "Makerere", times: "Sunday: 9am & 11am" },
      { branchId: "kisaasi", branchName: "Christ's Heart Kisaasi", city: "Kisaasi", times: "Sunday: 9am & 11am" },
      { branchId: "buluba", branchName: "Christ's Heart Buluba", city: "Buluba", times: "Sunday: 9am & 11am" },
      { branchId: "nansana", branchName: "Christ's Heart Nansana", city: "Nansana", times: "Sunday: 9am & 11am" },
      { branchId: "mityana", branchName: "Christ's Heart Mityana", city: "Mityana", times: "Sunday: 9am & 11am" },
    ],
    highlights: [
      { title: "Anointed Worship", text: "Experience spirit-filled worship led by our gifted praise team and choir that ushers you into God's presence." },
      { title: "Powerful Preaching", text: "Apostle Isaiah Mbuga and guest ministers deliver transformative messages rooted in Scripture." },
      { title: "Children's Church", text: "A dedicated program for children with age-appropriate teaching, activities, and fun." },
      { title: "Prayer Ministry", text: "Altar call and personal prayer ministry available after every service for healing and breakthrough." },
    ],
    scripture: { text: "Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another.", ref: "Hebrews 10:25" },
  },
  {
    id: "discipleship-class",
    title: "Discipleship Class",
    shortDesc: "Deep dive into God's word through interactive discipleship sessions and home cell fellowships.",
    heroImage: img(4),
    description: [
      "Discipleship Class at Christ's Heart Ministries is more than just reading Scripture — it's an immersive journey into the depths of God's Word designed to form mature, Spirit-filled disciples. Our mid-week sessions equip believers with a thorough understanding of the Bible and apostolic doctrine.",
      "Led by trained facilitators and pastors, each session combines expository teaching with interactive discussion, allowing participants to ask questions, share insights, and apply biblical principles to everyday life.",
      "We believe that a strong foundation in the Word of God is essential for spiritual growth, which is why our Discipleship Classes cover both Old and New Testament books, doctrinal themes, and practical Christian living.",
    ],
    schedule: [
      { day: "Wednesday", time: "6:00 PM", details: "Mid-Week Bible Study — Systematic study through books of the Bible" },
      { day: "Thursday", time: "5:30 PM", details: "Leadership Bible Study — Advanced study for church leaders and ministers" },
      { day: "Saturday", time: "10:00 AM", details: "New Believers' Class — Foundational teaching for those new to the faith" },
    ],
    branchSchedules: [
      { branchId: "kampala", branchName: "Christ's Heart Kampala", city: "Kampala", times: "Wednesday: 6pm | Saturday: 10am (New Believers)" },
      { branchId: "mukono", branchName: "Christ's Heart Mukono", city: "Mukono", times: "Wednesday: 6pm" },
      { branchId: "jinja", branchName: "Christ's Heart Jinja", city: "Jinja", times: "Wednesday: 6pm" },
      { branchId: "mbale", branchName: "Christ's Heart Mbale", city: "Mbale", times: "Thursday: 5:30pm" },
      { branchId: "lira", branchName: "Christ's Heart Lira", city: "Lira", times: "Wednesday: 5:30pm" },
      { branchId: "gulu", branchName: "Christ's Heart Gulu", city: "Gulu", times: "Wednesday: 6pm" },
      { branchId: "mbarara", branchName: "Christ's Heart Mbarara", city: "Mbarara", times: "Wednesday: 6pm" },
      { branchId: "masaka", branchName: "Christ's Heart Masaka", city: "Masaka", times: "Thursday: 6pm" },
      { branchId: "soroti", branchName: "Christ's Heart Soroti", city: "Soroti", times: "Wednesday: 5:30pm" },
      { branchId: "makerere", branchName: "Christ's Heart Makerere", city: "Makerere", times: "Tuesday: 6pm | Saturday: 10am" },
      { branchId: "kisaasi", branchName: "Christ's Heart Kisaasi", city: "Kisaasi", times: "Wednesday: 6pm" },
      { branchId: "bugolobi", branchName: "Christ's Heart Bugolobi", city: "Bugolobi", times: "Wednesday: 6pm" },
    ],
    highlights: [
      { title: "Verse-by-Verse Teaching", text: "Systematic exposition of Scripture that builds a comprehensive understanding of God's Word." },
      { title: "Interactive Discussion", text: "Open forum for questions, insights, and practical application of biblical principles." },
      { title: "Study Materials", text: "Handouts, study guides, and recommended resources to support your personal study." },
      { title: "Discipleship Track", text: "A structured path from new believer to mature disciple with clear milestones." },
    ],
    scripture: { text: "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.", ref: "2 Timothy 2:15" },
  },
  {
    id: "overnight-prayers",
    title: "Overnight Prayers",
    shortDesc: "Powerful overnight prayer sessions for breakthrough and divine encounters.",
    heroImage: img(5),
    description: [
      "Overnight Prayer sessions at Christ's Heart Ministries are among the most powerful gatherings in our calendar. These extended times of corporate prayer and intercession create an atmosphere for supernatural breakthrough.",
      "From worship and praise to focused intercession and prophetic declarations, overnight prayers are a time when the body of Christ comes together to contend for divine intervention in personal lives, families, communities, and nations.",
      "Many testimonies of healing, deliverance, financial breakthrough, and restoration have come from these powerful nights of prayer. The atmosphere is charged with faith and expectation as believers press into God's presence.",
    ],
    schedule: [
      { day: "Friday", time: "10:00 PM - 5:00 AM", details: "Monthly All-Night Prayer — First Friday of every month" },
      { day: "Quarterly", time: "8:00 PM - 6:00 AM", details: "Prophetic Prayer Summit — Extended prayer with prophetic ministry" },
    ],
    branchSchedules: [
      { branchId: "kampala", branchName: "Christ's Heart Kampala", city: "Kampala", times: "1st Friday: 10pm - 5am | Quarterly Prayer Summits" },
      { branchId: "mukono", branchName: "Christ's Heart Mukono", city: "Mukono", times: "1st Friday: 10pm - 4am" },
      { branchId: "jinja", branchName: "Christ's Heart Jinja", city: "Jinja", times: "1st Friday: 10pm - 4am" },
      { branchId: "mbale", branchName: "Christ's Heart Mbale", city: "Mbale", times: "Last Friday: 9pm - 4am" },
      { branchId: "lira", branchName: "Christ's Heart Lira", city: "Lira", times: "1st Friday: 10pm - 4am" },
      { branchId: "gulu", branchName: "Christ's Heart Gulu", city: "Gulu", times: "1st Friday: 10pm - 4am" },
      { branchId: "mbarara", branchName: "Christ's Heart Mbarara", city: "Mbarara", times: "1st Friday: 10pm - 4am" },
    ],
    highlights: [
      { title: "Corporate Intercession", text: "United prayer for personal breakthrough, family, church, and national matters." },
      { title: "Prophetic Ministry", text: "Words of knowledge and prophetic declarations that bring direction and encouragement." },
      { title: "Worship & Warfare", text: "Extended worship sessions that break chains and release spiritual freedom." },
      { title: "Testimonies", text: "Powerful testimonies of answered prayer that build faith and inspire perseverance." },
    ],
    scripture: { text: "And it came to pass, that at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them.", ref: "Acts 16:25" },
  },
  {
    id: "lunch-hour-services",
    title: "Lunch Hour Services",
    shortDesc: "Mid-day refreshing for working professionals and students.",
    heroImage: img(6),
    description: [
      "Lunch Hour Services are a unique offering for working professionals, business people, and students who want to refresh their spirits during the workday. These compact yet powerful services fit perfectly into a lunch break.",
      "Held at convenient locations in business districts and near educational institutions, these services offer a quick but impactful time of worship, a short message, and prayer. Many professionals credit these services for keeping them spiritually grounded in their workplace.",
      "The format is designed to be accessible — come as you are, receive a Word, and return to your day refreshed and empowered by the Holy Spirit.",
    ],
    schedule: [
      { day: "Monday - Friday", time: "12:45 PM - 1:45 PM", details: "Daily Lunch Hour Service (Kampala) — Worship, the Word, and prayer" },
      { day: "Wednesday", time: "12:45 PM - 1:45 PM", details: "Business Fellowship — Special session for entrepreneurs and business professionals" },
    ],
    branchSchedules: [
      { branchId: "kampala", branchName: "Christ's Heart Kampala", city: "Kampala", times: "Mon-Fri: 12:45pm – 1:45pm" },
      { branchId: "bugolobi", branchName: "Christ's Heart Bugolobi", city: "Bugolobi", times: "Check with branch for times" },
      { branchId: "makerere", branchName: "Christ's Heart Makerere", city: "Makerere", times: "Check with branch for times" },
      { branchId: "mukono", branchName: "Christ's Heart Mukono", city: "Mukono", times: "Check with branch for times" },
    ],
    highlights: [
      { title: "Convenient Timing", text: "One-hour format (12:45pm–1:45pm at Kampala) — perfectly within your lunch break." },
      { title: "Workplace Ministry", text: "Practical teaching on faith in the workplace, integrity, and professional excellence." },
      { title: "Networking", text: "Connect with fellow believers in your industry for mutual encouragement and support." },
      { title: "Quick Prayer", text: "Personal prayer available for specific needs — take your burdens to the Lord." },
    ],
    scripture: { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
  },
  {
    id: "home-cells",
    title: "Home Cells",
    shortDesc: "Small group fellowships in homes for deeper connection and spiritual growth.",
    heroImage: img(7),
    description: [
      "Home Cells are the backbone of community at Christ's Heart Ministries. These small group fellowships meet in homes throughout the week, providing an intimate environment for deeper connection, accountability, and spiritual growth.",
      "Each Home Cell is led by a trained cell leader who facilitates Bible discussion, prayer, and fellowship. It's in these smaller gatherings that lasting friendships are formed, spiritual gifts are developed, and practical support is given.",
      "Whether you're new to the faith or a seasoned believer, Home Cells offer a space where you can be known, loved, and grow at your own pace. Many members consider their Home Cell family to be their closest spiritual community.",
    ],
    schedule: [
      { day: "Tuesday - Thursday", time: "Various Times", details: "Weekly Home Cell meetings — Check with your local branch for specific days and times" },
      { day: "Monthly", time: "Saturday 3:00 PM", details: "Combined Cell Rally — All cells in a zone come together for a larger celebration" },
    ],
    branchSchedules: [
      { branchId: "kampala", branchName: "Christ's Heart Kampala", city: "Kampala", times: "Tue & Thu: Various locations across Kampala zones" },
      { branchId: "mukono", branchName: "Christ's Heart Mukono", city: "Mukono", times: "Wednesday: Mukono Town & surrounding areas" },
      { branchId: "jinja", branchName: "Christ's Heart Jinja", city: "Jinja", times: "Tuesday: Buwenda & surrounding areas" },
      { branchId: "mbale", branchName: "Christ's Heart Mbale", city: "Mbale", times: "Wednesday: Half London & surrounding areas" },
      { branchId: "mbarara", branchName: "Christ's Heart Mbarara", city: "Mbarara", times: "Thursday: Multiple cells across Mbarara town" },
      { branchId: "gulu", branchName: "Christ's Heart Gulu", city: "Gulu", times: "Wednesday: Market Street & surrounding" },
    ],
    cellLocations: [
      { area: "Kampala Central", city: "Kampala", day: "Tuesday", time: "6:30 PM", leader: "Bro. Kenneth Ssemanda", contact: "+256 704 320 100" },
      { area: "Ntinda / Kisaasi", city: "Kampala", day: "Tuesday", time: "6:30 PM", leader: "Sis. Judith Nambi", contact: "+256 774 550 230" },
      { area: "Naalya / Kira", city: "Kampala", day: "Wednesday", time: "6:00 PM", leader: "Bro. Martin Opio", contact: "+256 700 881 034" },
      { area: "Nansana / Nabweru", city: "Kampala", day: "Thursday", time: "6:30 PM", leader: "Bro. Isaac Kizza", contact: "+256 774 250 868" },
      { area: "Bugolobi / Mbuya", city: "Kampala", day: "Tuesday", time: "7:00 PM", leader: "Sis. Esther Namutebi", contact: "+256 700 195 300" },
      { area: "Wandegeya / Makerere", city: "Kampala", day: "Wednesday", time: "6:00 PM", leader: "Bro. Dennis Ssebulime", contact: "+256 704 320 213" },
      { area: "Mukono Town", city: "Mukono", day: "Wednesday", time: "6:00 PM", leader: "Sis. Grace Nanfuka", contact: "+256 705 029 100" },
      { area: "Lower Kauga, Mukono", city: "Mukono", day: "Thursday", time: "6:30 PM", leader: "Bro. James Kato Jr.", contact: "+256 705 029 989" },
      { area: "Seeta / Namanve", city: "Mukono", day: "Tuesday", time: "6:30 PM", leader: "Bro. Paul Nsubuga", contact: "+256 773 441 020" },
      { area: "Buwenda, Jinja", city: "Jinja", day: "Tuesday", time: "6:00 PM", leader: "Bro. John Mukisa Jr.", contact: "+256 774 205 500" },
      { area: "Walukuba, Jinja", city: "Jinja", day: "Thursday", time: "6:30 PM", leader: "Sis. Ruth Nagudi", contact: "+256 774 205 439" },
      { area: "Half London, Mbale", city: "Mbale", day: "Wednesday", time: "6:00 PM", leader: "Bro. Peter Wandera Jr.", contact: "+256 704 370 801" },
      { area: "Mbarara Town Centre", city: "Mbarara", day: "Thursday", time: "6:30 PM", leader: "Bro. Andrew Tumusiime Jr.", contact: "+256 759 723 344" },
      { area: "Gulu Market Street", city: "Gulu", day: "Wednesday", time: "5:30 PM", leader: "Bro. Francis Okello Jr.", contact: "+256 774 851 249" },
      { area: "Lira Town", city: "Lira", day: "Wednesday", time: "6:00 PM", leader: "Bro. Samuel Otim Jr.", contact: "+256 773 905 117" },
      { area: "Masaka Nyendo", city: "Masaka", day: "Thursday", time: "6:00 PM", leader: "Sis. Grace Nalubega Jr.", contact: "+256 779 590 918" },
    ],
    highlights: [
      { title: "Intimate Fellowship", text: "Small group setting (8-15 people) allows for deep, personal connection and accountability." },
      { title: "Neighbourhood Based", text: "Meet in homes close to where you live for convenience and community engagement." },
      { title: "Life Application", text: "Discuss how to apply Sunday's message practically in your daily life." },
      { title: "Pastoral Care", text: "Cell leaders provide personal spiritual guidance, hospital visits, and crisis support." },
    ],
    scripture: { text: "And they, continuing daily with one accord in the temple, and breaking bread from house to house, did eat their meat with gladness and singleness of heart.", ref: "Acts 2:46" },
  },
  {
    id: "night-services",
    title: "Night Services",
    shortDesc: "Special evening worship gatherings for spiritual empowerment.",
    heroImage: img(8),
    description: [
      "Night Services at Christ's Heart Ministries are special evening gatherings designed for those who desire a deeper encounter with God. These services often carry a different atmosphere from the regular Sunday services — more intimate, more intense, and deeply prophetic.",
      "The evening setting creates a unique ambiance for worship, teaching, and ministry. Many believers have experienced life-changing encounters during our Night Services, including healings, deliverances, and profound spiritual revelations.",
      "Night Services also serve as a platform for visiting ministers and special speakers who bring fresh perspectives and anointed ministry to the congregation.",
    ],
    schedule: [
      { day: "Friday", time: "7:00 PM", details: "Friday Night Fire — Worship, Word, and Ministry" },
      { day: "Last Saturday", time: "6:00 PM", details: "Monthly Night of Encounter — Special themed evening services" },
    ],
    branchSchedules: [
      { branchId: "kampala", branchName: "Christ's Heart Kampala", city: "Kampala", times: "Friday: 7pm (Night Fire) | Last Sat: 6pm (Encounter Night)" },
      { branchId: "mukono", branchName: "Christ's Heart Mukono", city: "Mukono", times: "Friday: 7pm (Night Fire)" },
      { branchId: "jinja", branchName: "Christ's Heart Jinja", city: "Jinja", times: "Last Friday: 7pm" },
      { branchId: "mbale", branchName: "Christ's Heart Mbale", city: "Mbale", times: "Last Friday: 7pm" },
      { branchId: "makerere", branchName: "Christ's Heart Makerere", city: "Makerere", times: "Friday: 7pm (Campus Night Fire)" },
    ],
    highlights: [
      { title: "Deeper Worship", text: "Extended worship sessions that create space for intimate encounters with God." },
      { title: "Guest Ministers", text: "National and international speakers bring fresh revelation and anointed ministry." },
      { title: "Ministry Time", text: "Personal prayer, laying on of hands, and prophetic ministry available." },
      { title: "Youth-Friendly", text: "A vibrant atmosphere that resonates with young adults seeking genuine spiritual experience." },
    ],
    scripture: { text: "At midnight I will rise to give thanks unto thee because of thy righteous judgments.", ref: "Psalm 119:62" },
  },
];
