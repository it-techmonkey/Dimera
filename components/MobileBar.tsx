"use client";

export default function MobileBar({ passedHero, bookingOpen, onReserve }: { passedHero: boolean; bookingOpen: boolean; onReserve: () => void }) {
  if (!passedHero || bookingOpen) return null;
  return <div className="mobile-bar mobile-bar-active"><button type="button" onClick={onReserve}>Reserve <span aria-hidden="true">↗</span></button><a href="#visit">Find us <span aria-hidden="true">↗</span></a></div>;
}
