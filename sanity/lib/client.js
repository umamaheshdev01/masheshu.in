import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Next caches these responses itself and drops them when the Studio webhook
  // fires, so Sanity's CDN would only add a second, slower-to-clear layer of
  // staleness on top. Freshness is handled by tags, not by polling.
  useCdn: false,
  perspective: "published",
});
