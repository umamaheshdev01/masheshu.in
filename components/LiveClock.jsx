"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  // Rendering null on the server and on the first client render keeps the
  // clock out of the HTML — otherwise the prerendered time never matches
  // the time at hydration and React logs a mismatch.
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="live-clock">
      <p suppressHydrationWarning>{time}</p>
    </div>
  );
}
