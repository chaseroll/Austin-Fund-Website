import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PortfolioHero from "@/components/sections/PortfolioHero";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Portfolio",
  alternates: {canonical: "/portfolio"},
};

export default function Portfolio() {
  return (
    <main className="bg-[#000000]">
      <Navigation />
      <PortfolioHero />
      <PortfolioGrid />
      <Contact />
    </main>
  );
}
