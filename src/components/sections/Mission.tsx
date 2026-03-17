"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-100px" as const };

export default function Mission() {
  return (
    <section className="py-32 md:py-40">
      <div className="px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-muted">
              About
            </span>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={ov}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10 h-px bg-accent"
          />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl font-light leading-snug tracking-tight md:text-4xl lg:text-5xl"
          >
            Backing the next generation of founders at the University of Austin.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
