import { ImageResponse } from "next/og";

import { getAllEntries, getPost, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function PostOpengraphImage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const title = post?.title || site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "hsl(0, 0%, 7.5%)",
          color: "hsl(0, 0%, 90%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "hsl(0, 0%, 40%)" }}>
          <span>{site.name}</span>
          <span>{post ? formatDate(post.date) : ""}</span>
        </div>

        <div style={{ fontSize: 68, lineHeight: 1.15, letterSpacing: -2, maxWidth: 900 }}>
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "hsl(0, 0%, 40%)" }}>
          <div style={{ width: 14, height: 14, backgroundColor: "#fff" }} />
          <span>{post?.excerpt ? post.excerpt.slice(0, 90) : site.tagline}</span>
        </div>
      </div>
    ),
    size
  );
}
