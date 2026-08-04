import { FaSquareFull } from "react-icons/fa";

import SplineHero from "@/components/SplineHero";
import LiveClock from "@/components/LiveClock";
import { site, absoluteUrl } from "@/lib/site";

export const metadata = {
  // The layout's default title already reads "Soren — Artistry and
  // Engineering", so the home page opts out of the "%s — Soren" template.
  title: { absolute: `${site.name} — ${site.tagline}` },
  description: site.description,
  alternates: { canonical: "/" },
};

// Tells Google this is a person's portfolio rather than a company site, and
// wires the social profiles to the name.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author.name,
  url: absoluteUrl("/"),
  description: site.description,
  email: `mailto:${site.author.email}`,
  sameAs: [
    site.author.github,
    `https://twitter.com/${site.author.twitter.replace("@", "")}`,
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <SplineHero scene={site.splineScene} />

      <div className="hero-header">
        {/* One <h1> across both lines — the original template used two, which
            gives the page two competing top-level headings. */}
        <h1>
          {site.heroLines.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>
      </div>

      <div className="home-logo">
        <FaSquareFull size="16px" style={{ color: "#fff" }} aria-hidden="true" />
      </div>

      <LiveClock />
    </>
  );
}
