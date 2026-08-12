import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Turns a Sanity image reference into a CDN URL. Respects the hotspot you
// set in Studio, so cropping stays sensible at any aspect ratio.
export function urlFor(source) {
  return builder.image(source).auto("format").fit("max");
}

// next/image needs a plain string. Width is a hint, not a hard cap.
export function imageUrl(source, width = 1600) {
  if (!source?.asset) return null;
  return urlFor(source).width(width).url();
}
