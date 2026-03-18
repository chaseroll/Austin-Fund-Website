"use client";

import { motion } from "framer-motion";

const companies = [
  "Company A",
  "Company B",
  "Company C",
  "Company D",
  "Company E",
  "Company F",
  "Company G",
  "Company H",
];

export default function Marquee() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative overflow-hidden py-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0D0E0A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0D0E0A] to-transparent" />

      <div className="animate-marquee flex w-max items-center gap-10">
        {[...companies, ...companies, ...companies].map((name, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap text-[11px] font-medium tracking-[0.15em] uppercase text-[#6B6D63]/60">
              {name}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#6B6D63]/20" />
          </span>
        ))}
      </div>
    </motion.div>
  );
}
