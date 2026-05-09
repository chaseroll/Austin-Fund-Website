"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PretextCapitolLetters from "../effects/PretextCapitolLetters";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.18]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#000000] text-[#EAEAEA]"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 760px at 14% 8%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 60%), radial-gradient(900px 560px at 82% 18%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 62%), #000000",
          }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] bg-[#000000]"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: illustrationY }}
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div className="h-[88vh] w-full max-w-[1180px] -translate-y-[6%] opacity-[0.55] md:opacity-[0.7]">
          <PretextCapitolLetters className="h-full w-full grayscale saturate-0" />
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-b from-transparent to-[#000000]"
      />

      {/* Soft spotlight scrim behind the headline + subtitle + CTA so type
          reads cleanly without erasing the capitol mosaic. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div
          className="h-[58vh] w-[min(92vw,720px)] -translate-y-[2%]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 38%, rgba(10,10,10,0.18) 62%, rgba(10,10,10,0) 80%)",
          }}
        />
      </div>

      <div className="relative z-[3] flex min-h-dvh flex-col items-center justify-center px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ y: textY }}
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
            Austin Fund
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-[44ch] text-[clamp(15px,1.2vw,17px)] font-normal leading-[1.6] text-[#DADADA]"
          >
            Pre-seed and seed venture capital for founders at the University of
            Austin.
          </motion.p>

          <motion.a
            href="mailto:info@uaustin.fund"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
            className="group mt-7 inline-flex w-fit items-center gap-3 rounded-full border border-[var(--color-hair-dark-strong)] bg-[#EAEAEA]/[0.02] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#EAEAEA]/85 backdrop-blur-sm transition-colors duration-[var(--dur-default)] ease-[var(--ease-standard)] hover:border-[#EAEAEA]/30 hover:bg-[#EAEAEA]/[0.05] hover:text-[#EAEAEA]"
          >
            <span>Get in touch</span>
            <svg
              aria-hidden
              className="h-3 w-3 transition-transform duration-[var(--dur-default)] ease-[var(--ease-emphasized)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2.5"
          >
            <span className="eyebrow text-[#EAEAEA]/40">Scroll</span>
            <span
              aria-hidden
              className="block h-7 w-px bg-gradient-to-b from-[#EAEAEA]/45 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
