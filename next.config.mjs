import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // There's another lockfile higher up the tree in the home directory, which
  // Next would otherwise pick as the workspace root.
  turbopack: { root: __dirname },
};

export default nextConfig;
