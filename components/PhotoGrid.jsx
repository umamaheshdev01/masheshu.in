"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
          {column.map(({ photo, index }) => (
            <div className="photo-frame" key={photo.src + index}>
              <Image
                src={photo.src}
                alt={photo.alt || ""}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
