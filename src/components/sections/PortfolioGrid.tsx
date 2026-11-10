"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-80px" as const };
const ease = [0.22, 1, 0.36, 1] as const;

export default function PortfolioGrid() {
  return (
    <section className="relative bg-[#000000] pt-12 pb-[var(--section-y)] md:pt-16 md:pb-[var(--section-y-lg)]">
      <div className="relative mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="flex flex-col items-center justify-center text-center"
        >
          <h2 className="font-display text-[clamp(2rem,4.8vw,3.85rem)] font-light leading-[1.08] tracking-[-0.025em] text-[#EAEAEA]/95">
            Companies announcing soon.
          </h2>
          <p className="editorial-body mt-5 max-w-[44ch] text-[var(--color-mute-dark)]">
            We&apos;re finalizing public portfolio announcements and will share
            them here shortly.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
