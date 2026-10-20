"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { Menu, X } from "./icons";

export default function Header({ onReserve }: { onReserve: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for whichever section sits mid-screen.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || menuOpen ? "py-3 glass-panel lg:py-4" : "py-5 bg-transparent lg:py-7"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        <a
          href="#top"
          aria-label="Dimera — back to top"
          className="font-heading text-2xl tracking-ultra text-foreground lg:text-3xl"
        >
          DIMERA
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
              className={`relative font-body text-[11px] uppercase tracking-luxe transition-colors duration-500 hover:text-accent-strong ${
                active === link.href ? "text-foreground" : "text-foreground/65"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-500 ${
                  active === link.href ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:gap-0">
          <button
            onClick={onReserve}
            className="group relative overflow-hidden border border-foreground/30 px-4 py-2.5 font-body text-[10px] uppercase tracking-luxe text-foreground transition-colors duration-500 hover:text-background lg:px-7 lg:py-3 lg:text-[11px]"
          >
            <span className="relative z-10">Reserve</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-foreground transition-transform duration-500 group-hover:translate-y-0" />
          </button>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="px-6 pb-4 pt-4 lg:hidden">
          <div className="flex flex-col border-t border-border pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active === link.href ? "location" : undefined}
                className={`flex min-h-12 items-center justify-between border-b border-border/60 font-body text-xs uppercase tracking-luxe ${
                  active === link.href ? "text-accent-strong" : "text-foreground/80"
                }`}
              >
                {link.label}
                <span aria-hidden="true" className="text-foreground/30">
                  →
                </span>
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onReserve();
              }}
              className="mt-5 bg-foreground px-6 py-4 font-body text-[11px] uppercase tracking-luxe text-background"
            >
              Reserve a Transformation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
