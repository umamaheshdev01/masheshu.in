import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaLink } from "react-icons/fa";

import PortableBody from "@/components/PortableBody";
import { getAllEntries, getPost, formatDate } from "@/lib/posts";
import { imageUrl } from "@/sanity/lib/image";
import { site, absoluteUrl } from "@/lib/site";

// Posts and projects share this page — both are written in Studio and both
// live at /post/<slug>.
export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

// Anything published after the last build still renders on first request and
// is then cached, so new work in Studio doesn't need a redeploy.
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || site.description,
    keywords: post.tags,
    alternates: { canonical: `/post/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || site.description,
      url: `/post/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [site.author.name],
      tags: post.tags,
      // Card comes from opengraph-image.js in this folder.
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || site.description,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Neighbours for the prev/next links at the foot of the post. Posts and
  // projects sit in one chronological run, so a project can follow a post.
  const published = await getAllEntries();
  const index = published.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? published[index - 1] : null;
  const older = index >= 0 && index < published.length - 1 ? published[index + 1] : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Person", name: site.author.name, url: absoluteUrl("/") },
    publisher: { "@type": "Person", name: site.author.name },
    mainEntityOfPage: absoluteUrl(`/post/${post.slug}`),
    image: imageUrl(post.cover, 1200) || absoluteUrl(site.ogImage),
    keywords: post.tags.join(", "),
  };

  return (
    <article className="container page-post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="post-header">
        <div className="post-info">
          <h1>{post.title}</h1>
          <p>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {" · "}
            {post.readingTime} min read
          </p>
        </div>
        {post.externalUrl ? (
          <a
            className="post-link"
            href={post.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLink size="14px" style={{ color: "hsl(0 0% 60%)" }} aria-hidden="true" />
            <span className="sr-only">Open the original</span>
          </a>
        ) : null}
      </div>

      {imageUrl(post.cover) ? (
        <div className="post-cover">
          <Image
            src={imageUrl(post.cover, 1600)}
            alt={post.coverAlt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            placeholder={post.cover.asset?.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={post.cover.asset?.metadata?.lqip}
            priority
          />
        </div>
      ) : null}

      <div className="post-content">
        <PortableBody value={post.body} />
      </div>

      {post.tags.length ? (
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span className="post-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <nav className="post-nav" aria-label="More posts">
        {older ? (
          <Link href={`/post/${older.slug}`}>
            <p>← {older.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link href={`/post/${newer.slug}`}>
            <p>{newer.title} →</p>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <div className="white-space" />
    </article>
  );
}
