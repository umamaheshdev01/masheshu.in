import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// Rough reading time, good enough for a byline.
function readingTime(body) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPost(filename) {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  if (!data.title) throw new Error(`content/posts/${filename} is missing a "title" in its frontmatter`);
  if (!data.date) throw new Error(`content/posts/${filename} is missing a "date" in its frontmatter`);

  return {
    slug,
    title: data.title,
    // Frontmatter dates parse as Date objects; keep an ISO string for <time> and JSON-LD.
    date: new Date(data.date).toISOString(),
    updated: data.updated ? new Date(data.updated).toISOString() : null,
    excerpt: data.excerpt || "",
    cover: data.cover || null,
    coverAlt: data.coverAlt || data.title,
    tags: data.tags || [],
    // "blog" renders a Read Post button on the work grid, "article" a View Article one.
    type: data.type || "blog",
    draft: Boolean(data.draft),
    externalUrl: data.externalUrl || null,
    content,
    readingTime: readingTime(content),
  };
}

export function getAllPosts({ includeDrafts = false } = {}) {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPost)
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPost(slug) {
  return getAllPosts({ includeDrafts: true }).find((p) => p.slug === slug) || null;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
