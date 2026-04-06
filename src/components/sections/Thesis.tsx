"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "../AnimatedCounter";

const ov = { once: true, margin: "-80px" as const };

const fundStats = [
  { label: "Fund Size", value: "$10–15M", countValue: "$15M" },
  { label: "Stage", value: "Pre-Seed & Seed", countValue: "" },
  { label: "Avg. Check", value: "$200K", countValue: "$200K" },
  { label: "Ownership", value: "1–5%", countValue: "5%" },
];

export default function Thesis() {
  return (
    <section className="relative overflow-hidden pb-28 pt-4 text-[#0D0E0A] md:pb-36 md:pt-8">
      <div className="relative mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
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
            Fund I
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={ov}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-6 origin-center bg-[#3A3A3A]/25"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[#0D0E0A]/[0.05] bg-[#0D0E0A]/[0.012] p-8 md:p-14"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#0D0E0A]/80">
              Austin Fund
            </h3>
            <span className="flex items-center gap-2 text-[11px] font-light tracking-wider text-[#3A3A3A]/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3A3A3A]/40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3A3A3A]/80" />
              </span>
              Raising
            </span>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-y-8 gap-x-6 md:grid-cols-4 md:gap-x-10">
            {fundStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={ov}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="text-[clamp(1.4rem,3vw,2.4rem)] font-light tracking-tight text-[#0D0E0A]">
                  {stat.countValue ? (
                    <AnimatedCounter value={stat.countValue} />
                  ) : (
                    <span className="text-xl md:text-2xl">{stat.value}</span>
                  )}
                </p>
                <p className="mt-2.5 text-[10px] font-medium tracking-[0.18em] uppercase text-[#3A3A3A]/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
