"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { formatDate } from "@/lib/format";
import { imageUrl } from "@/sanity/lib/image";

gsap.registerPlugin(useGSAP);

const LABELS = { blog: "Read Post", article: "View Article" };

function WorkItem({ item, priority }) {
  const label = LABELS[item.kind] || LABELS.article;
  const src = imageUrl(item.cover, 1000);
  const lqip = item.cover?.asset?.metadata?.lqip;

  return (
    <article className={`work-item type-${item.kind} work-${item.height}`}>
      <div className="work-item-img">
        <div className="work-item-img-wrapper">
          {src ? (
            <Image
              src={src}
              alt={item.coverAlt || ""}
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip}
              priority={priority}
            />
          ) : null}
        </div>

        <div className="work-item-info">
          <p>{item.title}</p>
          <p className="work-date">{formatDate(item.date)}</p>
        </div>
      </div>

      <div className="work-item-cta">
        <Link href={`/post/${item.slug}`}>
          <button type="button">{label}</button>
        </Link>
      </div>
    </article>
  );
}

export default function WorkGrid({ items }) {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".col .work-item", { y: 300, stagger: 0.025, opacity: 0 });
    },
    { scope: container }
  );

  // Deal the flat list into three columns so publishing a post in Studio stays
  // a matter of writing it, not rebalancing the layout by hand.
  const columns = [[], [], []];
  items.forEach((item, i) => columns[i % 3].push({ item, index: i }));

  return (
    <div className="container page-work" ref={container}>
      {columns.map((column, colIndex) => (
        <div className="col" key={colIndex}>
          {column.map(({ item, index }) => (
            <WorkItem key={item.slug} item={item} priority={index < 3} />
          ))}
        </div>
      ))}
    </div>
  );
}
