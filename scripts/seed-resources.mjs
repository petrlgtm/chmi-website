import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "730sqy7i",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const books = [
  {
    _type: "resource",
    title: "Beneath the Surface",
    slug: { _type: "slug", current: "beneath-the-surface" },
    author: "Apostle Isaiah Mbuga",
    description:
      "A revealing look beyond what the eye can see. Apostle Isaiah digs into the hidden dimensions of spiritual life, uncovering the layers beneath our walk with God that determine true fruitfulness, character, and lasting impact in the Kingdom.",
    price: 20000,
    orderUrl:
      "https://wa.me/256392177825?text=Hello%2C%20I%20would%20like%20to%20order%20Beneath%20the%20Surface%20by%20Apostle%20Isaiah%20Mbuga.",
    order: 1,
  },
  {
    _type: "resource",
    title: "Rite of Passage",
    slug: { _type: "slug", current: "rite-of-passage" },
    author: "Apostle Isaiah Mbuga",
    description:
      "Every believer must pass through seasons of transition that shape their destiny. This book unpacks the spiritual rites of passage that mark a believer\u2019s growth \u2014 from salvation to maturity, from following to leading, from promise to fulfilment.",
    price: 20000,
    orderUrl:
      "https://wa.me/256392177825?text=Hello%2C%20I%20would%20like%20to%20order%20Rite%20of%20Passage%20by%20Apostle%20Isaiah%20Mbuga.",
    order: 2,
  },
  {
    _type: "resource",
    title: "Leveraging the Generation",
    slug: { _type: "slug", current: "leveraging-the-generation" },
    author: "Apostle Isaiah Mbuga",
    description:
      "A timely call to the church to intentionally invest in the next generation. Apostle Isaiah presents a compelling case for why the church must empower, equip, and release young people into their God-given assignments before the window of opportunity closes.",
    price: 20000,
    orderUrl:
      "https://wa.me/256392177825?text=Hello%2C%20I%20would%20like%20to%20order%20Leveraging%20the%20Generation%20by%20Apostle%20Isaiah%20Mbuga.",
    order: 3,
  },
  {
    _type: "resource",
    title: "Be a Man",
    slug: { _type: "slug", current: "be-a-man" },
    author: "Apostle Isaiah Mbuga",
    description:
      "A bold and unapologetic call to biblical manhood. In a generation confused about masculinity, Apostle Isaiah lays out God\u2019s original design for the man \u2014 as priest, provider, protector, and prophet in the home, the church, and the marketplace.",
    price: 70000,
    orderUrl:
      "https://wa.me/256392177825?text=Hello%2C%20I%20would%20like%20to%20order%20Be%20a%20Man%20by%20Apostle%20Isaiah%20Mbuga.",
    order: 4,
  },
  {
    _type: "resource",
    title: "Unforgotten Ministry",
    slug: { _type: "slug", current: "unforgotten-ministry" },
    author: "Apostle Isaiah Mbuga",
    description:
      "A powerful exploration of the ministries and callings that the modern church has neglected. Apostle Isaiah revisits forgotten biblical patterns of service, intercession, and sacrifice that are essential for the church to fulfil its mandate in this hour.",
    price: 70000,
    orderUrl:
      "https://wa.me/256392177825?text=Hello%2C%20I%20would%20like%20to%20order%20Unforgotten%20Ministry%20by%20Apostle%20Isaiah%20Mbuga.",
    order: 5,
  },
];

const mediaChannels = [
  {
    _type: "mediaChannel",
    label: "PROMISE TV",
    url: "https://www.instagram.com/promisetv",
    description:
      "Prophetic broadcast ministry \u2014 follow on Instagram for live streams and clips",
    color: "var(--primary)",
    order: 1,
  },
  {
    _type: "mediaChannel",
    label: "Christ\u2019s Heart TV",
    url: "https://www.youtube.com/@christshearttv",
    description:
      "Full sermons, conferences, and teachings on our YouTube channel",
    color: "var(--gold-600)",
    order: 2,
  },
];

async function seed() {
  console.log("Seeding resources...");

  const tx = client.transaction();

  for (const book of books) {
    tx.create(book);
    console.log(`  + ${book.title}`);
  }

  for (const channel of mediaChannels) {
    tx.create(channel);
    console.log(`  + ${channel.label}`);
  }

  const result = await tx.commit();
  console.log(`Done! Created ${result.results.length} documents.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
