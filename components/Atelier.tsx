"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { services } from "@/lib/data";
import Price from "./Price";

// Below this width the track is a native swipe carousel instead of a
// scroll-pinned one: scroll-jacking a phone for several screens is tiring.
const PIN_QUERY = "(min-width: 1024px)";

export default function Atelier({
  onBook,
}: {
  onBook: (serviceId?: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Distance the track must travel so its last card clears the viewport.
  const x = useTransform(scrollYProgress, (progress) => {
    const track = trackRef.current;
    if (!track || !window.matchMedia(PIN_QUERY).matches) return 0;
    const distance = Math.max(0, track.scrollWidth - window.innerWidth + 80);
    return -progress * distance;
  });

  return (
    <section
      id="atelier"
      ref={sectionRef}
      className="relative bg-background lg:h-[320vh]"
    >
      <div className="flex flex-col justify-center py-24 lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden lg:pb-10 lg:pt-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-body text-[11px] uppercase tracking-ultra text-accent-strong"
          >
            The Transformation Library
          </motion.span>
          <div className="slow-stroke my-5 w-16" />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-5xl font-light leading-none text-foreground sm:text-6xl"
            >
              The Service <span className="italic text-accent">Atelier</span>
            </motion.h2>
            <span className="font-body text-[10px] uppercase tracking-ultra text-foreground/55">
              <span className="lg:hidden">Swipe to explore →</span>
              <span className="hidden lg:inline">
                Keep scrolling — the atelier moves with you
              </span>
            </span>
          </div>
        </div>

        <div className="no-scrollbar mt-10 snap-x snap-mandatory overflow-x-auto scroll-px-6 lg:mt-12 lg:snap-none lg:overflow-visible">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-4 px-6 lg:gap-8 lg:px-10"
          >
            {services.map((service, i) => (
              <article
                key={service.id}
                className="group relative aspect-[3/4] w-[78vw] max-w-[360px] shrink-0 snap-start overflow-hidden sm:w-[46vw] lg:h-[clamp(340px,calc(100svh-19rem),640px)] lg:w-auto lg:max-w-none"
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-foreground/10" />

                <span className="absolute left-5 top-5 font-body text-[10px] uppercase tracking-luxe text-background/85">
                  {String(i + 1).padStart(2, "0")} — {service.collection}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <h3 className="font-heading text-3xl font-light text-background lg:text-4xl">
                    {service.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-xs font-body text-sm font-light leading-relaxed text-background/80">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-background/25 pt-4">
                    <span className="font-body text-[11px] uppercase tracking-luxe text-background">
                      <Price
                        price={service.price}
                        comparePrice={service.comparePrice}
                      />
                      <span className="text-background/60">
                        {" "}
                        · {service.duration}
                      </span>
                    </span>
                    <button
                      onClick={() => onBook(service.bookId)}
                      aria-label={`Book ${service.name}`}
                      className="shrink-0 bg-background px-4 py-2.5 font-body text-[10px] uppercase tracking-luxe text-foreground transition-colors duration-300 hover:bg-accent hover:text-background"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <a
              href="#menu"
              className="group flex aspect-[3/4] w-[60vw] max-w-[280px] shrink-0 snap-start flex-col items-center justify-center gap-5 border border-border text-center sm:w-[36vw] lg:h-[clamp(340px,calc(100svh-19rem),640px)] lg:w-auto"
            >
              <span className="flex h-28 w-28 items-center justify-center rounded-full border border-accent/40 font-heading text-2xl font-light italic text-accent-strong transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-background">
                Prices
              </span>
              <span className="px-6 font-body text-[10px] uppercase tracking-luxe text-foreground/60">
                See the full menu &amp; launch offers
              </span>
            </a>
          </motion.div>
        </div>

        <div className="mx-auto mt-10 hidden w-full max-w-7xl px-10 lg:block">
          <div className="h-px w-full bg-border">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-px origin-left bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
