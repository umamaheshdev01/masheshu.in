import Image from "next/image";
import Link from "next/link";

/**
 * Components available inside every .mdx post without importing anything.
 *
 *   <Figure src="/work/work-2.jpg" alt="..." caption="..." size="wide" />
 *   <Gallery images={[{ src, alt }, { src, alt }]} caption="..." />
 *
 * size: "default" | "wide" | "inset"
 */

export function Figure({ src, alt = "", caption, size = "default" }) {
  return (
    <figure className="post-figure">
      <div className={`post-img post-img-${size}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Gallery({ images = [], caption }) {
  return (
    <figure className="post-figure">
      <div className="post-gallery">
        {images.map((image, i) => (
          <div className="post-img" key={(image.src || image) + i}>
            <Image
              src={image.src || image}
              alt={image.alt || ""}
              fill
              sizes="(max-width: 900px) 100vw, 25vw"
            />
          </div>
        ))}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

// Plain markdown `![alt](/path.jpg)` lands here, so authors get optimized
// images without having to reach for a component.
function MdxImage({ src, alt }) {
  return <Figure src={src} alt={alt} caption={alt || undefined} />;
}

// Internal links go through next/link for client-side navigation; external
// ones get the safe rel attributes.
function MdxLink({ href = "", children, ...props }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  Figure,
  Gallery,
  img: MdxImage,
  a: MdxLink,
};
