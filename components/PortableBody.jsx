import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { imageUrl, urlFor } from "@/sanity/lib/image";

/**
 * Renders the body you write in Studio. Everything here is a rendering
 * decision the site makes on your behalf — in Studio you only pick
 * "Heading", "Quote", "Image" and so on.
 *
 * Reuses the existing .post-* classes from globals.css, so the typography is
 * unchanged from the MDX version.
 */

function BodyImage({ value }) {
  const src = imageUrl(value, 1600);
  if (!src) return null;

  const { alt = "", caption, size = "default" } = value;
  // Sanity knows the real dimensions, so the placeholder box matches the
  // image's aspect ratio and the page doesn't jump as it loads.
  const dimensions = value.asset?.metadata?.dimensions;

  return (
    <figure className="post-figure">
      <div className={`post-img post-img-${size}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          placeholder={value.asset?.metadata?.lqip ? "blur" : "empty"}
          blurDataURL={value.asset?.metadata?.lqip}
          style={dimensions ? { objectFit: "cover" } : undefined}
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function BodyGallery({ value }) {
  const images = value.images || [];
  if (!images.length) return null;

  return (
    <figure className="post-figure">
      <div className="post-gallery">
        {images.map((image, i) => {
          const src = imageUrl(image, 900);
          if (!src) return null;
          return (
            <div className="post-img" key={image._key || i}>
              <Image
                src={src}
                alt={image.alt || ""}
                fill
                sizes="(max-width: 900px) 100vw, 25vw"
                placeholder={image.asset?.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={image.asset?.metadata?.lqip}
              />
            </div>
          );
        })}
      </div>
      {value.caption ? <figcaption>{value.caption}</figcaption> : null}
    </figure>
  );
}

function CodeBlock({ value }) {
  if (!value?.code) return null;
  return (
    <pre data-language={value.language || undefined}>
      <code>{value.code}</code>
    </pre>
  );
}

// Internal links go through next/link for client-side navigation; external
// ones get the safe rel attributes.
function BodyLink({ value, children }) {
  const href = value?.href || "";

  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  if (href.startsWith("#")) return <a href={href}>{children}</a>;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const components = {
  types: {
    image: BodyImage,
    gallery: BodyGallery,
    code: CodeBlock,
  },
  marks: {
    link: BodyLink,
    code: ({ children }) => <code>{children}</code>,
  },
  block: {
    // The post title is the page's H1, so body headings start at H2.
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
};

export default function PortableBody({ value }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}

export { urlFor };
