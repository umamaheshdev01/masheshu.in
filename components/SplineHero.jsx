"use client";

import dynamic from "next/dynamic";

// The Spline runtime is WebGL and weighs more than the rest of the page put
// together, so it is kept out of the server render and out of the initial
// bundle. The headline paints first; the particles arrive when they arrive.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

export default function SplineHero({ scene }) {
  return (
    <div className="hero" aria-hidden="true">
      <Spline scene={scene} />
    </div>
  );
}
