"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";

const ov = { once: true, margin: "-80px" as const };

interface Company {
  name: string;
  description: string;
  sector: string;
  url?: string;
}

const companies: Company[] = [
  {
    name: "Company A",
    description: "Decentralized compute infrastructure",
    sector: "Infrastructure",
  },
  {
    name: "Company B",
    description: "AI-powered research collaboration",
    sector: "AI / ML",
  },
  {
    name: "Company C",
    description: "Emerging market supply chain logistics",
    sector: "Logistics",
  },
  {
    name: "Company D",
    description: "Edge application developer tools",
    sector: "Developer Tools",
  },
  {
    name: "Company E",
    description: "Industrial carbon capture at scale",
    sector: "Climate Tech",
  },
  {
    name: "Company F",
    description: "Cross-border payments for SMBs",
    sector: "Fintech",
  },
  {
    name: "Company G",
    description: "AI-driven drug discovery therapeutics",
    sector: "Biotech",
  },
  {
    name: "Company H",
    description: "Behavioral science consumer health",
    sector: "Health Tech",
  },
];

export default function PortfolioGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative pb-24 pt-24 md:pb-36 md:pt-40">
      <motion.span
        style={{ y: numberY }}
        className="pointer-events-none absolute right-6 top-16 select-none text-[10rem] font-extralight leading-none text-[#EAEAE9]/[0.02] md:right-16 md:text-[18rem]"
      >
        01
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-center justify-between pt-12 md:mb-16 md:pt-16"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={ov}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px w-8 origin-left bg-[#2C2E20]"
            />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#6B6D63]/60">
              Investments
            </span>
          </div>
          <span className="text-[10px] font-light tracking-wider text-[#EAEAE9]/20">
            {String(companies.length).padStart(2, "0")} Companies
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={ov}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full origin-left bg-[#EAEAE9]/[0.08]"
        />

        <div>
          {companies.map((company, i) => (
            <CompanyItem key={company.name} company={company} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyItem({ company, index }: { company: Company; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const num = String(index + 1).padStart(2, "0");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(234,234,233,0.04), transparent 40%)`;

  const content = (
    <div
      ref={itemRef}
      className="relative flex items-center justify-between gap-6 overflow-hidden py-7 px-4 -mx-4 rounded-xl transition-colors duration-500 md:py-9 md:px-6 md:-mx-6 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background,
        }}
      />

      <div className="relative flex items-center gap-6 md:gap-10">
        <motion.span
          animate={{ opacity: isHovered ? 0.8 : 0.3 }}
          className="text-[11px] font-light tabular-nums tracking-wider text-[#6B6D63]"
        >
          {num}
        </motion.span>

        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
          <motion.h3
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg font-light tracking-tight text-[#EAEAE9] md:text-2xl lg:text-[1.75rem]"
          >
            {company.name}
          </motion.h3>
          <span className="text-[12px] font-light text-[#6B6D63]/60 md:hidden">
            {company.sector}
          </span>
        </div>
      </div>

      <div className="relative hidden items-center gap-8 md:flex lg:gap-12">
        <motion.span
          animate={{ opacity: isHovered ? 0.7 : 0.4 }}
          className="text-[13px] font-light text-[#6B6D63]"
        >
          {company.description}
        </motion.span>
        <span className="shrink-0 rounded-full border border-[#2C2E20]/20 px-3 py-1 text-[9px] font-medium tracking-[0.15em] uppercase text-[#6B6D63]/50">
          {company.sector}
        </span>
        {company.url && (
          <motion.svg
            animate={{
              x: isHovered ? 2 : 0,
              y: isHovered ? -2 : 0,
              opacity: isHovered ? 0.7 : 0.2,
            }}
            transition={{ duration: 0.3 }}
            className="h-3.5 w-3.5 shrink-0 text-[#EAEAE9]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </motion.svg>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: 0.05 + index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border-b border-[#EAEAE9]/[0.06]"
    >
      {company.url ? (
        <a
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
}
