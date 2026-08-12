import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // There's another lockfile higher up the tree in the home directory, which
  // Next would otherwise pick as the workspace root.
  turbopack: { root: __dirname },

  // Every image now comes from Sanity's asset CDN.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
