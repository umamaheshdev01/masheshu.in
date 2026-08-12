import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity calls this when you publish, so the live site updates without a
 * redeploy. Configure it once in Studio:
 *
 *   sanity.io/manage → API → Webhooks → Create webhook
 *   URL:     https://<your-domain>/api/revalidate
 *   Dataset: production
 *   Trigger: Create, Update, Delete
 *   Secret:  the value of SANITY_REVALIDATE_SECRET
 *   Payload: {"_type": _type}
 */
export async function POST(request) {
  try {
    const { isValidSignature, body } = await parseBody(
      request,
      process.env.SANITY_REVALIDATE_SECRET
    );

    // An unsigned request is either a misconfigured webhook or someone
    // poking the endpoint. Either way it doesn't get to bust the cache.
    if (!isValidSignature) {
      return Response.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return Response.json({ message: "Bad request" }, { status: 400 });
    }

    // Tag the specific type plus the catch-all the queries share, so a
    // published post also refreshes the sitemap and the feed.
    revalidateTag(body._type);
    revalidateTag("content");

    return Response.json({ revalidated: true, type: body._type });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
