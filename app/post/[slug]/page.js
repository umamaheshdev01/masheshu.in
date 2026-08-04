import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import { FaLink } from "react-icons/fa";

import { mdxComponents } from "@/components/mdx";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { site, absoluteUrl } from "@/lib/site";

// Every post is rendered to static HTML at build time. Drafts are built too
// so you can open the real URL and check it — they just carry a noindex tag
// and stay out of the work grid, sitemap and feed.
export function generateStaticParams() {
  return getAllPosts({ includeDrafts: true }).map((post) => ({ slug: post.slug }));
}

// A request for a slug that isn't in content/posts is a 404, not a render.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || site.description,
    keywords: post.tags,
    alternates: { canonical: `/post/${post.slug}` },
    robots: post.draft ? { index: false, follow: false } : undefined,
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

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkUnwrapImages],
    rehypePlugins: [rehypeSlug],
  },
};

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Neighbours for the prev/next links at the foot of the post.
  const published = getAllPosts();
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
    image: absoluteUrl(post.cover || site.ogImage),
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

      {post.cover ? (
        <div className="post-cover">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
          />
        </div>
      ) : null}

      <div className="post-content">
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
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
