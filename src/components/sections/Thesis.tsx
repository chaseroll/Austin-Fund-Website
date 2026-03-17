"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-100px" as const };

const fundStats = [
  { label: "Fund Size", value: "$10–15M" },
  { label: "Stage", value: "Pre-Seed & Seed" },
  { label: "Avg. Check", value: "$200K" },
  { label: "Ownership", value: "1–5%" },
];

export default function Thesis() {
  return (
    <section className="py-32 md:py-40">
      <div className="px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-muted">
            Latest
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl border border-accent/20 p-10 md:p-14"
        >
          <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-accent">
            Fund I
          </h3>

          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {fundStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={ov}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              >
                <p className="text-2xl font-light tracking-tight md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium tracking-[0.15em] uppercase text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-foreground/8 pt-6 text-sm font-light md:flex-row md:gap-10">
            <p>SAFE with valuation cap & 20% discount</p>
            <p>40% reserved for follow-on</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
