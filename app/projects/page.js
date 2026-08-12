import ProjectList from "@/components/ProjectList";
import { getAllProjects } from "@/lib/posts";

export const metadata = {
  title: "Projects",
  description:
    "Projects by Uma Mahesh — coding, engineering and applied AI.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description: "Projects by Uma Mahesh.",
    url: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectList projects={projects} />;
}
