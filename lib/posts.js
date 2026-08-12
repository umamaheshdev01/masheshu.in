import { client } from "@/sanity/lib/client";

/**
 * Everything the site reads from Sanity goes through this file.
 *
 * Posts and projects are separate document types but share one URL space
 * (/post/<slug>) and one detail page, so the shapes they return match.
 */

// Rough reading time, good enough for a byline. Portable Text is an array of
// blocks; only the text spans count toward the word total.
function readingTime(body = []) {
  const words = body
    .filter((block) => block._type === "block")
    .flatMap((block) => (block.children || []).map((child) => child.text || ""))
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}

// Dereferencing the asset pulls down the LQIP blur placeholder and the real
// pixel dimensions, so images fade in at the right aspect ratio instead of
// collapsing the layout while they load.
const IMAGE_ASSET = `asset->{ _id, metadata { lqip, dimensions } }`;

// Shared projection. `kind` drives the grid button label — projects don't
// have the field, so they fall back to a sensible default.
const ENTRY_FIELDS = `
  "slug": slug.current,
  _type,
  title,
  date,
  updated,
  excerpt,
  cover { ..., ${IMAGE_ASSET} },
  "coverAlt": coalesce(cover.alt, title),
  tags,
  height,
  externalUrl,
  copy,
  year,
  "kind": coalesce(kind, "article")
`;

// Images can appear inline in the body or inside a gallery block; both need
// the same asset expansion.
const BODY_FIELDS = `
  body[] {
    ...,
    _type == "image" => { ..., ${IMAGE_ASSET} },
    _type == "gallery" => { ..., images[] { ..., ${IMAGE_ASSET} } }
  }
`;

function normalize(doc) {
  if (!doc) return null;

  return {
    ...doc,
    // Dates come back as YYYY-MM-DD. Parse as UTC so a date never slips a day
    // in a negative-offset timezone.
    date: doc.date ? new Date(`${doc.date}T00:00:00Z`).toISOString() : null,
    updated: doc.updated ? new Date(`${doc.updated}T00:00:00Z`).toISOString() : null,
    excerpt: doc.excerpt || "",
    tags: doc.tags || [],
    height: doc.height || 250,
    body: doc.body || [],
    readingTime: readingTime(doc.body),
  };
}

// Next caches these fetches and rebuilds the affected pages when the webhook
// in app/api/revalidate fires, so publishing in Studio updates the live site
// without a redeploy.
function fetchSanity(query, params = {}, tags = []) {
  return client.fetch(query, params, {
    next: { tags: ["content", ...tags] },
  });
}

/** Posts and articles — the /work grid, the sitemap and the RSS feed. */
export async function getAllPosts() {
  const docs = await fetchSanity(
    `*[_type == "post" && defined(slug.current)] | order(date desc) { ${ENTRY_FIELDS} }`,
    {},
    ["post"]
  );
  return docs.map(normalize);
}

/** Projects — the /projects list. */
export async function getAllProjects() {
  const docs = await fetchSanity(
    `*[_type == "project" && defined(slug.current)] | order(date desc) { ${ENTRY_FIELDS} }`,
    {},
    ["project"]
  );
  return docs.map(normalize);
}

/** Every slug that needs a page built at /post/<slug>. */
export async function getAllEntries() {
  const docs = await fetchSanity(
    `*[_type in ["post", "project"] && defined(slug.current)] | order(date desc) { ${ENTRY_FIELDS} }`,
    {},
    ["post", "project"]
  );
  return docs.map(normalize);
}

/** One post or project, with its body, for the detail page. */
export async function getPost(slug) {
  const doc = await fetchSanity(
    `*[_type in ["post", "project"] && slug.current == $slug][0] { ${ENTRY_FIELDS}, ${BODY_FIELDS} }`,
    { slug },
    ["post", "project"]
  );
  return normalize(doc);
}

/** The /photos grid. */
export async function getAllPhotos() {
  return fetchSanity(
    `*[_type == "photo" && defined(image.asset)] | order(order asc, _createdAt desc) {
      "id": _id,
      image { ..., ${IMAGE_ASSET} },
      alt
    }`,
    {},
    ["photo"]
  );
}

export { formatDate } from "@/lib/format";
