"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

// Studio is a client-side app behind a Sanity login — there is nothing to
// prerender, and its routing is handled in the browser.
export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
