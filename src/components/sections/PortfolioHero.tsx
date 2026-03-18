"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BridgeIllustration from "../BridgeIllustration";

export default function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bridgeOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0D0E0A] text-[#EAEAE9]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <filter id="portfolio-hero-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#portfolio-hero-grain)"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-[0.8]">
        <div
          style={{ background: "radial-gradient(circle, rgba(142, 144, 133, 0.35) 0%, rgba(142, 144, 133, 0) 70%)" }}
          className="absolute -left-[10%] -top-[10%] h-[800px] w-[800px]"
        />
      </div>

      <motion.div
        style={{ opacity: bridgeOpacity }}
        className="pointer-events-none absolute bottom-0 left-0 right-0"
      >
        <BridgeIllustration />
      </motion.div>

      <div className="relative pb-20 md:pb-28" style={{ paddingTop: "40vh" }}>
        <motion.div
          style={{ y: textY }}
          className="mx-auto w-full max-w-7xl px-6 md:px-16 lg:px-24"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 h-px w-12 origin-left bg-[#6B6D63]"
          />

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
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
                  Portfolio
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-[clamp(2.8rem,8vw,6.5rem)] font-light italic leading-[0.95] tracking-[-0.02em] text-[#6B6D63]"
                >
                  Companies
                </motion.h1>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xs text-[13px] font-light leading-[1.8] tracking-wide text-[#6B6D63] md:text-right"
            >
              The founders and companies we&apos;re proud to back at the
              earliest stages.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
