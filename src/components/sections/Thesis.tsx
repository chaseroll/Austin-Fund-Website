"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "../AnimatedCounter";

const ov = { once: true, margin: "-80px" as const };
const ease = [0.22, 1, 0.36, 1] as const;

type Stat = {
  label: string;
  display: string;
  /** When set, the value animates as a counter; otherwise it renders as static text. */
  countValue?: string;
};

const fundStats: Stat[] = [
  { label: "Fund Size", display: "$15M", countValue: "$15M" },
  { label: "Stage", display: "Pre/Seed" },
  { label: "Avg. Check", display: "$200K", countValue: "$200K" },
  { label: "Ownership", display: "5%", countValue: "5%" },
];

export default function Thesis() {
  return (
    <section className="relative overflow-hidden pt-4 pb-[var(--section-y)] text-[#EAEAEA] md:pt-8 md:pb-[var(--section-y-lg)]">
      <div className="relative mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
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
            className="block h-px w-7 origin-center bg-[var(--color-hair-dark-strong)]"
          />
          <span className="eyebrow text-[var(--color-mute-dark)]">Fund I</span>
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={ov}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="block h-px w-7 origin-center bg-[var(--color-hair-dark-strong)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-3xl"
        >
          {/* Liquid Glass surface */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[24px] bg-white/[0.03]"
            style={{
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            }}
          />
          {/* Edge ring */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-[var(--color-hair-dark-strong)]"
          />
          {/* Top specular highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[24px] bg-gradient-to-b from-white/[0.06] to-transparent"
          />

          <div className="relative p-8 md:p-12">
            <div className="flex items-center justify-between">
              <h3 className="eyebrow text-[#EAEAEA]/85">Austin Fund</h3>
              <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-[#EAEAEA]/[0.04] px-2.5 py-1 text-[var(--color-mute-dark)] ring-1 ring-inset ring-[var(--color-hair-dark-strong)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EAEAEA]/30" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#EAEAEA]/70" />
                </span>
                Raising
              </span>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-y-8 gap-x-6 md:mt-12 md:grid-cols-4 md:gap-x-10">
              {fundStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={ov}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.07,
                    ease,
                  }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="flex items-end justify-center"
                    style={{ height: "clamp(1.85rem, 3.6vw, 2.9rem)" }}
                  >
                    {stat.countValue ? (
                      <p
                        className="font-display tabular-nums font-light leading-[1] tracking-[-0.025em] text-[#EAEAEA]"
                        style={{ fontSize: "clamp(1.85rem, 3.6vw, 2.9rem)" }}
                      >
                        <AnimatedCounter value={stat.countValue} />
                      </p>
                    ) : (
                      <p
                        className="font-display font-light leading-[1] tracking-[-0.04em] text-[#EAEAEA]"
                        style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.7rem)" }}
                      >
                        {stat.display}
                      </p>
                    )}
                  </div>
                  <p className="eyebrow mt-3 text-[var(--color-mute-dark)]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
