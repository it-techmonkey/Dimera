"use client";

import { useRef } from "react";
import { getImageProps } from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/data";

// Art direction: a portrait photo on phones, a wide one from tablet up.
const {
  props: { srcSet: desktopSrcSet },
} = getImageProps({
  src: "/images/hero-manicure-table.jpg",
  alt: "",
  fill: true,
  quality: 90,
  sizes: "100vw",
});
const { props: mobileImg } = getImageProps({
  src: "/images/hero-mobile-salon.jpg",
  alt: "A calm beauty ritual in a sunlit, ivory-toned salon",
  fill: true,
  priority: true,
  quality: 90,
  sizes: "100vw",
});

export default function Hero({ onReserve }: { onReserve: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="relative h-full w-full max-md:top-[16%] max-md:[mask-image:linear-gradient(to_bottom,transparent,black_24%)]"
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
            <img {...mobileImg} alt={mobileImg.alt} className="object-cover" />
          </picture>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
      </motion.div>

      <div
        className="aurora left-[8%] top-[12%] h-72 w-72 bg-accent/20"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="aurora bottom-[10%] right-[6%] h-96 w-96 bg-accent/15"
        style={{ animationDelay: "-7s" }}
      />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1, ease }}
          className="mb-6 font-body text-[10px] uppercase tracking-[0.25em] text-foreground/70 sm:text-[11px] sm:tracking-ultra"
        >
          A Sanctuary for the Modern Woman
        </motion.p>

        <h1
          aria-label="Dimera"
          className="flex overflow-hidden font-heading text-[21vw] font-light leading-[0.9] tracking-[0.05em] text-foreground sm:text-[17vw] lg:text-[14rem]">
          {"DIMERA".split("").map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ y: "115%", rotate: 6 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ delay: 1.4 + i * 0.07, duration: 1.1, ease }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.2, duration: 1.2, ease }}
          className="mt-8 h-px w-20 origin-center bg-accent/70"
        />

        <motion.p
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 2.4, duration: 1.2, ease }}
          className="mt-8 max-w-xl font-heading text-xl font-light italic text-foreground/80 sm:text-2xl"
        >
          The ritual of transformation, refined.
        </motion.p>

        <motion.button
          onClick={onReserve}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 1, ease }}
          className="group relative mt-12 overflow-hidden border border-foreground/40 px-12 py-4 font-body text-[11px] uppercase tracking-luxe text-foreground transition-colors duration-500 hover:text-background"
        >
          <span className="relative z-10">Start Your Ritual</span>
          <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-500 ease-out group-hover:translate-y-0" />
        </motion.button>

        <motion.a
          href="#menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1, ease }}
          className="mt-5 inline-flex min-h-11 items-center gap-2 font-body text-[10px] uppercase tracking-luxe text-foreground/75 underline-offset-[6px] transition-colors hover:text-accent-strong hover:underline"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Launch offer — view prices
        </motion.a>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="font-body text-[9px] uppercase tracking-ultra text-foreground/50"
        >
          Scroll
        </motion.span>
        <div className="h-12 w-px overflow-hidden bg-foreground/15">
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1/2 w-px bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
