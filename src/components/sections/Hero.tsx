"use client";

import { motion } from "framer-motion";
import CapitolIllustration from "../CapitolIllustration";
import Marquee from "../Marquee";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0D0E0A] text-[#f5f4f0]">
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

      <div className="relative flex min-h-screen items-center">
        <div className="grid w-full grid-cols-1 items-center gap-8 px-8 md:grid-cols-2 md:px-16 lg:px-24">
          <div className="flex flex-col justify-center pt-20 md:pt-0">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-10 h-px bg-white/40"
            />
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-5xl font-light tracking-tight md:text-6xl lg:text-8xl"
              >
                The Austin
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-5xl font-light italic text-white/50 md:text-6xl lg:text-8xl"
              >
                Fund
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-8 max-w-sm text-sm font-light leading-relaxed text-white/40"
            >
              Pre-seed and seed stage venture capital backing
              university-affiliated founders.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.6 }}
            className="hidden items-center justify-center md:flex"
          >
            <CapitolIllustration />
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <Marquee />
      </div>
    </section>
  );
}
