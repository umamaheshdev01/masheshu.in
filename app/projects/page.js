import ProjectList from "@/components/ProjectList";
import projects from "@/content/projects.json";

export const metadata = {
  title: "Projects",
  description:
    "Projects by Soren — web artistry, interactive media, cloud architecture and applied AI.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description: "Projects by Soren, from 2022 to today.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectList projects={projects} />;
}
