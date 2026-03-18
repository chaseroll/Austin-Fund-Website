"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ov = { once: true, margin: "-100px" as const };

const headline =
  "Backing the next generation of founders at the University of Austin.";
const words = headline.split(" ");

const wordContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-36 text-[#0D0E0A] md:py-52"
    >
      <motion.span
        style={{ y: numberY }}
        className="pointer-events-none absolute right-4 top-16 select-none font-extralight leading-none tracking-tight text-[#0D0E0A]/[0.03] text-[7rem] md:right-16 md:top-20 md:text-[18rem]"
      >
        01
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-4"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={ov}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px w-8 origin-left bg-[#2C2E20]"
            />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#2C2E20]/60">
              About
            </span>
          </motion.div>

          <motion.h2
            variants={wordContainer}
            initial="hidden"
            whileInView="visible"
            viewport={ov}
            className="text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.15] tracking-[-0.015em] text-[#0D0E0A]"
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
