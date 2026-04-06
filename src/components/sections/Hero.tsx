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
        transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: illustrationY }}
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div className="h-[80vh] w-full max-w-[1100px] -translate-y-[8%] opacity-[0.28] md:opacity-[0.38]">
          <PretextCapitolLetters className="h-full w-full grayscale saturate-0" />
        </div>
      </motion.div>

      <div className="relative z-[3] flex h-full flex-col items-center justify-center">
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ y: textY }}
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
              style={{
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                fontWeight: 200,
                letterSpacing: "-0.02em",
                color: "rgba(234, 234, 234, 0.92)",
              }}
              className="whitespace-nowrap leading-[0.95]"
            >
              Austin Fund
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-sm px-6 text-[13px] font-light leading-[1.8] tracking-wide text-[#A2A2A2]"
          >
            Pre-seed and seed venture capital for founders
            at the University of Austin.
          </motion.p>

          <motion.a
            href="mailto:info@uaustin.fund"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="group mt-7 inline-flex w-fit items-center gap-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[#EAEAEA]/80 transition-colors duration-500 hover:text-[#EAEAEA]"
          >
            <span className="relative">
              Get in touch
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#EAEAEA]/50 transition-all duration-500 group-hover:w-full" />
            </span>
            <svg
              className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
