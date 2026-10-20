"use client";

import { useState } from "react";
import { MotionConfig } from "motion/react";
import Preloader from "./Preloader";
import CursorGlow from "./CursorGlow";
import Header from "./Header";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Atelier from "./Atelier";
import Menu from "./Menu";
import Manifesto from "./Manifesto";
import Gallery from "./Gallery";
import About from "./About";
import Voices from "./Voices";
import Footer from "./Footer";
import BookingDrawer from "./BookingDrawer";

export default function Site() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | null>(null);
  const [openCount, setOpenCount] = useState(0);

  const reserve = (serviceId: string | null = null) => {
    setPreset(serviceId);
    setOpenCount((n) => n + 1);
    setOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-foreground focus:px-5 focus:py-3 focus:font-body focus:text-[11px] focus:uppercase focus:tracking-luxe focus:text-background"
        >
          Skip to content
        </a>
        <Preloader />
        <CursorGlow />
        <Header onReserve={() => reserve()} />

        <main id="main">
          <Hero onReserve={() => reserve()} />
          <Marquee
            items={[
              "Nails & Hands",
              "The Lash Suite",
              "Hair Architecture",
              "The Pedicure Ritual",
              "Threading",
              "Wash & Blow",
            ]}
          />
          <Atelier onBook={(id) => reserve(id ?? null)} />
          <Menu onBook={(id) => reserve(id)} />
          <Manifesto />
          <Gallery />
          <About onReserve={() => reserve()} />
          <Voices />
          <Marquee
            dark
            items={[
              "Reserve your transformation",
              "By appointment only",
              "Al Abeir, JVC, Dubai",
            ]}
          />
        </main>

        <Footer onReserve={() => reserve()} />
        <BookingDrawer
          open={open}
          onClose={() => setOpen(false)}
          presetService={preset}
          openCount={openCount}
        />
      </div>
    </MotionConfig>
  );
}
