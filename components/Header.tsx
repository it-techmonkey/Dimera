"use client";

import { useState } from "react";
import { navLinks } from "@/lib/data";

export default function Header({ onReserve, passedHero }: { onReserve: () => void; passedHero: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={`site-header ${passedHero || menuOpen ? "is-scrolled" : ""}`}>
        <a className="header-mark" href="#top" aria-label="Dimera, return to top">Dimera<span>.</span></a>
        <nav aria-label="Main navigation">
          {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="header-reserve" type="button" onClick={onReserve}>Reserve <span aria-hidden="true">↗</span></button>
          <button
            type="button"
            className="header-menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >{menuOpen ? "×" : "☰"}</button>
        </div>
        {menuOpen && (
          <div id="mobile-navigation" className="mobile-navigation">
            {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<span aria-hidden="true">↗</span></a>)}
          </div>
        )}
      </header>
    </>
  );
}
