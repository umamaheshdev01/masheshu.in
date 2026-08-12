"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { imageUrl } from "@/sanity/lib/image";

gsap.registerPlugin(useGSAP);

export default function PhotoGrid({ photos }) {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".photos-col .photo-frame", {
        y: 300,
        stagger: 0.025,
        opacity: 0,
      });
    },
    { scope: container }
  );

  const columns = [[], [], []];
  photos.forEach((photo, i) => columns[i % 3].push({ photo, index: i }));

  return (
    <div className="container page-photos" ref={container}>
      {columns.map((column, colIndex) => (
        <div className="photos-col" key={colIndex}>
          {column.map(({ photo, index }) => {
            const src = imageUrl(photo.image, 1000);
            if (!src) return null;
            const lqip = photo.image?.asset?.metadata?.lqip;

            return (
              <div className="photo-frame" key={photo.id}>
                <Image
                  src={src}
                  alt={photo.alt || ""}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  placeholder={lqip ? "blur" : "empty"}
                  blurDataURL={lqip}
                  priority={index < 3}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
