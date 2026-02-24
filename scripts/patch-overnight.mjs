import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "730sqy7i",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const docId = "FhGeqeprBf6xSLFzdRqvHC";

async function patch() {
  await client
    .patch(docId)
    .set({
      schedules: [
        {
          _key: "s3a",
          day: "1st Friday",
          time: "6:00 PM \u2013 5:00 AM",
          details:
            "Branch Overnight Prayer \u2014 Every first Friday at your local branch",
        },
        {
          _key: "s3b",
          day: "Last Friday",
          time: "6:00 PM \u2013 5:00 AM",
          details:
            "All-Branches Convergence Overnight \u2014 All branches converge at Christ\u2019s Heart Mukono",
        },
      ],
      branchSchedules: [
        {
          _key: "bs1",
          branchId: "mukono",
          branchName:
            "Christ\u2019s Heart Mukono (Convergence Host)",
          city: "Mukono",
          times:
            "1st Friday: 6pm \u2013 5am | Last Friday: All-Branch Convergence 6pm \u2013 5am",
        },
        {
          _key: "bs2",
          branchId: "kampala",
          branchName: "Christ\u2019s Heart Kampala",
          city: "Kampala",
          times: "1st Friday: 6pm \u2013 5am",
        },
        {
          _key: "bs3",
          branchId: "jinja",
          branchName: "Christ\u2019s Heart Jinja",
          city: "Jinja",
          times: "1st Friday: 6pm \u2013 5am",
        },
        {
          _key: "bs4",
          branchId: "mbale",
          branchName: "Christ\u2019s Heart Mbale",
          city: "Mbale",
          times: "1st Friday: 6pm \u2013 5am",
        },
        {
          _key: "bs5",
          branchId: "lira",
          branchName: "Christ\u2019s Heart Lira",
          city: "Lira",
          times: "1st Friday: 6pm \u2013 5am",
        },
        {
          _key: "bs6",
          branchId: "gulu",
          branchName: "Christ\u2019s Heart Gulu",
          city: "Gulu",
          times: "1st Friday: 6pm \u2013 5am",
        },
        {
          _key: "bs7",
          branchId: "mbarara",
          branchName: "Christ\u2019s Heart Mbarara",
          city: "Mbarara",
          times: "1st Friday: 6pm \u2013 5am",
        },
      ],
    })
    .commit();

  console.log("Overnight Prayers updated in Sanity.");
}

patch().catch((err) => {
  console.error("Patch failed:", err.message);
  process.exit(1);
});
