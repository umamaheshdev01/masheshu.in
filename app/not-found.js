import Link from "next/link";

export const metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="page-404">
      <h1>404</h1>
      <p>That page doesn&apos;t exist.</p>
      <Link href="/">
        <p>← Back home</p>
      </Link>
    </div>
  );
}
