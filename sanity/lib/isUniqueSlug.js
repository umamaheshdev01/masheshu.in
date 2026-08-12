/**
 * Posts and projects both render at /post/<slug>, so a slug has to be unique
 * across *both* types. Sanity's built-in check only looks within one type,
 * which would let a project silently shadow a post.
 */
export async function isUniqueAcrossTypes(slug, context) {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2024-10-01" });

  // Drafts and published versions of the same doc share an id, so ignore both.
  const id = document._id.replace(/^drafts\./, "");

  const params = { draft: `drafts.${id}`, published: id, slug };
  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    _type in ["post", "project"] &&
    slug.current == $slug
  ][0]._id)`;

  return client.fetch(query, params);
}
