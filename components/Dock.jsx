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

// An item with no `path` renders as an icon that doesn't go anywhere — the
// social row is present but inert until there's somewhere to point it. Give
// one a `path` (plus `external: true`) to switch it back on.
const items = [
  { icon: FaHome, path: "/", label: "Home" },
  { icon: FaFolderOpen, path: "/projects", label: "Projects" },
  { icon: FaPalette, path: "/work", label: "Work" },
  { icon: FaCamera, path: "/photos", label: "Photos" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaGithub, label: "GitHub" },
  { icon: FaEnvelope, label: site.author.email },
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

  // No destination: render the icon plainly. Not a link and not a button, so
  // it stays out of the tab order and screen readers don't announce something
  // activatable. `title` still surfaces the label on hover.
  let content;
  if (!item.path) {
    content = (
      <span className="dock-item-inert" title={item.label}>
        {inner}
      </span>
    );
  } else if (item.external) {
    content = (
      <a href={item.path} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  } else {
    content = (
      <Link href={item.path} aria-current={isActive ? "page" : undefined}>
        {inner}
      </Link>
    );
  }

  return (
    <div
      className="dock-item"
      data-active={isActive}
      style={{ transform: `scale(${scale})`, margin: `0 ${margin}` }}
      onMouseEnter={onMouseEnter}
    >
      {content}
    </div>
  );
}

export default function Dock() {
  // -1 means nothing is magnified; the original template used this to keep
  // every icon at rest until the pointer actually enters the dock.
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const pathname = usePathname();

  // Studio is a full-screen app with its own navigation; the dock would sit
  // on top of its toolbar.
  if (pathname?.startsWith("/studio")) return null;

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
