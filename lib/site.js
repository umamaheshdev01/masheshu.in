// Edit these and every page title, meta description, sitemap entry and
// social card updates. This is the one place with your identity in it.

export const site = {
  name: "Soren",
  tagline: "Artistry and Engineering",
  // Two lines of the hero headline on the home page.
  heroLines: ["Artistry and Engineering", "By Soren"],
  description:
    "Portfolio of Soren — interactive web design, creative engineering and photography.",
  // No trailing slash. Set NEXT_PUBLIC_SITE_URL in production.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_US",
  author: {
    name: "Soren",
    email: "contact@codegridweb.com",
    twitter: "@codegridweb",
    github: "https://github.com/codegrid",
  },
  // The 3D scene behind the home page headline.
  splineScene: "https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode",
  // Fallback social card, used when a post has no cover image.
  ogImage: "/work/work-2.jpg",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
