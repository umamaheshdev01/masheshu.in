"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaPalette,
  FaFolderOpen,
  FaCamera,
  FaTwitter,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

import { site } from "@/lib/site";

const items = [
  { icon: FaHome, path: "/", label: "Home" },
  { icon: FaPalette, path: "/work", label: "Work" },
  { icon: FaFolderOpen, path: "/projects", label: "Projects" },
  { icon: FaCamera, path: "/photos", label: "Photos" },
  {
    icon: FaTwitter,
    path: `https://twitter.com/${site.author.twitter.replace("@", "")}`,
    label: "Twitter",
    external: true,
  },
  { icon: FaGithub, path: site.author.github, label: "GitHub", external: true },
  {
    icon: FaEnvelope,
    path: `mailto:${site.author.email}`,
    label: "Email",
    external: true,
  },
];

function DockItem({ item, isHovered, isNeighbor, onMouseEnter, isActive }) {
  const Icon = item.icon;
  const scale = isHovered ? 2.5 : isNeighbor ? 2 : 1;
  const margin = isHovered || isNeighbor ? "28px" : "4px";

  const inner = (
    <span className="dock-item-link-wrap">
      <Icon size="14px" style={{ color: "hsl(0, 0%, 50%)" }} aria-hidden="true" />
      <span className="sr-only">{item.label}</span>
    </span>
  );

  return (
    <div
      className="dock-item"
      data-active={isActive}
      style={{ transform: `scale(${scale})`, margin: `0 ${margin}` }}
      onMouseEnter={onMouseEnter}
    >
      {item.external ? (
        <a href={item.path} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={item.path} aria-current={isActive ? "page" : undefined}>
          {inner}
        </Link>
      )}
    </div>
  );
}

export default function Dock() {
  // -1 means nothing is magnified; the original template used this to keep
  // every icon at rest until the pointer actually enters the dock.
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const pathname = usePathname();

  return (
    <nav
      className="dock-container"
      aria-label="Main"
      onMouseLeave={() => setHoveredIndex(-1)}
    >
      <div className="dock">
        {items.map((item, index) => (
          <DockItem
            key={item.label}
            item={item}
            isHovered={index === hoveredIndex}
            isNeighbor={hoveredIndex !== -1 && Math.abs(index - hoveredIndex) === 1}
            onMouseEnter={() => setHoveredIndex(index)}
            isActive={!item.external && pathname === item.path}
          />
        ))}
      </div>
    </nav>
  );
}
