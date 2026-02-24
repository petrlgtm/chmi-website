import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "730sqy7i",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const overnightPrayers = {
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
    {
      _key: "sched1",
      day: "Friday",
      time: "10:00 PM - 5:00 AM",
      details:
        "Monthly All-Night Prayer \u2014 First Friday of every month",
    },
    {
      _key: "sched2",
      day: "Quarterly",
      time: "8:00 PM - 6:00 AM",
      details:
        "Prophetic Prayer Summit \u2014 Extended prayer with prophetic ministry",
    },
  ],
  isOnline: false,
  branchSchedules: [
    {
      _key: "bs1",
      branchId: "kampala",
      branchName: "Christ\u2019s Heart Kampala",
      city: "Kampala",
      times: "1st Friday: 10pm - 5am | Quarterly Prayer Summits",
    },
    {
      _key: "bs2",
      branchId: "mukono",
      branchName: "Christ\u2019s Heart Mukono",
      city: "Mukono",
      times: "1st Friday: 10pm - 4am",
    },
    {
      _key: "bs3",
      branchId: "jinja",
      branchName: "Christ\u2019s Heart Jinja",
      city: "Jinja",
      times: "1st Friday: 10pm - 4am",
    },
    {
      _key: "bs4",
      branchId: "mbale",
      branchName: "Christ\u2019s Heart Mbale",
      city: "Mbale",
      times: "Last Friday: 9pm - 4am",
    },
    {
      _key: "bs5",
      branchId: "lira",
      branchName: "Christ\u2019s Heart Lira",
      city: "Lira",
      times: "1st Friday: 10pm - 4am",
    },
    {
      _key: "bs6",
      branchId: "gulu",
      branchName: "Christ\u2019s Heart Gulu",
      city: "Gulu",
      times: "1st Friday: 10pm - 4am",
    },
    {
      _key: "bs7",
      branchId: "mbarara",
      branchName: "Christ\u2019s Heart Mbarara",
      city: "Mbarara",
      times: "1st Friday: 10pm - 4am",
    },
  ],
  highlights: [
    {
      _key: "h1",
      title: "Corporate Intercession",
      text: "United prayer for personal breakthrough, family, church, and national matters.",
    },
    {
      _key: "h2",
      title: "Prophetic Ministry",
      text: "Words of knowledge and prophetic declarations that bring direction and encouragement.",
    },
    {
      _key: "h3",
      title: "Worship & Warfare",
      text: "Extended worship sessions that break chains and release spiritual freedom.",
    },
    {
      _key: "h4",
      title: "Testimonies",
      text: "Powerful testimonies of answered prayer that build faith and inspire perseverance.",
    },
  ],
  scripture: {
    text: "And it came to pass, that at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them.",
    ref: "Acts 16:25",
  },
};

async function seed() {
  console.log("Seeding Overnight Prayers service...");
  const result = await client.create(overnightPrayers);
  console.log(`Done! Created: ${result.title} (${result._id})`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
