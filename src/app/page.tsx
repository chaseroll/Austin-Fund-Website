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
      <div data-theme="light" className="relative overflow-hidden bg-[#F5F4F0]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A0A0A]/[0.03] to-transparent"
        />
        <AmbientGlow />
        <Mission />
        <Thesis />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0A0A0A]/[0.04]"
        />
      </div>
      <Contact />
    </main>
  );
}
