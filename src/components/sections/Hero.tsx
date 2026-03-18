"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CapitolIllustration from "../CapitolIllustration";
import Marquee from "../Marquee";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0D0E0A] text-[#EAEAE9]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <filter id="hero-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-[0.8]">
        <div
          style={{ background: "radial-gradient(circle, rgba(142, 144, 133, 0.35) 0%, rgba(142, 144, 133, 0) 70%)" }}
          className="absolute -left-[25%] -top-[25%] h-[800px] w-[800px]"
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[#0D0E0A]"
        style={{ opacity: overlayOpacity }}
      />

      <div className="relative flex min-h-screen items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-16 lg:gap-8 lg:px-24">
          <motion.div
            className="flex flex-col justify-center pt-24 md:pt-0"
            style={{ y: textY }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 h-px w-12 origin-left bg-[#6B6D63]"
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
                className="text-[clamp(2.8rem,8vw,6.5rem)] font-light leading-[0.95] tracking-[-0.02em]"
              >
                Austin <span className="italic text-[#6B6D63]">Fund</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 max-w-sm text-[13px] font-light leading-[1.8] tracking-wide text-[#6B6D63]"
            >
              Pre-seed and seed stage venture capital backing
              university-affiliated founders.
            </motion.p>

            <motion.a
              href="mailto:innovation.fund@uaustin.org"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="group mt-10 inline-flex w-fit items-center gap-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[#EAEAE9]/60 transition-colors duration-500 hover:text-[#EAEAE9]"
            >
              <span className="relative">
                Get in touch
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#EAEAE9]/40 transition-all duration-500 group-hover:w-full" />
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: illustrationY }}
            className="hidden items-center justify-center md:flex"
          >
            <CapitolIllustration />
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-[#EAEAE9]/[0.06]">
        <Marquee />
      </div>
    </section>
  );
}
