import Navigation from "@/components/Navigation";
import AmbientGlow from "@/components/AmbientGlow";
import TestHero from "@/components/sections/TestHero";
import Mission from "@/components/sections/Mission";
import Thesis from "@/components/sections/Thesis";
import Contact from "@/components/sections/Contact";

export default function TestPage() {
  return (
    <main className="bg-[#0A0A0A]">
      <Navigation />
      <TestHero />
      <div data-theme="light" className="relative overflow-hidden bg-[#f5f4f0]">
        <AmbientGlow />
        <Mission />
        <Thesis />
      </div>
      <Contact />
    </main>
  );
}
