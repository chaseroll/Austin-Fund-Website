"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-80px" as const };
const ease = [0.22, 1, 0.36, 1] as const;

export default function Mission() {
  return (
    <section className="relative overflow-hidden pt-[var(--section-y)] pb-[var(--section-y)] text-[#0D0E0A] md:pt-[var(--section-y-lg)] md:pb-[var(--section-y-lg)]">
      <div className="relative mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={ov}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mb-7 flex items-center justify-center gap-4"
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={ov}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="block h-px w-7 origin-center bg-[var(--color-hair-light-strong)]"
            />
            <span className="eyebrow text-[var(--color-mute-light)]">About</span>
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={ov}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="block h-px w-7 origin-center bg-[var(--color-hair-light-strong)]"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.75, delay: 0.15, ease }}
            className="font-display mx-auto max-w-3xl text-[clamp(2rem,4.8vw,3.85rem)] font-light leading-[1.08] tracking-[-0.025em] text-[#0D0E0A]"
          >
            Backing the next generation of{" "}
            <em className="display-em">founders</em>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="editorial-body mx-auto mt-5 max-w-[58ch] text-[var(--color-mute-light)]"
          >
            We lead pre-seed and seed rounds for founders at the University
            of Austin. Portfolio companies receive a $200K first check,
            direct access to the Fund&apos;s Syndicate network, and the
            opportunity to present at a Demo Day in front of partnered
            founders, angels, and VC&apos;s.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
