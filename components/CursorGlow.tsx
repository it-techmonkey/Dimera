"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eligible = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!eligible.matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame = 0;
    const tick = () => {
      frame = 0;
      if (document.hidden) return;
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const cursor = ref.current;
      if (!cursor) return;
      cursor.classList.add("is-active");
      cursor.dataset.mode = (event.target as Element).closest(".portal-arch") ? "enter" : "halo";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) ref.current?.classList.remove("is-active");
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave);
    frame = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-ambient" data-mode="halo" aria-hidden="true"><span /></div>;
}
