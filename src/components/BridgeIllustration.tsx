"use client";

import { motion, type Variants } from "framer-motion";

const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 2,
        delay: 0.5 + i * 0.1,
        ease: "easeInOut" as const,
      },
      opacity: { duration: 0.5, delay: 0.5 + i * 0.1 },
    },
  }),
};

export default function BridgeIllustration() {
  const towers = [100, 260, 420, 580, 740, 900];
  const cableYTop = 110;
  const deckY = 200;
  const towerTop = 90;
  const towerBottom = 300;

  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      viewBox="0 0 1000 360"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      className="w-full text-[#EAEAE9]/[0.08]"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid lines */}
      {[100, 150, 200, 250, 300].map((y) => (
        <motion.line
          key={`grid-h-${y}`}
          x1="0"
          y1={y}
          x2="1000"
          y2={y}
          strokeWidth="0.2"
          strokeDasharray="2 4"
          variants={pathVariants}
          custom={9}
        />
      ))}
      {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
        <motion.line
          key={`grid-v-${x}`}
          x1={x}
          y1="60"
          x2={x}
          y2="340"
          strokeWidth="0.2"
          strokeDasharray="2 4"
          variants={pathVariants}
          custom={9}
        />
      ))}

      {/* Main deck */}
      <motion.line
        x1="0" y1={deckY} x2="1000" y2={deckY}
        strokeWidth="1"
        variants={pathVariants} custom={2}
      />
      <motion.line
        x1="0" y1={deckY + 4} x2="1000" y2={deckY + 4}
        strokeWidth="0.5"
        variants={pathVariants} custom={2}
      />

      {/* Railing */}
      <motion.line
        x1="0" y1={deckY - 8} x2="1000" y2={deckY - 8}
        strokeWidth="0.4"
        variants={pathVariants} custom={3}
      />
      {Array.from({ length: 80 }, (_, i) => (
        <motion.line
          key={`rail-${i}`}
          x1={12.5 * i} y1={deckY - 8}
          x2={12.5 * i} y2={deckY}
          strokeWidth="0.3"
          variants={pathVariants} custom={3}
        />
      ))}

      {/* Towers */}
      {towers.map((tx, ti) => (
        <g key={`tower-${ti}`}>
          <motion.line x1={tx - 8} y1={towerTop} x2={tx - 8} y2={towerBottom} strokeWidth="1" variants={pathVariants} custom={1} />
          <motion.line x1={tx + 8} y1={towerTop} x2={tx + 8} y2={towerBottom} strokeWidth="1" variants={pathVariants} custom={1} />
          <motion.line x1={tx - 12} y1={towerTop} x2={tx + 12} y2={towerTop} strokeWidth="0.75" variants={pathVariants} custom={1} />
          <motion.line x1={tx - 10} y1={towerTop - 4} x2={tx + 10} y2={towerTop - 4} strokeWidth="0.5" variants={pathVariants} custom={0} />
          <motion.line x1={tx - 8} y1={deckY - 20} x2={tx + 8} y2={deckY - 20} strokeWidth="0.5" variants={pathVariants} custom={2} />
          <motion.line x1={tx - 8} y1={deckY + 30} x2={tx + 8} y2={deckY + 30} strokeWidth="0.5" variants={pathVariants} custom={2} />
          <motion.rect x={tx - 14} y={towerBottom - 4} width={28} height={8} strokeWidth="0.5" variants={pathVariants} custom={4} />
          <motion.rect x={tx - 18} y={towerBottom + 4} width={36} height={6} strokeWidth="0.5" variants={pathVariants} custom={4} />
        </g>
      ))}

      {/* Suspension cables */}
      {towers.slice(0, -1).map((tx, ti) => {
        const nextTx = towers[ti + 1];
        const midX = (tx + nextTx) / 2;
        const sagY = deckY - 6;
        return (
          <g key={`cable-${ti}`}>
            <motion.path d={`M${tx} ${cableYTop} Q${midX} ${sagY} ${nextTx} ${cableYTop}`} strokeWidth="0.75" variants={pathVariants} custom={5} />
            <motion.path d={`M${tx} ${cableYTop + 8} Q${midX} ${sagY + 6} ${nextTx} ${cableYTop + 8}`} strokeWidth="0.4" variants={pathVariants} custom={5} />
          </g>
        );
      })}

      {/* Vertical suspender cables */}
      {towers.slice(0, -1).map((tx, ti) => {
        const nextTx = towers[ti + 1];
        const span = nextTx - tx;
        return Array.from({ length: 7 }, (_, si) => {
          const t = (si + 1) / 8;
          const x = tx + span * t;
          const cableY = cableYTop * (1 - 4 * t * (1 - t)) + (deckY - 6) * (4 * t * (1 - t));
          return (
            <motion.line
              key={`susp-${ti}-${si}`}
              x1={x} y1={cableY} x2={x} y2={deckY - 8}
              strokeWidth="0.3"
              variants={pathVariants} custom={6}
            />
          );
        });
      })}

      {/* Under-deck truss */}
      {towers.slice(0, -1).map((tx, ti) => {
        const nextTx = towers[ti + 1];
        const span = nextTx - tx;
        return Array.from({ length: 5 }, (_, si) => {
          const x1 = tx + (span * si) / 5;
          const x2 = tx + (span * (si + 1)) / 5;
          return (
            <g key={`truss-${ti}-${si}`}>
              <motion.line x1={x1} y1={deckY + 4} x2={x2} y2={deckY + 20} strokeWidth="0.3" variants={pathVariants} custom={7} />
              <motion.line x1={x2} y1={deckY + 4} x2={x1} y2={deckY + 20} strokeWidth="0.3" variants={pathVariants} custom={7} />
            </g>
          );
        });
      })}
      <motion.line x1="0" y1={deckY + 20} x2="1000" y2={deckY + 20} strokeWidth="0.4" variants={pathVariants} custom={7} />

      {/* Foundation piers */}
      {towers.map((tx, ti) => (
        <g key={`pier-${ti}`}>
          <motion.line x1={tx - 12} y1={towerBottom + 10} x2={tx - 8} y2={towerBottom + 50} strokeWidth="0.5" variants={pathVariants} custom={8} />
          <motion.line x1={tx + 12} y1={towerBottom + 10} x2={tx + 8} y2={towerBottom + 50} strokeWidth="0.5" variants={pathVariants} custom={8} />
          <motion.line x1={tx - 8} y1={towerBottom + 50} x2={tx + 8} y2={towerBottom + 50} strokeWidth="0.4" variants={pathVariants} custom={8} />
        </g>
      ))}
    </motion.svg>
  );
}
