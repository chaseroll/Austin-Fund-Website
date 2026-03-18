"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-100px" as const };

export default function Contact() {
  return (
    <footer className="bg-[#0D0E0A] text-[#f5f4f0]">
      <div className="px-8 py-10 md:px-16 md:py-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={ov}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium tracking-[0.2em] uppercase">
              Austin Fund
            </span>
            <a
              href="mailto:innovation.fund@uaustin.org"
              className="mt-2 text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              innovation.fund@uaustin.org
            </a>
          </div>

          <div className="flex gap-8 text-sm font-light">
            <a
              href="https://fund.ilabs.uaustin.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
            >
              Website
            </a>
            <a
              href="https://linkedin.com/innovation-fund"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>

        <p className="mt-10 text-[10px] font-light tracking-wider text-white/40">
          &copy; {new Date().getFullYear()} Austin Fund. University of Austin.
        </p>
      </div>
    </footer>
  );
}
