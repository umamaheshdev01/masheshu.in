import { absoluteUrl } from "@/lib/site";

export default function robots() {
  return {
    // /studio is the Sanity editor — it's login-walled, but there's no reason
    // to spend crawl budget on it or have it surface in results.
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
