"use client";

import Link from "next/link";
import { useScramble } from "use-scramble";

// One hook per row, so each row scrambles independently. Extracted into its
// own component because hooks can't be called inside a map.
function ProjectRow({ project }) {
  const { ref: titleRef } = useScramble({ text: project.title, speed: 1000 });
  const { ref: copyRef } = useScramble({ text: project.copy, speed: 1000 });

  return (
    <Link href={project.url || "/work"}>
      <div className="project-item">
        <div className="project-title">
          {/* The scramble hook writes into these nodes; the text is still in
              the server-rendered HTML for crawlers. */}
          <p ref={titleRef}>{project.title}</p>
        </div>
        <div className="project-copy">
          <p ref={copyRef}>{project.copy}</p>
        </div>
        <div className="project-divider" />
        <div className="project-year">
          <p>{project.year}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectList({ projects }) {
  return (
    <div className="container page-projects">
      <h1 className="sr-only">Projects</h1>
      {projects.map((project, index) => (
        <ProjectRow key={project.title + index} project={project} />
      ))}
    </div>
  );
}
