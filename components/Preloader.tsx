"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/** Curtain intro: letters rise, then the whole panel lifts away after 1.3s. */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1300);
    document.body.style.overflow = "hidden";
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (removed) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{
        duration: 1.1,
        ease: [0.76, 0, 0.24, 1],
        delay: visible ? 0 : 0.15,
      }}
      onAnimationComplete={() => !visible && setRemoved(true)}
    >
      <div className="flex overflow-hidden px-4">
        {"DIMERA".split("").map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.1 + i * 0.06,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block font-heading text-5xl font-light tracking-[0.28em] text-background sm:text-7xl lg:text-8xl"
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="absolute bottom-14 h-px bg-accent"
        initial={{ width: 0 }}
        animate={{ width: "3rem" }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      />
      <motion.p
        className="absolute bottom-8 font-body text-[9px] uppercase tracking-ultra text-background/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        The ritual of transformation
      </motion.p>
    </motion.div>
  );
}
