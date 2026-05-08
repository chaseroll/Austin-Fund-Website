"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PretextBridgeLetters from "../effects/PretextBridgeLetters";

export default function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.18]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] text-[#EAEAEA]"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 760px at 14% 8%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 60%), radial-gradient(900px 560px at 82% 18%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 62%), #0A0A0A",
          }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] bg-[#0A0A0A]"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: illustrationY }}
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div className="h-[68vh] w-full max-w-[1320px] opacity-[0.55] md:opacity-[0.7]">
          <PretextBridgeLetters className="h-full w-full grayscale saturate-0" />
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-b from-transparent to-[#0A0A0A]"
      />

      {/* Soft spotlight scrim behind headline + subtitle for clean readability. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div
          className="h-[52vh] w-[min(92vw,720px)]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 38%, rgba(10,10,10,0.18) 62%, rgba(10,10,10,0) 80%)",
          }}
        />
      </div>

      <div className="relative z-[3] flex min-h-dvh flex-col items-center justify-center px-6">
        <motion.div
          style={{ y: textY }}
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: "clamp(2.8rem, 9vw, 7rem)",
              fontWeight: 200,
              letterSpacing: "-0.025em",
              color: "rgba(234, 234, 234, 0.98)",
            }}
            className="font-display leading-[0.96]"
          >
            Portfolio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-[44ch] text-[clamp(15px,1.2vw,17px)] font-normal leading-[1.6] text-[#DADADA]"
          >
            Companies we&apos;ve invested in.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
