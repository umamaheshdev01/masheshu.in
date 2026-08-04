import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          backgroundColor: "hsl(0, 0%, 7.5%)",
          color: "hsl(0, 0%, 90%)",
        }}
      >
        <div style={{ width: 18, height: 18, backgroundColor: "#fff" }} />
        <div style={{ fontSize: 64, letterSpacing: -1.5 }}>{site.tagline}</div>
        {/* Satori needs every multi-child node to declare a display, so
            interpolations are collapsed into single strings. */}
        <div style={{ fontSize: 32, color: "hsl(0, 0%, 40%)" }}>
          {`By ${site.name}`}
        </div>
      </div>
    ),
    size
  );
}
