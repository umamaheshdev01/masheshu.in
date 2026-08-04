import { Urbanist, JetBrains_Mono } from "next/font/google";

import Dock from "@/components/Dock";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted by Next at build time — no render-blocking request to Google.
const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    // Any page that sets a title gets " — Soren" appended automatically.
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.name }],
  creator: site.author.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    // No images here on purpose — app/opengraph-image.js generates the card,
    // and an explicit list would override it.
  },
  twitter: {
    card: "summary_large_image",
    creator: site.author.twitter,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/site-icon.png", apple: "/site-icon.png" },
};

export const viewport = {
  themeColor: "hsl(0 0% 7.5%)",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Dock />
        {children}
      </body>
    </html>
  );
}
