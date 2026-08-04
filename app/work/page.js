import WorkGrid from "@/components/WorkGrid";
import work from "@/content/work.json";

export const metadata = {
  title: "Work",
  description:
    "Selected work, writing and photography by Soren — interactive web design and creative engineering.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work",
    description: "Selected work, writing and photography by Soren.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <h1 className="sr-only">Work</h1>
      <WorkGrid items={work} />
    </>
  );
}
