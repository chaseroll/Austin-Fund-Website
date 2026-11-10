"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import BridgeModel from "../effects/BridgeModel";

export default function PortfolioHero() {
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
        <div className="h-[68svh] w-full max-w-[1320px]">
          <BridgeModel className="h-full w-full grayscale saturate-0" />
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-b from-transparent to-[#000000]"
      />

      <div className="relative z-[3] flex min-h-dvh flex-col items-center justify-center px-6">
        <motion.div
          style={{ y: reducedMotion ? 0 : textY }}
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
            className="mx-auto mt-6 max-w-[44ch] text-[clamp(15px,1.2vw,17px)] font-normal leading-[1.6] text-[#DADADA]"
          >
            Companies we&apos;ve invested in.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
