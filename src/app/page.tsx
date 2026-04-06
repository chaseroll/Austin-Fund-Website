import Navigation from "@/components/Navigation";
import AmbientGlow from "@/components/AmbientGlow";
import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Thesis from "@/components/sections/Thesis";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-[#0A0A0A]">
      <Navigation />
      <Hero />
      <div data-theme="light" className="relative overflow-hidden bg-[#f5f4f0]">
        <AmbientGlow />
        <Mission />
        <Thesis />
      </div>
      <Contact />
    </main>
  );
}
