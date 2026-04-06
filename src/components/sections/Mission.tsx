"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-80px" as const };

const headline =
  "Backing the next generation of founders at the University of Austin.";

export default function Mission() {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 text-[#0D0E0A] md:pb-28 md:pt-36">
      <div className="relative mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={ov}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10 flex items-center justify-center gap-4"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={ov}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px w-6 origin-center bg-[#3A3A3A]/25"
            />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#3A3A3A]/60">
              About
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={ov}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px w-6 origin-center bg-[#3A3A3A]/25"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-[clamp(1.75rem,4.5vw,3.5rem)] font-light leading-[1.2] tracking-[-0.015em] text-[#0D0E0A]"
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-8 max-w-md text-[14px] font-light leading-[1.8] text-[#0D0E0A]/70"
          >
            A university-owned venture fund investing $200K checks via
            post-money SAFEs at pre-seed and seed.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
