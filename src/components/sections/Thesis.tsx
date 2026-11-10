"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "../AnimatedCounter";

const ov = { once: true, margin: "-80px" as const };
const ease = [0.22, 1, 0.36, 1] as const;

type Stat = {
  label: string;
  display: string;
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
          <h2 className="eyebrow text-[var(--color-mute-dark)]">Fund I</h2>
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
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mx-auto w-full max-w-3xl border-y border-[var(--color-hair-dark-strong)] py-8 md:py-10"
        >
          <div className="flex items-center justify-between gap-6">
            <span className="eyebrow text-[#EAEAEA]/85">Austin Fund</span>
            <span className="eyebrow text-[var(--color-mute-dark)]">Raising</span>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-y-8 md:mt-12 md:grid-cols-4">
            {fundStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={ov}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease }}
                className={`flex min-w-0 flex-col items-center border-[var(--color-hair-dark-strong)] px-2 text-center ${i % 2 === 1 ? "border-l" : ""} ${i === 2 ? "md:border-l" : ""}`}
              >
                <dt className="eyebrow order-2 mt-3 text-[var(--color-mute-dark)]">{stat.label}</dt>
                <dd className="font-display tabular-nums font-light leading-none tracking-[-0.025em] text-[#EAEAEA] text-[clamp(1.75rem,3.4vw,2.7rem)]">
                  {stat.countValue ? <AnimatedCounter value={stat.countValue} /> : stat.display}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
