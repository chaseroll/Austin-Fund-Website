import Navigation from "@/components/Navigation";
import PortfolioHero from "@/components/sections/PortfolioHero";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";

export default function Portfolio() {
  return (
    <main className="bg-[#0A0A0A]">
      <Navigation />
      <PortfolioHero />
      <PortfolioGrid />
      <Contact />
    </main>
  );
}
