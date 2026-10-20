"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { galleryItems } from "@/lib/data";
import Reveal from "./Reveal";

type Item = (typeof galleryItems)[number];

function GalleryTile({
  item,
  index,
  scrollYProgress,
}: {
  item: Item;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [item.speed, -item.speed]);

  return (
    <Reveal
      delay={index * 80}
      className={`group relative overflow-hidden ${item.span}`}
    >
      <motion.div style={{ y }} className="absolute -inset-y-12 inset-x-0">
        <Image
          src={item.src}
          alt={item.technique}
          fill
          quality={90}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100" />
      <div className="absolute bottom-0 left-0 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:p-5 [@media(hover:none)]:opacity-100">
        <span className="font-body text-[10px] uppercase tracking-luxe text-background/90">
          {item.technique}
        </span>
      </div>
    </Reveal>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative overflow-hidden bg-secondary/40 py-28 lg:py-40"
    >
      <div className="aurora right-[10%] top-[20%] h-80 w-80 bg-accent/10" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 flex flex-col items-center text-center lg:mb-24">
          <span className="font-body text-[11px] uppercase tracking-ultra text-accent-strong">
            The Proof
          </span>
          <div className="slow-stroke my-6 w-16" />
          <h2 className="font-heading text-5xl font-light leading-display text-foreground sm:text-6xl lg:text-7xl">
            The Artisan <span className="italic text-accent">Gallery</span>
          </h2>
          <p className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-muted-foreground">
            A curated collection of moments — each frame the final touch of a
            transformation.
          </p>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:auto-rows-[300px] lg:grid-cols-4 lg:gap-8">
          {galleryItems.map((item, i) => (
            <GalleryTile
              key={item.src}
              item={item}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
