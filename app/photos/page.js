import PhotoGrid from "@/components/PhotoGrid";
import photos from "@/content/photos.json";

export const metadata = {
  title: "Photos",
  description: "Photography by Soren — light, architecture and the street.",
  alternates: { canonical: "/photos" },
  openGraph: {
    title: "Photos",
    description: "Photography by Soren — light, architecture and the street.",
    url: "/photos",
  },
};

export default function PhotosPage() {
  return (
    <>
      <h1 className="sr-only">Photos</h1>
      <PhotoGrid photos={photos} />
    </>
  );
}
