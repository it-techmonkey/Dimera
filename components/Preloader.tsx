"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem("dimera-opening") === "1"; } catch { /* Storage may be unavailable. */ }
    if (seen || reduced) {
      const remove = window.setTimeout(() => { setHidden(true); setRemoved(true); }, 0);
      return () => window.clearTimeout(remove);
    }
    try { sessionStorage.setItem("dimera-opening", "1"); } catch { /* Storage may be unavailable. */ }
    const hide = window.setTimeout(() => setHidden(true), 720);
    const remove = window.setTimeout(() => setRemoved(true), 1100);
    return () => { window.clearTimeout(hide); window.clearTimeout(remove); };
  }, []);

  if (removed) return null;
  return <div className={`preloader ${hidden ? "is-hidden" : ""}`} aria-hidden="true"><span>The beauty atelier · Dubai</span><strong>DIMERA</strong><i /></div>;
}
