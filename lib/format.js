// Kept apart from lib/posts.js so client components can format a date
// without importing the Sanity client into the browser bundle.

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
