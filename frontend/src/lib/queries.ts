// GROQ queries for Sanity CMS

export const BRANCHES_QUERY = `*[_type == "branch"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  address,
  phone,
  email,
  city,
  country,
  lat,
  lng,
  status,
  services,
  "images": images[].asset->url
}`;

export const PASTORS_QUERY = `*[_type == "pastor"] {
  _id,
  name,
  role,
  phone,
  email,
  "image": image.asset->url,
  "branchSlug": branch->slug.current
}`;

export const EVENTS_QUERY = `*[_type == "event"] | order(dateStart asc) {
  _id,
  name,
  "slug": slug.current,
  dateStart,
  "date": dateDisplay,
  time,
  location,
  description,
  "image": image.asset->url,
  tagline,
  "category": category->name,
  isMajor
}`;

export const EVENT_CATEGORIES_QUERY = `*[_type == "eventCategory"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  colorCode
}`;

export const SERVICES_QUERY = `*[_type == "serviceType"] | order(title asc) {
  _id,
  title,
  "id": slug.current,
  shortDesc,
  description,
  "heroImage": heroImage.asset->url,
  schedules,
  branchSchedules,
  cellLocations,
  highlights,
  scripture
}`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  author,
  category,
  excerpt,
  content,
  "image": featuredImage.asset->url,
  publishedAt,
  readTime,
  status
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  author,
  category,
  excerpt,
  content,
  "image": featuredImage.asset->url,
  publishedAt,
  readTime
}`;

export const FAITH_STATEMENTS_QUERY = `*[_type == "statementOfFaith"] | order(order asc) {
  _id,
  order,
  text,
  category,
  scriptureReference
}`;

export const ORGANIZATION_INFO_QUERY = `*[_type == "organizationInfo"][0] {
  _id,
  name,
  foundedYear,
  email,
  phone,
  address,
  officeHours,
  mission,
  vision,
  socialLinks
}`;

export const LEADERSHIP_QUERY = `*[_type == "leadership"] | order(order asc) {
  _id,
  name,
  title,
  role,
  bio,
  "image": image.asset->url,
  order
}`;

export const GIVE_CATEGORIES_QUERY = `*[_type == "giveCategory"] | order(order asc) {
  _id,
  name,
  description,
  icon,
  order
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) {
  _id,
  name,
  text,
  branch,
  order
}`;

export const SITE_IMAGES_QUERY = `*[_type == "siteImages" && _id == "siteImages"][0] {
  "heroHome": heroHome.asset->url,
  "heroAbout": heroAbout.asset->url,
  "heroBlog": heroBlog.asset->url,
  "heroEvents": heroEvents.asset->url,
  "heroSermons": heroSermons.asset->url,
  "heroGive": heroGive.asset->url,
  "heroResources": heroResources.asset->url,
  "heroContact": heroContact.asset->url,
  "heroBranches": heroBranches.asset->url,
  "serviceCards": serviceCards[]{ "url": asset->url, label, alt },
  "aboutGallery": aboutGallery[]{ "url": asset->url, alt },
  "giveImpact": giveImpact[]{ "url": asset->url, alt }
}`;
