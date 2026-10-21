"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

const interiorImages = [
  "/images/pedicure.jpg",
  "/images/hero-mobile-salon.jpg",
  "/images/wash-blow.jpg",
];

export default function Hero({ onPassedChange }: { onPassedChange: (passed: boolean) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const invitationRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastPassed = false;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;
      const rect = section.getBoundingClientRect();
      const passed = rect.bottom <= window.innerHeight * 0.96;
      if (passed !== lastPassed) { lastPassed = passed; onPassedChange(passed); }
      if (reduced.matches) return;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      const open = ease(progress / 0.5);
      if (leftRef.current) leftRef.current.style.transform = `rotateY(${-102 * open}deg)`;
      if (rightRef.current) rightRef.current.style.transform = `rotateY(${102 * open}deg)`;
      stage.style.setProperty("--door-copy-opacity", String(1 - ease(progress / 0.15)));
      stage.style.setProperty("--light-opacity", String(open * 0.22));
      stage.style.setProperty("--shop-backdrop-opacity", String(0.14 * ease((progress - 0.12) / 0.3)));
      stage.style.setProperty("--interior-parallax", `${(progress * 2.5).toFixed(2)}%`);
      const second = ease((progress - 0.42) / 0.22);
      const third = ease((progress - 0.72) / 0.22);
      [1 - second, second * (1 - third), third].forEach((opacity, index) => {
        if (imageRefs.current[index]) imageRefs.current[index]!.style.opacity = String(opacity);
      });
      if (invitationRef.current) invitationRef.current.inert = progress > 0.15;
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    reduced.addEventListener("change", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      reduced.removeEventListener("change", queue);
      cancelAnimationFrame(frame);
    };
  }, [onPassedChange]);

  const enter = () => {
    const collection = document.getElementById("collection-title");
    if (!collection) return;
    const instant = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches;
    collection.scrollIntoView({ behavior: instant ? "instant" : "smooth" });
    window.setTimeout(() => collection.focus({ preventScroll: true }), instant ? 0 : 700);
  };

  return (
    <section ref={sectionRef} id="top" className="portal-section js-ready" aria-label="Enter the Dimera atelier">
      <div ref={stageRef} className="portal-stage">
        <div className="portal-wall" aria-hidden="true" />
        <div className="portal-window-shadow" aria-hidden="true" />
        <div className="portal-shop-backdrop" aria-hidden="true" />
        <div className="portal-niche" aria-hidden="true"><span className="niche-reveal" /><span className="niche-threshold" /></div>
        <div className="portal-arch">
          <div className="portal-interior" aria-hidden="true">
            {interiorImages.map((src, index) => (
              <div key={src} ref={(node) => { imageRefs.current[index] = node; }} className="interior-image-layer" style={{ opacity: index === 0 ? 1 : 0 }}>
                <Image src={src} alt="" fill priority={index === 0} sizes="(max-width: 767px) 90vw, 590px" className="interior-image" />
              </div>
            ))}
            <span className="interior-light" />
          </div>
          <div ref={leftRef} className="door-leaf door-left" aria-hidden="true"><span className="door-inset" /><span className="door-pull" /></div>
          <div ref={rightRef} className="door-leaf door-right" aria-hidden="true"><span className="door-inset" /><span className="door-pull" /></div>
          <div className="portal-top"><h1 className="wordmark">DIMERA</h1></div>
          <div ref={invitationRef} className="door-invitation"><p>The ritual of transformation, refined.</p><button type="button" onClick={enter}>Enter the atelier <span aria-hidden="true">↗</span></button></div>
        </div>
      </div>
    </section>
  );
}
