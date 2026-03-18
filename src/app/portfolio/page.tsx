import Navigation from "@/components/Navigation";
import GrainOverlay from "@/components/GrainOverlay";
import PortfolioHero from "@/components/sections/PortfolioHero";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";

export default function Portfolio() {
  return (
    <main className="bg-[#0D0E0A]">
      <GrainOverlay />
      <Navigation />
      <PortfolioHero />
      <PortfolioGrid />
      <Contact />
    </main>
  );
}
