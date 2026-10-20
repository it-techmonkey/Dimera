"use client";

import { useCallback, useState } from "react";
import { MotionConfig } from "motion/react";
import Preloader from "./Preloader";
import CursorGlow from "./CursorGlow";
import Header from "./Header";
import Hero from "./Hero";
import Collection from "./Collection";
import About from "./About";
import Experience from "./Experience";
import Footer from "./Footer";
import MobileBar from "./MobileBar";
import BookingDrawer from "./BookingDrawer";

export default function Site() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | null>(null);
  const [openCount, setOpenCount] = useState(0);
  const [passedHero, setPassedHero] = useState(false);
  const onPassedChange = useCallback((passed: boolean) => setPassedHero(passed), []);

  const reserve = (serviceId: string | null = null) => {
    setPreset(serviceId);
    setOpenCount((count) => count + 1);
    setOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <a href="#collection" className="skip-link">Skip the entrance and browse treatments</a>
      <Preloader />
      <CursorGlow />
      <Header onReserve={() => reserve()} passedHero={passedHero} />
      <main id="main">
        <Hero onPassedChange={onPassedChange} />
        <Collection onBook={(id) => reserve(id)} />
        <About onReserve={() => reserve()} />
        <Experience />
      </main>
      <Footer />
      <MobileBar passedHero={passedHero} bookingOpen={open} onReserve={() => reserve()} />
      <BookingDrawer open={open} onClose={() => setOpen(false)} presetService={preset} openCount={openCount} />
    </MotionConfig>
  );
}
