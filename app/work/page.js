import WorkGrid from "@/components/WorkGrid";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Work",
  description:
    "Selected work and writing by Uma Mahesh — coding and creative engineering.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work",
    description: "Selected work and writing by Uma Mahesh.",
    url: "/work",
  },
};

export default async function WorkPage() {
  const posts = await getAllPosts();
  return (
    <>
      <h1 className="sr-only">Work</h1>
      <WorkGrid items={posts} />
    </>
  );
}
