"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LABELS = { blog: "Read Post", article: "View Article" };

function WorkItem({ item, priority }) {
  const label = LABELS[item.type];
  const href = item.slug ? `/post/${item.slug}` : null;

  return (
    <article className={`work-item type-${item.type} work-${item.height}`}>
      <div className="work-item-img">
        <div className="work-item-img-wrapper">
          <Image
            src={item.image}
            alt={item.alt || ""}
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            priority={priority}
          />
        </div>

        <div className="work-item-info">
          <p>{item.name}</p>
          <p className="work-date">{item.date}</p>
        </div>
      </div>

      {href && label ? (
        <div className="work-item-cta">
          <Link href={href}>
            <button type="button">{label}</button>
          </Link>
        </div>
      ) : null}
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

  // Deal the flat list into three columns so editing content/work.json stays
  // a matter of adding one object, not rebalancing the layout by hand.
  const columns = [[], [], []];
  items.forEach((item, i) => columns[i % 3].push({ item, index: i }));

  return (
    <div className="container page-work" ref={container}>
      {columns.map((column, colIndex) => (
        <div className="col" key={colIndex}>
          {column.map(({ item, index }) => (
            <WorkItem key={index} item={item} priority={index < 3} />
          ))}
        </div>
      ))}
    </div>
  );
}
