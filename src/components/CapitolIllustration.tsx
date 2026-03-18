"use client";

import { motion, type Variants } from "framer-motion";

const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, delay: 0.5 + i * 0.1, ease: "easeInOut" as const },
      opacity: { duration: 0.5, delay: 0.5 + i * 0.1 },
    },
  }),
};

export default function CapitolIllustration() {
  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      viewBox="0 0 500 500"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      className="w-full max-w-md text-white/50 lg:max-w-lg"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dome top ornament */}
      <motion.line x1="250" y1="60" x2="250" y2="80" variants={pathVariants} custom={0} />
      <motion.circle cx="250" cy="56" r="4" variants={pathVariants} custom={0} />

      {/* Dome outer */}
      <motion.path
        d="M200 180 Q200 100 250 80 Q300 100 300 180"
        variants={pathVariants}
        custom={1}
      />

      {/* Dome inner */}
      <motion.path
        d="M210 180 Q210 115 250 95 Q290 115 290 180"
        variants={pathVariants}
        custom={2}
      />

      {/* Dome base band */}
      <motion.rect x="190" y="180" width="120" height="12" variants={pathVariants} custom={3} />
      <motion.rect x="185" y="192" width="130" height="6" variants={pathVariants} custom={3} />

      {/* Upper colonnade */}
      <motion.rect x="195" y="198" width="110" height="60" variants={pathVariants} custom={4} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.line
          key={`upper-col-${i}`}
          x1={205 + i * 13}
          y1="202"
          x2={205 + i * 13}
          y2="255"
          variants={pathVariants}
          custom={4}
        />
      ))}

      {/* Entablature */}
      <motion.rect x="180" y="258" width="140" height="8" variants={pathVariants} custom={5} />
      <motion.line x1="180" y1="270" x2="320" y2="270" variants={pathVariants} custom={5} />

      {/* Pediment / triangular gable */}
      <motion.path d="M175 270 L250 240 L325 270" variants={pathVariants} custom={5} strokeWidth="0.5" />

      {/* Main columns */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <motion.line
          key={`main-col-${i}`}
          x1={180 + i * 16}
          y1="270"
          x2={180 + i * 16}
          y2="370"
          variants={pathVariants}
          custom={6}
        />
      ))}

      {/* Main base */}
      <motion.rect x="170" y="370" width="160" height="6" variants={pathVariants} custom={7} />
      <motion.rect x="165" y="376" width="170" height="4" variants={pathVariants} custom={7} />

      {/* Steps */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={`step-${i}`}
          x={160 - i * 10}
          y={384 + i * 8}
          width={180 + i * 20}
          height="6"
          variants={pathVariants}
          custom={8}
        />
      ))}

      {/* Left wing */}
      <motion.rect x="80" y="300" width="90" height="70" variants={pathVariants} custom={7} />
      <motion.rect x="75" y="296" width="100" height="4" variants={pathVariants} custom={7} />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={`left-col-${i}`}
          x1={90 + i * 16}
          y1="304"
          x2={90 + i * 16}
          y2="368"
          variants={pathVariants}
          custom={7}
        />
      ))}

      {/* Right wing */}
      <motion.rect x="330" y="300" width="90" height="70" variants={pathVariants} custom={7} />
      <motion.rect x="325" y="296" width="100" height="4" variants={pathVariants} custom={7} />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={`right-col-${i}`}
          x1={340 + i * 16}
          y1="304"
          x2={340 + i * 16}
          y2="368"
          variants={pathVariants}
          custom={7}
        />
      ))}

      {/* Wing bases */}
      <motion.rect x="75" y="370" width="100" height="6" variants={pathVariants} custom={8} />
      <motion.rect x="325" y="370" width="100" height="6" variants={pathVariants} custom={8} />

      {/* Grid lines (architectural blueprint feel) */}
      {[120, 200, 280, 360].map((y) => (
        <motion.line
          key={`grid-h-${y}`}
          x1="60"
          y1={y}
          x2="440"
          y2={y}
          strokeWidth="0.2"
          strokeDasharray="2 4"
          variants={pathVariants}
          custom={9}
        />
      ))}
      {[120, 200, 280, 360].map((x) => (
        <motion.line
          key={`grid-v-${x}`}
          x1={x}
          y1="50"
          x2={x}
          y2="420"
          strokeWidth="0.2"
          strokeDasharray="2 4"
          variants={pathVariants}
          custom={9}
        />
      ))}
    </motion.svg>
  );
}
