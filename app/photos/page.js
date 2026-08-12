import PhotoGrid from "@/components/PhotoGrid";
import { getAllPhotos } from "@/lib/posts";

export const metadata = {
  title: "Photos",
  description: "Photography by Uma Mahesh — light, architecture and the street.",
  alternates: { canonical: "/photos" },
  openGraph: {
    title: "Photos",
    description: "Photography by Uma Mahesh — light, architecture and the street.",
    url: "/photos",
  },
};

export default async function PhotosPage() {
  const photos = await getAllPhotos();
  return (
    <>
      <h1 className="sr-only">Photos</h1>
      <PhotoGrid photos={photos} />
    </>
  );
}
