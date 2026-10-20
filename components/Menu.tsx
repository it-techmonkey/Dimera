"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { priceMenu } from "@/lib/data";
import Price from "./Price";
import Reveal from "./Reveal";

/** The full price list, one category per tab. Every row books that item. */
export default function Menu({ onBook }: { onBook: (id: string) => void }) {
  const [active, setActive] = useState(priceMenu[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = priceMenu.find((g) => g.id === active) ?? priceMenu[0];

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
  const onTabKey = (e: KeyboardEvent, index: number) => {
    const last = priceMenu.length - 1;
    const next =
      e.key === "ArrowRight"
        ? index === last ? 0 : index + 1
        : e.key === "ArrowLeft"
          ? index === 0 ? last : index - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(priceMenu[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" className="relative bg-secondary/40 py-24 lg:py-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-1.5 font-body text-[10px] uppercase tracking-luxe text-accent-strong">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Launch offer now on
          </span>
          <div className="slow-stroke my-6 w-16" />
          <h2 className="font-heading text-5xl font-light leading-display text-foreground sm:text-6xl lg:text-7xl">
            The Price <span className="italic text-accent">Menu</span>
          </h2>
          <p className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-muted-foreground">
            Introductory prices for our opening season. Where a price is
            struck through, that is the standard price after launch.
          </p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Service categories"
          className="no-scrollbar -mx-6 mt-12 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 lg:mt-16"
        >
          {priceMenu.map((g, i) => {
            const selected = g.id === active;
            return (
              <button
                key={g.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`menu-tab-${g.id}`}
                aria-selected={selected}
                aria-controls="menu-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(g.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`shrink-0 rounded-full border px-5 py-2.5 font-body text-[11px] uppercase tracking-luxe transition-colors duration-300 ${
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {g.title}
              </button>
            );
          })}
        </div>

        <ul
          id="menu-panel"
          role="tabpanel"
          aria-labelledby={`menu-tab-${group.id}`}
          className="mt-8 border-t border-border lg:mt-10"
        >
          {group.items.map((item) => {
            const onOffer =
              !!item.comparePrice && item.comparePrice !== item.price;
            return (
              <li key={item.id} className="border-b border-border">
                <button
                  onClick={() => onBook(item.id)}
                  className="group flex w-full flex-col gap-1.5 py-4 text-left sm:flex-row sm:items-center sm:gap-6 sm:py-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="font-heading text-xl font-light text-foreground transition-colors duration-300 group-hover:text-accent-strong sm:text-2xl">
                      {item.name}
                    </span>
                    {onOffer && (
                      <span className="ml-3 inline-block translate-y-[-2px] bg-accent/15 px-2 py-0.5 align-middle font-body text-[9px] uppercase tracking-luxe text-accent-strong">
                        Launch
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 font-body text-xs uppercase tracking-luxe text-foreground sm:text-right sm:text-[13px]">
                    <Price price={item.price} comparePrice={item.comparePrice} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden shrink-0 font-body text-[10px] uppercase tracking-luxe text-accent-strong transition-transform duration-300 group-hover:translate-x-1 sm:inline"
                  >
                    Book →
                  </span>
                  <span className="sr-only">— book this service</span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center font-body text-xs font-light leading-relaxed text-muted-foreground">
          All prices in AED. Ranged services are confirmed with your artisan
          before treatment begins.
        </p>
      </div>
    </section>
  );
}
