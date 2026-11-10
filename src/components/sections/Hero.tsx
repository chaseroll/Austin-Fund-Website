"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import CapitolModel from "../effects/CapitolModel";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#000000] text-[#EAEAEA]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: reducedMotion ? 0 : illustrationY }}
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div className="h-[88svh] w-full max-w-[1180px] -translate-y-[6%]">
          <CapitolModel />
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-b from-transparent to-[#000000]"
      />

      <div className="relative z-[3] flex min-h-dvh flex-col items-center justify-center px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ y: reducedMotion ? 0 : textY }}
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
            className="contact-link mt-7"
          >
            <span>Get in touch</span>
            <svg
              aria-hidden
              width="14"
              height="14"
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
      </div>
    </section>
  );
}
