"use client";

import { motion } from "framer-motion";
import CapitolIllustration from "../CapitolIllustration";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="grid w-full grid-cols-1 items-center gap-8 px-8 md:grid-cols-2 md:px-16 lg:px-24">
        <div className="flex flex-col justify-center pt-20 md:pt-0">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10 h-px bg-accent"
          />
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl font-light tracking-tight md:text-6xl lg:text-7xl"
            >
              The Austin
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl font-light italic text-accent md:text-6xl lg:text-7xl"
            >
              Fund
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="hidden items-center justify-center md:flex"
        >
          <CapitolIllustration />
        </motion.div>
      </div>
    </section>
  );
}
