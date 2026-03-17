"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-100px" as const };

export default function Contact() {
  return (
    <footer className="pb-8 pt-32 md:pt-40">
      <div className="px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={ov}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-[0.2em] uppercase">
              Austin Fund
            </span>
            <a
              href="mailto:innovation.fund@uaustin.org"
              className="text-sm font-light transition-colors hover:text-accent"
            >
              innovation.fund@uaustin.org
            </a>
          </div>

          <div className="flex gap-6 text-sm font-light">
            <a
              href="https://fund.ilabs.uaustin.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              Website
            </a>
            <a
              href="https://linkedin.com/innovation-fund"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={ov}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 border-t border-foreground/8 pt-6"
        >
          <p className="text-xs font-light text-muted">
            &copy; {new Date().getFullYear()} Austin Fund. University of Austin.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
