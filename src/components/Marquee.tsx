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
      transition={{ duration: 1 }}
      className="overflow-hidden py-5"
    >
      <div className="animate-marquee flex w-max items-center gap-8">
        {[...companies, ...companies].map((name, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="whitespace-nowrap text-sm font-light tracking-wide opacity-70">
              {name}
            </span>
            <span className="opacity-40">&#x2022;</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
