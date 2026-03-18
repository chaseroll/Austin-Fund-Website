"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-100px" as const };

const headline =
  "Backing the next generation of founders at the University of Austin.";
const words = headline.split(" ");

const wordContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Mission() {
  return (
    <section className="relative py-32 md:py-44">
      <span className="pointer-events-none absolute right-8 top-24 select-none text-[12rem] font-extralight leading-none text-foreground/[0.03] md:right-16 md:text-[18rem]">
        01
      </span>

      <div className="relative px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="h-px w-8 bg-foreground/30" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-muted">
              About
            </span>
          </motion.div>

          <motion.h2
            variants={wordContainer}
            initial="hidden"
            whileInView="visible"
            viewport={ov}
            className="text-4xl font-light leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                className="mr-[0.3em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
