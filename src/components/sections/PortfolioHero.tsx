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
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.32]);

  return (
    <section
      ref={sectionRef}
      className="hero-full relative overflow-hidden bg-[#0A0A0A] text-[#EAEAEA]"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 760px at 14% 8%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 60%), radial-gradient(900px 560px at 82% 18%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 62%), #0A0A0A",
          }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] bg-[#0A0A0A]"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: illustrationY }}
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div className="h-[62vh] w-full max-w-[1280px] opacity-[0.28] md:opacity-[0.38]">
          <PretextBridgeLetters className="h-full w-full grayscale saturate-0" />
        </div>
      </motion.div>

      <div className="relative z-[3] flex h-full flex-col items-center justify-center">
        <motion.div
          style={{ y: textY }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 h-px w-12 origin-center bg-[#767676]"
          />

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="whitespace-nowrap text-[clamp(2.8rem,8vw,6.5rem)] font-light leading-[0.95] tracking-[-0.02em]"
            >
              Portfolio
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-sm px-6 text-[13px] font-light leading-[1.8] tracking-wide text-[#A2A2A2]"
          >
            Companies we&apos;ve invested in.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
